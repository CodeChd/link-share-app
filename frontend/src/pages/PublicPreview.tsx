import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserPublicProfileQuery } from "../context/apiSlice";
import toast from "react-hot-toast";
import PreviewProfile from "../components/PreviewProfile";

const PublicPreview = () => {
  const location = useLocation();
  const { id } = useParams();

  const { data: profile, isLoading: loadingProfile } =
    useGetUserPublicProfileQuery(id);

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (!loadingProfile) {
      setFullName(profile.fullName ?? "");
      setEmail(profile.email ?? "");
      setImage(profile.profileImage ?? "");
    }
  }, [profile, loadingProfile]);

  const copyToClipBoard = () => {
    const profileUrl = `${window.location.origin}${location.pathname}`;

    navigator.clipboard
      .writeText(profileUrl)
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
        <div className="bg-white p-2 rounded-lg w-full">
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
        linkItems={profile?.linkItems}
        fullName={fullName}
        image={image as string}
        email={email}
        loadingProfile={loadingProfile}
      />
    </>
  );
};

export default PublicPreview;
