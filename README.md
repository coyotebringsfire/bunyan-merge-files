# bunyan-merge-files

[![Build Status](https://travis-ci.org/coyotebringsfire/bunyan-merge-files.png)](https://travis-ci.org/coyotebringsfire/bunyan-merge-files)

## Scripts

- `test` - run tests

## Edit defaults

- Edit package name in Travis-CI and David-DM badges in this readme
- Edit package json:
	- package `name`
	- pacakge `description`
	- path to your `main` file
	- `version`
	- `author`
	- `keywords`
	- `repository`
	- `homepage`
	- do not forget to add possible executables to `bin` section

## Add example usage 

```javascript
var mergeLogs = require('bunyan-merge-files');

var mergedLogs = mergeLogs([ "file1", "file2" ]);

console.log(mergedLogs);
```

See more additional description

## Add API Reference

`boil(something)` - boils a plate

- - - 

NOTE: Add some possible note
