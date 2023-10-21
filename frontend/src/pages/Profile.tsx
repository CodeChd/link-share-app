const Profile = () => {
  return (
    <div className="grid grid-cols-[minmax(300px,_800px)_1fr] gap-5 px-5 ">
      <div
        id="left"
        className="bg-white p-[5rem] flex justify-center rounded-lg"
        style={{ height: "calc(800px)" }}
      >
        <img src="/images/illustration-phone-mockup.svg" alt="" />
      </div>

      <div id="right" className="relative bg-white p-[2rem] rounded-md">
        <div>
          <h1 className="text-h-m-b font-bold text-richBlack">
            Profile Details
          </h1>
          <p className="text-b-m text-mediumGrey mt-2">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div
          id="user-image"
          className="overflow-hidden w-full flex flex-col gap-8 justify-center items-center my-6 rounded-md "
        >
          <div
            id="upload-image"
            className="grid grid-cols-[2fr_1fr_1fr] place-items-center gap-4 bg-lightGrey/20 p-4 rounded-mdx "
          >
            <div className="w-full">
              <h3 className="text-mediumGrey text-b-m">Profile picture</h3>
            </div>

            <label
              htmlFor="upload"
              className="bg-babyPowder cursor-pointer w-48 h-48 flex justify-center items-center rounded-md "
            >
              <input
                type="file"
                id="upload"
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
              <div className="flex flex-col justify-center items-center text-royalBlue font-bold  ">
                <img src="/images/icon-upload-image.svg" alt="" />
                <p>+ Upload image</p>
              </div>
            </label>

            <p className="text-mediumGrey max-w-[30vw] mx-auto text-b-s">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>

          <div
            id="user-input"
            className="gap-8 bg-lightGrey/20 p-4 rounded-md w-full flex flex-col justify-between"
          >
            <div id="first-name" className="flex justify-between">
              <label
                htmlFor="fname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey"
              >
                First name*
              </label>
              <input
                type="text"
                placeholder="e.g.Cj"
                className="w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue placeholder:text-mediumGrey/50"
              />
            </div>
            <div id="last-name" className="flex justify-between ">
              <label
                htmlFor="fname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey"
              >
                Last name*
              </label>
              <input
                type="text"
                placeholder="e.g.Francisco"
                className="w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue placeholder:text-mediumGrey/50"
              />
            </div>
            <div id="Email" className="flex justify-between ">
              <label
                htmlFor="fname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g.email@example.com"
                className="w-[85%] bg-email bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue placeholder:text-mediumGrey/90 "
              />
            </div>
          </div>


        </div>

        <div className="absolute left-0 border-t-2 border-solid w-full flex justify-end p-4 px-8 mt-[3.6rem]">
          <button className="p-3 px-8 rounded-lg bg-lavender text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
