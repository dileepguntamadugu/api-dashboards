#!/bin/bash

#Removing any past outcome files
rm -f testoutcomes.csv

#Script to run the newman tests
node newman_runner.js

#Creating the html document to be served from node server
node createhtmldocument.js

#Killing any open ports with port number 8000
kill -9 $(lsof -ti:8000)

#Serving the report
node server.js