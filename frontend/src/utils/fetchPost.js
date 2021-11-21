const fetchPost = (method, path, body, token) => {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: undefined
  };

  if (token !== null) {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (body !== null) {
    requestOptions.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5005${path}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resolve(data);
          })
        } else if (response.status === 400 || response.status === 403) {
          response.json()
            .then((errorMsg) => {
              reject(errorMsg.error);
            })
            .catch((err) => {
              reject(err);
            })
        } else {
          response.json().then((error) => {
            reject(error);
          })
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default fetchPost;
