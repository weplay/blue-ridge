(function($, window) {
  $(Screw).bind("before", function(){
    $('.it')
      .bind('passed', function(){
      })
      .bind('failed', function(e, reason){
      });
  });

  $(Screw).bind("after", function(){
    window.failures = $(".failed").map(function() {
      return $(this).find("h2").text() + ": " + $(this).find(".error").text(); 
    });
  });
})(jQuery, window);