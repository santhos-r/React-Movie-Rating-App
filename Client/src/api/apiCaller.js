import fetch from "isomorphic-fetch";
/**
 * callApi
 *
 * @param {string} endpoint - api url without host and '/api'
 * @param {string} method - Get / Post
 * @param {string/array/object} body - Pass data to backend ( mostly for put and post call )
 * @param {object} options - Helps to give customize headers ( used for sending formdata like uploading images )
 * @param {boolean} customResHandler - We get the response directly from fetch without stringify the data ( used to export data )
 */

export default function callApi(
  endpoint,
  method = "get",
  body,
  options,
  customResHandler = false
) {
  let fetchOptions = {};
  fetchOptions["method"] = method;
  //set header
  fetchOptions["headers"] = {
    "content-type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Accept: "application/json",
  };
  fetchOptions["body"] = JSON.stringify(body);
  let fetchAPI = fetch(`${endpoint}`, fetchOptions);
  return fetchAPI
    .then((response) =>
      response.json().then((json) => ({
        json,
        response,
      }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      (response) => response
      // ,
      // (error) => dispatchFetchError(error)
    );
}
// .then((res) => res.text())
// .then((res) => res);
// }
