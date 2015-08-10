var crypto 	= require('crypto'),
	fs 		= require('fs'),
	util	= require('util');

function* logMixer(logs_to_mix) {
	var file_contents = [],
		transformed_lines = undefined;

	if( !Array.isArray(logs_to_mix) ) {
		throw new Error("must pass array as first argument");
	}

	for( file in logs_to_mix ) {
		transformed_lines = fs.readFileSync(logs_to_mix[file].filename)
			.toString()
			.split('\n')
			.slice(0, -1)
			.map(function parse(line) {
				var l;
				try {
					l = JSON.parse(line);
				} catch(e) {
					return undefined;
				}
				return l;
			});
		file_contents.push( transformed_lines );
	}
	while( true ) {
		// compare the timestamp of the first element in each log content array, yield the lowest timestamp and remove it from the array
		var lowest_timestamp = undefined;
		for( log_data in file_contents ) {
			if( file_contents[log_data].length===0 ) {
				continue;
			}
			if( !lowest_timestamp || ( file_contents[log_data][0] && lowest_timestamp[0] && file_contents[log_data][0].time < lowest_timestamp[0].time) ) {
				lowest_timestamp = file_contents[log_data];
			}
		}
		if( !lowest_timestamp ) {
			break;
		}
		yield lowest_timestamp.shift();
	}
}

module.exports = function mixLogs(log_files) {
	var mixed_logs 	= [];
	for( var log_line of logMixer( log_files ) ) {
		mixed_logs.push( log_line )
	}
	return mixed_logs;
}
	