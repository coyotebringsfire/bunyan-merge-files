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
		transformed_lines = fs.readFileSync(logs_to_mix[file])
			.toString()
			.split('\n')
			.map(function parse(line) {
				return JSON.parse(line);
			});
		file_contents.push( transformed_lines );
	}
	while( true ) {
		// compare the timestamp of the first element in each log content array, yield the lowest timestamp and remove it from the array
		var lowest_timestamp = undefined;
		for( log_data in file_contents ) {
			if( file_contents[log_data].length===0 ) {
				break;
			}
			if( lowest_timestamp === undefined || file_contents[log_data][0].timestamp < lowest_timestamp[0].timestamp ) {
				lowest_timestamp = file_contents[log_data];
			}
		}
		if( lowest_timestamp === undefined ) {
			break;
		}
		yield parsed_line_to_string(lowest_timestamp.shift());
	}
}

module.exports = function mixLogs(log_files) {
	for( var log_line of logMixer( log_files ) ) {
		console.log(log_line);
	}
}
	