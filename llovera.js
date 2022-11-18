"use strict";
const button = document.querySelector("button");
const section = document.querySelector("section");

button.addEventListener("click", () => {
  let longitud;
  let latitud;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      latitud = "x";
      longitud = posicion.coords.longitude;
      console.log(latitud, longitud);
      const url = `https://api.tutiempo.net/json/?lan=es&apid=qCY44X4zazXf33p&ll=${latitud},${longitud}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

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
            humidityP.textContent = `${humidity}%`;
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
              case "Nubes dispersas":
                icono.src = "/animated/cloudy.svg";
                break;
              case "Cubierto con lluvias":
              case "Parcialmente nuboso con lluvias":
                icono.src = "/animated/rainy-5.svg";
                break;
              case "Muy nuboso con lluvias":
                icono.src = "/animated/thunder.svg";
                break;
            }
            article.append(h2, temperatureP, icono, humidityP, horaP, dateP);
            section.append(article);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    prompt("Lo siento no hemos podido localizar tu ubicación");
  }
});
