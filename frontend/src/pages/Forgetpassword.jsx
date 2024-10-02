import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending reset password email
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Simulate API call to send reset password link
    try {
      // Add actual API call logic here.
      // For example:
      // const response = await fetch('/api/send-reset-password', { method: 'POST', body: { email } });
      // if (response.ok) { ... }

      setError("");
      setSuccessMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setError("Failed to send reset link. Please try again later.");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex flex-col p-8">
          <button onClick={handleClose} className="self-end">
            <X className="h-6 w-6 text-gray-500" />
          </button>
          <h2 className="text-3xl font-bold text-teal-500 text-center">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a reset password link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
