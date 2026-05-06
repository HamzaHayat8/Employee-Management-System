/**
 * utils/geolocation.js
 * Pure utility — no React imports. Easy to unit-test in isolation.
 */

/**
 * Wraps the browser Geolocation API in a Promise.
 * @returns {Promise<{ latitude: number, longitude: number }>}
 */
export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (err) => reject(new Error(err.message)),
      { timeout: 10_000, maximumAge: 60_000 }
    );
  });
