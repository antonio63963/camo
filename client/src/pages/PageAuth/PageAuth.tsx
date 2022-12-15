import React, { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";

import camoVideo from "assets/camo_video.mp4";
import logo from "assets/camoLogoWhite.png";

import { AuthProps } from "./PageAuth.type";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LoginContainer from "components/Login/Login";

const PageAuth: FC<AuthProps> = ({ onGoogleSuccess, onLoginFailed }) => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div style={{minHeight: '660px'}} className="relative w-full h-full min-h-full">
        <video
          src={camoVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        >
          <source type="video/mp4" />
        </video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <LoginContainer />

          <h2 className="text-white opacity-70 m-3">OR</h2>

          <div className="shadow-2xl">
            <GoogleLogin
              size="large"
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  onGoogleSuccess(credentialResponse.credential);
                }
              }}
              onError={() => {
                onLoginFailed();
              }}
            />

            <div
              className="g-signin2 w-100 h-100"
              data-onsuccess="onSignIn"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAuth;
