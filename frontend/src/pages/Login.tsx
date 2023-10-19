const Login = () => {
  return (
    <div className="grid place-content-center items-center min-h-screen bg-snow gap-8">
      <div className="mx-auto">
        <img src="/images/logo-devlinks-large.svg" alt="logo" />
      </div>
      <form className="bg-white p-12 max-w-[650px] rounded-md">
        <div className="heading">
          <h1 className="text-h-m-b font-bold mb-2 text-richBlack">Login</h1>
          <p className="text-mediumGrey text-b-m">
            Add your details below to get back into the app
          </p>
        </div>

        <div className="formGroup w-full flex flex-col gap-4">
          <label htmlFor="email" className="mt-8">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. hello@gmail.com"
            className="bg-email bg-no-repeat p-2 ps-8 bg-[left_0.4rem_bottom_0.5rem] outline-none bg-[length:20px] border-solid border-2 border-lightGrey rounded-md "
          />
          <label htmlFor="password" className="mt-2 ">
            Password
          </label>
          <input
            id="password"
            type="email"
            placeholder="e.g. hello@gmail.com"
            className="bg-password bg-no-repeat p-2 ps-8 bg-[left_0.4rem_bottom_0.5rem] outline-none bg-[length:20px] border-solid border-2 border-lightGrey rounded-md "
          />
        </div>
        <button className="bg-royalBlue text-white rounded-md p-3  w-full mt-5">
          Login
        </button>

        <p className="mt-4 text-center text-mediumGrey">
          Don't have an account?{" "}
          <a href="" className="text-royalBlue ">
            Create account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
