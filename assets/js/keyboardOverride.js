window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32) {
        // user has pressed space
        $("#rest").trigger("click");

        e.preventDefault();
    }
});