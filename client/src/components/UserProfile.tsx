// rafce

import { FC, useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import { AppContext } from "context";
import { MasonryLayout, Spinner } from "components";

import { googleLogout } from "@react-oauth/google";

import storage from "services/storage.service";
import catchErrors from "services/error.service";

import axios from "axios";

type User = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};
type Pin = {
  id: string;
  postedBy: User;
  image: string;
  category: string;
  save: User[];
};
enum PinGroups {
  created = "created",
  liked = "liked",
}
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { setModal } = useContext(AppContext);
  const user: User = storage.getUserInfo();
  const [pins, setPins] = useState<Pin[]>([]);
  const [text, setText] = useState<PinGroups>(PinGroups.created);
  const [activeBtn, setActiveBtn] = useState("created");

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/auth/login");
  };

  const getMyPins = useCallback(
    async (pinGroup: PinGroups) => {
      try {
        const {
          data: { status, pins },
        } = await axios.get<{ status: string; pins: Pin[] }>(
          `/pins/${pinGroup === PinGroups.created ? "user" : "liked"}Pins`
        );
        if (status === "ok") {
          console.log(pins);
          setPins(pins);
        } else {
          setModal({
            isModal: true,
            title: "Error",
            message: `Downloading ${
              pinGroup === PinGroups.created ? "your" : "liked"
            } pins is failed!`,
          });
        }
      } catch (err) {
        catchErrors(err);
      }
    },
    [setModal]
  );

  const deletePinFromArray = useCallback(
    (pinId: string) => {
      setPins([...pins].filter((pin) => pin.id !== pinId));
    },
    [pins]
  );

  useEffect(() => {
    getMyPins(text);
  }, [getMyPins, text]);

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <div className="relative w-full pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner"
            />
            <img
              src={user.picture}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.name}</h1>
            <div className="absolute top-2 right-2 p-2 z-1 bg-white rounded-full w-8 h-8 flex justify-center items-center shadow-md">
              <button className="g_id_signout" onClick={logout}>
                <AiOutlineLogout />
              </button>
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              onClick={(e) => {
                setText(PinGroups.created);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              onClick={(e) => {
                setText(PinGroups.liked);
                setActiveBtn("liked");
              }}
              className={`${
                activeBtn === "liked" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Liked
            </button>
          </div>
          {/* pins */}
          {pins?.length > 0 ? (
            <div>
              <div className="px-2">
                <MasonryLayout
                  pins={pins}
                  user={user}
                  deletePinFromArray={deletePinFromArray}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full tx-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
