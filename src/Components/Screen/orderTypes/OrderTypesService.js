import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/orderTypes";
export const getAllorderTypesinfo = () => {
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
export const postorderTypesData = (payload) => {
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
export const putorderTypes = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?orderTypesid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteorderTypes = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?orderTypesid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
