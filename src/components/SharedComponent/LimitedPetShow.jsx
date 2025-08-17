import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Heart, Share2, PawPrint } from "lucide-react";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router";

const LimitedPetShow = () => {
  const [pets, setPets] = useState([]);
  const [likedPets, setLikedPets] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/limitedPets").then((res) => setPets(res.data));
  }, []);

  const toggleLike = (petId) => {
    setLikedPets((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-6xl font-bold mb-3">
          Our Featured Pets
          <PawPrint className="inline ml-2" />
        </h2>
        <p className="max-w-2xl mx-auto">
          Meet these adorable friends looking for their forever homes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <Card
            key={pet._id}
            className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden group pt-0 pb-5"
          >
            {/* Image with floating buttons */}
            <div className="relative overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <Badge className="absolute top-3 right-3 text-sm font-medium">
                {pet.category}
              </Badge>
            </div>

            {/* Pet details */}
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                {pet.name}
              </CardTitle>
              <CardDescription className="text-green-600 font-medium">
                {pet.breed}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink-500" />
                  <span>{pet.age} years old</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{pet.location}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Link to={`/pets/${pet._id}`} className="w-full">
                <Button
                  className="w-full   shadow-md transition-all hover:shadow-lg"
                  value={` View more`}
                ></Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/pets">
          <Button
            variant="outline"
            size="lg"
            value={"View All Available Pets"}
            className=""
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default LimitedPetShow;
