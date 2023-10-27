import { ChangeEvent, useState } from "react";
import platforms from "../data/platforms";
import { PlatformType } from "../data/platforms";
import { LinkType, addLink, removeLink } from "../context/linkSlice";
import { useDispatch } from "react-redux";

const Links = ({
  data,
  attributes,
  listeners,
  setNodeRef,
  style,
}: {
  data: LinkType;
  attributes: any;
  listeners: any;
  setNodeRef: any;
  style: any;
}) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [link, setLink] = useState<string>(data?.link || "");

  const PlatformHandler = (platform: PlatformType) => {
    setIsClicked(!isClicked);
    //Update platform with link id
    dispatch(addLink({ ...platform, id: data.id, link: "" }));
  };

  const UpdateLinkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    // Update link with link id
    dispatch(addLink({ ...data, id: data.id, link }));
  };

  const DeleteLink = () => {
    dispatch(removeLink(data.id));
  };

  const IsClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      aria-label="Card-link"
      className="w-full h-[14.5rem] bg-lightGrey/20 p-4 rounded-lg relative"
    >
      <div className="flex justify-between cursor-default">
        <p className="text-mediumGrey text-h-s-b font-bold">
          <span
            {...listeners}
            className="cursor-pointer inline-block mr-3 px-2"
          >
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

      <div className="mt-4  cursor-default">
        <p className="text-b-s block">Platform</p>

        <div
          id="platform"
          className="relative p-4 rounded-md overflow-hidden bg-white mt-1"
        >
          <legend className="absolute top-2 text-mediumGrey text-b-m">
            {data.name && data.image ? (
              <button className="flex gap-4 bg-white w-full">
                <img
                  src={data.image}
                  alt={data.name}
                  width="18"
                  className="mt-1"
                />
                <p className="text-richBlack">{data.name}</p>
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
                  <img
                    src={platform.image}
                    alt={platform.name}
                    width="25"
                    height="25"
                  />
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
          id="link"
          type="text"
          value={link}
          onChange={UpdateLinkHandler}
          placeholder="e.g.https://www.github.com/CodeChd"
          className=" mt-1 w-full bg-link bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue placeholder:text-mediumGrey/90"
        />
      </div>
    </div>
  );
};

export default Links;
