var should	= require('should'),
	rimraf	= require('rimraf'),
	bunyan 	= require('bunyan'),
	fs 		= require('fs'),
	async 	= require('async'),
	util 	= require('util');

describe("mix_logs", function suite() {
	var NUMBER_ENTRIES 		= 10,
		NUMBER_OF_LOGFILES 	= 100;

	this.timeout(10000);

	before(function removeTmpDir(done) {
		rimraf("./tmp/", done);
	});
	before(function makeTmpDir(done) {
		fs.mkdir("./tmp/", done);
	});
	before(function setupTestData(done) {
		var logs 	= [],
			logStream, i;

		for( i = 0; i < NUMBER_OF_LOGFILES; i++ ) {
			logStream = fs.createWriteStream( util.format("./tmp/test%d",i) );
			log = bunyan.createLogger({
				name: util.format("test%d",i), 
				stream: logStream,
	    		level: "info"
	    	});
	    	logs.push(log);
		}
		async.each(logs, function writeLogs(log, doneCreatingLogs) {
			var j;
			async.times( NUMBER_ENTRIES, function logTestData(count, doneLogging) {
				setTimeout(function onTimeout() {
					log.info("test");
					doneLogging();
				}, Math.floor( Math.random() * 100 ) );
			}, doneCreatingLogs);
		}, done);
	});
	it("should throw an error if constructed with a string", function doTest(done) {
		var mixLogs=require('../lib/mix_logs');
		(function() {
			mixLogs("./data/test.log");
		}).should.throw();
		done();
	});
	it("should throw an error if constructed without an argument", function doTest(done) {
		var mixLogs=require('../lib/mix_logs');
		(function() {
			mixLogs();
		}).should.throw();
		done();
	});
	it("should return a readable stream of the merged files - 1 files", function doTest(done) {
		should.fail("test incomplete");
	});
	it("should return a readable stream of the merged files - 10 file", function doTest(done) {
		should.fail("test incomplete");
	});
	it("should return a readable stream of the merged files - 100 files", function doTest(done) {
		should.fail("test incomplete");
	});
});