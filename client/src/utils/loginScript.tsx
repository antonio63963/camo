import { FC, useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";

export const loginScript = (url: string, onLoad: () => void) => {
  let script = document.createElement("script");
  script.src = url;
  script.onload = onLoad;

  document.head.appendChild(script);

  // return () => document.head.removeChild(script);
};

// declare global {
//   const google: typeof import("google-one-tap");
// }

const GoogleButton: FC = () => {
  // const buttonRef = useRef<HTMLElement | HTMLDivElement>(null);
  // const button = document.getElementById('button');
  // const [ parentButton, setParentButton ] = useState<HTMLElement>();

  // function onGoogleSignIn(user: any) {
  //   const userCred = user.credential;
  //   const payload = jwtDecode(userCred);
  //   console.log("custom Login component: ", payload);
  // }

  // useEffect(() => {
  //   loginScript("https://accounts.google.com/gsi/client", () => {
  //     google?.accounts.id.initialize({
  //       client_id: process.env.REACT_APP_GOOGLE_API_TOKEN as string,
  //       callback: onGoogleSignIn,
  //       auto_select: false,
  //     });
  //     google.accounts.id.renderButton(
  //       document.getElementById("button") as HTMLElement,
  //       {
  //         size: "large",
  //       }
  //     );
  //   });
  // }, []);

  return <div id="button"></div>;
};

export default GoogleButton;
