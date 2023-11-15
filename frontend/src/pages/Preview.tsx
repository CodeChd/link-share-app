import { useMemo, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { LINKS_URL } from "../constants";
import { useGetLinksQuery, useGetUserProfileQuery } from "../context/apiSlice";
import PreviewProfile from "../components/PreviewProfile";

const Preview = () => {
  const location = useLocation();
  const { data, isLoading: loadingLinks } = useGetLinksQuery(LINKS_URL);

  const { data: userFullName, isLoading: loadingUser } =
    useGetUserProfileQuery("info");

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string | null>("");

  const [userId, setUserId] = useState<string>("");

  useMemo(() => {
    if (!loadingUser) {
      setFname(userFullName.firstName);
      setLname(userFullName.lastName);
      setEmail(userFullName.email);
      setImage(userFullName.image);
      const previewId = localStorage.getItem("userPreviewId");
      if (previewId) {
        setUserId(previewId);
      }
      const storedImage = localStorage.getItem("image");
      if (storedImage) {
        setImage(storedImage);
      }
    }
  }, [userFullName]);

  const copyToClipBoard = () => {
    if (!userId) {
      toast.error("Save your profile to copy the link!");
      return;
    }
    const publicUrl = `${window.location.origin}${location.pathname}s/${userId}`;
    navigator.clipboard
      .writeText(publicUrl)
      .then(() => {
        toast.custom(
          <div className="bg-richBlack text-snow flex gap-2 p-4 rounded-xl">
            <img
              src="/images/icon-link-copied-to-clipboard.svg"
              alt="copied-to-clipboard-icon"
            />
            The link has been copied to your clipboard!
          </div>
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("Could not copy URL");
      });
  };

  return (
    <>
      <div className="bg-royalBlue max-tablet:bg-snow h-[22rem] w-full p-4 rounded-bl-[2rem] rounded-br-[2rem]">
        <div className=" bg-white p-2 rounded-lg w-full">
          <nav className=" p-2  w-full flex justify-between">
            <Link
              to="/"
              className="p-3 max-tablet:px-3 px-8 hover:bg-babyPowder/50 text-center font-bold rounded-md border-royalBlue text-royalBlue border-solid  border "
            >
              Back to Editor
            </Link>
            <button
              onClick={copyToClipBoard}
              className="rounded-md p-2 max-tablet:px-3 px-8 text-white bg-royalBlue hover:bg-lavender font-bold "
            >
              Share Link
            </button>
          </nav>
        </div>
      </div>

      <PreviewProfile
        linkItems={data?.linkItems}
        firstName={fname}
        lastName={lname}
        image={image as string}
        email={email}
        loadingLinks={loadingLinks}
      />
    </>
  );
};

export default Preview;
