require("spec_helper.js");
require("../../lib/blue-ridge.js");

Screw.Unit(function() {
  describe("BlueRidge.Browser", function(){
    describe("deriveSpecNameFromCurrentFile", function(){
      it("returns the current file's basename minus the '.html' suffix and with '_spec.js' appended", function(){
        stub(BlueRidge.Browser, 'currentFile').and_return("/some/path/to/current_file.html");
        expect(BlueRidge.Browser.deriveSpecNameFromCurrentFile()).to(equal, "current_file_spec.js");
      });
    });
  });
});
