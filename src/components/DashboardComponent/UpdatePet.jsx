import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import Loading from "../SharedComponent/Loading";

const imgbbAPI = import.meta.env.VITE_imgbb_api_key;

const categoryOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Other", label: "Other" },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Pet name is required"),
  age: Yup.string().required("Pet age is required"),
  category: Yup.object().required("Pet category is required"),
  location: Yup.string().required("Location is required"),
  shortDescription: Yup.string().required("Short description is required"),
  // image optional on update
});

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [initialValues, setInitialValues] = useState(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axiosSecure.get(`/pet/${id}`);
        const pet = res.data;

        setInitialValues({
          name: pet.name,
          age: pet.age,
          category: categoryOptions.find((opt) => opt.value === pet.category),
          location: pet.location,
          shortDescription: pet.shortDescription,
          image: null,
        });

        if (editor) editor.commands.setContent(pet.longDescription || "");
      } catch (error) {
    
        toast.error("Failed to load pet data.");
      }
    };
    if (id) fetchPet();
  }, [id, axiosSecure, editor]);

  if (!initialValues)
    return (
      <div>
        <Loading />
      </div>
    );

  const handleUpdatePet = async (
    values,
    resetForm,
    setFieldError,
    setSubmitting
  ) => {
    try {
      setUploading(true);

      let imageUrl = initialValues.image; // keep old image by default

      if (values.image) {
        const formData = new FormData();
        formData.append("image", values.image);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
          formData
        );
        imageUrl = response.data.data.url;
      }

      const updatedPet = {
        name: values.name,
        age: values.age,
        category: values.category.value,
        location: values.location,
        shortDescription: values.shortDescription,
        longDescription: editor?.getText(),
        image: imageUrl,
      };

      const res = await axiosSecure.put(`/pets/${id}`, updatedPet);

      toast.success("Pet updated successfully!");
      // navigate("/dashboard/my-pets");
    } catch (err) {
    
      setFieldError("submit", "Failed to update pet. Please try again.");
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-11/12 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Update Pet</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) =>
          handleUpdatePet(
            values,
            helpers.resetForm,
            helpers.setFieldError,
            helpers.setSubmitting
          )
        }
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Pet Image (Upload new to replace)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {values.image && typeof values.image !== "string" && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected:{" "}
                  <span className="font-medium">{values.image.name}</span>
                </p>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Pet Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Pet Age
              </label>
              <Field
                type="text"
                name="age"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Category
              </label>
              <Select
                options={categoryOptions}
                value={values.category}
                onChange={(option) => setFieldValue("category", option)}
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Pickup Location
              </label>
              <Field
                type="text"
                name="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Short Description
              </label>
              <Field
                type="text"
                name="shortDescription"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="shortDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Long Description
              </label>
              <div className="border border-gray-300 rounded-md bg-white min-h-[150px] p-2">
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
                ${
                  isSubmitting || uploading
                    ? "bg-blue-300 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Uploading Image...</span>
                  </>
                ) : (
                  <span>Update Pet</span>
                )}
              </button>
              <ErrorMessage
                name="submit"
                component="div"
                className="text-red-500 text-sm mt-2 text-center"
              />
            </div>
          </Form>
        )}
      </Formik>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdatePet;
