var vel1 = 30000;
var vel2 = 85000;
var vel3 = 60 * 60 * 1000;

var modifyTime = 0;

// Pruebas
 //vel1 = 3000;
 //vel2 = 10000;
 //vel3 = 60000;

$( document ).ready(function() {
    $("html").click(function(event) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var wUnit = w / 4;
        var hUnit = h / 4;

        if (event.originalEvent.clientY < hUnit) {
            if (event.originalEvent.clientX < wUnit) {
                location.reload();
            } else if (event.originalEvent.clientX > wUnit && event.originalEvent.clientX < (wUnit * 2)) {
                parte0();
            } else if (event.originalEvent.clientX > (wUnit * 2) && event.originalEvent.clientX < (wUnit * 3)) {
                parte1();
            } else if (event.originalEvent.clientX > (wUnit * 3)) {
                parte2();
            }
        } else if (event.originalEvent.clientY > hUnit && event.originalEvent.clientY < (hUnit * 3)) {
            if (event.originalEvent.clientX < wUnit) {
                $("#sound2")[0].play();
            } else if (event.originalEvent.clientX > wUnit && event.originalEvent.clientX < (wUnit * 2)) {
                $("#sound3")[0].play();
            } else if (event.originalEvent.clientX > (wUnit * 2) && event.originalEvent.clientX < (wUnit * 3)) {
                $("#sound4")[0].play();
            } else if (event.originalEvent.clientX > (wUnit * 3)) {

                // Not use, it is for Field input

            }
        } else if (event.originalEvent.clientY < (hUnit * 4)) {
            if (event.originalEvent.clientX < wUnit) {
                modifyTime = modifyTime - 60000;
            } else if (event.originalEvent.clientX > wUnit && event.originalEvent.clientX < (wUnit * 2)) {
                modifyTime = modifyTime - (60000 * 5);
            } else if (event.originalEvent.clientX > (wUnit * 2) && event.originalEvent.clientX < (wUnit * 3)) {
                modifyTime = modifyTime + 60000;
            } else if (event.originalEvent.clientX > (wUnit * 3)) {
                modifyTime = modifyTime + (60000 * 5);
            }
        }
    });

    $("#musicBack")[0].volume = 0.3;
});

function parte0() {
    $.ajax({
        url: 'php/api.php?option=off'
    });
    $("#parte0").fadeIn();
    $("#title1").css("font-size", "90px");
    $("#title1").css("width", "900px");
    $("#title1").css("margin-left", "-450px");
    $("#title1").css("height", "200px");
    $("#title1").css("margin-top", "-100px");
    $("#title1").css("top", "25%");

    setTimeout(function() {
        $("#sound1")[0].play();
    }, 10000);

    setTimeout(function() {
        $("#sound2")[0].play();
    }, 29000);

    setTimeout(parte1, vel1);
}

function parte1() {
    $.ajax({
        url: 'php/api.php?option=pulseError'
    });
    $("#parte0").fadeOut();
    $("#intro")[0].play();
    $('html').css({'background-image': 'url(img/back2.jpg)'});
    $("#parte1").show();

    setTimeout(parte2, vel2);
}

function parte2() {
    $("#intro")[0].pause();
    $("#intro").hide();
    $("#parte1").hide();
    $('html').css({'background-image': 'url(img/back3.jpg)'});
    var time = vel3;
    var deadline = new Date(Date.parse(new Date()) + time);
    initializeClock('clockdiv', deadline);
    $("#parte2").fadeIn();
    parte21();
}

function parte21() {
    $("#error").fadeOut();
    $("#parte21").fadeIn();
    $("#clave1").focus();
    $("#clave1").val("");
    $("#clave1").keypress(function( event ) {
        if (($("#clave1").val().toUpperCase() === "HOLI") && (event.charCode === 85 || event.charCode === 117)) {
            parte22Correcto();
        } else if ($("#clave1").val().length === 4) {
            parte22Error($("#clave1").val().toUpperCase() + String.fromCharCode(event.charCode));
        }
    });
}

function parte22Error(palabra) {
    $("#sound2")[0].play();
    $.ajax({
        url: 'php/api.php?option=pulseError'
    });
    $("#parte21").fadeOut();
    $("#palabraIncorrecta").html(palabra);
    $("#error").fadeIn();
    setTimeout(parte21, 10000);
}

function parte22Correcto() {
    $("#parte21").fadeOut();
    $.ajax({
        url: 'php/api.php?option=on'
    });
    $("#parte22Correcto").fadeIn();
    setTimeout(parte23, 3000);
}

function parte23() {
    $("#error").fadeOut();
    $("#parte22Correcto").fadeOut();
    $('html').css({'background-image': 'url(img/back1.jpg)'});
    $("#parte23").fadeIn();
    $("#clave2").focus();
    $("#clave2").val("");
    $("#clave2").keypress(function( event ) {
        if (($("#clave2").val().toUpperCase() === "AMO") && (event.charCode === 82 || event.charCode === 114)) {
            parte3Gana();
        } else if ($("#clave2").val().length === 3) {
            parte24Error($("#clave2").val().toUpperCase() + String.fromCharCode(event.charCode));
        }
    });
}

function parte24Error(palabra) {
    $("#sound3")[0].play();
    $.ajax({
        url: 'php/api.php?option=pulseError'
    });
    $("#parte23").fadeOut();
    $("#palabraIncorrecta").html(palabra);
    $("#error").fadeIn();
    setTimeout(parte23, 10000);
}

function parte3Gana() {
    $.ajax({
        url: 'php/api.php?option=win'
    });
    $("#parte2").fadeOut();
    $('html').css({'background-image': 'url(img/finGana.jpg)'});
    $("#musicBack")[0].pause();
    $("#finGana")[0].play();
    $("#parte3Gana").fadeIn();
}

function parte3Pierde() {
    $.ajax({
        url: 'php/api.php?option=lost'
    });
    $("#parte2").fadeOut();
    $('html').css({'background-image': 'url(img/finPierde.jpg)'});
    $("#sound1")[0].play();
    $("#musicBack")[0].volume = 0.9;
    $("#parte3Pierde").fadeIn();
}

/** FUNCIONES **/
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());

    t = t + modifyTime;

    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);

    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            parte3Pierde();
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}