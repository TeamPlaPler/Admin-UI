import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/plans";
export const getAllplansinfo = () => {
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
export const postplansData = (payload) => {
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
export const putplans = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?plansid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteplans = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?plansid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
