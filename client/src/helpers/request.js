const Request = function (url) {
  this.url = url;
};

Request.prototype.get = function () {
  return fetch(this.url)
    .then((response) => response.json());
};

Request.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

Request.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};


Request.prototype.put = function (payload, urlParam) {
  // this is checking if the url = urlParam is true.
  //if so, then it will use the thing left of colon,
  // otherwise it will use thing to right of colon
  
  const url = urlParam ? `${this.url}/${urlParam}`: this.url;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};


module.exports = Request;
