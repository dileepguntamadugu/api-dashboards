var fs = require('fs')

const divfirstpart = "<body><div class=\"center\"><h1>API Dashboards</h1>"
const divsecondpart = "</div></body></html>"
const parastart = "<p class=\"note\">"
const paraend = "</p>"
const labelstart = "<label>"
const labelend = "</label><br><br>"
var data = fs.readFileSync('testoutcomes.csv','utf8')
var htmloutcomestatuses = ""
data.split('\n').forEach(
    element => {if(element.length>1) {
        attributes = element.split(",")
        htmloutcomestatuses = htmloutcomestatuses + parastart + 
        labelstart + "API Name: " + attributes[0] + labelend +
        labelstart + "Status Code: " + attributes[1] + labelend +
        labelstart + "Response time (ms): " + attributes[2] + labelend +
        paraend
    }})
console.log(htmloutcomestatuses)

fs.appendFileSync('index.html', divfirstpart + htmloutcomestatuses + divsecondpart);