const auth = require('solid-auth-client');

async function login(url = "https://inrupt.net") {

    var session = await auth.currentSession();

    if (!session)
        await auth.login(url);
    else
        alert(`Logged in as ${session.webId}`);

}

async function logout() {
    var session = await auth.currentSession();

    if (!session)
        alert('Anyone is logged');
    else
        await auth.logout();
}

exports.login = login;
exports.logout = logout;