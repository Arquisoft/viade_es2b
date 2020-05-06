//Class Route
import Route from "../Route";

//Class Group
import Group from "../Group";
import { toast } from "react-toastify";

//Library for authentication
const auth = require("solid-auth-client");

//Library to manage files and data in PODs
const FC = require("solid-file-client");
var fc;


toast.configure({
    autoClose: 500,
    draggable: true,
});

export default {

    async getWebID() {
        return (await auth.currentSession()).webId;
    },

    async setUpInboxFolder() {
        //We create the app folder if it dowsn"t exist, if it exists we return.
        fc = new FC(auth);

        let webIdUser = ((await auth.currentSession()).webId).toString();
        let urlInboxFolder = webIdUser.slice(0, -16) + "/viade_es2b/inbox";

        //Check if it already exists.
        if (await fc.itemExists(urlInboxFolder)){
            return;
        }

        //Create it if not
        await fc.createFolder(urlInboxFolder);
    },

    /**
     * This method set up the folder for shared routes in your pod, and change its permissions to allow
     * the write and read on it.
     */
    async setUpSharedFolder() {
        //We create the shared folder if it dowsn"t exist, if it exists we return.
        fc = new FC(auth);

        let webIdUser = ((await auth.currentSession()).webId).toString();
        let urlSharedFolder = webIdUser.slice(0, -16) + "/shared/";
        let aclRoute = urlSharedFolder + ".acl";

        //Check if it already exists.
        if (await fc.itemExists(urlSharedFolder)) {
            return;
        }

        //Create it if not
        await fc.createFolder(urlSharedFolder);

        var newTurtleFile = `# ACL resource for the shared routes folder
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
        await fc.createFolder(urlSharedFolder + "routes/", { withAcl: false });
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

        await fc.createFile(urlUser + "/" + idNoSpaces + ".json", basicDataJson, "application/json", { withAcl: false });
        await fc.createFile(urlUser + "/" + idNoSpaces + ".gpx", route.gpx, "application/gpx+xml", { withAcl: false });

        for (var i = 0; i < route.images.length; i++) {
            var image = route.images[i];

            await fc.createFile(urlUser + "/" + idNoSpaces + "_" + i, image, image.type, { withAcl: false });
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

        return 0;

    },

    /**
     * Method that returns the route saved in the user"s pod, if exist. Null otherwise.
     * This method only works for owned routes, the shared ones can"t be search through this method.
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
            route = await fc.readFile(urlUser + idRoute + ".json").catch( (err) => "The was a problem searching the route.");
        }
        else {
            // If it is not in shared folder, we check the privacy of the local route
            if (priv) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes/" + idRoute + "/"; }
            else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes/" + idRoute + "/"; }
            route = await fc.readFile(urlUser + idRoute + ".json").catch( (err) => "The was a problem searching the route.");
        }

        return JSON.parse(route);
    },

    /**
     * This method returns the content of the /shared/routes folder, which contains the routes that a friend of you shared with you.
     */
    async seeSharedRoutes() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        var urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/";

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
     * Method which looks in the user pods for all the saved routes.
     * Return an array containing them.
     * @param {The privacy of the routes you want to see. By default you look for the private ones.} priv 
     */
    async seeFriendsRoutes(friendsList) {
        fc = new FC(auth);

        const friendIDs = [];

        for (var i = 0; i < friendsList.length; i++) {
            const webID = `${friendsList[i]}`
            friendIDs.push(webID);
        }

        const routes = [];

        for (i = 0; i < friendIDs.length; i++) {

            let tempUrlUser = friendIDs[i].toString();

            // Here we check for the privacy of the routes to see.
            var urlUser = urlUser = tempUrlUser.slice(0, -16) + "/public/routes/";

            var err = "";
            // eslint-disable-next-line no-loop-func
            let folder = await fc.readFolder(urlUser).catch((error) => err = error);

            if (err !== "") {
                continue;
            }

            const routesUser = await extractRoutesFromFile(folder, urlUser);

            routesUser.forEach(route => route.owner = tempUrlUser);

            routes.push(routesUser);
        }
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
        if (priv === true) { 
            urlUser = tempUrlUser.slice(0, -16) + "/private/routes/"; 
        }else { 
            urlUser = tempUrlUser.slice(0, -16) + "/public/routes/"; 
        }

        await fc.deleteFolder(urlUser).catch((err) => toast.error(err));
        

        if (shared === true){
            await fc.deleteFolder(tempUrlUser.slice(0, -16) + "/shared/routes/").catch( (err) => toast.error(err));
        } 

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
        if (shared){
            urlUser = tempUrlUser.slice(0, -16) + "/shared/routes/";            //Ruta compartida
        } 
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

    async editRoute(routeToBeEdited, privacyChanged) {
        fc = new FC(auth);
        var basicData = { id: routeToBeEdited.id, name: routeToBeEdited.name, description: routeToBeEdited.description, priv: routeToBeEdited.priv, shared: routeToBeEdited.shared };
        var basicDataJson = JSON.stringify(basicData);

        let idNoSpaces = routeToBeEdited.id.replace(/\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        // Here we check if the route is private to decide where to save it. By default is private.
        var urlUser = "";
        if (routeToBeEdited.priv === true) { urlUser = tempUrlUser.slice(0, -16) + "/private/routes"; }
        else { urlUser = tempUrlUser.slice(0, -16) + "/public/routes"; }

        // If the privacy changed then first we move the old route.
        if (privacyChanged) {
            let oldRoutePath = "";
            routeToBeEdited.priv ? oldRoutePath = tempUrlUser.slice(0, -16) + "/public/routes" : oldRoutePath = tempUrlUser.slice(0, -16) + "/private/routes";
            oldRoutePath += "/" + idNoSpaces + "/";

            const newRoutePath = urlUser + "/" + idNoSpaces + "/";

            await fc.move(oldRoutePath, newRoutePath);
        }

        // We remove and create a new JSON file with the new data
        await fc.createFile(urlUser + "/" + idNoSpaces + "/" + idNoSpaces + ".json", basicDataJson, "application/json");
    },

    async downloadRoute(routeToBeDownloaded) {
        var b = new Blob([routeToBeDownloaded.gpx], { type: "application/gpx+xml" });
        var fileLink = document.createElement("a");

        fileLink.download = routeToBeDownloaded.name + ".gpx";

        var url = URL.createObjectURL(b);
        fileLink.href = url;

        fileLink.click();

        return 0;
    },

    async saveGroup(group) {
        fc = new FC(auth);

        var data = {id: group.id, name: group.name, members: group.members};

        var groupJson = JSON.stringify(data);
        let idNoSpaces = group.id.replace(/\s/g, "_");

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        var urlUser = tempUrlUser.slice(0, -16) + "/groups/" + idNoSpaces;

        await fc.createFile(urlUser + "/" + idNoSpaces + ".json", groupJson, "application/json");
    },

    async seeGroups() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();

        var urlUser = tempUrlUser.slice(0, -16) + "/groups/";
        var err = "";
        let folder = await fc.readFolder(urlUser).catch((error) => err = error);

        if (err !== "") {
            return [];
        }

        const groups = await extractGroups(folder, urlUser);
        return groups;
    },

    async deleteGroups() {
        fc = new FC(auth);

        let tempUrlUser = ((await auth.currentSession()).webId).toString();
        let err= "";

        var urlUser = tempUrlUser.slice(0, -16) + "/groups/";
        await fc.deleteFolder(urlUser).catch((error) => err = error);

        if (err !== "")
            return 1;

        return 0;
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
        let gpx = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".gpx").catch( (err) => toast.error(err));
        let basicDataJson = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + ".json").catch((err) => toast.error(err));
        let basicData = JSON.parse(basicDataJson);
        let filesInFolder = (await fc.readFolder(arrayRoutesFolders[j].url).catch((err) => toast.error(err))).files;
        var images = [];
        if (filesInFolder.length > 2) {
            for (var k = 0; k < filesInFolder.length - 2; k++) {
                let image = await fc.readFile(urlUser + arrayRoutesFolders[j].name + "/" + arrayRoutesFolders[j].name + "_" + k).catch((err) => toast.error(err));
                images.push(image);
            }
        }
        let route = new Route(basicData.id, basicData.name, basicData.description, gpx, images, basicData.priv, basicData.shared);
        routes.push(route);
    }
    return routes;
}

/**
 * Auxiliar method to parse group files.
 * @param {*} folder Content of the folder to parse, generated by the Solid File Client library.
 * @param {*} urlUser Url of the user pod.
 */
async function extractGroups(folder, urlUser) {
    var arrayGroupsFolders = [];
    var groups = [];
    for (var i = 0; i < folder.folders.length; i++) {
        var groupFolder = folder.folders[i];
        arrayGroupsFolders.push(groupFolder);
    }
    for (var j = 0; j < arrayGroupsFolders.length; j++) {
        let groupDataJson = await fc.readFile(urlUser + arrayGroupsFolders[j].name + "/" + arrayGroupsFolders[j].name + ".json");
        let groupData = JSON.parse(groupDataJson);
        let group = new Group(groupData.id, groupData.name, groupData.members);
        groups.push(group);
    }
    return groups;
}