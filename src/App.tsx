import { CircleLoader } from "react-spinners";
import { NavbarApp } from "./components/NavbarApp";
import { useWather } from "./hooks/useWather";
import { WatherDetail } from "./components/WatherDetail";

export const App = () => {
  const { whater, isLoading, fetchWather, hasData } = useWather();

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavbarApp fetchWather={fetchWather} />

      {isLoading && <CircleLoader className="mx-auto my-auto" size={80} />}

      {hasData && <WatherDetail whater={whater} />}

      {!isLoading && !hasData && (
        <main className="container mx-auto mt-10">
          <h1 className="text-4xl font-bold text-center">
            Bienvenido a mi app
          </h1>
          <p className="text-center text-lg mt-5">
            Busca el clima de tu ciudad
          </p>
        </main>
      )}

      <footer
        className="bg-gray-200 py-3 text-center"
        style={{ marginTop: "auto" }}
      >
        <p>
          Todos los derechos reservados{" - "}
          <span className="font-bold">DarckDress</span>
        </p>
      </footer>
    </div>
  );
};
