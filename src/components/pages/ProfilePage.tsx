import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {
  getLoggedInUser,
  logoutUser,
} from "../../services/localStorageServices";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    logoutUser(() => navigate("/auth"));
  };

  const loggedInUser = getLoggedInUser();
  return (
    <div className="flex flex-col md:flex-row  md:mt-20 border-2  md:m-10 shadow-md px-10 py-20 justify-between items-center">
      <div className="flex items-center">
        <IoMdArrowBack
          onClick={() => navigate(-1)}
          className="text-3xl cursor-pointer"
        />
        <FaRegUserCircle className="text-8xl " />
        <div className="flex gap-2 flex-col px-4">
          <span>{loggedInUser.name}</span>
          <span>{loggedInUser.email}</span>
        </div>
      </div>
      {loggedInUser.email ? (
        <button
          onClick={onLogOut}
          className="self-end px-4 py-2 bg-red-500 text-white rounded"
        >
          LogOut
        </button>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="self-end px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login Page
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
