require("spec_helper.js");
require("../../lib/blue-ridge.js");

Screw.Unit(function() {
  describe("BlueRidge.Browser", function(){
    describe("deriveSpecNameFromCurrentFile", function(){
      it("returns the current file's patch from the fixtures directory minus the '.html' suffix and with '_spec.js' appended", function(){
        stub(BlueRidge.Browser, 'currentFile').and_return("/some/prefix/path/fixtures/path/to/current_file.html");
        expect(BlueRidge.Browser.deriveSpecNameFromCurrentFile()).to(equal, "path/to/current_file_spec.js");
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
    
    describe("calculateDepth", function(){
      it("returns 1 if the current file is a direct child of the 'fixtures' directory", function(){
        stub(BlueRidge.Browser, 'currentFile').and_return("/some/prefix/fixtures/current_file.html");
        expect(BlueRidge.Browser.calculateDepth()).to(equal, 1);
      });

      it("returns 2 if the current file is in a subdirectory ONE level beneath the 'fixtures' directory", function(){
        stub(BlueRidge.Browser, 'currentFile').and_return("/some/prefix/fixtures/subdirectory/current_file.html");
        expect(BlueRidge.Browser.calculateDepth()).to(equal, 2);
      });

      it("returns 8 if the current file is in a subdirectory SEVEN levels beneath the 'fixtures' directory", function(){
        stub(BlueRidge.Browser, 'currentFile').and_return("/some/prefix/fixtures/1/2/3/4/5/6/7/current_file.html");
        expect(BlueRidge.Browser.calculateDepth()).to(equal, 8);
      });
    });
  });
});
