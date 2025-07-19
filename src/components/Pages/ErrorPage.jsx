import React from "react";
import { MdError, MdHome, MdRefresh, MdArrowBack } from "react-icons/md";

const ErrorPage = ({
  errorCode = "500",
  title = "Something went wrong",
  message = "We're experiencing some technical difficulties. Please try again later.",
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry = () => window.location.reload(),
  onHome = () => (window.location.href = "/"),
  onBack = () => window.history.back(),
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <MdError className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">{errorCode}</h1>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <MdRefresh className="w-4 h-4" />
              Try Again
            </button>
          )}

          {showHome && (
            <button
              onClick={onHome}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <MdHome className="w-4 h-4" />
              Go Home
            </button>
          )}

          {showBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <MdArrowBack className="w-4 h-4" />
              Go Back
            </button>
          )}
        </div>

        {/* Support Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem persists, please contact our{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Usage examples for different error types
export const Error404 = () => (
  <ErrorPage
    errorCode="404"
    title="Page Not Found"
    message="The page you're looking for doesn't exist or has been moved."
    showRetry={false}
    showBack={true}
  />
);

export const Error403 = () => (
  <ErrorPage
    errorCode="403"
    title="Access Forbidden"
    message="You don't have permission to access this resource."
    showRetry={false}
    showBack={true}
  />
);

export const Error500 = () => (
  <ErrorPage
    errorCode="500"
    title="Internal Server Error"
    message="We're experiencing some technical difficulties. Please try again later."
  />
);

export const NetworkError = () => (
  <ErrorPage
    errorCode="⚠️"
    title="Connection Error"
    message="Unable to connect to our servers. Please check your internet connection and try again."
    showBack={true}
  />
);

export default ErrorPage;
