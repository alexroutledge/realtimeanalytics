templates = {
  visits: {
    activity: '{{#attributes}}'
                +'<div class="alert alert-error">'
      	          +'A customer from {{location}} just joined the site.'
   	            +'</div>'
              +'{{/attributes}}',
    userCount: '<div class="well" style="text-align: center;">'
               +'<h3>Right Now</h3>'
               +'<p id="connections" style="font-size: 96px;line-height: 96px;">{{count}}</p>'
               +'<h5>active visitors</h5>'
             +'</div>',
    current: '<span class="badge">{{count}}</span> people currently viewing this product',
    DisplayItem:  '{{#models}}'
                  +'{{#attributes}}'
                    +'<li>'
                    +'<div class="btn-group">'
                      +'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">'
                        +'{{location}}<span class="caret"></span>'
                      +'</a>'
                      +'<ul class="dropdown-menu">'
                        +'<li><a data-visits-item-remove data-id="{{id}}" href="#">Delete</a></li>'
                      +'</ul>'
                   +'</div>'
                   +'</li>'
                 +'{{/attributes}}'
               +'{{/models}}'
               +'{{^models}}'
                 +'<li>There is no current activity on your site.</li>'
               +'{{/models}}'
   },
   basket: {
    activity: '{{#attributes}}'
             +'<div class="alert alert-error">'
      	      +'A customer from {{location}} just added this product to their basket. Hurry before it\'s too late!'
   	     +'</div>'
            +'{{/attributes}}',
    userCount: '<div class="well" style="text-align: center;">'
               +'<h3>Right Now</h3>'
               +'<p id="connections" style="font-size: 96px;line-height: 96px;">{{count}}</p>'
               +'<h5>user(s) have this product in their basket.</h5>'
             +'</div>',
    current: '<span class="badge">{{count}}</span> people currently have this product in their basket',
    DisplayItem:  '{{#models}}'
                  +'{{#attributes}}'
                    +'<li>'
                    +'<div class="btn-group">'
                      +'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">'
                        +'{{location}}<span class="caret"></span>'
                      +'</a>'
                      +'<ul class="dropdown-menu">'
                        +'<li><a data-basket-item-remove data-id="{{id}}" href="#">Delete</a></li>'
                      +'</ul>'
                   +'</div>'
                   +'</li>'
                 +'{{/attributes}}'
               +'{{/models}}'
               +'{{^models}}'
                 +'<li>No users currently have this item in their basket.</li>'
               +'{{/models}}'
   },
   wishlist: {
    activity: '{{#attributes}}'
             +'<div class="alert alert-error">'
      	      +'A customer from {{location}} just added this product to their wishlist. Hurry before it\'s too late!'
   	     +'</div>'
            +'{{/attributes}}',
    userCount: '<div class="well" style="text-align: center;">'
               +'<h3>Right Now</h3>'
               +'<p id="connections" style="font-size: 96px;line-height: 96px;">{{count}}</p>'
               +'<h5>user(s) have this product in their wishlist.</h5>'
             +'</div>',
    current: '<span class="badge">{{count}}</span> people currently have this product in their wishlist',
    DisplayItem:  '{{#models}}'
                  +'{{#attributes}}'
                    +'<li>'
                    +'<div class="btn-group">'
                      +'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">'
                        +'{{location}}<span class="caret"></span>'
                      +'</a>'
                      +'<ul class="dropdown-menu">'
                        +'<li><a data-wishlist-item-remove data-id="{{id}}" href="#">Delete</a></li>'
                      +'</ul>'
                   +'</div>'
                   +'</li>'
                 +'{{/attributes}}'
               +'{{/models}}'
               +'{{^models}}'
                 +'<li>No users currently have this item in their wishlist.</li>'
               +'{{/models}}'
   },
   reviews: {
    activity: '{{#attributes}}'
             +'<div class="alert alert-error">'
      	      +'A customer from {{location}} just added a review of this product. Click <a href="#">here</a> to read it.'
   	     +'</div>'
            +'{{/attributes}}',
    userCount: '<div class="well" style="text-align: center;">'
               +'<h3>Right Now</h3>'
               +'<p id="connections" style="font-size: 96px;line-height: 96px;">{{count}}</p>'
               +'<h5>user(s) have left reviews of this product.</h5>'
             +'</div>',
    current: '<span class="badge">{{count}}</span> people have reviewed this product',
    DisplayItem:  '{{#models}}'
                  +'{{#attributes}}'
                    +'<li>'
                    +'<div class="btn-group">'
                      +'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">'
                        +'{{location}}<span class="caret"></span>'
                      +'</a>'
                      +'<ul class="dropdown-menu">'
                        +'<li><a data-reviews-item-remove data-id="{{id}}" href="#">Delete</a></li>'
                      +'</ul>'
                   +'</div>'
                   +'</li>'
                 +'{{/attributes}}'
               +'{{/models}}'
               +'{{^models}}'
                 +'<li>Write a review.</li>'
               +'{{/models}}'
   }
}
