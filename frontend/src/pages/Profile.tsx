import {
    useCreatePreviewProfileMutation,
    useGetLinksQuery,
    useGetUserProfileQuery,
    useUpdateProfileMutation,
    useUploadProfileImageMutation,
} from "../context/apiSlice";
import {LINKS_URL} from "../constants";
import { useMemo, useState} from "react";
import toast from "react-hot-toast";
import MobileSvg from "../components/MobileSvg";
import ProfileForm from "../components/ProfileForm";
import ProfileUpload from "../components/ProfileUpload";

const Profile = () => {
    // MUTATIONS
    const [createPreviewProfile, {isLoading: loadingPreview}] =
        useCreatePreviewProfileMutation();
    const [updateProfile, {isLoading: loadingUpdate}] =
        useUpdateProfileMutation();
    const [uploadImage, {isLoading: loadingUpload}] =
        useUploadProfileImageMutation();

    // FETCH USER PROFILE
    const {data: userFullName, isLoading: loadingUser} =
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


    const profileImage: string = localStorage.getItem("image") ?? "";
    const userPublicProfileId: string = localStorage.getItem("userPreviewId") ?? "";

    // LOAD USER CREDENTIALS
    useMemo(() => {
        if (!loadingUser) {
            setFname(userFullName.firstName ?? "");
            setLname(userFullName.lastName ?? "");
            setEmail(userFullName.email ?? "");
            setImage(userFullName.image);
        }
        setImage(profileImage);
        setUserId(userPublicProfileId);
    }, [userFullName, loadingUser, profileImage, userPublicProfileId]);




    const submitHandler = async () => {
        async function uploadPreviewProfile() {
            return createPreviewProfile({userId}).unwrap();
        }
        async function UploadUserData() {
            return updateProfile({
                firstName: fname,
                lastName: lname,
                email,
                image,
            }).unwrap();
        }


        try {
            if (!email || !fname || !lname) {
                setError(true);
            }
            await UploadUserData();
            const result = await uploadPreviewProfile();
            localStorage.setItem("userPreviewId", result.userId);

            toast.custom(
                <div className="bg-richBlack text-snow flex gap-4 p-4 rounded-xl">
                    <img src="/images/icon-changes-saved.svg" alt="saved-icon"/> Your
                    changes have been successfully saved!
                </div>
            );

            refetch();
        } catch (error) {
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

            <div
                aria-label="Profile"
                className="relative bg-white p-[2rem] rounded-md"
            >
                <div className="">
                    <h1 className="max-tablet:text-[28px] text-h-m-b font-bold text-richBlack">
                        Profile Details
                    </h1>
                    <p className="text-b-m text-mediumGrey mt-2">
                        Add your details to create a personal touch to your profile.
                    </p>
                </div>

                <div
                    aria-label="User profile info"
                    className="overflow-hidden w-full flex flex-col gap-8 justify-center items-center my-6 rounded-lg "
                >
                    <ProfileUpload image={image} uploadImage={uploadImage}/>

                    <ProfileForm
                        email={email}
                        setEmail={setEmail}
                        firstName={fname}
                        setFirstName={setFname}
                        lastName={lname}
                        setLastName={setLname}
                        error={error}
                    />
                </div>

                <div
                    className="absolute left-0 bottom-0 border-t-2 border-solid w-full flex justify-end p-4 px-8 mb-3 items-center max-laptop:relative">
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
