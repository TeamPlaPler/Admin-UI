import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/restaurantTypes";
export const getAllrestaurantTypesinfo = () => {
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
export const postrestaurantTypesData = (payload) => {
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
export const putrestaurantTypes = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?restaurantTypesid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleterestaurantTypes = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?restaurantTypesid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
