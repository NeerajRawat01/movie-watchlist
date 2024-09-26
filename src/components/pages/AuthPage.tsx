import React from "react";
import { loginUser, registerUser } from "../../services/localStorageServices";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [authType, setAuthType] = React.useState("register");
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  const onAuthTypeChange = (type: string) => {
    setAuthType(type);
  };

  //   localStorage.clear();

  const onRegister = () => {
    registerUser(userEmail, userName);
    onAuthTypeChange("signin");
  };

  const onSignIn = () => {
    loginUser(userEmail, () => navigate("/"));
  };

  return (
    <>
      <div className=" mx-auto w-1/2 px-20 py-10">
        <div className="flex gap-4">
          <button
            onClick={() => onAuthTypeChange("register")}
            className={`px-3 py-2 rounded ${
              authType === "register"
                ? "bg-blue-500 text-white"
                : "border border-blue-500"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => onAuthTypeChange("signin")}
            className={`px-3 py-2 rounded ${
              authType === "signin"
                ? "bg-blue-500 text-white"
                : "border border-blue-500"
            }`}
          >
            SignIn
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 border rounded px-8 py-5 mt-5 shadow-xl">
          {authType === "register" && (
            <span className="text-lg text-blue-500">Enter User Name</span>
          )}
          {authType === "register" && (
            <input
              className="border p-2 rounded border-gray-500 outline-blue-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          <span className="text-lg text-blue-500">Enter User Email</span>
          <input
            className="border p-2 rounded border-gray-500 outline-blue-500"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <div className="flex justify-end mt-5">
            <button
              disabled={
                authType === "register" ? !userName || !userEmail : !userEmail
              }
              onClick={authType === "register" ? onRegister : onSignIn}
              className="bg-blue-500 text-white px-3 py-1 rounded w-fit"
            >
              {authType === "register" ? "Register" : "SignIn"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
