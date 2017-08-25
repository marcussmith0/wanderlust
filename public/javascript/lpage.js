$(function () {
    var string = " You make the memories...";
    var q = jQuery.map(string.split(''), function (letter) {
        return $('<span>' + letter + '</span>');
    });

    var dest = $('#app1');

    var c = 0;
    var i = setInterval(function () {
        q[c].appendTo(dest).hide().fadeIn(500);
        c += 1;
        if (c >= q.length) clearInterval(i);
    }, 80);
});

$(function () {
    var string = " and we'll help share them.";
    var q = jQuery.map(string.split(''), function (letter) {
        return $('<span>' + letter + '</span>');
    });

    var dest = $('#app2');

    var c = 0;
    var i = setInterval(function () {
        q[c].appendTo(dest).hide().delay(3000).fadeIn(500);
        c += 1;
        if (c >= q.length) clearInterval(i);
    }, 80);
});

$(function () {
    var string = "WanderLust";
    var q = jQuery.map(string.split(''), function (letter) {
        return $('<span>' + letter + '</span>');
    });

    var dest = $('#logo');

    var c = 0;
    var i = setInterval(function () {
        q[c].appendTo(dest).hide().delay(6000).fadeIn(100);
        c += 1;
        if (c >= q.length) clearInterval(i);
    }, 80);
});

$('#foo').hide().delay(6500).fadeIn(100);