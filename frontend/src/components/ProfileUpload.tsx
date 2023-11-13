import toast from "react-hot-toast";

interface UploadProps {
  image: string;
  // eslint-disable-next-line no-unused-vars
  uploadImage: (e: any) => any;
}

const ProfileUpload = ({ uploadImage, image }: UploadProps) => {
  const uploadHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      localStorage.setItem("image", res.image);
      toast.success(res.message);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
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
  );
};

export default ProfileUpload;
