var stats = require('download-stats');
const ObjectsToCsv = require('objects-to-csv');
var exportArray = [];

console.log("starting script");

var plugins = [
    "sanity-plugin-asset-source-unsplash", 
    "sanity-plugin-media", 
    "sanity-plugin-content-calendar"
    // add additional plugins here
    // should be stored in separate .txt file
];

function pullStats(packageName) {
    var start = new Date('2021-01-09');
    var end = new Date('2021-01-09');
    stats.get(start, end, packageName)
    .on('error', console.error)
    .on('data', function(data) {
        data.package = packageName;
        exportArray.push(data);
    })
    .on('end', function() {
        console.log(exportArray.length);
        if(exportArray.length == plugins.length) {
            (async () => {
                const csv = new ObjectsToCsv(exportArray);
                await csv.toDisk('./test.csv');
                console.log(await csv.toString());
              })();
        }
    });
};

plugins.forEach(plugin => pullStats(plugin));