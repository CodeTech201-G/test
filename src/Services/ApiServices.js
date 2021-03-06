/**
 * Below is the usage of service function
 * import APICALL from {../give-proper-path-whearver you are importing it}
 * URLENDPOINT is the ENDPOINT of the API CAll
 * httpmethod can be GET, PUT, POST, DELETE etc.
 * data is the json object which you want to send to the backend using post, put, delete and update methods
 * APICALL.service(URLENDPOINT, httpmethod, data)
 *  .then(result => {
 *  use ur result.json()  object here whatever you want to do.
 * })
 */
const proxy_url = "https://cors-anywhere.herokuapp.com/";

export const APICALL = {
  service,
  serviceForSitesJSON,
  headers,
  get_url_extension,
  proxy_url,
};
function get_url_extension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

/*
this is for the fetch which will return the sites JSON,which will be executed bofore fetching the ,
since at that time we're using env file to get the backend url,
therefore writing a separate function for that.
*/

/*
 *Call to the API
 *@param urlendpoint=urlendpoint of the API
 *@param httpmethod=METHOD
 *@param data=data to the API
 *@returns response from the APIsettings
 */
function serviceForSitesJSON(urlendpoint = "", httpmethod = "", data = "") {
  // Default options are marked with *
  return fetch(
    process.env.REACT_APP_serverURL + urlendpoint,
    headers(data, httpmethod)
  )
    .then(
      // parses JSON response into native Javascript objects
      (result) => result.json()
    )
    .then((result) => {
      return result;
    });
}
/*
 *Call to the API
 *@param urlendpoint=urlendpoint of the API
 *@param httpmethod=METHOD
 *@param data=data to the API
 *@returns response from the API
 */
function service(
  urlendpoint = "",
  httpmethod = "",
  data = "",
  file = 0,
  loading = 1
) {
  //  console.log(urlendpoint, " : ApiService : ", httpmethod);
  if (loading === 1 && document.getElementById("loading-icon") !== null) {
    document
      .getElementById("loading-icon")
      .setAttribute("style", "display:block;");
  }
  return fetch(urlendpoint, headers(data, httpmethod))
    .then((result) => {
      // console.log("service  : ", result);
      if (loading === 1 && document.getElementById("loading-icon") !== null) {
        document
          .getElementById("loading-icon")
          .setAttribute("style", "display:none;");
      }
      return file ? result.blob() : result.json();
    })
    .catch((error) => {
      console.log("Error service : ", error);
      if (loading === 1 && document.getElementById("loading-icon") !== null) {
        document
          .getElementById("loading-icon")
          .setAttribute("style", "display:none;");
      }
      return null;
    });
}
/*
 *Getting headers for the Ajax
 *@param data =data to the API
 *@param httpmethod=METHOD
 *returns headers for the Ajax
 */
function headers(data, httpmethod) {
  var header = {
    // *GET, POST, PUT, DELETE, etc.
    method: httpmethod,
    // no-cors, cors, *same-origin
    // mode: "no-cors",
    // withCredentials: true,
    // *default, no-cache, reload, force-cache, only-if-cached
    //cache: "no-cache",
    // include, *same-origin, omit
    // credentials: "same-origin",
    headers: {
      //"Content-Type": "application/json",
      //"Authorization": "Bearer aAqbVgy30qDmSqT0m32rB2xON0EE_3OW",
      //'Access-Control-Allow-Origin': '*',
      //"Authorization-id": Authorization_id,
      // "Language-id" : reduxState.active_language,

      // 'X-Authenticated-Userid': '15000500000@1',

      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      // 'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
    },
    // manual, *follow, error
    // redirect: "follow",
    // no-referrer, *client
    //referrer: "no-referrer",
  };
  if (httpmethod !== "GET") {
    // body data type must match "Content-Type" header
    //console.log(httpmethod, " : body : ", data);
    //  header.body = JSON.stringify(data);
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    header.body = formBody;
  }
  return header;
}
