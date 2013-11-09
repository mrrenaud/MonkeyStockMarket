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
            $.ajax('http://monkeystockmarket.azurewebsites.net/api/log', {
                type: "POST",
                data: JSON.stringify({
                    userid: MonkeyStockMarket.viewModel.user.userid,
                    itemid: item.itemid
                })
            }).then(function (result) {


            }, function (error) {
                alert(error);
            });
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

        __this.categories = ko.observableArray([]);
        __this.items = ko.observableArray([]);

        $.ajax('http://monkeystockmarket.azurewebsites.net/api/item')
             .then(function (json) {
                 var result = JSON.parse(json);
                 result.forEach(function (item) {
                     __this.items.push(item);
                     for (var i = 0 ; i < __this.categories().length; i++) {
                         if (__this.categories()[i].title == item.category) {
                             var category = __this.categories()[i];
                             category.items.push(item);
                             return false;
                         }
                     }
                     __this.categories.push({ title: item.category, items: [item] });
                 });
             }, function (error) {
                 alert("error");
             });
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
