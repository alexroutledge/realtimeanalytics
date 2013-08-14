$(function(){
  
   Default = {};
   Default.View = Backbone.View.extend({
     render: function() {
       this.$el.html(Mustache.to_html(this.template, this.model));
     }
   });
   Default.Model = Backbone.Model.extend({});
   Visits = Default;
   Visits.UserCount = {};
   Visits.Current = {};
   Visits.DisplayItem = {};
   Visits.Activity = {};
   Visits.View = Default.View;
   Visits.Model = Default.Model;
   Visits.Collection = Backbone.Firebase.Collection.extend({
    model: Visits.Model,
    firebase: new Firebase("https://alexroutledge.firebaseio.com/visits")
   });
   Visits.Activity.View = Default.View.extend({
     template: templates.visits.activity
   });
   Visits.DisplayItem.View = Default.View.extend({
     template: templates.visits.DisplayItem
   });
   Visits.Current.View = Default.View.extend({
     template: templates.visits.current
   });
   Visits.UserCount.View = Default.View.extend({
     template: templates.visits.userCount
   });

   var AppView = Backbone.View.extend({

    el: $("#pane1"),

    events: {
      "update [data-trigger]":  "update",
      "click [data-visits-item-remove]" : "clear",
      "showmap [data-trigger]" : "showMap",
    },

    initialize: function() {
      this.listenTo(new Visits.Collection, 'add', this.addOne);
      this.listenTo(new Visits.Collection, 'reset', this.addAll)
      this.listenTo(new Visits.Collection, 'all', this.render);
    },

    testFunction: function(e) {
      alert('test');
      return false;
    },
   
    showMap: function(a) {
      var a = 'Visits';
      if (!$('[data-visits-navigation]').is('.active')) {
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

    render: function(type) {
      var view = new Visits.UserCount.View({
        el: $('[data-visits-count]')[0],
        model: {count: (new Visits.Collection).length}
      });
      view.render();

      var view = new Visits.Current.View({
        el: $('[data-visits-current]')[0],
        model: {count: (new Visits.Collection).length}
      });
      view.render();

      var view = new Visits.DisplayItem.View({
        el: $('[data-visits-list]')[0],
        model: (new Visits.Collection)
      });
      view.render();
      this.showMap('Visits');

    },

    addOne: function(model) {
      var view = new Visits.Activity.View({
        el: $('[data-visits-activity]')[0],
        model: model
      });
      view.render();
	
    },

    addAll: function() {
      (new Visits.Collection).each(this.addOne, this);
    },
   
    clear: function(e) {
      var id = $(e.currentTarget).data('id');
      (new Visits.Collection).remove((new Visits.Collection).get(id));
    },

    update: function(e) {
      (new Visits.Collection).add({location: window.pcaLocation});
    }

  });

  var App = new AppView;

});
