//Class Route
import Route from './Route';

//Library for authentication
const auth = require('solid-auth-client');

//Library to manage files and data in PODs
const FC   = require('solid-file-client')
var fc;

export default {

    /**
     * Method to do login
     * @param {url para realizar la autenticación. Solid community por defecto} url 
     */
    login: async function (url = "https://solid.community") {

        this.activeSession = await auth.currentSession();

        if (!this.activeSession)
            await auth.login(url);
        else
            alert(`Already logged in as ${this.activeSession.webId}`);

        fc = new FC(auth);
        
    },

    /**
     * Method to do logout.
     */
    logout: async function () {
       this.activeSession = await auth.currentSession();

        if (!this.activeSession)
            alert('No one is logged');
        else
            auth.logout().then(
                () => alert("Logged out"),
                () => alert("Error logging out")
            );
    },

    /**
     * Method that check if the user is logged in or not.
     * It return true if it's logged in and false otherwise.
     */
    isLoggedIn: async function () {
        if (await auth.currentSession() == null || (await auth.currentSession()).webId == null)
                return false;
        return true;
    },

    /**
     * Method used to load a file from the local storage of the client.
     */
    askForAFile: function() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {

        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    },

    /**
     * Method to save the route passed by parameter in the current user pod.
     * @param {Route to be saved. it should follow the Route class format.} route 
     */
    saveRoute: async function(route) {
        fc = new FC(auth);

        var basicData = {id: route.id, name: route.name, description: route.description};
        var basicDataJson = JSON.stringify(basicData);

        let id_noSpaces = route.id.replace( /\s/g, '_');

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/" + id_noSpaces;

        await fc.createFile(urlUser + "/" + id_noSpaces + ".json", basicDataJson, "application/json");
        await fc.createFile(urlUser + "/" + id_noSpaces + ".gpx", route.gpx, "application/gpx+xml");

        //TO-DO: Save images
    },

    /**
     * Method that returns the route saved in the user's pod, if exist. Null otherwise.
     * @param {ID of the route to be showed.} idRoute 
     */
    seeRoute: async function(idRoute = -1) { //Valor default para test
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

        var route = await fc.readFile(urlUser + idRoute + ".json");

        console.log(route);

        return route;
    },

    /**
     * Method which looks in the user pods for all the saved routes.
     * Return an array containing them.
     */
    seeRoutes: async function() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

        let folder = await fc.readFolder(urlUser);
        var arrayRoutesFolders = [];
        var routes = [];

        for (var i=0; i < folder.folders.length; i++) {
            var route_folder = folder.folders[i];
            arrayRoutesFolders.push(route_folder.name);
        }

        for (var i=0; i < arrayRoutesFolders.length; i++) {
            let gpx = await fc.readFile(urlUser + "/" + arrayRoutesFolders[i] + "/" + arrayRoutesFolders[i] + ".gpx");
            let basicDataJson = await fc.readFile(urlUser + "/" + arrayRoutesFolders[i] + "/" + arrayRoutesFolders[i] + ".json");
            let basicData = JSON.parse(basicDataJson);

            let route = new Route(basicData.id, basicData.name, basicData.description, gpx, null); //TO-DO add images
            routes.push(route);
        }

        console.log(routes);

        return routes;
    },

    test: async function() {
        console.log(await auth.currentSession())
    }

}

