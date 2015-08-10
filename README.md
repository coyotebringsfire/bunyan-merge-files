# bunyan-merge-files

[![Build Status](https://travis-ci.org/coyotebringsfire/bunyan-merge-files.png)](https://travis-ci.org/coyotebringsfire/bunyan-merge-files)

## Description
This module merges an array of Bunyan files and produces an array merged by date. Internally Generators are used because I wanted to learn how to use them.

## Scripts

- `test` - run tests

## Example usage 

```javascript
var Mixer = require('bunyan-merge-files');
var mixer = new Mixer(["file1", "file2"]);
mixer.on('line', function lineEventHandler(evt) {
  console.log(evt.message);
});
var mergedLogs = mixer.mix();

console.log(mergedLogs);
```

See more additional description

## Add API Reference

`Mixer(arrayOfFilenames)` - constructor for Mixer object
`Mixer#mix()` - merges files, returns results as array

## Events

`line` - emitted when a line has been merged

- - - 

NOTE: Add some possible note
