import { FC } from "react";
import { useNavigate } from "react-router-dom";


import errorPage from "assets/ErrorPage.png";

type ErrorProps = {
  errCode: number;
  errMessage: string;
};

const PageNotFound: FC<ErrorProps> = ({ errCode, errMessage }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="">
        <img src={errorPage} alt="Error" style={{ width: "300px" }} />
        <h1 className="mt-5">Error</h1>
        <p>{errMessage}</p>
        <h4 className="mt-3">Error code: {errCode}</h4>
        <button onClick={() => navigate('/home')}>Go Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;
