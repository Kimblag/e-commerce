import React, { useState } from "react";
import { LockClosedIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserAuthenticated, postLogIn } from "../redux/actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  function validate(value) {
    let error = {};

    if (/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(input.email)) {
      error.email = "Please enter a valid email";
    } else if (!input.email || !input.password) {
      error.incomplete = "Missing Fields";
    }
    return error;
  }

  const handleOnChange = (e) => {
    setInput((PreValue) => ({
      ...PreValue,
      [e.target.name]: e.target.value,
    }));
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (input.email === "" || input.password === "") {
        return toast.error("Please complete all fields");
      } else {
        const response = await dispatch(
          postLogIn({
            email: input.email,
            password: input.password,
          })
        );

        setInput({
          email: "",
          password: "",
        });

        if (response?.payload) {
          window.localStorage.setItem(
            "userInfo",
            //! extraer solo la info necesaria del response.payload
            JSON.stringify(response.payload)
          );
          navigate("/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const showPassword = () => {
    var tipo = document.getElementById("password-login");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };
  console.log(input);

  const handleGoogleLogin = async () => {
    let timer = null;
    const newWindow = window.open(
      `${process.env.REACT_APP_API_URL}/signin/google`,
      "_blank",
      "width=600,height=600"
    );
    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          const response = await dispatch(fetchUserAuthenticated());
          console.log(response.payload);
          if (response.payload) {
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify({
                id: response.payload.id,
                email: response.payload.email,
                name: response.payload.name,
                lastname: response.payload.lastname,
                roleId: response.payload.roleId,
                isVerified: response.payload.isVerified,
                "province/region": response.payload["province/region"],
                city: response.payload.city,
                address: response.payload.address,
                addres2: response.payload.addres2,
                zipcode: response.payload.zipcode,
              })
            );
            // closeLogin();
            navigate(redirect || "/");
          }
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/18383/lock.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password-login"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleOnChange}
              />
              <span
                className="bg-[#3d5a80] text-white rounded-md p-1 m-2 hover:bg-[#e0fbfc] hover:text-black cursor-pointer"
                onClick={showPassword}
              >
                Show Password
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <Link to="/register">
            <div className="text-sm">
              
              <span
                htmlFor="register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                Don't have an account?{" "}
              </span>
            </div>
                </Link>

            <div className="text-sm">
              <a
                href="#!"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className=" btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="px-7 py-3 text-gray-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          style={{ backgroundColor: "white" }}
        >
          <img
            className="mr-2"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google button"
          />{" "}
          Continue with Google
        </button>
        <div>
            <button
              type="button"
              onClick={() => navigate("/")}
             
              className=" btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowNarrowLeftIcon
                  className="h-5 w-5 text-white group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Go back to Home
            </button>
          </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default Login;
