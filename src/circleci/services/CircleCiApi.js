// Api.js
import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL : "https://circleci.com/api/v2" // it's not recommended to have this info here.
});

// implement a method to execute all the request from here.
const apiRequest = (method, url, cci_token, request) => {
    /* const headers = {
        authorization: ""
    }; */
    console.log(`+++++++ JBL => DÉBUT appel la méthode [apiRequest] +++++++ +++++++`);
    console.log(`JBL => [VRAIE API CCI crossDomain: true] - Dans la méthode [apiRequest], on a :`);
    console.log(`JBL => [VRAIE API CCI] - param [method] valeur : [${method}]`);
    console.log(`JBL => [VRAIE API CCI] - param [url] valeur : [${url}]`);
    console.log(`JBL => [VRAIE API CCI] - param [cci_token] valeur : [${cci_token}]`);
    console.log(`JBL => [VRAIE API CCI] - param [request] valeur : [${request}]`);
    console.log(`+++++++ +++++++ +++++++ +++++++ +++++++ +++++++ +++++++ +++++++`);
    const headers = {
      "Circle-Token": `${cci_token}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
      //"Origin": "https://gravitee.io",
      // "Access-Control-Allow-Origin": "https://circleci.com",
      /// Content-Type': 'application/x-www-form-urlencoded'
    }
    //using the axios instance to perform the request that received from each http method
    return axiosAPI({
        method,
        url,
        data: request,
        headers
      }).then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

// function to execute the http get request
const get = (url, cci_token, request) => apiRequest("get", url, cci_token, request);

// function to execute the http delete request
const deleteRequest = (url, cci_token, request) =>  apiRequest("delete", url, cci_token, request);

// function to execute the http post request
const post = (url, cci_token, request) => apiRequest("post", url, cci_token, request);

// function to execute the http put request
const put = (url, cci_token, request) => apiRequest("put", url, cci_token, request);

// function to execute the http path request
const patch = (url, cci_token, request) =>  apiRequest("patch", url, cci_token, request);

// expose your method to other services or actions
const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;
