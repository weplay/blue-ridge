var BLUE_RIDGE_LIB_PREFIX = (environment["blue.ridge.prefix"] ||
                             "../../vendor/plugins/blue-ridge") + "/lib/";
var BLUE_RIDGE_VENDOR_PREFIX = (environment["blue.ridge.prefix"] ||
                             "../../vendor/plugins/blue-ridge") + "/vendor/";
load(BLUE_RIDGE_LIB_PREFIX + "command-line.js");

if(BlueRidge.loaded != true) {
  BlueRidge.loaded = true;

  if(arguments.length == 0) {
    print("Usage: test_runner.js spec/javascripts/file_spec.js");
    quit(1);
  }

  require(BLUE_RIDGE_VENDOR_PREFIX + "env.rhino.js");
  Envjs.logLevel = Envjs.ERROR;       // one of: DEBUG, INFO, WARN, ERROR, NONE

  // Mock up the Firebug API for convenience.
  var console = console || {debug: debug, log: debug, info: debug, warn: debug, error: debug};

  function executeTest(testWin, lib_prefix, vendor_prefix, spec, _Envjs){
    Envjs = _Envjs;
    loadIntoFnsScope(lib_prefix + "command-line.js");
    loadIntoFnsScope(vendor_prefix + "jquery-1.4.js");
    loadIntoFnsScope(vendor_prefix + "jquery.fn.js");
    loadIntoFnsScope(vendor_prefix + "jquery.print.js");
    loadIntoFnsScope(vendor_prefix + "screw.builder.js");
    loadIntoFnsScope(vendor_prefix + "screw.matchers.js");
    loadIntoFnsScope(vendor_prefix + "screw.events.js");
    loadIntoFnsScope(vendor_prefix + "screw.behaviors.js");
    loadIntoFnsScope(vendor_prefix + "smoke.core.js");
    loadIntoFnsScope(vendor_prefix + "smoke.mock.js");
    loadIntoFnsScope(vendor_prefix + "smoke.stub.js");
    loadIntoFnsScope(vendor_prefix + "screw.mocking.js");
    loadIntoFnsScope(lib_prefix + "consoleReportForRake.js");
    loadIntoFnsScope(spec);
    jQuery(testWin).trigger("load");
    Envjs.wait();
  }


  for (var c=0; c < arguments.length; c++){

    BlueRidge.CommandLine.specFile = arguments[c];
    print("Running "        + BlueRidge.CommandLine.specFile +
          " with fixture '" + BlueRidge.CommandLine.fixtureFile + "'...");
    var testWindow = window.open(BlueRidge.CommandLine.fixtureFile);

    /* env.js scope-manipulation magic.  Run "executeTest" as if its
     * _lexical_ scope were within the window we just created, so that it
     * loads all of the component libaries in that context's "window"
     * object and not the one we're executing in here */
    setScope(executeTest, testWindow.__proto__);
    setScope(loadIntoFnsScope, testWindow.__proto__);
    executeTest( testWindow.__proto__, BLUE_RIDGE_LIB_PREFIX, BLUE_RIDGE_VENDOR_PREFIX,
                 BlueRidge.CommandLine.specFile, Envjs );

    /* turn script-loading in fixtures "back" off in case last fixture turned
     * it "on".  (Otherwise it would try to load blue-ridge.js, oops.) */
    Envjs.scriptTypes["text/javascript"] = false;
  }
}
