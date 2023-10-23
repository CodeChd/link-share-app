import { useState } from "react";
import platforms from "../data/platformSlice";
import { PlatformType } from "../data/platformSlice";
import { LinkType, removeLink } from "../context/linkSlice";
import { useDispatch } from "react-redux";

interface PlatformValue {
  image: string;
  name: string;
}

const Links = ({ data }: { data: LinkType }) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [platform, setPlatform] = useState({} as PlatformValue);

  const IsClicked = () => {
    setIsClicked(!isClicked);
  };

  const PlatformHandler = (platform: PlatformType) => {
    const { image, name } = platform;
    setPlatform((current) => ({ ...current, image, name }));
    setIsClicked(!isClicked);
  };

  const DeleteLink = () => {
    dispatch(removeLink(data.id));
  };
  return (
    <div
      aria-label="Card-link"
      className="w-full h-[14.5rem] bg-lightGrey/20 p-4 rounded-lg relative"
    >
      <div className="flex justify-between">
        <p className="text-mediumGrey text-h-s-b font-bold">
          <span className="cursor-pointer inline-block mr-3">
            <img
              src="/images/icon-drag-and-drop.svg"
              alt="Hold to drag this link"
              className="object-cover w-4"
            />
          </span>
          Link #{data.id}
        </p>
        <button
          onClick={DeleteLink}
          className="bg-transparent text-mediumGrey text-b-m"
        >
          Remove
        </button>
      </div>

      <div className="mt-4 ">
        <label htmlFor="platform" className="text-b-s block">
          Platform
        </label>

        <div className="relative p-4 rounded-md overflow-hidden bg-white mt-1">
          <legend className="absolute top-2 text-mediumGrey text-b-m">
            {platform.image && platform.name ? (
              <button className="flex gap-4 bg-white w-full">
                <img
                  src={platform.image}
                  alt={platform.name}
                  width="18"
                  className="mt-1"
                />
                <p className="text-richBlack">{platform.name}</p>
              </button>
            ) : (
              "Select Platform"
            )}
          </legend>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            fill="none"
            viewBox="0 0 14 9"
            className={`ms-auto ${isClicked ? "rotate-180" : ""}`}
          >
            <path stroke="#633CFF" strokeWidth="2" d="m1 1 6 6 6-6" />
          </svg>

          <button
            className=" absolute inset-0 w-full"
            onClick={IsClicked}
          ></button>
        </div>

        {isClicked && (
          <ul className="absolute w-[97%] z-10 rounded-md h-48 overflow-y-auto drop-shadow-lg mt-2">
            {platforms.map((platform) => (
              <li key={platform.id}>
                <button
                  onClick={() => PlatformHandler(platform)}
                  className="flex gap-4 bg-white w-full p-2 py-5"
                >
                  <img src={platform.image} alt={platform.name} width="25" />
                  <p className="text-richBlack">{platform.name}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="link" className="text-b-s mt-4 mb-1 block">
          Link
        </label>
        <input
          type="text"
          placeholder="e.g.https://www.github.com/CodeChd"
          className=" mt-1 w-full bg-link bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue placeholder:text-mediumGrey/90"
        />
      </div>
    </div>
  );
};

export default Links;
