import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutRoutes } from "../routes/layoutRoutes";
import { getLoggedInUser } from "../services/localStorageServices";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const params = useLocation();
  const path = params.pathname;
  return (
    <aside>
      <div className="md:fixed relative w-full flex flex-col justify-between border-2 z-50 p-7 h-full overflow-auto scrollbar left-0 bg-white md:w-[15.625rem]">
        <div>
          <h1 className="text-3xl text-red-700 font-semibold">WatchLists</h1>
          <div className="mt-5 flex flex-col gap-3 text-lg">
            {LayoutRoutes.map((route, index) => (
              <button
                onClick={() => navigate(route.key)}
                className={`p-1 rounded-md  ${
                  path == route.key ? "bg-red-700 text-white" : ""
                } ${index !== LayoutRoutes.length - 1 && "border-b"}`}
                key={route.key}
              >
                {route.name}
              </button>
            ))}
          </div>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="border-2 mt-4 md:mt-0 cursor-pointer flex items-center justify-between px-3 py-2 rounded"
        >
          <FaRegUserCircle className="text-xl" />
          <div className="flex items-center gap-2">
            <span className="truncate">{loggedInUser.name}</span>
            <IoMdLogOut />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
