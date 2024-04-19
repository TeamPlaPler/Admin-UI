import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/faq";
export const getAllfaqinfo = () => {
  return new Promise((resolve, reject) => {
    getData(`${moduleRoute}/`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const postFAQData = (payload) => {
  return new Promise((resolve, reject) => {
    postData(`${moduleRoute}/`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const putFAQ = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?faqid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteFAQ = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?faqid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
