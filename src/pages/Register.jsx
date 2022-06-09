import React, { useEffect, useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserAuthenticated, postRegister } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const expression = {
    regexName: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
    regexEmail: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexLetra: /[A-z]/,
    regexMayuscula: /[A-Z]/,
    regexNumero: /\d/,
    regexLetrasYNumeros: /[^a-zA-Z0-9]/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const validate = (value) => {
    const errors = {};
    const regexPassword = expression.regexPassword;

    if (!value.name) {
      errors.name = "Name is required";
    }
    if (!value.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!value.password) {
      errors.password = "Password is required";
    } else if (regexPassword.test(value.password) === false) {
      errors.password =
        "Password must be at least 8 characters, with at least one capital letter and one number";
    }
    if (!(value.confirmPassword === value.password)) {
      errors.confirmPassword = "Password does not match";
    }
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.email)) {
      errors.email = "Email is not valid";
    }
    return errors;
  };

  const showPassword = () => {
    var tipo = document.getElementById("register-password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };
  const showConfirmPassword = () => {
    var tipo = document.getElementById("register-confirm-password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validate(values));
    setIsSubmit(true);
    try {
      if (
        values.name === "" ||
        values.lastname === "" ||
        values.password === "" ||
        values.confirmPassword === "" ||
        values.email === ""
      ) {
        return toast.error("Complete all fields");
      } else {
        const response = await dispatch(
          postRegister({
            name: values.name,
            lastname: values.lastname,
            password: values.password,
            email: values.email,
          })
        );
        setValues(initialValues);
        if (response) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.payload)
          );
          navigate(redirect || "/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(error);
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log(values);
    }
  }, [error]);


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


  const inputStyle =
    "border-[2px] border-silver rounded-lg outline-[#8a4af3] p-2 focus:border-[#8a4af3] ease-linear duration-200 min-w-0";

  const buttonStyle =
    "mt-5 flex justify-center bg-[#ee6c4d] text-white font-medium rounded-md p-2 ease-linear duration-200";
  const activeButtonStyle =
    " hover:bg-white hover:text-[#ee6c4d] hover:scale-[1.0.5] hover:border-[2px] hover:shadow-md hover:border-[#ee6c4d] cursor-pointer";
  const disableButtonStyle = " opacity-50";

  return (
    <div className="flex justify-center w-[100%] h-[100vh] bg-[#98c1d9]">
      <div className="flex flex-col absolute top-[20%] shadow-lg border-silver border-[2px] bg-white rounded-lg p-5 mobile:w-[90%]">
        <h1 className="text-3xl ">REGISTER</h1>

        {/* First Name Last Name */}
        <div className="flex mt-7 w-auto">
          <input
            className={inputStyle + ` mr-3`}
            name="name"
            type="text"
            placeholder="First Name"
            onChange={handleOnChange}
            value={values.name}
            required
          />
          {<p className="text-red-500">{error.name}</p>}
          <input
            className={inputStyle}
            name="lastname"
            type="text"
            placeholder="Last Name"
            onChange={handleOnChange}
            value={values.lastname}
          />
          {<p className="text-red-500">{error.lastname}</p>}
        </div>

        {/* Email */}
        <input
          className={inputStyle + ` mt-7 mobile:w-[100%]`}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleOnChange}
          value={values.email}
          required
        />
        {<p className="text-red-500">{error.email}</p>}
        {/* {error.email && (
          <p className="text-red-500 text-xs italic">{error.email}</p>
        )} */}

        {/* Password */}
        <div className="flex mt-7">
          <input
            id="register-password"
            className={inputStyle + ` mr-1`}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleOnChange}
            value={values.password}
            required
          />
          {<p className="text-red-500">{error.password}</p>}
          <span
            className=" rounded-sm m-2 hover:bg-[#98c1d9] hover:cursor-pointer"
            onClick={showPassword}
          >
            <VisibilityIcon />
          </span>

          <input
            id="register-confirm-password"
            className={inputStyle}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleOnChange}
            value={values.confirmPassword}
            required
          />

          <span
            className=" rounded-sm m-2 hover:bg-[#98c1d9] hover:cursor-pointer"
            onClick={showConfirmPassword}
          >
            <VisibilityIcon />
          </span>
          {<p className="text-red-500">{error.confirmPassword}</p>}

          {/* {error.password && (
            <p className="text-red-500 text-xs italic">{error.password}</p>
          )} */}
        </div>
        <div className="flex justify-center">
          <span className="flex-1 mr-3"></span>
          <span className="flex-1 text-red-500">
            {/* {state.errors.confirm} */}
          </span>
        </div>

        {/* Submit button */}
        <input
          type="button"
          className={
            error.confirm
              ? buttonStyle + disableButtonStyle
              : buttonStyle + activeButtonStyle
          }
          value="Sign up"
          onClick={handleSubmit}
        />
        <Link to="/signin">
          <div className="text-sm">
            <span
              htmlFor="register"
              className="font-medium text-[#3d5a80] hover:text-[#293241]"
            >
              Already have an account?{" "}
            </span>
          </div>
        </Link>

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

        <input
          type="button"
          className={
            error.confirm
              ? buttonStyle + disableButtonStyle
              : buttonStyle + activeButtonStyle
          }
          value="Go back to Home"
          onClick={() => navigate("/")}
        />
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

export default Register;
