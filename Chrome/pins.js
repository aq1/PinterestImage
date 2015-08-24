var setStyle = function() {
    var css = 'button{border:0px solid black;background-color:rgba(83,83,83,0.6);color:white;height:25px!important;bottom:25px!important;position:relative!important;padding:5px;z-index:1000;font-weight:bolder;}';
    css += 'button:hover {background-color: rgba(83,83,83,1);}'

    style = document.createElement('style');

    if (style.styleSheet)
        style.styleSheet.cssText = css;
    else
        style.appendChild(document.createTextNode(css));

    document.getElementsByTagName('head')[0].appendChild(style);
};


var placeButtons = function() {
    var pinDivs = document.getElementsByClassName('pinImageActionButtonWrapper');
    for (window.pinIndex; window.pinIndex < pinDivs.length; window.pinIndex++) {

        var button = document.createElement('button');
        button.innerHTML = 'Get Image';

        if (pinDivs[window.pinIndex].appendChild) {
            pinDivs[window.pinIndex].appendChild(button);
            var div = button.previousElementSibling;

            for (var j = 0; j < div.childNodes.length; j++) {
                var pinUrl = div.childNodes[j].href;

                if (pinUrl) {
                    button.onclick = (function() {
                        var scopePinUrl = pinUrl;
                        return function() {
                            this.style.backgroundColor = "rgba(0, 164, 185, 0.8)";
                            downloadImage(this, scopePinUrl);
                        }
                    })();
                }
            }
        }
    }

};


window.pinIndex = 0;
setStyle();


var downloadImage = function(button, pinUrl) {
    // console.log('Getting ' + pinUrl);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", pinUrl, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            getPinImage(button, xhr.responseText);
        }
    }
};


setInterval(function() {
    placeButtons();
}, 500)


var getPinImage = function(button, data) {
    page = convertStringToDom(data);

    var imageSrc = page.getElementsByClassName('pinImage')[0].src;

    chrome.runtime.sendMessage({
        imageSrc: imageSrc
    }, function(response) {
        // console.log('response');
        if (response === true) {
            button.style.backgroundColor = "rgba(20, 150, 113, 0.8)";
        }
    });
};


var convertStringToDom = function(data) {
    var div = document.createElement('div');
    div.innerHTML = data;
    return div;
};
