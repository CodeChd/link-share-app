const Profile = () => {
  return (
    <div className="grid grid-cols-[minmax(300px,_800px)_1fr] gap-5 px-5 ">
      <div
        id="left"
        className="bg-white p-[5rem] flex justify-center rounded-lg"
        style={{ height: "calc(800px)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="308"
          height="632"
          fill="none"
          viewBox="0 0 308 632"
        >
          <path
            stroke="#737373"
            d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
          />
          <path
            fill="#fff"
            stroke="#737373"
            d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
          />
          <circle cx="153.5" cy="112" r="48" fill="#EEE" />
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
          <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
          <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
        </svg>
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

        <div className="absolute left-0 border-t-2 border-solid w-full flex justify-end p-4 px-8 mt-[2.1rem] items-center">
          <button className="p-3 px-8 mt-4 rounded-lg bg-lavender text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
