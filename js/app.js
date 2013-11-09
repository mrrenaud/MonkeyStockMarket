/// <reference path="jquery-2.0.3.min.js" />
/// <reference path="knockout-3.0.0.js" />

//lists
//document.querySelector('#btn-lists').addEventListener('click', function () {
//    document.querySelector('#lists').className = 'current';
//    document.querySelector('[data-position="current"]').className = 'left';
//});
//document.querySelector('#btn-lists-back').addEventListener('click', function () {
//    document.querySelector('#lists').className = 'right';
//    document.querySelector('[data-position="current"]').className = 'current';
//});


(function () {
    "use strict";

    $(".btn-user").on('click', function () {
        //alert('test');
        $('#miam-selection').attr('class', 'current');
        $('[data-position="current"]').attr('class', 'left');
    });


    $(".btn-back").on('click', function () {
        //alert('test');
        $('section.current').attr('class', 'right');
        $('[data-position="current"]').attr('class', 'current');
    });




})();

