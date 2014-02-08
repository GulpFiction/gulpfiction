var glob2base = require('../');
var glob = require('glob');
var path = require('path');
var should = require('should');
require('mocha');

describe('glob2base', function() {
  it('should get a base name', function(done) {
    var globber = new glob.Glob("js/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });

  it('should get a base name from a nested glob', function(done) {
    var globber = new glob.Glob("js/**/test/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });

  it('should get a base name from a flat file', function(done) {
    var globber = new glob.Glob("js/test/wow.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/test/");
    done();
  });

  it('should get a base name from character class pattern', function(done) {
    var globber = new glob.Glob("js/t[a-z]st}/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });

  it('should get a base name from brace , expansion', function(done) {
    var globber = new glob.Glob("js/{src,test}/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });

  it('should get a base name from brace .. expansion', function(done) {
    var globber = new glob.Glob("js/test{0..9}/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });

  it('should get a base name from extglob', function(done) {
    var globber = new glob.Glob("js/t+(wo|est)/*.js", {cwd: __dirname});
    glob2base(globber).should.equal("js/");
    done();
  });
});
