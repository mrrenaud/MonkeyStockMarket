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

        __this.askConfirmation = function (clickedItem) {
            $('#confirm-dialog').attr('class', 'fade-in');
        };

        __this.showUser = function (user) {
            $('#miam-selection').attr('class', 'current');
            $('[data-position="current"]').attr('class', 'left');
            MonkeyStockMarket.viewModel.username(user.name);
            MonkeyStockMarket.viewModel.user(user);

        }

        __this.commandItem = function (item) {
            
        };

        __this.user = ko.observable(null);
        __this.username = ko.observable('');

        __this.users = ko.observableArray([]);

        $.ajax('http://monkeystockmarket.azurewebsites.net/api/user')
         .then(function (json) {
             var result = JSON.parse(json);
             result.forEach(function (item) {
                 __this.users.push(item);
             });
         }, function (error) {
             alert("error");
         });

        __this.categories = [
            {
                title: "Boisson",
                items: [
                  { label: "Coca", price: 0.52 },
                  { label: "Fanta", price: 0.52 }]
            },
            {
                title: "Bouffe",
                items: [
                  { label: "Kinder", price: 0.52 },
                  { label: "Mousse au chocolat", price: 0.52 },
                  { label: "Magnum", price: 0.52 }]
            }];
    },

    initializeViewModel: function () {
        MonkeyStockMarket.viewModel = new MonkeyStockMarket.monkeyViewModel();
    },

    initializeNavigation: function () {

        $(".btn-back").on('click', function () {
            $('section.current').attr('class', 'right');
            $('[data-position="current"]').attr('class', 'current');
        });

        $("button.confirm-confirmation").on('click', function () {
            console.log("T'es gros");
            $('#confirm-dialog').attr('class', 'fade-out');
        });

        $("button.cancel-confirmation").on('click', function () {
            $('#confirm-dialog').attr('class', 'fade-out');
        });
    }
};

MonkeyStockMarket.initializeNavigation();
MonkeyStockMarket.initializeViewModel();
ko.applyBindings(MonkeyStockMarket.viewModel);
