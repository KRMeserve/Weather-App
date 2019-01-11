window.addEventListener('load', ()=>{
    // window-onload function

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = 'http://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/421cd01c35427adde43cc9065b597509/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                    .then(data =>{
                        console.log(data);
                        const {temperature, summary, icon} = data.currently;
                        // set DOM elements from the API.
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        // Set Icon
                        setIcons(icon, document.querySelector('.icon'));

                        // Formula for Celcius
                        let celcius = (temperature - 32) * (5 / 9);

                        //change F to C degrees
                        temperatureSection.addEventListener('click', ()=>{
                            if(temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C"
                                temperatureDegree.textContent = Math.floor(celcius);
                            } else {
                                temperatureSpan.textContent = "F"
                                temperatureDegree.textContent = temperature;
                            }
                        });
                    })
        })
    } else {
        h1.textContent = "Please enable your browser's location tracking."
    };

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});
