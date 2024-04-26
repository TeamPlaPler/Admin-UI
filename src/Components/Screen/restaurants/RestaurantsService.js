import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/restaurants";
export const getAllrestaurantsinfo = () => {
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
export const postrestaurantsData = (payload) => {
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
export const putrestaurants = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?restaurantsid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleterestaurants = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?restaurantsid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
