import {
  useCreatePreviewProfileMutation,
  useGetLinksQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from "../context/apiSlice";
import { LINKS_URL } from "../constants";
import { platformColorMap } from "../data/platformColorMap";
import { platformCustomIconMap } from "../data/platformCustomIconMap";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LinkType } from "../context/linkSlice";

const Profile = () => {
  const {
    data,
    isLoading: loadingLinks,
    refetch,
  } = useGetLinksQuery(LINKS_URL);

  const [uploadImage, { isLoading: loadingUpload }] =
    useUploadProfileImageMutation();

  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation();
  const [createPreviewProfile, { isLoading: loadingPreview }] =
    useCreatePreviewProfileMutation();

  const { data: userFullName, isLoading: loadingUser } =
    useGetUserProfileQuery("info");

  const [error, setError] = useState<boolean>(false);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

  //public profile id
  const [userId, setUserId] = useState<string>("");

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
  }, [userFullName, loadingUser ]);

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
      <div
        id="left"
        className="bg-white p-[5rem] flex justify-center rounded-lg max-laptop:hidden"
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
              {email}
            </p>
          </foreignObject>

          {loadingLinks ? (
            "Loading"
          ) : (
            <foreignObject
              height="300"
              rx="4"
              x="-5"
              y="270"
              id="phone-container"
              className={`${
                data?.linkItems.length > 5
                  ? "w-[20.20rem] desktop:w-[20.90rem]"
                  : "w-[20rem]"
              } overflow-y-auto`}
            >
              <div className="flex flex-col gap-[0.8rem] relative">
                {data?.linkItems.map((x: LinkType) => (
                  <a
                    key={x._id}
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
                          fill={
                            x.name === "Frontend Mentor" ? "#333333" : "#fff"
                          }
                          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                        />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      <div id="right" className="relative bg-white p-[2rem] rounded-md">
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
