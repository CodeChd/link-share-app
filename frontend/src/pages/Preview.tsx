import { Link } from "react-router-dom";

const Preview = () => {
  return (
    <>
      <div className="bg-royalBlue h-[25rem] w-full p-7 rounded-bl-[3rem] rounded-br-[3rem]">
        <div className="bg-white p-2 rounded-lg w-full">
          <nav className=" p-2  w-full flex justify-between">
            <Link
              to="/"
              className="p-3 px-8  text-center font-bold rounded-md border-royalBlue text-royalBlue border-solid  border "
            >
              Back to Editor
            </Link>
            <button className="rounded-md p-2 px-8 text-white bg-royalBlue font-bold ">
              Share Link
            </button>
          </nav>
        </div>
      </div>

      <div className="rounded-lg mx-auto w-full h-64 max-w-[350px] drop-shadow-lg bg-white -mt-[5rem] p-4 flex flex-col items-center justify-center">
        <div className="text-center">
          {/* <img
            className="inline-block aspect-square text-center rounded-full border-4 border-solid border-royalBlue object-none"
            src=""
            alt=""
            width="112"
            height="112"
          /> */}

          <p className="text-royalBlue font-bold text-h-m-b">NO IMAGE</p>
     
          <h1 className="text-h-m-b text-center text-richBlack font-bold my-2">
            CJ
          </h1>
          <h2 className="text-h-s-b text-center text-mediumGrey">
            test2gmail.com
          </h2>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Preview;
