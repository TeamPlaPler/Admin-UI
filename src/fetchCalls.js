import { backendUrl } from "./env";
const timeout = 5000;
export const getData = (url) => {
  return new Promise((resolve, reject) => {
    // Set up a timeout mechanism
    const timeoutId = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    // Fetch the data
    fetch(`${backendUrl}${url}`)
      .then((response) => {
        // If response is successful, clear the timeout and resolve
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // If there's an error, clear the timeout and reject
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};
export const postData = (url, payload) => {
  return new Promise((resolve, reject) => {
    // Set up a timeout mechanism
    const timeoutId = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    // Fetch the data
    fetch(`${backendUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        // If response is successful, clear the timeout and resolve
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // If there's an error, clear the timeout and reject
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};
export const putData = (url, payload) => {
  return new Promise((resolve, reject) => {
    // Set up a timeout mechanism
    const timeoutId = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    // Fetch the data
    fetch(`${backendUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        // If response is successful, clear the timeout and resolve
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // If there's an error, clear the timeout and reject
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};
export const deleteRecord = (url) => {
  return new Promise((resolve, reject) => {
    // Set up a timeout mechanism
    const timeoutId = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    // Fetch the data
    fetch(`${backendUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
    })
      .then((response) => {
        // If response is successful, clear the timeout and resolve
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // If there's an error, clear the timeout and reject
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};
