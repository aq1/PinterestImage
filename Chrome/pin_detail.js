var setStyle = function() {
    var css = 'button{border:0px solid black;background-color:rgba(83,83,83,0.6);color:white;height:25px!important;position:relative!important;padding:5px;z-index:1000;font-weight:bolder;}';
    css += 'button:hover {background-color: rgba(83,83,83,1);}'

    style = document.createElement('style');

    if (style.styleSheet)
        style.styleSheet.cssText = css;
    else
        style.appendChild(document.createTextNode(css));

    document.getElementsByTagName('head')[0].appendChild(style);
};

setStyle();
var pinActionBar = document.getElementsByClassName('PinActionBar')[0];


var button = document.createElement('button');
button.innerHTML = 'Get Image';
pinActionBar.appendChild(button);

button.onclick = function() {
    button.style.backgroundColor = "rgba(0, 164, 185, 0.8)";

    var imageSrc = document.getElementsByClassName('pinImage')[0].src;
        chrome.runtime.sendMessage({
            imageSrc: imageSrc
        }, function(response) {
            // console.log('response');
            if (response === true) {
                button.style.backgroundColor = "rgba(20, 150, 113, 0.8)";
            }
        });
};
