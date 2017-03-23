(function(Life) {
    var gliderHrefs = [
        "gosperglidergun_106.lif",
        "rpentomino_106.lif",
        "trueperiod22gun_106.lif",
        "vacuumgun_106.lif",
    ];
    var xhr = new XMLHttpRequest();
    console.log(Math.floor(Math.random()*gliderHrefs.length))
    xhr.open('GET', window.location.href+gliderHrefs[Math.floor(Math.random()*gliderHrefs.length)]);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var life = new Life("life", xhr.responseText);
                life.start();
            } else {
                console.log('Error: ' + xhr.status); 
            }
        }
    };
}(Life))
