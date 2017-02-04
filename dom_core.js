// Sandbox - http://localhost/collaboard//board.html?key=-KbwEtKQ7mVei0LdWRi3#
const BASE_URL = window.location.origin + window.location.pathname;
const GET_KEY = "key";

function handlePhotos() {
    hasFirebaseItem(KEY_GOOGLE_PHOTOS, function(bool, value) {
        if (bool) {
            window.open(value, '_blank');
        } else {
            var url = prompt("Enter a Shared Google Photos Album");   
            setFirebaseItem(KEY_GOOGLE_PHOTOS, url);
        }
    });
}

function handleGit() {
    hasFirebaseItem(KEY_GIT_REPO, function(bool, value) {
        if (bool) {
            window.open(value, '_blank');
        } else {
            var url = prompt("Enter a project git repository");   
            setFirebaseItem(KEY_GIT_REPO, url);
        }
    });
}

function handleShareLink() {
    if (issetGet(GET_KEY)) {
        alert("Share link copied");
    } else {
        alert("No key");
    }
}

function readGetParameters() {
    window.getparams = {};
    var queries = window.location.search.substring(1);
    var eachquery = queries.split('&');
    for (var i = 0; i < eachquery.length; i++) {
        var parts = eachquery[i].split('=');
        window.getparams[parts[0]] = parts[1];
    }
}

function issetGet(key) {
    return window.getparams[key] !== undefined;   
}

function retrieveGet(key) {
    return window.getparams[key];   
}

function domStart() {
    readGetParameters();
    new Clipboard('#action_share_link', {
        text: function(trigger) {
            return BASE_URL + "?" + GET_KEY + "=" + retrieveGet(GET_KEY);
        }
    });
}