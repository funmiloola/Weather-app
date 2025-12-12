import { useEffect, useState } from "react";

export default function MainDisplay() {
  const [details, setDetails] = useState(null);
  const [input, setInput] = useState("");
  const getImage = () => {
        const condition = details?.weather?.[0]?.main
        if (condition === "Clouds") {
        return '/Images/pexels-pixabay-209831.jpg'
        }
        else if (condition === "Rain") {
            return '/Images/pexels-hikaique-125510.jpg'
        }
        else if (condition === "Snow"){
            return '/Images/b06f943926a83ec5b06a2071e25d680051ebd181.jpg'
        }
        else if (condition === "Clear") {
            return '/Images/pexels-helenalopes-4409461.jpg'
        }
        else {
            return '/Images/luminous-clouds-7435175_1280 (1).jpg'
        }
        
 }
  const fetchData = (lat, lon, cityName) => {
  let url = "";
    
  if (cityName) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => setDetails(data))
    .catch((error) => console.log(error));
};

 useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
            fetchData(position.coords.latitude, position.coords.longitude)
            
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
 }, []);
    const handleKeyup = (event) => {
        if (event.key === "Enter" && input.trim() !== "") {
            fetchData(null, null, input)
            setInput(' ')
        }
    }
  const options = [
    { name: "Temp max", value: details?.main?.temp_max, img: "/Icons/Vector (15).svg" },
    { name: "Temp min", value: details?.main?.temp_min, img: "/Icons/Vector (16).svg" },
    { name: "Humudity", value: details?.main?.humidity, img: "/Icons/outline (3).svg" },
    { name: "Cloud", value: details?.clouds?.all, img: "/Icons/outline (1).svg" },
    { name: "Wind", value: details?.wind?.speed, img: "/Icons/outline (2).svg" },
  ];
   
  return (
   <section className="relative w-full h-screen font-roboto overflow-hidden">
  <img
    src={getImage()}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="hidden xl:block absolute right-0 top-0 h-screen w-[30%] backdrop-blur-md bg-white/10 z-20"></div>
  <div className="absolute inset-0 z-30 flex flex-col xl:flex-row w-full h-full justify-between">
    <div className="w-full xl:w-[70%] px-6 xl:pl-20 pt-6 flex flex-col h-full">
      <div className="flex items-center justify-between xl:hidden w-full ">
        <img src="/Icons/logo.svg" className="w-20" />

        <div className="flex items-center gap-2 w-[60%] pb-3  border-b border-white">
          <input
            type="text"
            placeholder="Search Location..."
            className="outline-none bg-transparent text-white w-full placeholder:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyup}
          />
          <img src="/Icons/fa_search.svg" className="w-6 h-6" />
        </div>
      </div>
      <img src="/Icons/logo.svg" className="hidden xl:block w-28" />
      <div
        className="
          flex flex-col xl:flex-row items-center justify-center xl:justify-start xl:items-end gap-4
          text-center xl:text-left
          mt-10 xl:mt-0
          flex-grow pb-16"
      >
        {details && (
          <>
            <p className="text-[80px] xl:text-[103px] text-white leading-none">
              {details.main.temp}°
            </p>

            <div>
              <h2 className="text-4xl xl:text-5xl text-white">{details.name}</h2>

              <p className="text-white text-base xl:text-lg">
                {new Date(details.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {new Date(details.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "2-digit",
                })}
              </p>
            </div>

            <img
              src="/Icons/Cloudy.svg"
              className="w-20 h-20 xl:w-16 xl:h-16 mx-auto xl:mx-0"
            />
          </>
        )}
      </div>
    </div>
    <div
      className="
        w-full xl:w-[30%]
        mt-0 xl:mt-0
        px-6
        pb-10
        relative
        z-40
        
      "
    >
      <div className="hidden xl:flex items-center justify-between w-full pb-3 border-b border-white pt-3">
        <input
          type="text"
          placeholder="Search Location..."
          className="outline-none bg-transparent text-white w-full pr-2 placeholder:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyup}
        />
        <img src="/Icons/fa_search.svg" className="w-6 h-6" />
      </div>
      <div className="pt-10">
        <h2 className="text-white pb-1 text-lg">Weather Details...</h2>
        <h3 className="text-white pb-4 text-sm">
          THUNDERSTORM WITH LIGHT DRIZZLE
        </h3>

        <ul className="flex flex-col gap-6 w-full xl:w-auto mx-auto">
          {options.map((option, index) => (
            <li key={index} className="flex justify-between items-center text-white">
              <span>{option.name}</span>
              <div className="flex gap-1 items-center">
                <span>{option.value}</span>
                <img src={option.img} className="w-4 h-4" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

  );
}
