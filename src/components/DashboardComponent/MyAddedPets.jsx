import React, { useContext, useState, useEffect } from "react";

import { Await, Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const petsPerPage = 10;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axiosSecure.get(`/pets/${user?.email}`);
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    if (user?.email) fetchPets();
  }, [user?.email]);

  const handleAdopt = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your Pet is Adopted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Adopted",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/pets/adopt/${id}`);
        setPets((prev) =>
          prev.map((pet) => (pet._id === id ? { ...pet, adopted: true } : pet))
        );

        Swal.fire({
          title: "Congratulations!!",
          text: "Your pet has been adopted",
          icon: "success",
        });
      }
    });
  };

 const handleDelete = (pet) => {
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         await axiosSecure.delete(`/pets/${pet._id}`);
         setPets((prev) => prev.filter((p) => p._id !== pet._id));
         Swal.fire({
           title: "Deleted!",
           text: "Your pet has been deleted",
           icon: "success",
         });
       } catch (error) {
         Swal.fire({
           title: "Error!",
           text: "Failed to delete pet. Please try again.",
           icon: "error",
         });
         console.error("Delete failed:", error);
       }
     }
   });
 };


  const currentPets = pets.slice((page - 1) * petsPerPage, page * petsPerPage);
  const totalPages = Math.ceil(pets.length / petsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Added Pets</h1>
      <div className="overflow-x-auto">
        <table className="table w-full shadow-2xl">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Adoption Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {currentPets.map((pet, index) => (
              <tr className="p-2" key={pet._id}>
                <td>{(page - 1) * petsPerPage + index + 1}</td>
                <td>{pet.name}</td>
                <td>{pet.category}</td>
                <td>
                  <img
                    src={pet.image}
                    alt="Pet"
                    className="w-16 object-cover rounded"
                  />
                </td>
                <td>{pet.adopted ? "Adopted" : "Not Adopted"}</td>
                <td className="space-x-2">
                  <Link to={`/dashboard/update-pet/${pet._id}`}>
                    <button className="bg-blue-500 px-4 py-2 rounded-xl text-white">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      handleDelete(pet);
                    }}
                    className="bg-red-500 px-4 py-2 rounded-xl text-white"
                  >
                    Delete
                  </button>
                  {!pet.adopted && (
                    <button
                      onClick={() => handleAdopt(pet._id)}
                      className="bg-green-500 px-4 py-2 rounded-xl text-white"
                    >
                      Mark Adopted
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedPets;
