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
    
    describe("urlCorrection", function(){
      it("returns an empty string if the given depth is zero", function(){
        expect(BlueRidge.Browser.urlCorrection(0)).to(equal, "");
      });

      it("returns one directory up if the given depth is 1", function(){
        expect(BlueRidge.Browser.urlCorrection(1)).to(equal, "../");
      });

      it("returns seven directories up if the given depth is 7", function(){
        expect(BlueRidge.Browser.urlCorrection(7)).to(equal, "../../../../../../../");
      });
    });
  });
});
