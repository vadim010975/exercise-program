/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = async (options = {}) => {
  try {
    let response, request;
    if (!options.method || options.method === "GET") {
      if (options?.data) {
        request = options.url + '?';
        for (let key in options.data) {
          request += key + '=' + options.data[key] + '&';
        }
          request = request.slice(0, -1);
      } else {
        request = options.url;
      }
      response = await fetch(request);
    } else {
      const formData = new FormData;
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
      response = await fetch(options.url, {
        method: options.method,
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        body: formData,
      });
    }
    const result = await response.json();
    options.callback(null, result);
  } catch (error) {
    options.callback(error, null);
  }
}

export default createRequest;