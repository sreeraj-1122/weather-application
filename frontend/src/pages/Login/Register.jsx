import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { useSnackbar } from "notistack";

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestData = {
        name,
        email,
        password,
      };
      const response = await axios.post(`${baseUrl}/register`, requestData);

      console.log(response);

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        enqueueSnackbar("Registration successful", { variant: "success" });

        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === "Email already exists.") {
          enqueueSnackbar("Email already exists", { variant: "error" });
        }
        if (
          error.response.data.error ===
          "Password must be between 6 and 12 characters."
        ) {
          enqueueSnackbar("Password must be between 6 and 12 characters.", {
            variant: "error",
          });
        }
        if (error.response.data.error === "Fill required fields.") {
          enqueueSnackbar("Fill required fields.", { variant: "error" });
        }
      }
      console.error("Registration error:", error);
      enqueueSnackbar("Server error.", { variant: "error" });

    }
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-sky-300">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
              Sign up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Register
              </button>
              <p className="text-base font-light text-gray-300 dark:text-gray-300">
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="font-medium  text-white hover:underline dark:text-white-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
