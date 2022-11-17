"use strict";
const button = document.querySelector("button");
const section = document.querySelector("section");
button.addEventListener("click", () => {
  let longitud;
  let latitud;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
      console.log(latitud, longitud);
      const url = `https://api.tutiempo.net/json/?lan=es&apid=qCY44X4zazXf33p&ll=${latitud},${longitud}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //   console.log(data);
          
          for (let i = 1; i <= 8; i++) {
            const { humidity, date, temperature, hour_data, text } =
              data.hour_hour[`hour${i}`];
            const article = document.createElement("article");
            const h2 = document.createElement("h2");
            const temperatureP = document.createElement("p");
            const humidityP = document.createElement("p");
            const icono = document.createElement("img");
            const dateP = document.createElement("p");
            const horaP = document.createElement("p");
            h2.textContent = text;
            temperatureP.textContent = temperature;
            humidityP.textContent = humidity;
            horaP.textContent = hour_data;
            dateP.textContent = date;
            switch (text) {
              case `Despejado`:
                icono.src = "/animated/day.svg";
                break;
              case `Cubierto`:
                icono.src = "/animated/cloudy-day-1.svg";
                break;
              case `Parcialmente nuboso`:
              case `Muy nuboso`:
                icono.src = "/animated/cloudy.svg";
                break;
              case "Cubierto con lluvias":
                icono.src = "/animated/rainy-5.svg";
                break;
            }
            article.append(h2, temperatureP, icono, humidityP, dateP, horaP);
            section.append(article);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});