import { deleteRecord, getData, postData, putData } from "../../../fetchCalls";
const moduleRoute = "/blog";
export const getAllBlogInfo = () => {
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
export const postBlogData = (payload) => {
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
export const putBlogPost = (id, payload) => {
  return new Promise((resolve, reject) => {
    putData(`${moduleRoute}?Blogid&${id}`, payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteBlog = (id) => {
  return new Promise((resolve, reject) => {
    deleteRecord(`${moduleRoute}?Blogid&${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
