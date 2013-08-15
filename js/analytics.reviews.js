$(function(){

   Reviews = {};
   Reviews.Current = {};
   Reviews.UserCount = {};
   Reviews.DisplayItem = {};
   Reviews.Activity = {};
   Reviews.View = Default.View;
   Reviews.Model = Default.Model;
   Reviews.Collection = Backbone.Firebase.Collection.extend({
    model: Default.Model,
    firebase: new Firebase("https://alexroutledge.firebaseio.com/reviews")
   });
   Reviews.Activity.View = Default.View.extend({
     template: templates.reviews.activity
   });
   Reviews.DisplayItem.View = Default.View.extend({
     template: templates.reviews.DisplayItem
   });
   Reviews.Current.View = Default.View.extend({
     template: templates.reviews.current
   });
   Reviews.UserCount.View = Default.View.extend({
     template: templates.reviews.userCount
   });

   var AppView = Backbone.View.extend({

    el: $("#pane4"),

    events: {
      "update [data-trigger]":  "update",
      "click [data-reviews-item-remove]" : "clear",
      "showmap [data-trigger]" : "showMap",
    },

    initialize: function() {
      this.listenTo(new Reviews.Collection, 'add', this.addOne);
      this.listenTo(new Reviews.Collection, 'reset', this.addAll)
      this.listenTo(new Reviews.Collection, 'all', this.render);
    },

    showMap: function(a) {
      var a = 'Reviews';
      if (!$('[data-reviews-navigation]').is('.active')) {
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
          var view = new Reviews.UserCount.View({
            el: $('[data-reviews-count]')[0],
            model: {count: (new Reviews.Collection).length}
          });
          view.render();
        }(),
        function() {
          var view = new Reviews.Current.View({
            el: $('[data-reviews-current]')[0],
            model: {count: (new Reviews.Collection).length}
          });
          view.render();
        }(),
        function() {
          var view = new Reviews.DisplayItem.View({
            el: $('[data-reviews-list]')[0],
            model: (new Reviews.Collection)
          });
          view.render();
        }(),
      ];
      $.when.apply($, $deferredCollection).done(function() {
        localStorage.setItem('reviews', (new Reviews.Collection).length);
        _this.showMap('Reviews');
        _this.renderGraph();
      });

    },

    addOne: function(todo) {
      var view = new Reviews.Activity.View({
        el: $('[data-reviews-activity]')[0],
        model: (new Reviews.Collection).last()
      });
      view.render();
    },

    addAll: function() {
      (new Reviews.Collection).each(this.addOne, this);
    },
   
    clear: function(e) {
      var id = $(e.currentTarget).data('id');
      (new Reviews.Collection).remove((new Reviews.Collection).get(id));
    },

    update: function(e) {
      (new Reviews.Collection).add({location: window.pcaLocation});
    }

  });

  var App = new AppView;

});
