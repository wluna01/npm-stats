var stats = require('download-stats');

console.log("starting script");

let plugins = [
    "sanity-plugin-asset-source-unsplash", 
    "sanity-plugin-media", 
    "sanity-plugin-content-calendar"
    // add additional plugins here
    // should be stored in separate .txt file
];

function pullStats(packageName) {
    var start = new Date('2021-01-09');
    var end = new Date('2021-01-11');
    stats.get(start, end, packageName)
    .on('error', console.error)
    .on('data', function(data) {
        console.log(data);
    })
    .on('end', function() {
        console.log('done.');
    });
}
// add grouping to this function so it returns data in weekly aggregates

plugins.forEach(plugin => pullStats(plugin));