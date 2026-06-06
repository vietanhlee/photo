/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  const baseUrl = "http://localhost:8081";
  return fetch(baseUrl + url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error("Lỗi HTTP: " + response.statusText));
      }
      return response.json();
    });
}

export default fetchModel;

