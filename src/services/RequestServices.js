const URL = "https://media.brandscoot.com/api/v1/";

export const postRequest = (path, body, header) => {
  return fetch(URL + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      ...header,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      return {
        s: 0,
        msg: err.message,
        data: null,
      };
    });
};
