import { useState } from "react";
import { toast } from "react-toastify";
import { SearchType } from "../types";

type NavbarAppProps = {
  fetchWather: (searching: SearchType) => void;
};

export const NavbarApp = ({ fetchWather }: NavbarAppProps) => {
  const [searching, setSearching] = useState<SearchType>({
    city: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearching({
      ...searching,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searching).includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    fetchWather(searching);
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 py-3 ">
      <div className="container flex items-center justify-evenly gap-10">
        <div>
          <img className="h-20 w-20" src="/logo.png" alt="" />
        </div>

        <form className="flex items-center gap-4  " onSubmit={handleSumbit}>
          <label htmlFor="city" className="mr-2 font-bold text-white text-xl">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Ej. Tacna, Arequipa"
            className="border border-gray-400 rounded-lg py-1 px-5 mr-2 input-lg"
            onChange={handleChange}
            value={searching.city}
          />

          <input
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            value={"Buscar"}
          />
        </form>
      </div>
    </nav>
  );
};
