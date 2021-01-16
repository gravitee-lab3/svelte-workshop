// Api.js
import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL : "https://pokeapi.co/api/v2/" // it's not recommended to have this info here.
});

// implement a method to execute all the request from here.
const apiRequest = (method, url, request) => {
    console.log(`+++++++ JBL => DÉBUT appel la méthode [apiRequest] +++++++ +++++++`);
    console.log(`JBL => Dans la méthode [apiRequest], on a :`);
    console.log(`JBL => param [method] valeur : [${method}]`);
    console.log(`JBL => param [url] valeur : [${url}]`);
    console.log(`JBL => param [request] valeur : [${request}]`);
    console.log(`+++++++ +++++++ +++++++ +++++++ +++++++ +++++++ +++++++ +++++++`);
    const headers = {
        authorization: ""
    };
    //using the axios instance to perform the request that received from each http method
    return axiosAPI({
        method,
        url,
        data: request,
        headers
      }).then(res => {
        console.log(`+++++++ JBL => FIN (sans erreur) appel la méthode [apiRequest] +++++++`);
        return Promise.resolve(res.data);
      })
      .catch(err => {
        console.log(`+++++++ JBL => FIN (avec erreur) appel la méthode [apiRequest] +++++++`);
        return Promise.reject(err);
      });
};

// function to execute the http get request
const get = (url, request) => apiRequest("get",url,request);

// function to execute the http delete request
const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

// function to execute the http post request
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url, request) =>  apiRequest("patch", url, request);

// expose your method to other services or actions
const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;
