import axios from 'axios';
axios.defaults.baseURL = 'https://gamy-view-production.up.railway.app'
export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}
export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token);
}
export const request = (method, url, data) => {
    let headers = 
    {'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'};
    if(getAuthToken() != null && getAuthToken !== "null"){
        headers = 
        {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getAuthToken()}`
        }
    }
    return axios({
        method:method,
        url: url,
        data:data,
        headers: headers
    })
}