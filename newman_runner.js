var fs = require('fs'), 
newman = require('newman')

var apiname = new Array() 
var responsecode = new Array() 
var responsetime = new Array()
const comma = ","

var standalonerequests = fs.readdirSync('standalone_requests/')
var fuctionalflows = fs.readdirSync('functional_journeys/')
console.log(standalonerequests)
console.log(fuctionalflows)

standalonerequests.forEach(element=>{
    newman.run({
        reporters: 'cli',
        collection: "standalone_requests/" + element,
        insecure: true,
        iterationCount: 1
    })
    .on('request', function(err, args) {
        if(err){
            console.log(err)
        }
        apiname[args.cursor.position] = args.item.name
        responsecode[args.cursor.position] = args.response.code
        responsetime[args.cursor.position] = args.response.responseTime
    
    })
    .on('done', function(err, summary) {
        for (let i = 0; i < apiname.length; i++) {
            fs.appendFileSync('testoutcomes.csv', apiname[i] + comma + responsecode[i] + comma + responsetime[i] +"\n");
        }
    })
});

fuctionalflows.forEach(element=>{
    newman.run({
        reporters: 'cli',
        collection: "functional_journeys/" + element,
        environment: 'functional_journeys/environment/UATApigee.postman_environment.json',
        insecure: true,
        iterationCount: 1
    })
    .on('request', function(err, args) {
        if(err){
            console.log(err)
        }
    })
    .on('done', function(err, summary) {
        let requestssize = summary.run.executions
        let apiname = summary.run.executions[requestssize.length-1].item.name
        let apistatuscode = summary.run.executions[requestssize.length-1].response.code
        let apiresponsetimeinms = summary.run.executions[requestssize.length-1].response.responseTime
        fs.appendFileSync('testoutcomes.csv', apiname + comma + apistatuscode + comma + apiresponsetimeinms +"\n");
    })
});