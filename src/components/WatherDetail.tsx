import { Wather } from "../hooks/useWather";



type WatherDetailProps = {
  whater: Wather;
};

export const WatherDetail = ({ whater }: WatherDetailProps) => {
  return (
    <>
      <main className="container mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center">Pronostico del Clima</h1>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {whater.daily.data.map((day, index) => (
            <div
              key={index}
              className="bg-gradient-to-bl from-cyan-300 to-blue-500 bg-opacity-10 p-5 rounded-lg shadow-l "
            >
              <h2 className="text-2xl font-bold text-center text-white">
                {day.day}
              </h2>

              <img
                src={`/weather_icons/set04/big/${day.icon}.png`}
                alt={day.weather}
                className="h-48 w-48 mx-auto mt-10"
              />

              <div className="mx-auto text-center font-bold text-white">
                Latitud: {whater.lat}
              </div>
              <div className="mx-auto text-center font-bold text-white">
                Longitud: {whater.lon}
              </div>
              <p className="text-justify max-w-30 mt-5 text-white uppercase">
                {day.summary}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
