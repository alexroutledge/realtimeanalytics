$(function(){

   Basket = {};
   Basket.UserCount = {};
   Basket.Current = {};
   Basket.DisplayItem = {};
   Basket.Activity = {};
   Basket.View = Default.View;
   Basket.Model = Default.Model;
   Basket.Collection = Backbone.Firebase.Collection.extend({
    model: Basket.Model,
    firebase: new Firebase("https://alexroutledge.firebaseio.com/basket")
   });
   Basket.Activity.View = Default.View.extend({
     template: templates.basket.activity
   });
   Basket.DisplayItem.View = Default.View.extend({
     template: templates.basket.DisplayItem
   });
   Basket.Current.View = Default.View.extend({
     template: templates.basket.current
   });
   Basket.UserCount.View = Default.View.extend({
     template: templates.basket.userCount
   });

   var AppView = Backbone.View.extend({

    el: $("#pane2"),

    events: {
      "update [data-trigger]":  "update",
      "click [data-basket-item-remove]" : "clear",
      "showmap [data-trigger]" : "showMap",
    },

    initialize: function() {
      this.listenTo(new Basket.Collection, 'add', this.addOne);
      this.listenTo(new Basket.Collection, 'reset', this.addAll)
      this.listenTo(new Basket.Collection, 'all', this.render);
    },

    showMap: function(a) {
      var a = 'Basket';
      if (!$('[data-basket-navigation]').is('.active')) {
        return;
      }
      var temp =[];
      for (i in (new window[a].Collection).models) {
        temp.push((new window[a].Collection).models[i].attributes.location);
      }
      var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var geocoder = new google.maps.Geocoder();
      function createMarkers() {
        for (var i = 0; i < temp.length; ++i) {
          (function(address) {
            geocoder.geocode({
                'address': address
            }, function(results) {
                if (!results) {
                  return;
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: address
                });
                map.setCenter(marker.getPosition());
                map.panTo(marker.getPosition());

            });
          })(temp[i]);
        }
      };
      createMarkers();
    },
    renderGraph: function (type) {
    var count = {
        visits: parseFloat(localStorage.getItem('visits') || 0),
        basket: parseFloat(localStorage.getItem('basket') || 0),
        wishlist: parseFloat(localStorage.getItem('wishlist') || 0),
        reviews: parseFloat(localStorage.getItem('reviews') || 0)
    };
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Website activity'
        },
        xAxis: {
            categories: ['Number of active visitors']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Visits',
            data: [count.visits]
        }, {
            name: 'Basket adds',
            data: [count.basket]
        }, {
            name: 'Wishlist adds',
            data: [count.wishlist]
        }, {
            name: 'Reviews posted',
            data: [count.reviews]
        }]
    });
    },
    render: function(type) {
      var view = new Basket.UserCount.View({
        el: $('[data-basket-count]')[0],
        model: {count: (new Basket.Collection).length}
      });
      view.render();

      var view = new Basket.Current.View({
        el: $('[data-basket-current]')[0],
        model: {count: (new Basket.Collection).length}
      });
      view.render();

      var view = new Basket.DisplayItem.View({
        el: $('[data-basket-list]')[0],
        model: (new Basket.Collection)
      });
      view.render();
      localStorage.setItem('basket', (new Basket.Collection).length);
      this.showMap('Basket');
      this.renderGraph();

    },

    addOne: function(todo) {
      var view = new Basket.Activity.View({
        el: $('[data-basket-activity]')[0],
        model: (new Basket.Collection).last()
      });
      view.render();
    },

    addAll: function() {
      (new Basket.Collection).each(this.addOne, this);
    },
   
    clear: function(e) {
      var id = $(e.currentTarget).data('id');
      (new Basket.Collection).remove((new Basket.Collection).get(id));
    },

    update: function(e) {
      (new Basket.Collection).add({location: window.pcaLocation});
    }

  });

  var App = new AppView;

});
