package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	httpGet("https://jsonplaceholder.typicode.com/posts")
	requestBodyBuffer := postBodyEncoding("")
	httpPost("https://postman-echo.com/post", "application/json", requestBodyBuffer)
}

func httpGet(url string) {
	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	responseBody := string(body)
	log.Printf(responseBody)
}

func httpPost(url string, contentType string, requestBody *bytes.Buffer) {
	resp, err := http.Post(url, contentType, requestBody)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll((resp.Body))
	if err != nil {
		log.Fatalln(err)
	}
	responseBody := string(body)
	log.Printf(responseBody)
}

func postBodyEncoding(postBody string) *bytes.Buffer {
	parsePostBody, _ := json.Marshal(map[string]string{
		"Project": "Cambrian",
		"Desire":  "Dashboards for API based on Go and some front end tech - yet to be decided",
	})
	responseBody := bytes.NewBuffer(parsePostBody)
	return responseBody
}
