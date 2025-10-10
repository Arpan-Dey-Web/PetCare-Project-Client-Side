import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { FaUpload, FaPlus } from "react-icons/fa";

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
  image: Yup.mixed().required("Image is required"),
});

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[120px] p-4",
      },
    },
  });

  // Custom styles for react-select
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#d97706" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(217, 119, 6, 0.2)" : "none",
      minHeight: "44px",
      "&:hover": {
        borderColor: "#d97706",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid #d1d5db",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#d97706"
        : state.isFocused
        ? "#fef3c7"
        : "white",
      color: state.isSelected ? "white" : "#111827",
      "&:active": {
        backgroundColor: "#d97706",
      },
    }),
  };

  const handleAddPet = async (
    values,
    resetForm,
    setFieldError,
    setSubmitting
  ) => {
    try {
      setUploading(true);

      const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
          formData
        );

        return response.data.data.url;
      };

      const imageUrl = await handleImageUpload(values.image);

      const newPet = {
        name: values.name,
        age: values.age,
        category: values.category.value,
        location: values.location,
        shortDescription: values.shortDescription,
        longDescription: editor?.getText() || "",
        image: imageUrl,
        adopted: false,
        owner: user?.email,
        ownerName: user?.displayName,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/pet", newPet);

      toast.success("Pet added successfully!");
      resetForm();
      editor?.commands.setContent("");
    } catch (err) {
      setFieldError("submit", "Failed to add pet. Please try again.");
      toast.error("Failed to add pet. Please try again.");
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Add a New Pet
          </h2>
          <p className="text-gray-600">Help pets find their forever homes</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            age: "",
            category: null,
            location: "",
            shortDescription: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setFieldError, setSubmitting }) =>
            handleAddPet(values, resetForm, setFieldError, setSubmitting)
          }
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pet Image <span className="text-red-500">*</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-amber-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload pet image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {values.image && (
                  <div className="mt-2 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Selected:{" "}
                      <span className="font-medium text-green-600">
                        {values.image.name}
                      </span>
                    </p>
                  </div>
                )}
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Grid Layout for Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter pet's name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet Age <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="age"
                    placeholder="e.g., 2 years, 6 months"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={categoryOptions}
                    value={values.category}
                    onChange={(option) => setFieldValue("category", option)}
                    styles={selectStyles}
                    placeholder="Select pet category..."
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="location"
                    placeholder="City, State"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="shortDescription"
                  placeholder="Brief description of the pet"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
                <ErrorMessage
                  name="shortDescription"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Long Description
                </label>
                <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent transition">
                  <EditorContent editor={editor} className="prose max-w-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Provide detailed information about the pet's personality and
                  care requirements
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="w-full flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
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
                    <>
                      <FaPlus className="w-5 h-5" />
                      <span>Add Pet</span>
                    </>
                  )}
                </button>
                <ErrorMessage
                  name="submit"
                  component="div"
                  className="text-red-500 text-sm mt-3 text-center font-medium"
                />
              </div>
            </Form>
          )}
        </Formik>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "bg-white text-gray-900",
          }}
        />
      </div>
    </div>
  );
};

export default AddPet;
