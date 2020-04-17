//Class Route
import Route from "./Route";

//Library for authentication
const auth = require("solid-auth-client");

//Library to manage files and data in PODs
const FC   = require("solid-file-client");
var fc;

export default {

    /**
     * Method to do login
     * @param {url para realizar la autenticación. Solid community por defecto} url 
     */
     async login (url = "https://solid.community") {

        this.activeSession = await auth.currentSession();

        if (!this.activeSession){
            await auth.login(url);
         } else{
            alert(`Already logged in as ${this.activeSession.webId}`);
        }
        fc = new FC(auth);
        
    },

    /**
     * Method to do logout.
     */
    async logout () {
       this.activeSession = await auth.currentSession();

        if (!this.activeSession){
            alert("No one is logged");
        }else{
            auth.logout().then(
                () => alert("Logged out"),
                () => alert("Error logging out")
            );
        }      
    },

    /**
     * Method that check if the user is logged in or not.
     * It return true if it"s logged in and false otherwise.
     */
    async isLoggedIn () {
        if (await auth.currentSession() === null || (await auth.currentSession()).webId === null){
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

    /**
     * Method to save the route passed by parameter in the current user pod.
     * @param {Route to be saved. it should follow the Route class format.} route 
     */
    async saveRoute(route) {
        fc = new FC(auth);

        var basicData = {id: route.id, name: route.name, description: route.description};
        var basicDataJson = JSON.stringify(basicData);

        let idNoSpaces = route.id.replace( /\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/private/routes/" + idNoSpaces;

        await fc.createFile(urlUser + "/" + idNoSpaces + ".json", basicDataJson, "application/json");
        await fc.createFile(urlUser + "/" + idNoSpaces + ".gpx", route.gpx, "application/gpx+xml");

        for (var i=0; i < route.images.length; i++) {
            var image = route.images.item(i);
            await fc.createFile(urlUser + "/" + idNoSpaces + "_" + i , image, image.type);
        }

    },

    /**
     * Method that returns the route saved in the user"s pod, if exist. Null otherwise.
     * @param {ID of the route to be showed.} idRoute 
     */
    async seeRoute(idRoute) {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/private/routes/";

        var route = await fc.readFile(urlUser + idRoute + ".json");

        return route;
    },

    /**
     * Method which looks in the user pods for all the saved routes.
     * Return an array containing them.
     */
    async seeRoutes() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/private/routes/";

        var err = "";
        let folder = await fc.readFolder(urlUser).catch( (error) => err = error);

        if (err !== "") {
            return [];
        }

        var arrayRoutesFolders = [];
        var routes = [];

        for (var i=0; i < folder.folders.length; i++) {
            var routeFolder = folder.folders[i];
            arrayRoutesFolders.push(routeFolder);
        }

        for (var j=0; j < arrayRoutesFolders.length; j++) {
            let gpx = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".gpx");
            let basicDataJson = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".json");
            let basicData = JSON.parse(basicDataJson);

            let filesInFolder = (await fc.readFolder(arrayRoutesFolders[j].url)).files;
            var images = [];
            if (filesInFolder.length > 2) {
                for (var k=0; k < filesInFolder.length - 2; k++) {
                    let image = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + "_" + k);
                    images.push(image);
                }
            }

            let route = new Route(basicData.id, basicData.name, basicData.description, gpx, images);
            routes.push(route);
        }

        return routes;
    },
    
    async deleteRoutes() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/private/routes/";

        await fc.deleteFolder(urlUser);
        
    },

    async deleteRoute(id) {
        fc = new FC(auth);

        let idNoSpaces = id.replace( /\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/private/routes/";

        let folder = await fc.readFolder(urlUser);
        var arrayRoutesFolders = [];
        var promise = null;

        for (var i=0; i < folder.folders.length; i++) {
            var routeFolder = folder.folders[i];
            arrayRoutesFolders.push(routeFolder);
        }

        for (var j=0; j < arrayRoutesFolders.length; j++) {
            
            if (arrayRoutesFolders[j].name === idNoSpaces) {

                promise = fc.deleteFolder(arrayRoutesFolders[j].url);

            }

        }

        return promise;

    }
};

