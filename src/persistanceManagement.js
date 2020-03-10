//Class Route
const Route = require('./Route');

//Library for authentication
const auth = require('solid-auth-client');

//Library to manage files and data in PODs
const FC   = require('solid-file-client')
var fc;

module.exports = {

    login: async function (url = "https://solid.community") {

        this.activeSession = await auth.currentSession();

        if (!this.activeSession)
            await auth.login(url);
        else
            alert(`Already logged in as ${this.activeSession.webId}`);

        fc = new FC(auth);
        
    },

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

    isLoggedIn: async function () {
        if (await auth.currentSession() == null || (await auth.currentSession()).webId == null)
                return false;
        return true;
    },

    saveRoute: async function(route = new Route(-1, "Prueba", "Ruta de prueba", null, [])) { //Valor default para test
        fc = new FC(auth);

        var jsonData = JSON.stringify(route);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

        await fc.createFile(urlUser + "/" + route.id + ".json", jsonData, "application/json");
    },

    seeRoute: async function(idRoute = -1) { //Valor default para test
        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

        var route = await fc.readFile(urlUser + idRoute + ".json");

        console.log(route);

        return route;
    },

    seeRoutes: async function() { //Valor default para test
        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

        let folder = await fc.readFolder(urlUser);
        var arrayJSONs = [];

        for (var i=0; i < folder.files.length; i++) {
            var file = folder.files[i];
            arrayJSONs.push(await fc.readFile(file.url));
        }

        var routes = [];

        for (i=0; i < arrayJSONs.length; i++) {
            routes.push(JSON.parse(arrayJSONs[i]))
        }

        console.log(routes);

        return routes;
    },

    test: async function() {
        console.log(await auth.currentSession())
    }

}

