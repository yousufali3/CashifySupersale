import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API } from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user agreed to the terms
    if (!agreeToTerms) {
      toast.error(
        "You must agree to the Terms and Conditions & Privacy Policy."
      );
      return; // Prevent submission
    }

    const url = isLogin
      ? `${BACKEND_API}/api/auth/login`
      : `${BACKEND_API}/api/auth/register`;
    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Store token and username in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      // Show success toast message

      toast.success(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-teal-500 p-8 flex flex-col justify-between min-h-[200px]">
              <h2 className="text-white text-3xl font-bold">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              {/* Update the image src to use an absolute path */}
              <img
                src="/src/assets/LoginImage.svg"
                alt="Cashify"
                className="w-1/2"
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <button onClick={handleClose} className="float-right">
                <X className="h-6 w-6 text-gray-500" />
              </button>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border rounded"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded"
                />
                {isLogin && (
                  <a
                    href="/forget-password"
                    className="text-sm text-teal-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                    I agree to the Terms and Conditions & Privacy Policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              <p className="mt-4 text-sm text-center">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-teal-500 hover:underline"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
