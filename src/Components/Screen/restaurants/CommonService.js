import { getData } from "../../../fetchCalls";

export const getActiveRestaurantTypes = () => {
  return new Promise((resolve, reject) => {
    getData(`/restaurantTypes`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getActiveOrderTypes = () => {
  return new Promise((resolve, reject) => {
    getData(`/orderTypes`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getActivePlansTypes = () => {
  return new Promise((resolve, reject) => {
    getData(`/plans`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
