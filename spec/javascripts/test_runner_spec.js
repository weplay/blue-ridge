require("spec_helper.js");

//TODO: get Smoke to where I can just stub all the assigmnents to BlueRidge.specFile below.
Screw.Unit(function() {
  describe("BlueRidge", function(){
    
    describe("fixtureFile", function(){
      describe("given a spec filename without a path prefix", function(){
        it("returns the filename converted from a '_spec.js' suffix to '.html'", function(){
          BlueRidge.specFile = 'some_spec.js' 
          expect(BlueRidge.fixtureFile).to(match, /some\.html$/);
        });

        it("returns the filename prepended with 'fixtures/'", function(){
          BlueRidge.specFile = 'some_spec.js'
          expect(BlueRidge.fixtureFile).to(match, /^fixtures\/some/);
        });
      });
      
      describe("given a spec filename with a path prefix", function(){
        it("returns the filename converted from a '_spec.js' suffix to '.html'", function(){
          BlueRidge.specFile = 'some/path/to/some_spec.js'
          expect(BlueRidge.fixtureFile).to(match, /some\.html$/);
        });

        it("returns the filename prepended with the spec's parent path and '/fixtures/'", function(){
          BlueRidge.specFile = 'some/path/to/some_spec.js'
          expect(BlueRidge.fixtureFile).to(match, /^some\/path\/to\/fixtures\/some/);
        });
      });
    });
    
    describe("specDirname", function(){
      it("returns null if given a null spec filename", function(){
        BlueRidge.specFile = null
        expect(BlueRidge.specDirname).to(be_null);
      });

      it("returns null if given a spec filename without a path prefix", function(){
        BlueRidge.specFile = 'some_spec.js'
        expect(BlueRidge.specDirname).to(be_null);
      });
      
      it("returns the path prefix if given a spec filename with a path prefix", function(){
        BlueRidge.specFile = 'some/path/to/some_spec.js'
        expect(BlueRidge.specDirname).to(equal, "some/path/to");
      });
    });
    
    describe("specBasename", function(){
      it("returns null if given a null spec filename", function(){
        BlueRidge.specFile = null
        expect(BlueRidge.specBasename).to(be_null);
      });

      it("returns the filename if given a spec filename without a path prefix", function(){
        BlueRidge.specFile = 'some_spec.js'
        expect(BlueRidge.specBasename).to(equal, 'some_spec.js');
      });
      
      it("returns only the filename if given a spec filename with a path prefix", function(){
        BlueRidge.specFile = 'some/path/to/some_spec.js'
        expect(BlueRidge.specBasename).to(equal, 'some_spec.js');
      });
    });

    describe("prepareFilenameForRequireBasedOnSpecDirectory", function(){
      it("returns null if given a null filename", function(){
        expect(BlueRidge.prepareFilenameForRequireBasedOnSpecDirectory(null)).to(be_null);
      });
      
      it("returns the given filename if is it an absolute filepath", function(){
        var filename = BlueRidge.prepareFilenameForRequireBasedOnSpecDirectory("/some/absolute/filename.txt");
        expect(filename).to(equal, "/some/absolute/filename.txt");
      });
      
      describe("when given a relative filepath", function(){
        it("returns the given filename unchanged if there was NO path prefix on the spec filename", function(){
          BlueRidge.specFile = 'some_spec.js'
          var filename = BlueRidge.prepareFilenameForRequireBasedOnSpecDirectory("../../filename.txt");
          expect(filename).to(equal, "../../filename.txt");
        });
        
        it("returns the given filename with the spec file dirname prepended if there was a path prefix on the spec filename", function(){
          BlueRidge.specFile = 'some/path/to/some_spec.js'
          var filename = BlueRidge.prepareFilenameForRequireBasedOnSpecDirectory("../../filename.txt");
          expect(filename).to(equal, "some/path/to/../../filename.txt");
        });
      });
    });
  });
});
