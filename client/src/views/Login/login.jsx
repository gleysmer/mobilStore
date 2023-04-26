import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../helpers/Auth";
import Swal from "sweetalert2";
import { LoginSuccess } from "../../redux/actions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

export default function Login(){

  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [control, setControl] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleUser = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
    setLoginError("");
    setControl("");
  };

  const validateForm = () => {

    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!regex.test(user.email)){
      errors.email = 'Ingrese un formato válido de correo.';
    }
  
    if(!user.password){
      errors.password = 'Ingrese una contraseña válida.';
    }
  
    setErrors(errors);
    return Object.keys(errors).length;
  }

  const data = useSelector((state) => state.User);
  const admin = data?.data_user?.rol;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validateForm() !== 0){
      alert("TIENES ERRORES");
    }
    
    else {
      AuthService.Login(user).then((response) => {

        // GUARDAMOS SOLO LA DATA QUE NECESITAMOS, LO DEMÁS LO DESCARTAMOS

        const data = {
          data_user: response.data.data.dataValues,
          token: response.data.data.token,
        };

        dispatch(LoginSuccess(data));
          
          if(data.data_user.rol === "admin"){
            Swal.fire({
              icon: "success",
              title: "Congratulations!",
              text: response.data.message,
              confirmButtonText: "Continue",
            });
            navigate("/DashBoard");
          } else {
            Swal.fire({

              icon: "success",
              title: "Congratulations!",
              text: response.data.message,
              confirmButtonText: "Continue",
            });
            navigate("/");
          }
        }).catch((response) => {
          console.log(response)
          return Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: response.response.data.message,
          })
        })}
  }

  return (
    <div className="">
      <Header />

      <div className="h-[calc(100vh-6.7rem)] bg-gray-200 dark:bg-gray-800 flex justify-center p-10">
        <div className=" w-[600px] h-[600px]  flex flex-col justify-center my-auto items-center rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-800">
          <h1 className="text-black dark:text-slate-100 fond-bold text-4xl font-medium mb-8 mt-4">
            Login to your account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-around items-center"
          >
            <div className="w-4/5">
              <label className="font-bold text-slate-900 dark:text-slate-100">
                Email
              </label>
            </div>

            <input
              onChange={handleUser}
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              autoComplete="off"
              className="w-4/5 p-1 my-2 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-cyan-900"
            />
            <p className="h-8 text-red-400">{loginError}</p>

            <div className="w-4/5">
              <label className="font-bold text-slate-900 dark:text-slate-100">
                Password
              </label>
            </div>

            <div className="w-4/5 my-2 flex items-center relative ">
              <input
                onChange={handleUser}
                type={seePassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={user.password}
                autoComplete="off"
                className="w-full  p-1 focus:outline-none focus:shadow-outline border border-gray-300"
              />
              <span
                onClick={() => {
                  setSeePassword(!seePassword);
                }}
                className="absolute right-2"
              >
                <BsEyeSlash />
              </span>
            </div>

            <button
              type="submit"
              className="block rounded-lg p-2 mt-8 mb-2 text-white font-medium w-4/5 bg-gradient-to-r from-red-500 to-blue-900"
            >
              LOGIN
            </button>
            <p className="text-red-400">{control}</p>
          </form>

          <div className="w-4/5 flex justify-between items-center text-center">
            <div className="w-full h-px bg-black rounded-full dark:bg-slate-100"></div>
            <div className="mx-5 text-black dark:text-slate-100">Or</div>
            <div className="w-full h-px bg-black rounded-full dark:bg-slate-100"></div>
          </div>
          <button className="login-auth">
            <GoogleAuth />
          </button>

          <p className="text-slate-900 dark:text-slate-100 py-3">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-900 dark:text-blue-300 underline"
            >
              Sign up here
            </Link>
          </p>
          <Link
            to={"/passwordReset"}
            className="text-blue-900 dark:text-blue-300 underline"
          >
            I forgot my password
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
