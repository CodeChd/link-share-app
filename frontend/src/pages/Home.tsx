import { useDispatch, useSelector } from "react-redux";
import { LinkType, dragDrop } from "../context/linkSlice";
import { addLink } from "../context/linkSlice";
import isObjectEmpty from "../utils/isObjectEmpty";
import { platformColorMap } from "../data/platformColorMap";
import { platformCustomIconMap } from "../data/platformCustomIconMap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useCreateLinkMutation,
  useGetLinksQuery,
  useGetUserProfileQuery,
} from "../context/apiSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SortableLinks from "../components/SortableLinks";
import { LINKS_URL } from "../constants";
import { isValidUrl } from "../utils/isValidUrl";

export interface LinkState {
  link: {
    linkItem: LinkType[];
  };
}
const Home = () => {
  const dispatch = useDispatch();
  const {
    data: userFullName,
    isLoading: loadingUser,
    isError: userError,
  } = useGetUserProfileQuery("info");

  const [platformError, setPlatformError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string | null>("");

  const { linkItem } = useSelector((state: LinkState) => state.link);

  const {
    data,
    isLoading: loadingLinks,
    isError,
    refetch: refetchLinks,
  } = useGetLinksQuery(LINKS_URL);

  const [saveLink, { isLoading }] = useCreateLinkMutation();

  //Loading user credential
  useEffect(() => {
    if (!loadingUser) {
      setFname(userFullName.firstName ?? "");
      setLname(userFullName.lastName ?? "");
      setEmail(userFullName.email ?? "");
      setImage(userFullName.image);
      const storedImage = localStorage.getItem("image");
      if (!userFullName.image || storedImage) {
        setImage(storedImage);
      }
    }
  }, [userFullName, loadingUser]);

  //Combine dbLinks details with Local link details to localStiarge
  useEffect(() => {
    if (data) {
      const updatedLink = data?.linkItems.map((x: LinkType, index: number) => ({
        ...x,
        id: index + 1,
      }));

      updatedLink.forEach((link: LinkType) => {
        const existingLink = linkItem.find((x) => x?._id === link?._id);
        if (!existingLink) {
          dispatch(addLink(link));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddLink = () => {
    const newLink = { id: linkItem.length + 1, image: "", name: "", link: "" };
    dispatch(addLink({ ...newLink }));
  };

  const onDragEnd = (e: any) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    const draggedId: number = active.id;
    const targetId: number = over.id;
    dispatch(dragDrop({ draggedId, targetId }));
  };

  const saveLinkHandler = async () => {
    const isLinkEmpty = linkItem.find((x) => x.link.length === 0);
    const isPlatformEmpty = linkItem.find((x) => x.name.length === 0);
    const isLinkItemTrue = linkItem.length;

    try {
      if (isLinkItemTrue && isLinkEmpty) {
        setLinkError(true);
        return;
      }
      if (isLinkItemTrue && isPlatformEmpty) {
        setPlatformError(true);
        return;
      }

      let valid = true;
      linkItem.forEach((x) => {
        valid = isValidUrl(x.link);
      });

      if (isLinkItemTrue && !valid) {
        return;
      }

      await saveLink({
        linkItem,
      }).unwrap();
      toast.custom(
        <div className="bg-richBlack text-snow flex gap-4 p-4 rounded-xl">
          <img src="/images/icon-changes-saved.svg" alt="saved-icon" /> Your
          changes have been successfully saved!
        </div>
      );
      refetchLinks();
    } catch (error: any) {
      console.log(error.error);
      toast.error("Something's wrong!");
    }
  };

  return (
    <div className="grid max-laptop:grid-cols-1 max-desktop:grid-cols-[1fr_1fr] grid-cols-[780px_1fr] gap-5 ">
      <div
        id="left"
        className="bg-white p-[5rem] flex justify-center rounded-lg max-laptop:hidden "
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

          {!image ? (
            <circle cx="153.5" cy="112" r="48" fill="#EEE" />
          ) : (
            <svg>
              <defs>
                <pattern id="image" x="0" y="0" height="1" width="1">
                  <image
                    preserveAspectRatio="xMidYMid slice"
                    x="0"
                    y="0"
                    href={image as string}
                    height="100"
                    width="100"
                  />
                </pattern>
                z
              </defs>
              <circle
                stroke="#633CFF"
                strokeWidth="4"
                cx="153"
                cy="112"
                r="48"
                fill="url(#image)"
              />
            </svg>
          )}

          {fname || lname ? (
            <foreignObject width="100%" height="25" x="0" y="180" rx="4">
              <p
                aria-label="first-name"
                className="text-xl font-bold text-richBlack text-center"
              >
                {fname}&nbsp;{lname}
              </p>
            </foreignObject>
          ) : (
            <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
          )}
          <foreignObject width="100%" height="25" x="0" y="214" rx="4">
            <p
              aria-label="user email"
              className="text-b-m text-center text-mediumGrey"
            >
              {loadingUser ? "Loading" : email}
            </p>
          </foreignObject>

          <foreignObject
            height="300"
            rx="4"
            x="-5"
            y="270"
            id="phone-container"
            className={`${
              linkItem.length > 5
                ? "w-[20.20rem] desktop:w-[20.90rem]"
                : "w-[20rem]"
            } overflow-y-auto`}
          >
            <div className="flex flex-col gap-[0.8rem] relative">
              {linkItem.map((x) => (
                <a
                  key={x.id}
                  href={x.link || ""}
                  target="_blank"
                  className="cursor-pointer grid grid-cols-[auto_1fr_auto] gap-2 px-4 mx-8 h-[44px] rounded-md overflow-hidden items-center text-left drop-shadow-md"
                  style={{
                    backgroundColor: !x.name
                      ? "#EEE"
                      : platformColorMap[x.name],
                  }}
                >
                  <img src={platformCustomIconMap[x.name]} alt={x.name} />
                  <p
                    className={
                      x.name === "Frontend Mentor" || !x.name
                        ? "text-richBlack"
                        : "text-white"
                    }
                  >
                    {x.name}
                  </p>
                  {x.name && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill={x.name === "Frontend Mentor" ? "#333333" : "#fff"}
                        d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                      />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </foreignObject>
        </svg>
      </div>

      <div id="right" className="relative bg-white rounded-md ">
        <div className="px-[2rem] my-5">
          <h1 className="max-tablet:text-[28px] whitespace-nowrap text-h-m-b font-bold text-richBlack">
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
          {isObjectEmpty(linkItem) || linkItem.length === 0 || isError ? (
            <div className="text-center bg-lightGrey/20 w-full h-full flex flex-col justify-center mb-2 rounded-lg">
              <img
                src="/images/illustration-empty.svg"
                alt="get_started"
                className="mx-auto"
              />
              <h2 className="text-richBlack text-h-m-b font-bold">
                Let's get you started
              </h2>
              <p className="text-mediumGrey max-w-[60vw]  tablet:max-w-[30vw] mx-auto">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          ) : loadingLinks ? (
            "Loading"
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={linkItem}
                strategy={verticalListSortingStrategy}
              >
                {linkItem.map((x: LinkType) => (
                  <SortableLinks
                    key={x.id}
                    linkDetails={x}
                    platformError={platformError}
                    linkError={linkError}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>

        <div className="absolute left-0 bottom-0 border-t-2 border-solid w-full flex justify-end mb-3 p-4 px-8 max-laptop:relative">
          <button
            disabled={isObjectEmpty(linkItem) && data?.linkItems.length === 0}
            onClick={saveLinkHandler}
            className={`p-3 px-8 mt-4 disabled:cursor-not-allowed rounded-lg ${
              isObjectEmpty(linkItem) && data?.linkItems.length === 0
                ? "bg-lavender"
                : "bg-royalBlue"
            } text-white `}
          >
            {isLoading || userError ? "Loading" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
