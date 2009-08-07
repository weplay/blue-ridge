var BlueRidge = BlueRidge || {};

BlueRidge.Browser = {
  require: function(url, options){
    url = BlueRidge.Browser.urlCorrection(BlueRidge.depth) + url;
  
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
  
    options = options || {};
  
    if(options['onload']) {
      // Attach handlers for all browsers
      script.onload = script.onreadystatechange = options['onload'];
    }
  
    head.appendChild(script);
  },
  
  urlCorrection: function(depth){
    var correction = "";
    for(var i=0; i < depth; i++) { correction += "../" }
    return correction;
  },
  
  debug: function(message){
    document.writeln(message + " <br/>");
  },

  currentFile: function(){
    return window.location.toString();
  },
  
  deriveSpecNameFromCurrentFile: function(){
    return this.currentFile().match(/.*\/(.*?)\.html/)[1] + "_spec.js";
  }
};

if(BlueRidge.loaded != true) {
  //TODO: this is a work-in-progress and will be refactored away, hopefully  
  BlueRidge.depth = BlueRidge.depth || 1; 
  
  var require = require || BlueRidge.Browser.require;
  var debug   = debug   || BlueRidge.Browser.debug;

  var BLUE_RIDGE_LIB_PREFIX = BLUE_RIDGE_LIB_PREFIX || "../../vendor/plugins/blue-ridge/lib/";

  require(BLUE_RIDGE_LIB_PREFIX + "jquery-1.3.2.js");
  require(BLUE_RIDGE_LIB_PREFIX + "jquery.fn.js");
  require(BLUE_RIDGE_LIB_PREFIX + "jquery.print.js");
  require(BLUE_RIDGE_LIB_PREFIX + "screw.builder.js");
  require(BLUE_RIDGE_LIB_PREFIX + "screw.matchers.js");
  require(BLUE_RIDGE_LIB_PREFIX + "screw.events.js");
  require(BLUE_RIDGE_LIB_PREFIX + "screw.behaviors.js");
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.core.js");
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.mock.js");
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.stub.js");
  require(BLUE_RIDGE_LIB_PREFIX + "screw.mocking.js");

  BlueRidge.loaded = true;
  require(BlueRidge.Browser.deriveSpecNameFromCurrentFile());
}

