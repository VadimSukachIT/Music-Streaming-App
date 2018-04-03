const apiAddress = 'http://localhost:3000';

const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Usual mix-and-matching for x-browser omitted for brevity

    xhr.onload = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
          } else {
              console.error(xhr.statusText);
              reject();
          }
      }
    };

    xhr.open('GET', `${apiAddress}/${url}`, true);
    xhr.send();
  });
};