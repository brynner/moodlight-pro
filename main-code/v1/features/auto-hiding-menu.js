function enterFullscreenMode() {
    $(".left-menu").addClass('is-hidden'); 
    $('.main-visualisation').addClass('is-fullscreen');
}

function exitFullscreenMode() {
    $('.left-menu').removeClass('is-hidden'); 
    $('.main-visualisation').removeClass('is-fullscreen');
}

var mouseMovementHideTimer;

//should appear only if mouse movement was large enough, that's why we need counter
var mouseMovementCounter = 0;
var mouseMovementShowTimer = 0;

$('body').on('mousemove', '.body-wrapper', function(event) {

    clearTimeout(mouseMovementHideTimer);
    clearTimeout(mouseMovementShowTimer);

    mouseMovementCounter = mouseMovementCounter + 1;

    if (mouseMovementCounter > 10) {
        exitFullscreenMode();

        mouseMovementHideTimer = setTimeout(function(){ 
            enterFullscreenMode();
            mouseMovementCounter = 0;
        }, 9000);
    }

    mouseMovementShowTimer = setTimeout(function(){ 
        mouseMovementCounter = 0;
    }, 9000);

});

//also show bar on clicks
$(document).on('click touchstart', '.body-wrapper', function() {
    clearTimeout(mouseMovementHideTimer);
    clearTimeout(mouseMovementShowTimer);

    exitFullscreenMode();

    mouseMovementHideTimer = setTimeout(function(){ 
        enterFullscreenMode();
    }, 9000);
});