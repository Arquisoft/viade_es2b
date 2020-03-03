//Library for authentication
const auth = require('solid-auth-client');

//Library to manage Linked Data (PODs content)
const { PathFactory } = require('ldflex');
const { default: ComunicaEngine } = require('ldflex-comunica');
const { namedNode } = require('@rdfjs/data-model');

// The JSON-LD context for resolving properties
const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
    }
};
// The query engine and its source
var queryEngine;
// The object that can create new paths
var path;

module.exports = {

    initLDflex: async function () {
        this.activeSession = await auth.currentSession();

        if (!this.activeSession)
            return alert("You have to log in first.");

        queryEngine = new ComunicaEngine(this.activeSession.webId);
        path = new PathFactory({ context, queryEngine });
    },

    login: async function (url = "https://inrupt.net") {

        this.activeSession = await auth.currentSession();

        if (!this.activeSession)
            await auth.login(url);
        else
            alert(`Already logged in as ${this.activeSession.webId}`);
        
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

    showPerson: async function () {
        await this.initLDflex();

        let person = path.create({ subject: namedNode(this.activeSession.webId) });

        console.log(`This person is ${await person.name}`);

        console.log(`${await person.givenName} is interested in:`);
        for await (const name of person.interest.label)
            console.log(`- ${name}`);

        console.log(`${await person.givenName} is friends with:`);
        for await (const name of person.friends.givenName)
            console.log(`- ${name}`);
    }

}

