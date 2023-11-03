import { FormEvent, useState } from "react";
import { useRegisterUserMutation } from "../context/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../context/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [registerUser, { isLoading: loadingRegister }] =
    useRegisterUserMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError(true);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password mismatched!");
        return;
      }

      const res = await registerUser({ email, password }).unwrap();
      dispatch(setCredentials({ isloggedIn: res.isloggedIn }));
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="grid place-content-center items-center min-h-screen gap-8 px-4">
      <div className="mx-auto">
        <img src="/images/logo-devlinks-large.svg" alt="logo" />
      </div>
      <form
        className="bg-white p-12 rounded-md w-[30rem] max-w-[650px] max-lg:w-full"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="heading ">
          <button className="text-h-m-b font-bold mb-2 text-richBlack ">
            Create account
          </button>
          <p className="text-mediumGrey text-b-m tracking-wide">
            Let’s get you started sharing your links!
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
            placeholder="At least 8 characters"
            className={`bg-password bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid focus:border-royalBlue focus:drop-shadow-input
            ${
              error && password.length <= 0
                ? "border-crimson"
                : "border-lightGrey"
            }
            `}
          />
          <label
            htmlFor="confirmPassword"
            className={`mt-2 flex justify-between ${
              error && confirmPassword.length <= 0 ? "text-crimson" : ""
            }`}
          >
            Confirm password
            {error && confirmPassword.length <= 0 && (
              <span className="relative inline-block translate-y-[3.2rem] -translate-x-4">
                Can't be empty
              </span>
            )}
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            type="password"
            placeholder="At least 8 characters"
            className={`bg-password bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid focus:border-royalBlue focus:drop-shadow-input
            ${
              error && confirmPassword.length <= 0
                ? "border-crimson"
                : "border-lightGrey"
            }
            `}
          />
        </div>
        <button
          type="submit"
          className="bg-royalBlue text-white rounded-md p-3  w-full mt-5 hover:bg-lavender transition-colors ease-out disabled:bg-lavender/40"
        >
          {loadingRegister ? "Loading" : "Register"}
        </button>

        <p className="mt-4 text-center text-mediumGrey">
          Already have an account?{" "}
          <a href="/login" className="text-royalBlue ">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
