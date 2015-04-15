jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());


String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


/** FOR GRID VIEW */
var createGrid = null;
jQuery(function() {
  if($('.gridview').length > 0) {
    createGrid = function(gridid) {
      $('#'+gridid+'-list').click(function(event){
        event.preventDefault();
        $('#'+gridid+'-container .item').addClass('list-group-item');
      });
      $('#'+gridid+'-grid').click(function(event){
        event.preventDefault();
        $('#'+gridid+'-container .item').removeClass('list-group-item');
        $('#'+gridid+'-container .item').addClass('grid-group-item');
      });
      
      var ft = $.filtrify(gridid+"-container", gridid+"-placeholder", {
        close: true,
        callback : function( query, match, mismatch ) {
          if ( !mismatch.length ) {
            $('#'+gridid+'-legend').html("<i>Alle werden angezeigt.</i>");
            $('#'+gridid+'-reset').addClass('disabled');
          } else {
            var category, tags, i, tag, legend = "<h4>Angezeigt:</h4>";
            for ( category in query ) {
              tags = query[category];
              if ( tags.length ) {
                legend += "<p><span>" + category.capitalizeFirstLetter() + ":</span>";
                for ( i = 0; i < tags.length; i++ ) {
                  tag = tags[i];
                  legend += "<em>" + tag + (i+1 != tags.length?', ':'') + "</em>";
                };
                legend += "</p>";
              };
            };
            legend += "<p><i>" + match.length + " Referenz" + (match.length !== 1 ? "en" : "") + " gefunden.</i></p>";
            $('#'+gridid+'-legend').html( legend );
            $('#'+gridid+'-reset').removeClass('disabled');
          };
        }
      });
      
      $('#'+gridid+'-reset').click(function() {
          ft.reset();
      });
      
      return ft;
    };
    
    var thumbnailHeight = 0;
    var headingHeight = 0;
    var textHeight = 0;
    var leadHeight = 0;
    
    $.each($('.gridview .item'), function(index, element) {
      //var thumbnailElement = $(element).find('.thumbnail');
      var headingElement = $(element).find('.list-group-item-heading');
      var textElement = $(element).find('.list-group-item-text');
      var leadElement = $(element).find('.lead');
      
      //thumbnailHeight = thumbnailElement.height() > thumbnailHeight ? thumbnailElement.height() : thumbnailHeight;
      headingHeight = headingElement.height() > headingHeight ? headingElement.height() : headingHeight;
      textHeight = textElement.height() > textHeight ? textElement.height() : textHeight;
      leadHeight = leadElement.height() > leadHeight ? leadElement.height() : leadHeight;
    });
    
    setTimeout(function() {
      //console.log(thumbnailHeight);
      console.log(headingHeight);
      console.log(textHeight);
      console.log(leadHeight);
      
      //$('.gridview .item .thumbnail').height(thumbnailHeight);
      $('.gridview .item .list-group-item-heading').height(headingHeight);
      $('.gridview .item .list-group-item-text').height(textHeight);
      $('.gridview .item .lead').height(leadHeight);
    }, 10);
  }
});

/** FOR PROFILE VIEW */
jQuery(function() {
  if($('#profile').length > 0) {
    $('#profileFilter').keyup(function(event) {
      event.preventDefault();
      var element = event.currentTarget;
      var value = $(element).val().toLowerCase();
      $('#profile .knowledge').each(function(index, element) {
        var name = $(element).find('.name').text().toLowerCase();
        if(value.length > 0) {
          if((name.indexOf(value) !== -1)) {
            $(element).show();
          } else {
            $(element).hide();
          }
        } else {
          $(element).show();
        }
      });
    });
  }
});