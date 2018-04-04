const apiAddress = 'http://localhost:3000';

const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Usual mix-and-matching for x-browser omitted for brevity

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject();
        }
      }
    };

    xhr.open('GET', `${apiAddress}/${url}`, true);
    xhr.send();
  });
};

const postRequest = (url, body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Usual mix-and-matching for x-browser omitted for brevity

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject();
        }
      }
    };

    xhr.open('POST', `${apiAddress}/${url}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });
};

const putRequest = (url, body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Usual mix-and-matching for x-browser omitted for brevity
    xhr.open('PUT', `${apiAddress}/${url}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);
  });
};

const deleteRequest = (url, body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Usual mix-and-matching for x-browser omitted for brevity
    xhr.open('DELETE', `${apiAddress}/${url}`, true);

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject();
        }
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body || null);
  });
};

export { getRequest, postRequest, deleteRequest, putRequest };
