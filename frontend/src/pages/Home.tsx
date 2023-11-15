import {useEffect, useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {isValidUrl} from "../utils/isValidUrl";
import isObjectEmpty from "../utils/isObjectEmpty";

import {LinkType} from "../context/linkSlice";
import {addLink} from "../context/linkSlice";
import {
    useCreateLinkMutation, useGetLinksQuery, useGetUserProfileQuery,
} from "../context/apiSlice";
import {LINKS_URL} from "../constants";
import toast from "react-hot-toast";
import LinksContainer from "../components/LinksContainer";
import MobileSvg from "../components/MobileSvg";

export interface LinkState {
    link: {
        linkItem: LinkType[];
    };
}

const Home = () => {
    const dispatch = useDispatch();

    //CHECK ERRORS
    const [platformError, setPlatformError] = useState(false);
    const [linkError, setLinkError] = useState(false);

    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string | null>("");

    const {linkItem} = useSelector((state: LinkState) => state.link);

    const {
        data, isLoading: loadingLinks, isError, refetch: refetchLinks,
    } = useGetLinksQuery(LINKS_URL);

    const {
        data: userFullName, isLoading: loadingUser, isError: userError,
    } = useGetUserProfileQuery("info");

    const [saveLink, {isLoading}] = useCreateLinkMutation();

    //Loading user credential
    useMemo(() => {
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

    //Load DB links data along local links within localStorage
    useEffect(() => {
        if (data) {
            const updatedLink = data?.linkItems.map((x: LinkType, index: number) => ({
                ...x, id: index + 1,
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
        const newLink = {id: linkItem.length + 1, image: "", name: "", link: ""};
        dispatch(addLink({...newLink}));
    };

    const saveLinkHandler = async () => {
        const isLinkEmpty = linkItem.find((x) => x.link.length === 0);
        const isPlatformEmpty = linkItem.find((x) => x.name == "");
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
            toast.custom(<div className="bg-richBlack text-snow flex gap-4 p-4 rounded-xl">
                <img src="/images/icon-changes-saved.svg" alt="saved-icon"/> Your
                changes have been successfully saved!
            </div>);
            refetchLinks();
        } catch (error: any) {
            toast.error("Something's wrong!");
        }
    };

    return (<div className="grid max-laptop:grid-cols-1 max-desktop:grid-cols-[1fr_1fr] grid-cols-[780px_1fr] gap-5 ">
            <MobileSvg
                linkItems={linkItem}
                image={image as string}
                firstName={fname}
                lastName={lname}
                email={email}
                loadingLinks={loadingLinks}
                loadingUser={loadingUser}
            />

            <div
                aria-label="Customize Links Container"
                className="relative bg-white rounded-md "
            >
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

                <LinksContainer
                    linkItems={linkItem}
                    loadingLinks={loadingLinks}
                    isError={isError}
                    platformError={platformError}
                    linkError={linkError}
                />

                <div
                    aria-label="Save links button"
                    className="absolute left-0 bottom-0 border-t-2 border-solid w-full flex justify-end mb-3 p-4 px-8 max-laptop:relative"
                >
                    <button
                        disabled={isObjectEmpty(linkItem) && data?.linkItems.length === 0}
                        onClick={saveLinkHandler}
                        className={`p-3 px-8 mt-4 disabled:cursor-not-allowed rounded-lg ${isObjectEmpty(linkItem) && data?.linkItems.length === 0 ? "bg-lavender" : "bg-royalBlue"} text-white `}
                    >
                        {isLoading || userError ? "Loading" : "Save"}
                    </button>
                </div>
            </div>
        </div>);
};

export default Home;
