import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

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
  const [isDark, setIsDark] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);

  // Fix: Use useEffect to properly handle theme changes
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Custom styles for react-select to match your theme
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark
        ? "var(--formBackgroundDark)"
        : "var(--formBackgroundLight)",
      borderColor: isDark ? "#374151" : "#d1d5db",
      color: isDark ? "var(--textColorDark)" : "var(--textColorLight)",
      boxShadow: state.isFocused
        ? isDark
          ? "0 0 0 2px var(--accent)"
          : "0 0 0 2px var(--primary)"
        : "none",
      borderWidth: "1px",
      minHeight: "42px",
      "&:hover": {
        borderColor: isDark ? "#4b5563" : "#9ca3af",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark
        ? "var(--formBackgroundDark)"
        : "var(--formBackgroundLight)",
      border: isDark ? "1px solid #374151" : "1px solid #d1d5db",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? isDark
          ? "var(--accent)"
          : "var(--primary)"
        : state.isFocused
        ? isDark
          ? "#374151"
          : "#f3f4f6"
        : "transparent",
      color: state.isSelected
        ? isDark
          ? "var(--black)"
          : "var(--white)"
        : isDark
        ? "var(--textColorDark)"
        : "var(--textColorLight)",
      "&:active": {
        backgroundColor: isDark ? "var(--accent)" : "var(--primary)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "var(--textColorDark)" : "var(--textColorLight)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280",
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? "var(--textColorDark)" : "var(--textColorLight)",
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
        longDescription: editor?.getText(),
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
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`w-11/12 max-w-4xl mx-auto p-8 rounded-xl shadow-lg transition-all duration-300 ${
        isDark ? "card-dark" : "card-light"
      }`}
    >
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold mb-2 ${
            isDark ? "text-accent-dark" : "text-accent-light"
          }`}
        >
          Add a New Pet
        </h2>
        <p
          className={`text-sm ${
            isDark ? "text-dark" : "text-light"
          } opacity-70`}
        >
          Help pets find their forever homes
        </p>
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
          <Form className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-3">
              <label
                className={`block font-semibold text-sm uppercase tracking-wide ${
                  isDark ? "text-dark" : "text-light"
                }`}
              >
                Pet Image <span className="text-red-400">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                  isDark
                    ? "border-gray-600 hover:border-gray-500 bg-gray-800/30"
                    : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <div
                    className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      isDark ? "text-dark" : "text-light"
                    }`}
                  >
                    Click to upload pet image
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-dark" : "text-light"
                    } opacity-60`}
                  >
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {values.image && (
                <div
                  className={`p-3 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-sm ${isDark ? "text-dark" : "text-light"}`}
                  >
                    Selected:{" "}
                    <span className="font-medium text-green-500">
                      {values.image.name}
                    </span>
                  </p>
                </div>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-400 text-sm flex items-center gap-1"
              />
            </div>

            {/* Grid Layout for Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  className={`block font-semibold text-sm uppercase tracking-wide ${
                    isDark ? "text-dark" : "text-light"
                  }`}
                >
                  Pet Name <span className="text-red-400">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter pet's name"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    isDark
                      ? "form-dark text-dark border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      : "form-light text-light border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label
                  className={`block font-semibold text-sm uppercase tracking-wide ${
                    isDark ? "text-dark" : "text-light"
                  }`}
                >
                  Pet Age <span className="text-red-400">*</span>
                </label>
                <Field
                  type="text"
                  name="age"
                  placeholder="e.g., 2 years, 6 months"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    isDark
                      ? "form-dark text-dark border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      : "form-light text-light border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  }`}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label
                  className={`block font-semibold text-sm uppercase tracking-wide ${
                    isDark ? "text-dark" : "text-light"
                  }`}
                >
                  Category <span className="text-red-400">*</span>
                </label>
                <Select
                  options={categoryOptions}
                  value={values.category}
                  onChange={(option) => setFieldValue("category", option)}
                  styles={selectStyles}
                  placeholder="Select pet category..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  className={`block font-semibold text-sm uppercase tracking-wide ${
                    isDark ? "text-dark" : "text-light"
                  }`}
                >
                  Pickup Location <span className="text-red-400">*</span>
                </label>
                <Field
                  type="text"
                  name="location"
                  placeholder="City, State"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                    isDark
                      ? "form-dark text-dark border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      : "form-light text-light border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  }`}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label
                className={`block font-semibold text-sm uppercase tracking-wide ${
                  isDark ? "text-dark" : "text-light"
                }`}
              >
                Short Description <span className="text-red-400">*</span>
              </label>
              <Field
                type="text"
                name="shortDescription"
                placeholder="Brief description of the pet (max 100 characters)"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? "form-dark text-dark border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    : "form-light text-light border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                }`}
              />
              <ErrorMessage
                name="shortDescription"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <label
                className={`block font-semibold text-sm uppercase tracking-wide ${
                  isDark ? "text-dark" : "text-light"
                }`}
              >
                Long Description <span className="text-red-400">*</span>
              </label>
              <div
                className={`border rounded-lg min-h-[180px] p-4 transition-all duration-300 ${
                  isDark
                    ? "form-dark border-gray-600 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20"
                    : "form-light border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/20"
                }`}
              >
                <EditorContent
                  editor={editor}
                  className={`outline-none ${
                    isDark ? "text-dark" : "text-light"
                  }`}
                />
              </div>
              <p
                className={`text-xs ${
                  isDark ? "text-dark" : "text-light"
                } opacity-60`}
              >
                Provide detailed information about the pet's personality,
                habits, and care requirements
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  isSubmitting || uploading
                    ? "opacity-50 cursor-not-allowed scale-95"
                    : "hover:scale-105 shadow-lg hover:shadow-xl"
                } ${
                  isDark
                    ? "button-dark hover:brightness-110"
                    : "button-light hover:brightness-110"
                }`}
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6"
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
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Pet</span>
                  </>
                )}
              </button>
              <ErrorMessage
                name="submit"
                component="div"
                className="text-red-400 text-sm mt-3 text-center font-medium"
              />
            </div>
          </Form>
        )}
      </Formik>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: isDark
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900",
        }}
      />
    </div>
  );
};

export default AddPet;
