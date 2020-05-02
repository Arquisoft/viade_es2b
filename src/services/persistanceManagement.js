//Class Route
import Route from "../Route";

//Class for translate
import i18n from "../i18n";

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
var purePriv;
export default {

    async getWebID() {
        return (await auth.currentSession()).webId;
    },

    async setUpInboxFolder() {
        //We create the app folder if it dowsn't exist, if it exists we return.
        fc = new FC(auth);

        let webIdUser = ((await auth.currentSession()).webId).toString();
        let urlInboxFolder = webIdUser.slice(0, -16) + "/viade_es2b/inbox";

        //Check if it already exists.
        if (await fc.itemExists(urlInboxFolder)) return;

        //Create it if not
        await fc.createFolder(urlInboxFolder);
    },
    
    /**
     * This method set up the folder for shared routes in your pod, and change its permissions to allow
     * the write and read on it.
     */
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
     * This method share the route pased by parameters to the user also passed by parameters.
     * The user should have use the app at least once. If not, the method will fail.
     * @param {*} route 
     * @param {*} webId 
     */
    async shareRoute(route, webId) {
        fc = new FC(auth);

        var basicData = { id: route.id, name: route.name, description: route.description, priv: route.priv, shared: true };
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

        var basicData = { id: route.id, name: route.name, description: route.description, priv: route.priv, shared: route.shared };
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
     * This method only works for owned routes, the shared ones can't be search through this method.
     * @param {ID of the route to be showed.} idRoute 
     * @param {Privacy of the route to be showed. By default is private.} priv 
     */
    async seeRoute(idRoute, priv = true) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = "";
	var route;
	//Check if it is in shared folder
	urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/" + idRoute + "/";	
	if (await fc.itemExists(urlUser + idRoute + ".json")) {
		route = await fc.readFile(urlUser + idRoute + ".json").catch(err => "The was a problem searching the route.");
	}
	else {
        	// If it is not in shared folder, we check the privacy of the local route
        	if (priv) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/" + idRoute + "/" }
        	else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/" + idRoute + "/" }
		route = await fc.readFile(urlUser + idRoute + ".json").catch(err => "The was a problem searching the route.");
	}
        
        return JSON.parse(route);
    },

    /**
     * This method returns the content of the /shared/routes folder, which contains the routes that a friend of you shared with you.
     */
    async seeSharedRoutes() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        var urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/"

        var err = "";
        let folder = await fc.readFolder(urlUser).catch((error) => err = error);

        if (err !== "") {
            return [];
        }

        const routes = await extractRoutesFromFile(folder, urlUser);

        return routes;
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

        const routes = await extractRoutesFromFile(folder, urlUser);

        return routes;
    },

    /**
     * Method which delete all the routes with the privacy you give in the params.
     * @param {The privacy of the routes to be deleted. By default is private.} priv 
     */
    async deleteRoutes(priv = true, shared = false) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check the privacy of the routes to be deleted.
        var urlUser = "";
        if (priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/"; }

        await fc.deleteFolder(urlUser).catch(err => console.log(err));

        if (shared === true) await fc.deleteFolder(tempUrlUser.slice(0, -16) + "/shared/routes/").catch(err => console.log(err));

    },

    /**
     * Method that delete de route with the id and the privacy passed by params.
     * @param {ID of the route to be showed.} idRoute 
     * @param {Privacy of the route to be showed. By default is private.} priv 
     */
    async deleteRoute(id, priv = true, shared = false) {
        fc = new FC(auth);

        let idNoSpaces = id.toString().replace(/\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check the privacy of the route to be deleted.
        var urlUser = "";
        if (shared) urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/";            //Ruta compartida
        else if (priv) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; }    //Ruta privada
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/"; }               //Ruta pública

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
		if (route.priv === true) {
			routePriv = i18n.t("form.priv");
		} else {
			routePriv = i18n.t("form.publ");  
		}
	},

	loadPriv(){
		return routePriv;
	},
		
	savePurePriv(route){
		purePriv = route.priv;		
	},

	loadPurePriv(){
		return purePriv;
	},

	async editRoute(oldRoute,route){
		fc = new FC(auth);
        var basicData = { id: oldRoute.id, name: route.name, description: route.description, priv: route.priv, shared: route.shared };
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
		var route = await this.seeRoute(this.getID(), this.loadPurePriv());
		var routeFinal = new Route(route.id, route.name, route.description, this.loadGPX(), null);
		var gpxToDownload = routeFinal.gpx;
		var b = new Blob([gpxToDownload], {type: "text/plain"});
		var fileLink = document.createElement("a");

		fileLink.download = route.id + ".gpx";

		var url = URL.createObjectURL(b);
		fileLink.href = url;

		fileLink.click();
       },

    async getAppPath() {
        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        return tempUrlUser.slice(0, -16) + "/viade_es2b";
    }
};

/**
 * Auxiliar method to parse all the files of the folder pased by param to the Route class.
 * @param {*} folder Content of the folder to parse, generated by the Solid File Client library.
 * @param {*} urlUser Url of the user pod.
 */
async function extractRoutesFromFile(folder, urlUser) {
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
        let route = new Route(basicData.id, basicData.name, basicData.description, gpx, images, basicData.priv, basicData.shared);
        routes.push(route);
    }
    return routes;
}