var pokemonCardsAPI = 'https://api.pokemontcg.io/v1/cards?setCode=det1';

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}



function getRequest(url, callback) {

    var Http = createCORSRequest('GET', url);  //create http with cors functionality
    if (!Http) {
        throw new Error('CORS not supported');
    }

    //receiver
    Http.onreadystatechange = function(){
        if(Http.readyState === 4){
            if(Http.status === 200){
                var response = this.responseText;
                var jsonResponse = JSON.parse(response);
                callback(jsonResponse);
            } else {
                console.log("Error: ", Http.response);
            }
        }
    }
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send();
}

function getCards(callback) {
    getRequest(pokemonCardsAPI, callback);
}
