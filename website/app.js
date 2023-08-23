let d = new Date();
let newDate = d.toDateString();
// The URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=1250c4a70d3788f24babcb2cb2be84ee&units=metric";
const server = "http://127.0.0.1:6000";
//error
const error = document.getElementById("error");
const generateData = () => { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  //promise
  getWeatherData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp: Math.round(temp),
        description,
        feelings,
      };
      postData(server + "/add", info);
      updatingUI();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};
//listener
document.getElementById("generate").addEventListener("click", generateData);
//GET 
const getWeatherData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();
    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
//
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
//
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
