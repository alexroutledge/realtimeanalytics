realtimeanalytics
=================

This is a demo of a real time analytics service built using Backbone and Firebase. This is intended to work in the following way:

-4 separate services are created to track user visits, basket activity, wishlist activity and reviews.

-Each service can be implemented as a standalone service or integrated with other services.

-All data changes are automatically re-rendered to all users

-The user initiates a call to the API by selecting a location from the postcode autosuggest.

-Every time the user initiates a call to the API, any JS templates are re-rendered and the user's location via Google Maps.

You can view a demo at http://dl.dropboxusercontent.com/u/8767938/fresca/html5/ga/demo/firebase-analytics-backbone.html
