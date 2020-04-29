//Class Route
import Route from "../Route";

//Library for authentication
const auth = require("solid-auth-client");

//Library to manage files and data in PODs
const FC = require("solid-file-client");
var fc;
var routeId;
var routeGPX;
var routeName;
var routeDescrip;
var routePriv;
export default {

    /**
     * Method to do login
     * @param {url para realizar la autenticación. Solid community por defecto} url 
     */
    async login(url = "https://solid.community") {

        this.activeSession = await auth.currentSession();

        if (!this.activeSession) {
            await auth.login(url);
        } else {
            alert(`Already logged in as ${this.activeSession.webId}`);
        }
        fc = new FC(auth);

    },

    /**
     * Method to do logout.
     */
    async logout() {
        this.activeSession = await auth.currentSession();

        if (!this.activeSession) {
            alert("No one is logged");
        } else {
            auth.logout().then(
                () => alert("Logged out"),
                () => alert("Error logging out")
            );
        }
    },

    async setUpSharedFolder() {
        //We create the shared folder if it dowsn't exist, if it exists we return.
        fc = new FC(auth);

        let webIdUser = ((await auth.currentSession()).webId).toString();
        let urlSharedFolder = webIdUser.slice(0, -16) + "/shared/";
        let aclRoute = urlSharedFolder + ".acl";

        //Check if it already exists.
        if (await fc.itemExists(urlSharedFolder)) return;

        //Create it if not
        await fc.createFolder(urlSharedFolder);   

        var newTurtleFile =  `# ACL resource for the shared routes folder
        @prefix acl: <http://www.w3.org/ns/auth/acl#>.
        @prefix foaf: <http://xmlns.com/foaf/0.1/>.
        
        # The owner has all permissions
        <#owner>
            a acl:Authorization;
            acl:agent <` + webIdUser + `>;
            acl:accessTo <./>;
            acl:default <./>;
            acl:mode acl:Read, acl:Write, acl:Control.
        
        # The public has read and write permissions
        <#public>
            a acl:Authorization;
            acl:agentClass foaf:Agent;
            acl:accessTo <./>;
            acl:default <./>;
            acl:mode acl:Read, acl:Write.`;

        
        await fc.createFile(aclRoute, newTurtleFile, "text/turtle");
        await fc.createFolder(urlSharedFolder + "routes/", {withAcl:false});
    },

    /**
     * Method that check if the user is logged in or not.
     * It return true if it"s logged in and false otherwise.
     */
    async isLoggedIn() {
        if (await auth.currentSession() === null || (await auth.currentSession()).webId === null) {
            return false;
        }
        return true;
    },

    /**
     * Method used to load a file from the local storage of the client.
     */
    askForAFile() {
        // Check for the various File API support.
        if (!window.File && !window.FileReader && !window.FileList && !window.Blob) {
            alert("The File APIs are not fully supported in this browser.");
        }
    },

    async shareRoute(route, webId) {
        fc = new FC(auth);

        var basicData = { id: route.id, name: route.name, description: route.description, priv: route.priv };
        var basicDataJson = JSON.stringify(basicData);

        let idNoSpaces = route.id.replace(/\s/g, "_");

        let tempUrlUser = webId.toString();

        var urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/" + idNoSpaces;

        await fc.createFile(urlUser + "/" + idNoSpaces + ".json", basicDataJson, "application/json", {withAcl:false});
        await fc.createFile(urlUser + "/" + idNoSpaces + ".gpx", route.gpx, "application/gpx+xml", {withAcl:false});

        for (var i = 0; i < route.images.length; i++) {
            console.log(route.images);
            var image = route.images[i];
            console.log(image)
            await fc.createFile(urlUser + "/" + idNoSpaces + "_" + i, image, image.type, {withAcl:false});
        }

    },

    /**
     * Method to save the route passed by parameter in the current user pod.
     * @param {Route to be saved. it should follow the Route class format.} route 
     */
    async saveRoute(route) {
        fc = new FC(auth);

        var basicData = { id: route.id, name: route.name, description: route.description, priv: route.priv };
        var basicDataJson = JSON.stringify(basicData);

        let idNoSpaces = route.id.replace(/\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check if the route is private to decide where to save it. By default is private.
        var urlUser = "";
        if (route.priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/" + idNoSpaces; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/" + idNoSpaces; }

        await fc.createFile(urlUser + "/" + idNoSpaces + ".json", basicDataJson, "application/json");
        await fc.createFile(urlUser + "/" + idNoSpaces + ".gpx", route.gpx, "application/gpx+xml");

        for (var i = 0; i < route.images.length; i++) {
            var image = route.images.item(i);
            await fc.createFile(urlUser + "/" + idNoSpaces + "_" + i, image, image.type);
        }

    },

    /**
     * Method that returns the route saved in the user"s pod, if exist. Null otherwise.
     * @param {ID of the route to be showed.} idRoute 
     * @param {Privacy of the route to be showed. By default is private.} priv 
     */
    async seeRoute(idRoute, priv = true) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = "";

        // Here we check the privacy of the route
        if (priv) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/" + idRoute + "/" }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/" + idRoute + "/" }

        var route = await fc.readFile(urlUser + idRoute + ".json").catch(err => "The route is public, searching in public routes to see it.");
        //route = await fc.readFile(tempUrlUser.slice(0, -16) + "/public/routes/" + idRoute + ".json").catch("There was a problem searching for the route.")

        return JSON.parse(route);
    },

    /**
     * Method which looks in the user pods for all the saved routes.
     * Return an array containing them.
     * @param {The privacy of the routes you want to see. By default you look for the private ones.} priv 
     */
    async seeRoutes(priv = true) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check for the privacy of the routes to see.
        var urlUser = "";
        if (priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/"; }

        var err = "";
        let folder = await fc.readFolder(urlUser).catch((error) => err = error);

        if (err !== "") {
            return [];
        }

        var arrayRoutesFolders = [];
        var routes = [];

        for (var i = 0; i < folder.folders.length; i++) {
            var routeFolder = folder.folders[i];
            arrayRoutesFolders.push(routeFolder);
        }
        for (var j = 0; j < arrayRoutesFolders.length; j++) {
            let gpx = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".gpx");
            let basicDataJson = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".json");
            let basicData = JSON.parse(basicDataJson);

            let filesInFolder = (await fc.readFolder(arrayRoutesFolders[j].url)).files;
            var images = [];
            if (filesInFolder.length > 2) {
                for (var k = 0; k < filesInFolder.length - 2; k++) {
                    let image = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + "_" + k);
                    images.push(image);
                }
            }

            let route = new Route(basicData.id, basicData.name, basicData.description, gpx, images, basicData.priv);
            routes.push(route);
        }

        return routes;
    },

    /**
     * Method which delete all the routes with the privacy you give in the params.
     * @param {The privacy of the routes to be deleted. By default is private.} priv 
     */
    async deleteRoutes(priv = true) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check the privacy of the routes to be deleted.
        var urlUser = "";
        if (priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/piublic/routes/"; }

        await fc.deleteFolder(urlUser);

    },

    /**
     * Method that delete de route with the id and the privacy passed by params.
     * @param {ID of the route to be showed.} idRoute 
     * @param {Privacy of the route to be showed. By default is private.} priv 
     */
    async deleteRoute(id, priv = true) {
        fc = new FC(auth);

        let idNoSpaces = id.toString().replace(/\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check the privacy of the route to be deleted.
        var urlUser = "";
        if (priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/"; }

        let folder = await fc.readFolder(urlUser);
        var arrayRoutesFolders = [];
        var promise = null;

        for (var i = 0; i < folder.folders.length; i++) {
            var routeFolder = folder.folders[i];
            arrayRoutesFolders.push(routeFolder);
        }

        for (var j = 0; j < arrayRoutesFolders.length; j++) {

            if (arrayRoutesFolders[j].name === idNoSpaces) {

                promise = fc.deleteFolder(arrayRoutesFolders[j].url);

            }

        }

        return promise;

    },


    saveID(id){
        let idNoSpaces = id.replace( /\s/g, "_");
        routeId = idNoSpaces;
    },

    getID() {
        return routeId;
    },

    getGPX(route) {
        return route.gpx;
    },

	getPriv(route){
		return route.priv;
    },
    
    saveGPX(route){
		routeGPX = route.gpx;
	},

	loadGPX(){
		return routeGPX;
	},

	saveName(route){
		routeName = route.name;
	},

	loadName(){
		return routeName;
	},

	saveDescrip(route){
		routeDescrip = route.description;
	},

	loadDescrip(){
		return routeDescrip;
	},

	savePriv(route){
		if (route.priv === false) {
			routePriv = "priv";
		} else {
			routePriv = "publ";  
		}
	},

	loadPriv(){
		return routePriv;
	},

	async editRoute(oldRoute,route){
		fc = new FC(auth);

        var basicData = { id: oldRoute.id, name: route.name, description: route.description, priv: route.priv };
        var basicDataJson = JSON.stringify(basicData);

        let idNoSpaces = oldRoute.id.replace(/\s/g, "_");

	        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        
        	// Here we check if the route is private to decide where to save it. By default is private.
        	var urlUser = "";
        	if (route.priv === true) {urlUser = tempUrlUser.slice(0, -16) + "/private/routes" ;}
	       	 else {urlUser = tempUrlUser.slice(0, -16) + "/public/routes" ;}
	        await fc.createFile(urlUser+"/"+ idNoSpaces + "/" + idNoSpaces+ ".json", basicDataJson, "application/json");
	        await fc.createFile(urlUser +"/"+ idNoSpaces+ "/" + idNoSpaces +".gpx", route.gpx, "application/gpx+xml");
    	},

	async downloadRoute(){
		var route = await this.seeRoute(this.getID());
		var routeFinal = new Route(route.id, route.name, route.description, this.loadGPX(), null);
		var gpxToDownload = routeFinal.gpx;
		var b = new Blob([gpxToDownload], {type: "text/plain"});
		var fileLink = document.createElement("a");

		fileLink.download = route.id + ".gpx";

		var url = URL.createObjectURL(b);
		fileLink.href = url;

		fileLink.click();
       }
};

