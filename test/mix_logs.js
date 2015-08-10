var should	= require('should'),
	rimraf	= require('rimraf'),
	bunyan 	= require('bunyan'),
	fs 		= require('fs'),
	async 	= require('async'),
	util 	= require('util');

function verifyMerge(lines) {
	var lastTime 	= lines[lines.length-1].time;
	for (var i = lines.length - 2; i >= 0; i--) {
		lines[i].time.should.not.be.greaterThan( lastTime );
	};
}

describe("mix_logs", function suite() {
	var NUMBER_OF_ENTRIES 	= 10,
		NUMBER_OF_LOGFILES 	= 100,
		logs 				= [];

	this.timeout(10000);

	before(function removeTmpDir(done) {
		rimraf("./tmp/", done);
	});
	
	before(function makeTmpDir(done) {
		fs.mkdir("./tmp/", done);
	});
	
	before(function setupTestData(done) {
		var logStream, i;

		for( i = 0; i < NUMBER_OF_LOGFILES; i++ ) {
			logStream = fs.createWriteStream( util.format("./tmp/test%d",i) );
			log = bunyan.createLogger({
				name: util.format("test%d",i), 
				stream: logStream,
	    		level: "info"
	    	});
	    	logs.push({ 
	    		filename: util.format("./tmp/test%d", i),
	    		stream: log
	    	});
		}

		async.each(logs, function writeLogs(log, doneCreatingLogs) {
			var j;
			async.timesSeries( NUMBER_OF_ENTRIES, function logTestData(count, doneLogging) {
				setTimeout(function onTimeout() {
					log.stream.info("test");
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
	
	it("should return an array of the merged files - 1 file", function doTest(done) {
		var mixLogs=require('../lib/mix_logs'),
			mixedLogs;
		mixedLogs = mixLogs(logs.slice(0,1));
		mixedLogs.should.be.an.instanceOf(Array);
		mixedLogs.length.should.equal(NUMBER_OF_ENTRIES*1);
		verifyMerge( mixedLogs );
		done();
	});
	
	it("should return an array of the merged files - 10 files", function doTest(done) {
		var mixLogs=require('../lib/mix_logs'),
			mixedLogs;
		mixedLogs = mixLogs(logs.slice(0,10));
		mixedLogs.should.be.an.instanceOf(Array);
		mixedLogs.length.should.equal(NUMBER_OF_ENTRIES*10);
		verifyMerge( mixedLogs );
		done();
	});
	
	it("should return an array of the merged files - 100 files", function doTest(done) {
		var mixLogs=require('../lib/mix_logs'),
			mixedLogs;
		mixedLogs = mixLogs(logs.slice(0,100));
		mixedLogs.should.be.an.instanceOf(Array);
		mixedLogs.length.should.equal(NUMBER_OF_ENTRIES*100);
		verifyMerge( mixedLogs );
		done();
	});
});
