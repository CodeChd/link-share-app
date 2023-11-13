import {
  useCreatePreviewProfileMutation,
  useGetLinksQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from "../context/apiSlice";
import { LINKS_URL } from "../constants";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import MobileSvg from "../components/MobileSvg";

const Profile = () => {
  // MUTATIONS
  const [createPreviewProfile, { isLoading: loadingPreview }] =
    useCreatePreviewProfileMutation();
  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation();
  const [uploadImage, { isLoading: loadingUpload }] =
    useUploadProfileImageMutation();

  // FETCH USER PROFILE
  const { data: userFullName, isLoading: loadingUser } =
    useGetUserProfileQuery("info");

  // FETCH USER LINKS
  const {
    data,
    isLoading: loadingLinks,
    refetch,
  } = useGetLinksQuery(LINKS_URL);

  const [error, setError] = useState<boolean>(false);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

  //user public profile id
  const [userId, setUserId] = useState<string>("");

  // LOAD USER CREDENTIALS
  useEffect(() => {
    if (!loadingUser) {
      setFname(userFullName.firstName ?? "");
      setLname(userFullName.lastName ?? "");
      setEmail(userFullName.email ?? "");
      setImage(userFullName.image);
      const storedImage = localStorage.getItem("image");
      if (storedImage) {
        setImage(storedImage);
      }
    }

    const storeUserPreviewId = localStorage.getItem("userPreviewId");
    const id = storeUserPreviewId;
    if (id) {
      setUserId(id);
    }
  }, [userFullName, loadingUser]);

  const submitHandler = async () => {
    try {
      if (!email || !fname || !lname) {
        setError(true);
      }

      await updateProfile({
        firstName: fname,
        lastName: lname,
        email,
        image,
      }).unwrap();

      const res = await createPreviewProfile({ userId }).unwrap();
      localStorage.setItem("userPreviewId", res.userId);

      toast.custom(
        <div className="bg-richBlack text-snow flex gap-4 p-4 rounded-xl">
          <img src="/images/icon-changes-saved.svg" alt="saved-icon" /> Your
          changes have been successfully saved!
        </div>
      );
      refetch();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const uploadHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      localStorage.setItem("image", res.image);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="grid max-laptop:grid-cols-1 max-desktop:grid-cols-[1fr_1fr] grid-cols-[780px_1fr] gap-5  ">
      <MobileSvg
        linkItems={data?.linkItems}
        image={image as string}
        firstName={fname}
        lastName={lname}
        email={email}
        loadingLinks={loadingLinks}
        loadingUser={loadingUser}
      />

      <div id="profile" className="relative bg-white p-[2rem] rounded-md">
        <div className="">
          <h1 className="max-tablet:text-[28px] text-h-m-b font-bold text-richBlack">
            Profile Details
          </h1>
          <p className="text-b-m text-mediumGrey mt-2">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div
          aria-label="user-profile-image"
          className="overflow-hidden w-full flex flex-col gap-8 justify-center items-center my-6 rounded-lg "
        >
          <div
            aria-label="upload-image"
            className="grid max-phone:grid-cols-1 grid-cols-[2fr_1fr_1fr] max-phone:place-items-start place-items-center gap-4 bg-lightGrey/20 p-4 rounded-md w-full"
          >
            <div className="w-full">
              <h3 className="text-mediumGrey text-b-m">Profile picture</h3>
            </div>

            <label
              htmlFor="upload"
              className="bg-babyPowder cursor-pointer w-48 h-48 flex justify-center items-center rounded-md relative "
            >
              <img
                src={image as string}
                alt="profile-image"
                className={`absolute  inset-0 object-cover w-full h-full rounded-md ${
                  !image && "hidden"
                }`}
              />
              <input
                type="file"
                id="upload"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={uploadHandler}
              />
              <div
                className={`flex flex-col justify-center items-center font-bold ${
                  image
                    ? "absolute inset-0 bg-richBlack/50 opacity-0 hover:opacity-100"
                    : "opacity-100 "
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <path
                    fill={image ? "#FAFAFA" : "#633CFF"}
                    d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                  />
                </svg>
                <p className={image ? "text-snow" : "text-royalBlue "}>
                  {image ? " Change Image" : "+ Upload image"}
                </p>
              </div>
            </label>

            <p className="text-mediumGrey  phone:max-w-[30vw] max-phone:m-0 mx-auto text-b-s">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
          {/*  */}

          <form
            aria-label="user-input"
            className="gap-8 bg-lightGrey/20 p-4 rounded-lg w-full flex flex-col justify-between"
          >
            <div
              id="first-name"
              className="flex max-tablet:flex-col  justify-between"
            >
              {error && email.length <= 0 && (
                <span className="relative inline-block translate-y-[3.2rem] -translate-x-4">
                  Can't be empty
                </span>
              )}
              <label
                htmlFor="fname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
              >
                First name*
              </label>
              <input
                id="fname"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="e.g.Cj"
                className="max-tablet:w-full w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/50"
              />
            </div>
            <div
              id="last-name"
              className="flex max-tablet:flex-col  justify-between "
            >
              <label
                htmlFor="lname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
              >
                Last name*
              </label>
              <input
                id="lname"
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="e.g.Francisco"
                className="max-tablet:w-full w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/50"
              />
            </div>
            <div
              id="Email"
              className="flex max-tablet:flex-col  justify-between "
            >
              <label
                htmlFor="fname"
                className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
              >
                Email
              </label>
              <input
                autoComplete="true"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g.email@example.com"
                className=" max-tablet:w-full  w-[85%]  bg-email bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/90 "
              />
            </div>
          </form>
        </div>
        <div className="absolute left-0 bottom-0 border-t-2 border-solid w-full flex justify-end p-4 px-8 mb-3 items-center max-laptop:relative">
          <button
            disabled={(!fname && !lname) || !email}
            onClick={submitHandler}
            className="disabled:bg-lavender disabled:cursor-not-allowed p-3 px-8 mt-4 rounded-lg text-white bg-royalBlue"
          >
            {loadingUpdate || loadingUpload || loadingPreview
              ? "Loading"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
