import { FormEvent, useState } from "react";
import { useLoginUserMutation } from "../context/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../context/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError(true);
      }
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ isloggedIn: Boolean(res.isloggedIn) }));
      toast.success(res.message);
      navigate("/");
    } catch (error: any) {
      console.log(error.error);
    }
  };

  return (
    <div className="grid place-content-center items-center min-h-screen  gap-8 px-4">
      <div className="max-phone:mx-0 max-phone:px-8 mx-auto">
        <img src="/images/logo-devlinks-large.svg" alt="logo" className="w-56"/>
      </div>
      <form
        className="phone:bg-white max-phone:p-8 p-12 rounded-md phone:w-[30rem] max-w-[650px] max-lg:w-full"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="heading ">
          <button className="text-h-m-b font-bold mb-2 text-richBlack ">
            Login
          </button>
          <p className="text-mediumGrey text-b-m tracking-wide">
            Add your details below to get back into the app
          </p>
        </div>

        <div className="formGroup w-full flex flex-col gap-4 ">
          <label
            htmlFor="email"
            className={`flex justify-between mt-8 ${
              error && email.length <= 0 ? "text-crimson" : ""
            }`}
          >
            Email
            {error && email.length <= 0 && (
              <span className="relative inline-block translate-y-[3.2rem] -translate-x-4">
                Can't be empty
              </span>
            )}
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="e.g. hello@gmail.com"
            className={`bg-email bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue focus:drop-shadow-input
            ${
              error && email.length <= 0 ? "border-crimson" : "border-lightGrey"
            }
            `}
          />
          <label
            htmlFor="password"
            className={`mt-2 flex justify-between ${
              error && password.length <= 0 ? "text-crimson" : ""
            }`}
          >
            Password
            {error && password.length <= 0 && (
              <span className="relative inline-block translate-y-[3.2rem] -translate-x-4">
                Can't be empty
              </span>
            )}
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter your password"
            className={`bg-password bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid focus:border-royalBlue focus:drop-shadow-input
            ${
              error && password.length <= 0
                ? "border-crimson"
                : "border-lightGrey"
            } 
            `}
          />
        </div>
        <button
          type="submit"
          className="bg-royalBlue text-white rounded-md p-3  w-full mt-5 hover:bg-lavender transition-colors ease-out disabled:bg-lavender/40 "
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="mt-4 text-center text-mediumGrey">
          Don't have an account?{" "}
          <a href="/register" className="text-royalBlue ">
            Create account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
