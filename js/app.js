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


var MonkeyStockMarket = {

    viewModel: null,

    monkeyViewModel: function () {

        var __this = this;

        __this.user = ko.observable('Anonymous');
    },

    initializeViewModel: function () {
        MonkeyStockMarket.viewModel = new MonkeyStockMarket.monkeyViewModel();
    },

    initializeNavigation: function () {
        $(".btn-user").on('click', function () {
            $('#miam-selection').attr('class', 'current');
            $('[data-position="current"]').attr('class', 'left');
            MonkeyStockMarket.viewModel.user($(this).attr('id'));

        });


        $(".btn-back").on('click', function () {
            $('section.current').attr('class', 'right');
            $('[data-position="current"]').attr('class', 'current');
        });
    }
};

MonkeyStockMarket.initializeNavigation();
MonkeyStockMarket.initializeViewModel();
ko.applyBindings(MonkeyStockMarket.viewModel);