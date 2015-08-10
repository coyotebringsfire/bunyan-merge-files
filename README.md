# bunyan-merge-files

[![Build Status](https://travis-ci.org/coyotebringsfire/bunyan-merge-files.png)](https://travis-ci.org/coyotebringsfire/bunyan-merge-files)

## Description
This module merges an array of Bunyan files and produces an array merged by date. Internally Generators are used because I wanted to learn how to use them.

## Scripts

- `test` - run tests

## Example usage 

```javascript
var mergeLogs = require('bunyan-merge-files');

var mergedLogs = mergeLogs([ "file1", "file2" ]);

console.log(mergedLogs);
```

See more additional description

## Add API Reference

`mergeLogs(arrayOfFilenames)` - merges specified logs files

- - - 

NOTE: Add some possible note
