var BlueRidge = BlueRidge || {};

BlueRidge.Browser = {
  require: function(url, options){
    options = options || {};

    var callback = options["onload"] || null;

    url = this.treatUrlAsRelativeToCurrentFile(url)
    this.createScriptTag(url, callback);
  },
  
  loadFile: function(file) {
    try { 
      var request = new XMLHttpRequest();
      request.open('GET', file, false);
      request.send(null);
      
      if (request.readyState == 4) return request.responseText;
      else return request.statusText;
    } catch (e) {
      debug("File " + file + " not found");
    };
  },
  
  treatUrlAsRelativeToCurrentFile: function(url){
    return this.urlCorrection(this.calculateDepth()) + url;
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
    for(var i=0; i < depth; i++) { correction += "../"; }
    return correction;
  },
  
  debug: function(message){
    document.writeln(message + " <br/>");
  },

  currentLocation: function(){
    return window.location.toString();
  },

  currentFile: function(){
    return this.currentLocation().replace(/\?[^?]*$/, "");
  },

  currentParameter: function(){
    var l = this.currentLocation();
    if (l.indexOf("?") == -1)
      return "";
    return this.currentLocation().replace(/^[^?]*\?/, "");
  },
  
  deriveSpecNameFromCurrentFile: function(){
    var spec = this.currentParameter();
    if (spec == "")
      return this.currentFile().match(/^.*fixtures\/(.*?)\.html/)[1] +
               "_spec.js";

    var workingPath = this.currentFile();
    workingPath = workingPath.replace(/[^/]+$/, "");
    workingPath = workingPath.replace(/fixtures\//, "");
    return workingPath + spec + "_spec.js";
  },
  
  calculateDepth: function(){
    var subDirs = this.currentFile().match(/^.*fixtures\/((.*?\/)*)(.*?)\.html/)[1];
    return subDirs.split("/").length;
  }
};

if(BlueRidge.loaded != true) {
  var require = function(url, options){ return BlueRidge.Browser.require(url, options); };
  var debug   = function(message)     { return BlueRidge.Browser.debug(message); };
  var loadFile= function(url)         { return BlueRidge.Browser.loadFile(url); };

  var BLUE_RIDGE_PREFIX = BLUE_RIDGE_PREFIX || "../../vendor/plugins/blue-ridge/",
      BLUE_RIDGE_VENDOR_PREFIX = BLUE_RIDGE_PREFIX + "/vendor/",
      BLUE_RIDGE_LIB_PREFIX =  BLUE_RIDGE_PREFIX + "/lib/";

  require(BLUE_RIDGE_VENDOR_PREFIX + "jquery-1.3.2.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "jquery.fn.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "jquery.print.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.builder.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.matchers.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.events.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.behaviors.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "smoke.core.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "smoke.mock.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "smoke.stub.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.mocking.js");
  require(BLUE_RIDGE_VENDOR_PREFIX + "screw.mocking.js");
  require(BLUE_RIDGE_LIB_PREFIX + "report.js");

  BlueRidge.loaded = true;
  require(BlueRidge.Browser.deriveSpecNameFromCurrentFile());
}
