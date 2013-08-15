$(function(){

   Wishlist = {};
   Wishlist.Current = {};
   Wishlist.UserCount = {};
   Wishlist.DisplayItem = {};
   Wishlist.Activity = {};
   Wishlist.View = Default.View;
   Wishlist.Model = Default.Model;
   Wishlist.Collection = Backbone.Firebase.Collection.extend({
    model: Default.Model,
    firebase: new Firebase("https://alexroutledge.firebaseio.com/wishlist")
   });
   Wishlist.Activity.View = Default.View.extend({
     template: templates.wishlist.activity
   });
   Wishlist.DisplayItem.View = Default.View.extend({
     template: templates.wishlist.DisplayItem
   });
   Wishlist.Current.View = Default.View.extend({
     template: templates.wishlist.current
   });
   Wishlist.UserCount.View = Default.View.extend({
     template: templates.wishlist.userCount
   });

   var AppView = Backbone.View.extend({

    el: $("#pane3"),

    events: {
      "update [data-trigger]":  "update",
      "click [data-wishlist-item-remove]" : "clear",
      "showmap [data-trigger]" : "showMap",
    },

    initialize: function() {
      this.listenTo(new Wishlist.Collection, 'add', this.addOne);
      this.listenTo(new Wishlist.Collection, 'reset', this.addAll)
      this.listenTo(new Wishlist.Collection, 'all', this.render);
    },
  
    showMap: function(a) {
      var a = 'Wishlist';
      if (!$('[data-wishlist-navigation]').is('.active')) {
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
      var _this = this;
      var $deferredCollection = [
        function() {
          var view = new Wishlist.UserCount.View({
            el: $('[data-wishlist-count]')[0],
            model: {count: (new Wishlist.Collection).length}
          });
          view.render();
        }(),
        function() {
          var view = new Wishlist.Current.View({
            el: $('[data-wishlist-current]')[0],
            model: {count: (new Wishlist.Collection).length}
          });
          view.render();
        }(),
        function() {
          var view = new Wishlist.DisplayItem.View({
            el: $('[data-wishlist-list]')[0],
            model: (new Wishlist.Collection)
          });
          view.render();
        }(),
      ];
      $.when.apply($, $deferredCollection).done(function() {
        localStorage.setItem('wishlist', (new Wishlist.Collection).length);
        _this.showMap('Wishlist');
        _this.renderGraph();
      });

    },


    addOne: function(todo) {
      var view = new Wishlist.Activity.View({
        el: $('[data-wishlist-activity]')[0],
        model: (new Wishlist.Collection).last()
      });
      view.render();
    },

    addAll: function() {
      (new Wishlist.Collection).each(this.addOne, this);
    },
   
    clear: function(e) {
      var id = $(e.currentTarget).data('id');
      (new Wishlist.Collection).remove((new Wishlist.Collection).get(id));
    },

    update: function(e) {
      (new Wishlist.Collection).add({location: window.pcaLocation});
    }

  });

  var App = new AppView;

});
