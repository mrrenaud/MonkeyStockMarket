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

        __this.askConfirmation = function(clickedItem) {
          $('#confirm-dialog').attr('class', 'fade-in');
        };

        __this.user = ko.observable('Anonymous');

        __this.users = [
          { id: "fbayart",
            name: "François",
            picture: "https://pbs.twimg.com/profile_images/3226517613/4d478b06421b8834b43469f53b4a4faf.jpeg" },
          { id: "rdumont",
            name: "Renaud",
            picture: "https://pbs.twimg.com/profile_images/378800000105546181/296cb3ed88f5c13d33ccbb9ffde1eb8c.png" },
          { id: "fbayart",
            name: "François[0]",
            picture: "https://pbs.twimg.com/profile_images/2394900041/srbm5g55iiiwhf9fuz1c.jpeg" },
          { id: "ksyska",
            name: "Kristopher",
            picture: "https://abs.twimg.com/sticky/default_profile_images/default_profile_6_bigger.png" },
        ];

        __this.categories = [
            { title: "Boisson",
              items: [
                {label: "Coca", price: 0.52},
                {label: "Fanta", price: 0.52}]},
            { title: "Bouffe",
              items: [
                {label: "Kinder", price: 0.52},
                {label: "Mousse au chocolat", price: 0.52},
                {label: "Magnum", price: 0.52}]}];
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

        $("button.confirm-confirmation").on('click', function() {
          console.log("T'es gros");
          $('#confirm-dialog').attr('class', 'fade-out');
        });

        $("button.cancel-confirmation").on('click', function() {
          $('#confirm-dialog').attr('class', 'fade-out');
        });
    }
};

MonkeyStockMarket.initializeNavigation();
MonkeyStockMarket.initializeViewModel();
ko.applyBindings(MonkeyStockMarket.viewModel);

var successCallback = function(data) {
  console.log(data);
}

$.getJSON("http://monkeystockmarket.azurewebsites.net/api/item", successCallback).fail(function(){ console.log("fail !")});
