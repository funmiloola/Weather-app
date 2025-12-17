import { useEffect, useState } from "react";

export default function MainDisplay() {
  const [details, setDetails] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState("")
  

  const fetchData = (lat, lon, cityName) => {
    setLoading(true);
    setError("")
    let url = cityName
      ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`;

    fetch(url)
      .then((res) => res.json())
        .then((data) => {
            if (data.cod !== 200) {
                setError("Location not found")
                setDetails(null)
                setLoading(false)
                return;
          }
        setDetails(data);
        setLoading(false);
      })
        .catch(() => {
            setError("Something went wrong")
            setLoading(false)
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchData(pos.coords.latitude, pos.coords.longitude);
      },
      () => setLoading(false)
    );
  }, []);

  const handleKeyup = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      fetchData(null, null, input);
      setInput("");
    }
  };
const getImage = () => {
    const condition = details?.weather?.[0]?.main;
    if (condition === "Clouds") return "/Images/pexels-pixabay-209831.jpg";
    if (condition === "Rain") return "/Images/valentin-muller-bWtd1ZyEy6w-unsplash (1).jpg";
    if (condition === "Snow")
      return "/Images/aditya-vyas-PzhmEp_aDU4-unsplash.jpg";
  if (condition === "Clear") return "/Images/grooveland-designs-zjoydJb17mE-unsplash.jpg";
  if (condition === "Thunderstorm") return"/Images/max-larochelle-uu-Jw5SunYI-unsplash.jpg"
    return "/Images/jonathan-bowers-BqKdvJ8a5TI-unsplash.jpg";
  };
  const options = [
    {
      name: "Temp max",
      value: `${details?.main?.temp_max}°`,
      img: "/Icons/Vector (15).svg",
    },
    {
      name: "Temp min",
      value: `${details?.main?.temp_min}°`,
      img: "/Icons/Vector (16).svg",
    },
    {
      name: "Humidity",
      value: `${details?.main?.humidity}%`,
      img: "/Icons/outline (3).svg",
    },
    {
      name: "Cloud",
      value: `${details?.clouds?.all}%`,
      img: "/Icons/outline (1).svg",
    },
    {
      name: "Wind",
      value: `${details?.wind?.speed}km/h`,
      img: "/Icons/outline (2).svg",
    },
  ];

  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/20 rounded-md ${className}`}></div>
  );

    return (
<>
        {
            error ? (
                    <>
                  <div className="text-black text-center mt-20 font-roboto">
    <h2 className="text-2xl font-semibold">Not Found</h2>
    <p className="opacity-80">
      The location you entered does not exist.
    </p>
  </div>      
          </>
      ) : (
          <section className="relative w-full h-screen font-roboto overflow-hidden">
      {loading ? (
        <div className="w-full h-full absolute bg-gray-400"></div>
      ) : (
        <img
          src={getImage()}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="hidden xl:block absolute right-0 top-0 h-full w-[30%] backdrop-blur-md bg-white/10 z-[15]" />

      <div className="absolute inset-0 z-[20] flex flex-col xl:flex-row xl:justify-between h-full w-full">
        <div className="w-full xl:w-[70%] px-6 xl:pl-20 pt-6 flex flex-col xl:h-full">
          <div className="flex items-center justify-between xl:hidden pb-3">
            {loading ? (
              <Skeleton className="w-20 h-8" />
            ) : (
              <img src="/Icons/logo.svg" className="w-20" />
            )}
            <div className="w-[60%] border-b border-white pb-2 flex items-center gap-2">
              {loading ? (
                <Skeleton className="w-full h-6" />
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search Location..."
                    className="bg-transparent text-white outline-none w-full placeholder:text-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyup}
                  />
                  <img src="/Icons/fa_search.svg" className="w-6 h-6" />
                </>
              )}
            </div>
          </div>
          {loading ? (
            <Skeleton className="w-28 h-10 hidden xl:block" />
          ) : (
            <img src="/Icons/logo.svg" className="hidden xl:block w-28" />
          )}
          <div className="flex  items-center justify-start pl-1 md:pl-5 xl:pl-0 pt-40 xl:pt-0 xl:justify-start xl:items-end gap-1.5 md:gap-4 text-center xl:text-left flex-grow xl:pb-16">
            {loading ? (
              <>
                <Skeleton className="w-32 h-24" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-40 h-8" />
                  <Skeleton className="w-32 h-5" />
                </div>
                <Skeleton className="w-20 h-20" />
              </>
            ) : (
              <>
                <p className="text-[35px] md:text-[70px] xl:text-[103px] text-white leading-none">
                  {details.main.temp}°
                </p>
                <div className="flex flex-col items-start">
                  <h2 className="text-base md:text-2xl xl:text-5xl text-white">
                    {details.name}
                  </h2>
                  <p className="text-white">
                    {new Date(details.dt * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    -
                    {new Date(details.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </p>
                </div>
                <img
                  src="/Icons/Cloudy.svg"
                  className="w-8 h-8 xl:w-16 xl:h-16"
                />
              </>
            )}
          </div>
        </div>
        <div className="w-full xl:w-[30%] px-6 pb-10 relative z-[25] pt-10">
          <div className="hidden xl:flex items-center justify-between border-b border-white pb-3">
            {loading ? (
              <Skeleton className="w-full h-6" />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search Location..."
                  className="bg-transparent text-white outline-none w-full pr-2 placeholder:text-white"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={handleKeyup}
                />
                <img src="/Icons/fa_search.svg" className="w-6 h-6" />
              </>
            )}
          </div>
          <div className="pt-10">
            {loading ? (
              <>
                <Skeleton className="w-40 h-6 mb-3" />
                <Skeleton className="w-52 h-4 mb-6" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="w-full h-6 mb-4" />
                ))}
              </>
            ) : (
              <>
                <h2 className="text-white text-center xl:text-left text-lg pb-4">
                  Weather Details...
                </h2>
                <h3 className="text-white text-center xl:text-left pb-4 text-sm">
                  THUNDERSTORM WITH LIGHT DRIZZLE
                </h3>
                <ul className="flex flex-col gap-12 pt-4  xl:gap-6 px-8 xl:px-0">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-white"
                    >
                      <span>{option.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span>{option.value}</span>
                        <img src={option.img} className="w-6 h-6" />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section> 
      )}
            </>
   
  );
}
