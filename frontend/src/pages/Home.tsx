import Links from "../components/Links";
import { useDispatch, useSelector } from "react-redux";
import { LinkType } from "../context/linkSlice";
import { addLink } from "../context/linkSlice";
import isObjectEmpty from "../utils/isObjectEmpty";

export interface LinkState {
  link: {
    linkItem: LinkType[];
  };
}

const Home = () => {
  const dispatch = useDispatch();
  const { linkItem } = useSelector((state: LinkState) => state.link);

  const AddLink = () => {
    const newLink = { id: linkItem.length + 1, image: "", name: "", link: "" };
    dispatch(addLink({ ...newLink }));
  };

  return (
    <div className="grid max-xl:grid-cols-[1fr_1fr] grid-cols-[minmax(300px,_780px)_1fr] gap-5 px-5 ">
      <div
        id="left"
        className="bg-white p-[5rem] flex justify-center rounded-lg"
        style={{ height: "calc(800px)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="305"
          height="630"
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

          {linkItem.map((x) => (
            <foreignObject
              key={x.id}
              width="100%"
              height="44"
              x="0"
              y={x.id * 60 + 215}
              rx="4"
            >
              <a
                href={x.link}
                target="_blank"
                className="bg-[#EEE] grid grid-cols-[auto_1fr_auto] gap-2 px-4 mx-8 h-[44px] rounded-md overflow-hidden items-center text-left"
              >
                <img src={x.image} alt={x.name} />
                <p className="text-richBlack ">{x.name}</p>
              </a>
            </foreignObject>
          ))}
        </svg>
      </div>

      <div id="right" className="relative bg-white rounded-md">
        <div className="px-[2rem] my-5">
          <h1 className="text-h-m-b font-bold text-richBlack">
            Customize your links
          </h1>
          <p className="text-b-m text-mediumGrey mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button
            onClick={AddLink}
            className="border-solid border-royalBlue border text-royalBlue hover:bg-babyPowder/50 hx rounded-md w-full mt-[2rem] p-2  font-bold"
          >
            + Add new link
          </button>
        </div>

        <div
          id="links"
          className="h-[30rem] overflow-y-auto flex flex-col gap-5 justify-start items-center px-[2rem] mb-4"
        >
          {isObjectEmpty(linkItem) ? (
            <div className="text-center bg-lightGrey/20 w-full h-full flex flex-col justify-center mb-2 rounded-lg">
              <img
                src="/images/illustration-empty.svg"
                alt="get_started"
                className="mx-auto"
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
          ) : (
            linkItem.map((x) => <Links key={x.id} data={x} />)
          )}
        </div>
        <div className="absolute left-0 border-t-2 border-solid w-full flex justify-end p-4 px-8">
          <button
            className={`p-3 px-8 mt-4 rounded-lg ${
              isObjectEmpty(linkItem) ? "bg-lavender " : "bg-royalBlue"
            } text-white`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
