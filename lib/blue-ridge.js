var BlueRidge = BlueRidge || {};

BlueRidge.Browser = {
  require: function(url, options){
    url = this.urlCorrection(BlueRidge.depth) + url;
  
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
    return this.currentFile().match(/.*fixtures\/(.*?)\.html/)[1] + "_spec.js";
  }
};

if(BlueRidge.loaded != true) {
  // Set this in your html fixture file to a lower depth (higher number) 
  // if using nested test directories.
  BlueRidge.depth = BlueRidge.depth || 1; 
  
  var require = function(url, options){ return BlueRidge.Browser.require(url, options) };
  var debug   = function(message)     { return BlueRidge.Browser.debug(message) };

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

