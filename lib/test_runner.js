var BlueRidge = BlueRidge || {};

BlueRidge.CommandLine = {
  require: function(file, options){ 
    //TODO: use currying to make the following line use a "this" pointer
    load(BlueRidge.CommandLine.prepareFilenameForRequireBasedOnSpecDirectory(file));
  
    options = options || {};
    if(options['onload']) {
      options['onload'].call();
    }
  },

  debug: function(message){
    print(message);
  },
  
  prepareFilenameForRequireBasedOnSpecDirectory: function(filename){
    if(filename == null || filename[0] == "/") { return filename; }
    
    if(this.specDirname != null) {
      filename = this.specDirname + "/" + filename;
    }
    
    return filename;
  },
  
  get fixtureFile(){
    var filename = this.specBasename.replace(/^(.*?)_spec\.js$/, "$1.html");
    var prefix = (this.specDirname == null) ? "" : this.specDirname + "/";
    return prefix + "fixtures/" + filename;
  },
  
  get specDirname(){
    if(this.specFile == null) { return null; }
    var pathComponents = this.specFile.split("/");
    var filename = pathComponents.pop();
    return (pathComponents.length > 0) ? pathComponents.join("/") : null;
  },
  
  get specBasename(){
    if(this.specFile == null) { return null; }
    return this.specFile.split("/").pop();
  }
};

if(BlueRidge.loaded != true) {
  if(arguments.length == 0) {
    print("Usage: test_runner.js spec/javascripts/file_spec.js");
    quit(1);
  }
  
  BlueRidge.CommandLine.specFile = arguments[0];

  //TODO: use currying below to always pass the BlueRidge.CommandLine object
  var require = require || BlueRidge.CommandLine.require;
  var debug   = debug   || BlueRidge.CommandLine.debug;

  // Mock up the Firebug API for convenience.
  var console = console || {debug: debug};

  var PLUGIN_PREFIX = environment["blue.ridge.prefix"] || "../../vendor/plugins/blue-ridge";
  load(PLUGIN_PREFIX + "/lib/env.rhino.js");
  window.location = BlueRidge.CommandLine.fixtureFile;

  load(PLUGIN_PREFIX + "/lib/jquery-1.3.2.js");
  load(PLUGIN_PREFIX + "/lib/jquery.fn.js");
  load(PLUGIN_PREFIX + "/lib/jquery.print.js");
  load(PLUGIN_PREFIX + "/lib/screw.builder.js");
  load(PLUGIN_PREFIX + "/lib/screw.matchers.js");
  load(PLUGIN_PREFIX + "/lib/screw.events.js");
  load(PLUGIN_PREFIX + "/lib/screw.behaviors.js");
  load(PLUGIN_PREFIX + "/lib/smoke.core.js");
  load(PLUGIN_PREFIX + "/lib/smoke.mock.js");
  load(PLUGIN_PREFIX + "/lib/smoke.stub.js");
  load(PLUGIN_PREFIX + "/lib/screw.mocking.js");
  load(PLUGIN_PREFIX + "/lib/consoleReportForRake.js");

  print("Running " + BlueRidge.CommandLine.specFile + " with fixture '" + BlueRidge.CommandLine.fixtureFile + "'...");
  BlueRidge.loaded = true;  

  load(BlueRidge.CommandLine.specFile);
  jQuery(window).trigger("load");
}