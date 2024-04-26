import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/foodTypes";
export const getAllfoodTypesinfo = () => {
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
export const postfoodTypesData = (payload) => {
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
export const putfoodTypes = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?foodTypesid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deletefoodTypes = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?foodTypesid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
