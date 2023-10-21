const Home = () => {
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
            Customize your links
          </h1>
          <p className="text-b-m text-mediumGrey mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <button className="border-solid border-royalBlue border text-royalBlue hover:bg-babyPowder/50 hx rounded-md w-full mt-[2rem] p-2 font-bold">
          + Add new link
        </button>

        <div
          id="links"
          className="h-[30rem] overflow-y-auto flex justify-center items-center bg-lightGrey/20 my-6 rounded-md "
        >
          <div className="text-center ">
            <img
              src="/images/illustration-empty.svg"
              alt="get_started"
              className="m-auto"
            />
            <h2 className="text-richBlack text-h-m-b font-bold">
              Let's get you started
            </h2>
            <p className="text-mediumGrey max-w-[30vw] mx-auto">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>

        </div>
          <div className="absolute left-0 border-t-2 border-solid w-full flex justify-end p-4 px-8">
            <button className="p-3 px-8 rounded-lg bg-lavender text-white">Save</button>
          </div>
      </div>
    </div>
  );
};

export default Home;
