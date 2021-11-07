const URL = "https://appbackend.ascendmedia.in/api/v1/";
export const taskImages = "https://appbackend.ascendmedia.in/uploads/sites/";

export const postRequest = (path, body, header) => {
  return fetch(URL + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      ...header,
    },
    body: body,
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
