'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].nativeName
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].code
                }</p>
            </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
/*
//@@ Our First AJAX Call: XMLHttpRequest
const getCountryAndNeighbor = function (country) {
  //* AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //* Render country 1
    renderCountry(data);

    //@@ Welcome to Callback Hell
    //* Get neighbor country 2
    const [neighbor] = data.borders;
    if (!neighbor) {
      return;
    }

    //* AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbor');
    });
  });
};
getCountryAndNeighbor('thailand');
// getCountryAndNeighbor('usa');
// getCountryAndNeighbor('taiwan');
// getCountryAndNeighbor('china');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//@@  Promises and the Fetch API
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

const request = fetch(`https://restcountries.eu/rest/v2/name/thailand`);
console.log(request);
//Promise {<pending>}

//@@ Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //Response {type: "cors", url: "https://restcountries.eu/rest/v2/name/thailand", redirected: false, status: 200, ok: true, …}
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       //[{…}]
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   //* country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       //@@ Throwing Errors Manually
//       console.log(response);
//
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//
//       return response.json();
//     })
//
//     .then(data => {
//       renderCountry(data[0]);
//
//       //@@ Chaining Promises
//       //   const neighbor = data[0].borders[0];
//       const neighbor = 'dfdfddf';
//       if (!neighbor) {
//         return;
//       }
//       //* country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //* country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found`
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      //   console.log(neighbor);

      if (!neighbor) throw new Error('No neighbor found!');

      //* country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//@@ Handling Rejected Promises
btn.addEventListener('click', function () {
  getCountryData('thailand');
});

getCountryData('usa');
*/
/**
 * * Coding Challenge #1
 * ? In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that,
 * ? you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
 * TODO Your tasks PART 1:
 * todo 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
 * todo 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
 * todo 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
 * todo 4. Chain a .catch method to the end of the promise chain and log errors to the console
 * todo 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
 * TODO Your tasks PART 2:
 * todo 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
 * todo 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
 * ! Test data :
 * ! Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
 * ! Coordinates 2: 19.037, 72.873
 * ! Coordinates 3: -33.933, 18.474
 **/
// //todo 1
// const whereAmI = function (lat, lng) {
//   //todo 2
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       //todo 5
//       console.log(res);
//
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     //todo 3
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     //todo 6
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     //todo 4
//     .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381);
// //Response {type: "cors", url: "https://geocode.xyz/19.037,72.873?geoit=json", redirected: false, status: 200, ok: true, …}
// //{statename: {…}, distance: "0.228", elevation: "1", osmtags: {…}, state: "Maharashtra", …}
// //You are in Mumbai, India
// //todo 7
// whereAmI(19.037, 72.873);
// //Response {type: "cors", url: "https://geocode.xyz/52.508,13.381?geoit=json", redirected: false, status: 200, ok: true, …}
// //{statename: {…}, distance: "0.000", elevation: "39", osmtags: {…}, state: "Berlin", …}
// //You are in Berlin, Germany
// whereAmI(-33.933, 18.474);
// //Response {type: "cors", url: "https://geocode.xyz/-33.933,18.474?geoit=json", redirected: false, status: 200, ok: true, …}
// //{statename: {…}, distance: "0.000", elevation: "21", osmtags: {…}, state: "Western Cape", …}
// //You are in Cape Town, South Africa
/*
//@@ The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec time'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});
console.log('Test end');
//Test start
//Test end
//Resolved promise 1
//Resolved promise 2
//0 sec time

//@@ Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening ⚪⚫');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win 💰');
    } else {
      reject(new Error('You lost your money 💸'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//* Promisifying setTimeout
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.error(x));
//Lottery draw is happening ⚪⚫
//abc
//Error: Problem
//1 second passed
//You Win 💰
//2 second passed
//3 second passed
//4 second passed

//@@ Promisifying the Geolocation API
console.log('Getting Position');
//Getting Position

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));
//GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1614858786072}

const whereAmI2 = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      console.log(res);

      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })

    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })

    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => console.error(`${err.message} 💥`));
};
btn.addEventListener('click', whereAmI2);
//Response {type: "cors", url: "https://geocode.xyz/13.769113599999999,100.4732416?geoit=json", redirected: false, status: 200, ok: true, …}
//{statename: {…}, distance: "0.172", elevation: "9", osmtags: {…}, state: "TH", …}
//You are in อรุณอมรินทร์, Thailand
*/
/**
 * * Coding Challenge #2
 * ? For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen.
 * TODO Your tasks PART 1:
 * todo 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path
 * todo 2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the 'error' event), reject the promise
 * todo 3. If this part is too tricky for you, just watch the first part of the solution
 * TODO Your tasks PART 2:
 * todo 4. Consume the promise using .then and also add an error handler
 * todo 5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
 * todo 6. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that 😉)
 * todo 7. After the second image has loaded, pause execution for 2 seconds again
 * todo 8. After the 2 seconds have passed, hide the current image
 * ! Test data :
 * ! Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
 **/
//todo 5
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};

//todo 1
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    //todo 2
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
// todo 3
// let currentImg;
//
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     //todo 5
//     return wait(2);
//   })
//   //todo 4
//   .then(() => {
//     //todo 6
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));
/*
//@@ Consuming Promises with Async/Await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI3 = async function (country) {
  try {
    //* Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //* Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //* Country data
    //   fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
    //     console.log(res)
    //   );

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    console.log(res);

    if (!resGeo.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    //* Reject Promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');

//@@ Returning Values from Async Functions
// const city = whereAmI3();
// console.log(city);

// whereAmI3()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));
//1: Will get location

(async function () {
  try {
    const city = await whereAmI3();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
//Promise {<pending>}
//{statename: {…}, distance: "0.172", elevation: "9", osmtags: {…}, state: "TH", …}
//Response {type: "cors", url: "https://restcountries.eu/rest/v2/name/thailand", redirected: false, status: 200, ok: true, …}
//[{…}]
//2: You are in อรุณอมรินทร์, Thailand
//3: Finished getting location

//@@ Error Handling With try...catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

//@@ Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3Countries('thailand', 'china', 'usa');
//(3) ["Bangkok", "Beijing", "Washington, D.C."]

//@@ Other Promise Combinators: race, allSettled
//* Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/thailand`),
    getJSON(`https://restcountries.eu/rest/v2/name/china`),
    getJSON(`https://restcountries.eu/rest/v2/name/usa`),
  ]);
  console.log(res[0]);
})();
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/japan`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

//{name: "Thailand", topLevelDomain: Array(1), alpha2Code: "TH", alpha3Code: "THA", callingCodes: Array(1), …}
//{name: "Japan", topLevelDomain: Array(1), alpha2Code: "JP", alpha3Code: "JPN", callingCodes: Array(1), …}

//* Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));
//(3) [{…}, {…}, {…}]
//0: {status: "fulfilled", value: "Success"}
//1: {status: "fulfilled", value: "Error"}
//2: {status: "fulfilled", value: "Another success"}
Promise.all([
  Promise.resolve('Success'),
  Promise.resolve('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
//(3) ["Success", "Error", "Another success"]
//0: "Success"
//1: "Error"
//2: "Another success"

//* Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.resolve('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
//Success
*/
/**
 * * Coding Challenge #3
 * TODO Your tasks PART 1:
 * todo 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
 * todo 2. Compare the two versions, think about the big differences, and see which one you like more
 * todo 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G” in the dev tools Network tab
 * TODO Your tasks PART 2:
 * todo 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
 * todo 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
 * todo 3. Check out the 'imgs' array in the console! Is it like you expected?
 * todo 4. Use a promise combinator function to actually get the images from the array 😉
 * todo 5. Add the 'parallel' class to all the images (it has some CSS styles)
 * ! Test data Part 2:
 * ! ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function
 **/
//* Part1
const loadNPause = async function () {
  try {
    //* Load image1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    //* Load image2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

//* Part2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    //(3) [Promise, Promise, Promise]

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    //(3) [img, img, img]

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
