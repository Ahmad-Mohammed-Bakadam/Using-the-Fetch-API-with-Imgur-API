//const clientId = "ca6139e49c5bf36";
const clientId = "72df6ecf3b5561c";
var defaultAlbumId = 'Jfni3';

function requestAlbum() {
    let albumId = document.getElementById("albumIdField").innerText;
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processAlbumRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function processAlbumRequest(response_text) {
    var respObj = JSON.parse(response_text);
    for (item of respObj.data.slice(0, 10)){
        console.log(item)
        requestImage(item.id);
    }
}

function requestImage(imageHash) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processImageRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log("Error with the imgur API");
        }
    }
    req.open("GET", "https://api.imgur.com/3/image/" + imageHash, true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function processImageRequest(response_text) {
    var respObj = JSON.parse(response_text);
    let imgElem = document.createElement("img");
    imgElem.src = respObj.data.link;
    //imgElem.referrerpolicy="no-referrer";
    document.body.appendChild(imgElem);
}

function requestAlbumFetch() {
    let albumId = document.getElementById("albumIdField").value;
    if (!albumId) {
        albumId = defaultAlbumId;
    }

    fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
        headers: {
            'Authorization': 'Client-ID ' + clientId
        }
    })
    .then(response => response.json())
    .then(data => {
        data.data.slice(0, 10).forEach(item => {
            requestImage(item.id);
        });
    })
    .catch(error => {
        console.log("Error with the imgur API:", error);
    });
}

async function requestAlbumFetchAsyncAwait() {
    let albumId = document.getElementById("albumIdField").value;
    if (!albumId) {
        albumId = defaultAlbumId;
    }

    try {
        const response = await fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
            headers: {
                'Authorization': 'Client-ID ' + clientId
            }
        });
        const data = await response.json();
        data.data.slice(0, 10).forEach(item => {
            requestImage(item.id);
        });
    } catch (error) {
        console.log("Error with the imgur API:", error);
    }
}
