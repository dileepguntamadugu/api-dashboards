var fs = require('fs'),
newman = require('newman'),
parse = require('xml2json-light');
results = [];

var apiname = new Array() 
var responsecode = new Array() 
var responsetime = new Array()
const comma = ","

newman.run({
    reporters: 'cli',
    collection: "Postman_collection.json",
    insecure: true,
    iterationCount: 1
})
.on('request', function(err, args) {
    apiname[args.cursor.position] = args.item.name
    responsecode[args.cursor.position] = args.response.code
    responsetime[args.cursor.position] = args.response.responseTime

})
.on('done', function(err, summary) {
    for (let i = 0; i < apiname.length; i++) {
        fs.appendFileSync('testoutcomes.csv', apiname[i] + comma + responsecode[i] + comma + responsetime[i] +"\n");
    }
})