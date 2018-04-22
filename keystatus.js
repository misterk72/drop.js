(function() {
    var keydown = {};
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    function handleKeyDown(e) {
        var code;
        if (!e) e = window.event;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        //console.log('handleKeyDown ' + code + keydown);
        keydown[code] = true;
    }

    function handleKeyUp(e) {
        var code;
        if (!e) e = window.event;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        //console.log('handleKeyUp ' + code + keydown);
        keydown[code] = false;
    }
    
    window.keydown = keydown;

})();
