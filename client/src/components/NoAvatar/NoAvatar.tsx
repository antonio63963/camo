import { FC } from "react";

type AvatarProps = {
  theme: string;
};

const darkClass = 'w-10 h-10 rounded-full bg-white text-black  flex justify-center items-center font-bold';
const lightClass = 'w-10 h-10 rounded-full bg-black text-white flex justify-center items-center font-bold';

const NoAvatar: FC<AvatarProps> = ({ theme }) => {
  return (
    <div
      className={`${
        theme === "dark" ? darkClass : lightClass
      }`}
    >
      ?
    </div>
  );
};

export default NoAvatar;
