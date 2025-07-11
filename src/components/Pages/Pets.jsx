import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../SharedComponent/Loading";
import PetCard from "../SharedComponent/PetCard";
const url = import.meta.env.VITE_API;

const Pets = () => {
  const {
    data: pets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["unadoptedPets"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/available-pets`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center p-10">
        {" "}
        <Loading />{" "}
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-600 p-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Adoptable Pets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet, index) => (
          <PetCard pet={pet} key={index}></PetCard>
        ))}
      </div>
    </div>
  );
};

export default Pets;
