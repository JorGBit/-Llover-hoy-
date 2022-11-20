"use strict";
const button = document.querySelector("button");
const section = document.querySelector("section");
const lloverHoy = document.getElementById("city");
const refresh = document.querySelector("refresh");
const main = document.querySelector("main");

button2.style.display ="none";

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
          lloverHoy.textContent = `Nos encontramos en: ${data.locality.name}`
          
          for (let y = 1; y <= 8; y++) {
            const siLLueve = data.hour_hour[`hour${y}`].text;
            if (
              siLLueve === "Cubierto con lluvias" ||
              siLLueve === "Parcilmente nuboso con lluvias" ||
              siLLueve === "Muy nuboso con lluvias"
            ) {
              const h1 = document.createElement("h1");
              h1.textContent = "En las proximas 8h lloverá";
              body.append(h1);
              break;
            } else {
              const h1 = document.createElement("h1");
              h1.textContent = "En las proximas 8h no lloverá";
              main.append(h1);
              break;
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
            
            const displayBackgroundImage =(data)=>{
             dayHour=hour_data;
             if (dayHour>6&&dayHour<18){
              Container.classList.remove("night");
              Container.classList.add("day")
             }
             else {
              container.classList.remove("day");
              container.classList.add("night");
             }
            }
          }

        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});

button.addEventListener('click', (buttom) => {
 button.style.display ="none";
 button2.style.display = "";


 
//  button.type = 'button'; 
//  button.innerText = 'Haz Click'; 
//  document.body.appendChild(button); 
// // refresh.addEventListener('click', (e) => {
// //   location.reload();
})
button2.addEventListener('click',(buttom)=>{
  location.reload();
}
)
