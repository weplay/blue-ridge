var Screw = (function($) {
  var screw = {
    Unit: function(fn) {
      var contents = fn.toString().match(/^[^\{]*{((.*\n*)*)}/m)[1];
      var fn = new Function("matchers", "specifications",
        "with (specifications) { with (matchers) { " + contents + " } }"
      );

      $(Screw).queue(function() {
        Screw.Specifications.context.push($('body > .describe'));
        fn.call(this, Screw.Matchers, Screw.Specifications);
        Screw.Specifications.context.pop();
        $(this).dequeue();
      });
    },

    Specifications: {
      context: [],

      describe: function(name, fn) {
        var describe = $('<li></li>').addClass("describe")
          .append($('<h1></h1>').text(name))
          .append($('<ol></ol>').addClass("befores"))
          .append($('<ul></ul>').addClass("its"))
          .append($('<ul></ul>').addClass("describes"))
          .append($('<ol></ol>').addClass("afters"));

        this.context.push(describe);
        fn.call();
        this.context.pop();

        this.context[this.context.length-1]
          .children('.describes')
            .append(describe);
      },

      it: function(name, fn) {
        var it = $('<li></li>').addClass("it")
          .append($('<h2></h2>').text(name))
          .data('screwunit.run', fn);

        this.context[this.context.length-1]
          .children('.its')
            .append(it);
      },

      before: function(fn) {
        var before = $('<li></li>').addClass("before")
          .data('screwunit.run', fn);

        this.context[this.context.length-1]
          .children('.befores')
            .append(before);
      },

      after: function(fn) {
        var after = $('<li></li>').addClass("after")
          .data('screwunit.run', fn);

        this.context[this.context.length-1]
          .children('.afters')
            .append(after);
      }
    }
  };

  $(screw).queue(function() { $(screw).trigger('loading') });
  
  $(window).load(function(){
    $('<div></div>').addClass('describe')
      .append($('<h3></h3>').addClass("status"))
      .append($('<ol></ol>').addClass("befores"))
      .append($('<ul></ul>').addClass("describes"))
      .append($('<ol></ol>').addClass("afters"))
      .appendTo('body');
  
    $(screw).dequeue();
    $(screw).trigger('loaded');
  });
  
  return screw;
})(jQuery);