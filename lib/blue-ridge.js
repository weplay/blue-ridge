var BlueRidge = BlueRidge || {};

BlueRidge.Browser = {
  require: function(url, options){
    options = options || {};
    var system   = options["system"] || false;
    var callback = options["onload"] || null;

    //TODO: wow, this really feels bad, but it's working;
    // write some tests and refactor this; it embarasses me
    var depth = this.calculateDepth();
    if(!system && depth > 1) {
      var unravelDepth = depth-1;
      var prefix = "^";
      for(var i=0; i < unravelDepth; i++) { prefix += "\.\.\/" }
      url = url.replace(new RegExp(prefix), ""); 
    }
    url = this.urlCorrection(depth) + url;

    this.createScriptTag(url, callback);
  },
  
  createScriptTag: function(url, onload){
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");

    script.src = url;
    if(onload) { script.onload = script.onreadystatechange = onload; }

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
    return this.currentFile().match(/^.*fixtures\/(.*?)\.html/)[1] + "_spec.js";
  },
  
  calculateDepth: function(){
    var subDirs = this.currentFile().match(/^.*fixtures\/((.*?\/)*)(.*?)\.html/)[1];
    return subDirs.split("/").length;
  }
};

if(BlueRidge.loaded != true) {
  var require = function(url, options){ return BlueRidge.Browser.require(url, options) };
  var debug   = function(message)     { return BlueRidge.Browser.debug(message) };

  var BLUE_RIDGE_LIB_PREFIX = BLUE_RIDGE_LIB_PREFIX || "../../vendor/plugins/blue-ridge/lib/";

  require(BLUE_RIDGE_LIB_PREFIX + "jquery-1.3.2.js",    {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "jquery.fn.js",       {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "jquery.print.js",    {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "screw.builder.js",   {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "screw.matchers.js",  {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "screw.events.js",    {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "screw.behaviors.js", {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.core.js",      {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.mock.js",      {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "smoke.stub.js",      {system: true});
  require(BLUE_RIDGE_LIB_PREFIX + "screw.mocking.js",   {system: true});

  BlueRidge.loaded = true;
  require(BlueRidge.Browser.deriveSpecNameFromCurrentFile());
}
