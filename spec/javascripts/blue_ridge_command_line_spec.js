require("spec_helper.js");
require("../../lib/test_runner.js");

//TODO: get Smoke to where I can just stub all the assigmnents to BlueRidge.CommandLine.specFile below.
Screw.Unit(function() {
  describe("BlueRidge.CommandLine", function(){
    
    describe("fixtureFile", function(){
      it("returns the filename converted from a '_spec.js' suffix to '.html'", function(){
        BlueRidge.CommandLine.specFile = 'some/path/to/a_spec.js' 
        expect(BlueRidge.CommandLine.fixtureFile).to(match, /a\.html$/);
      });

      it("returns the filename prepended with 'fixtures/'", function(){
        BlueRidge.CommandLine.specFile = 'some/path/to/a_spec.js'
        expect(BlueRidge.CommandLine.fixtureFile).to(match, /^fixtures\/some\/path\/to\/a/);
      });
    });
    
    describe("specDirname", function(){
      it("returns null if given a null spec filename", function(){
        BlueRidge.CommandLine.specFile = null
        expect(BlueRidge.CommandLine.specDirname).to(be_null);
      });

      it("returns null if given a spec filename without a path prefix", function(){
        BlueRidge.CommandLine.specFile = 'some_spec.js'
        expect(BlueRidge.CommandLine.specDirname).to(be_null);
      });
      
      it("returns the path prefix if given a spec filename with a path prefix", function(){
        BlueRidge.CommandLine.specFile = 'some/path/to/some_spec.js'
        expect(BlueRidge.CommandLine.specDirname).to(equal, "some/path/to");
      });
    });
    
    describe("specBasename", function(){
      it("returns null if given a null spec filename", function(){
        BlueRidge.CommandLine.specFile = null
        expect(BlueRidge.CommandLine.specBasename).to(be_null);
      });

      it("returns the filename if given a spec filename without a path prefix", function(){
        BlueRidge.CommandLine.specFile = 'some_spec.js'
        expect(BlueRidge.CommandLine.specBasename).to(equal, 'some_spec.js');
      });
      
      it("returns only the filename if given a spec filename with a path prefix", function(){
        BlueRidge.CommandLine.specFile = 'some/path/to/some_spec.js'
        expect(BlueRidge.CommandLine.specBasename).to(equal, 'some_spec.js');
      });
    });

    describe("prepareFilenameForRequireBasedOnSpecDirectory", function(){
      it("returns null if given a null filename", function(){
        expect(BlueRidge.CommandLine.prepareFilenameForRequireBasedOnSpecDirectory(null)).to(be_null);
      });
      
      it("returns the given filename if is it an absolute filepath", function(){
        var filename = BlueRidge.CommandLine.prepareFilenameForRequireBasedOnSpecDirectory("/some/absolute/filename.txt");
        expect(filename).to(equal, "/some/absolute/filename.txt");
      });
      
      describe("when given a relative filepath", function(){
        it("returns the given filename unchanged if there was NO path prefix on the spec filename", function(){
          BlueRidge.CommandLine.specFile = 'some_spec.js'
          var filename = BlueRidge.CommandLine.prepareFilenameForRequireBasedOnSpecDirectory("../../filename.txt");
          expect(filename).to(equal, "../../filename.txt");
        });
        
        it("returns the given filename with the spec file dirname prepended if there was a path prefix on the spec filename", function(){
          BlueRidge.CommandLine.specFile = 'some/path/to/some_spec.js'
          var filename = BlueRidge.CommandLine.prepareFilenameForRequireBasedOnSpecDirectory("../../filename.txt");
          expect(filename).to(equal, "some/path/to/../../filename.txt");
        });
      });
    });
    
    describe("exampleName", function(){
      after(function(){ teardownFixtures() });

      function createDescribeDiv(name){
        return $('<li class="describe"/>').append('<h1>' + name + '</h1>');
      }

      function createNestedDescribeDiv(name, body, count){
        if(count == 1) {
          return createDescribeDiv(name + " " + count).append(body);
        }
        else {
          var div = createDescribeDiv(name + " " + count);
          div.append(createNestedDescribeDiv(name, body, count-1));
          return div;
        }
      }

      describe("returning the human-readable name of the example for the given 'it' element", function(){
        it("when the element is inside one describe", function(){
          fixture(createDescribeDiv("describe")
            .append($('<ul class="its"/>')
              .append('<li class="it" id="sample-it"><h2>example</h2></li>')));
        
          expect(BlueRidge.CommandLine.exampleName("#sample-it")).to(equal, "describe example");
        });
        
        it("when the element is inside several nested describes", function(){
          var body = $('<ul class="its"/>').append('<li class="it" id="sample-it"><h2>example</h2></li>');
          var dom = createNestedDescribeDiv("describe", body, 7);
          fixture(dom);
          
          expect(BlueRidge.CommandLine.exampleName("#sample-it")).to(equal, "describe 7 describe 6 describe 5 describe 4 describe 3 describe 2 describe 1 example");
        });
        
      });
      
    });
  });
});
