"use strict";

const button = document.querySelector("button");
const section = document.querySelector("section");
const lloverHoy = document.getElementById("city");
const refresh = document.querySelector("refresh");
const main = document.querySelector("main");
const actualHour = new Date();
const now = new Date();
now.getHours();
console.log(now.getHours());

if (now.getHours() >= 7 && now.getHours() <= 14) {
  container.classList.remove("night");
  container.classList.add("morning");
}
if (now.getHours() >= 15 && now.getHours() <= 19) {
  container.classList.remove("morning");
  container.classList.add("after");
}
if (now.getHours() >= 20) {
  container.classList.remove("after");
  container.classList.add("night");
  button.classList.add("dark");
  button2.classList.add("dark");
}

button2.style.display = "none";

button.addEventListener("click", () => {
  let longitud;
  let latitud;
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      const crd = pos.coords;
    }
    function error(err) {
      alert(`¡Para decirte el tiempo, necesitamos conocer tu geolocalización!`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    navigator.geolocation.getCurrentPosition((posicion) => {
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
      // console.log(latitud, longitud);
      const url = `https://api.tutiempo.net/json/?lan=es&apid=qCY44X4zazXf33p&ll=${latitud},${longitud}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          lloverHoy.textContent = `Usted se encuentra en: ${data.locality.name}`;

          for (let y = 1; y <= 8; y++) {
            const siLLueve = data.hour_hour[`hour${y}`].text;
            console.log(siLLueve);
            if (
              siLLueve === "Cubierto con lluvia" ||
              siLLueve === "Muy nuboso con lluvias" ||
              siLLueve === "Cubierto con lluvias" ||
              siLLueve === "Parcilmente nuboso con lluvias" ||
              siLLueve === "Parcilamente nuboso con lluvia"
            ) {
              const h1 = document.createElement("h1");
              h1.textContent = "En las próximas 8h lloverá";
              main.append(h1);
              break;
            }
            if (y >= 8) {
              const h1 = document.createElement("h1");
              h1.textContent = "En las próximas 8h no lloverá";
              main.append(h1);
            }
          }

          for (let i = 1; i <= 8; i++) {
            const { humidity, date, temperature, hour_data, text } =
              data.hour_hour[`hour${i}`];
            const article = document.createElement("article");
            const h2 = document.createElement("h2");
            const temperatureP = document.createElement("p");
            const humidityP = document.createElement("p");
            const icono = document.createElement("img");
            const horaP = document.createElement("p");
            const dateP = document.createElement("p");

            h2.textContent = text;
            temperatureP.textContent = `${temperature}ºC`;
            humidityP.textContent = `${humidity}% Hum`;
            horaP.textContent = hour_data;
            dateP.textContent = date;

            switch (text) {
              case `Despejado`:
                icono.src = "/animated/day.svg";
                break;
              case `Cubierto`:
              case `Parcialmente nuboso`:
                icono.src = "/animated/cloudy-day-1.svg";
                break;
              case `Muy nuboso`:
              case "Nubes dispersas":
                icono.src = "/animated/cloudy.svg";
                break;
              case "Cubierto con lluvia":
              case "Parcialmente nuboso con lluvias":
                icono.src = "/animated/rainy-5.svg";
                break;
              case "Muy nuboso con lluvias":
              case "Muy nuboso con lluvia":
              case "Cubierto con lluvias":
                icono.src = "/animated/rainy-7.svg";
                break;
              case "Cubierto con tormentas":
                icono.src = "/animated/thunder.svg";
            }

            article.append(h2, temperatureP, icono, humidityP, horaP, dateP);
            section.append(article);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});

button.addEventListener("click", (buttom) => {
  button.style.display = "none";
  button2.style.display = "";
});
button2.addEventListener("click", (buttom) => {
  location.reload();
});


