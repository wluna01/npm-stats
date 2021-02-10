var stats = require('download-stats');
const ObjectsToCsv = require('objects-to-csv');
var exportArray = [];

console.log("starting script");

var plugins = [
    "sanity-plugin-asset-source-unsplash", 
    "sanity-plugin-media", 
    "sanity-plugin-content-calendar", 
    "sanity-plugin-asset-source-cloudinary", 
    "sanity-plugin-google-analytics",
    "sanity-plugin-seo-tools",
    "sanity-plugin-dashboard-widget-gatsby",
    "sanity-graphql-schema",
    "strapi",
    "@sanity/client"
    // add additional plugins here
    // should be stored in separate .txt file eventually
];

var start = new Date('2020-06-01');
var end = new Date('2021-02-07');

var num_days = ((end.getTime() - start.getTime())  / (1000 * 3600 * 24)) + 1; 
console.log(plugins.length * num_days);
var entry_length = plugins.length * num_days;

function pullStats(packageName) {
    stats.get(start, end, packageName)
    .on('error', console.error)
    .on('data', function(data) {
        data.package = packageName;
        exportArray.push(data);
    })
    .on('end', function() {
        console.log(exportArray.length);
        if(exportArray.length == entry_length) {
            (async () => {
                const csv = new ObjectsToCsv(exportArray);
                await csv.toDisk('./test.csv');
                console.log(await csv.toString());
              })();
        }
    });
};

plugins.forEach(plugin => pullStats(plugin));
