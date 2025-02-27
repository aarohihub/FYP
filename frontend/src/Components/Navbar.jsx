import { Settings, MessageSquare, Building, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import log1 from "/images/nav.png";
import { useSelector } from "react-redux";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { SignOutUserSucess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let role = currentUser?.role;

  const logoutUser = async () => {
    try {
      const res = await axiosInstance("/logout");
      if (res.data) {
        localStorage.clear();
        dispatch(SignOutUserSucess());

        toast.success("Logout successful");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };
  return (
    <>
      <div className="navbar md:px-40 sm:px-20 px-8 z-50">
        <div className="flex-1  ">
          <p className="btn btn-ghost text-4xl scale-110">
            <Link to="/">
              <img
                className="h-12 w-12 rounded-full  scale-150"
                src={log1}
                alt=""
              />
            </Link>

            {/* <span>Realestate</span> */}
          </p>
        </div>
        <div className="flex-none gap-10 ">
          <div className="form-control hidden md:block select-none">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="  hidden sm:block ">
            <div className="flex gap-6">
              <Link
                to={"/settings"}
                className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
              >
                <Settings className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline "></span>
              </Link>
              {role === "user" || role === "admin" ? (
                <></>
              ) : (
                <>
                  {" "}
                  <Link
                    to={"/signup"}
                    className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
                  >
                    <User className="w-4 h-4 " size={20} strokeWidth={1.75} />

                    <span className="hidden sm:inline "></span>
                  </Link>
                </>
              )}
              {role === "user" && (
                <>
                  {" "}
                  <Link
                    to={"/message"}
                    className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
                  >
                    <MessageSquare className="w-4 h-4 " />
                    <span className="hidden sm:inline "></span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* {currentUser ? (
            <>
              <div className="w-4 h-4  hidden sm:block">
                <LogOut className="w-4 h-4 " onClick={logoutUser} />
              </div>
            </>
          ) : (
            <></>
          )} */}

          {role == "user" && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={currentUser?.avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/user/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/createListing">Add Property</Link>
                </li>
                <li>
                  <Link to="/showUserListingTable">Show Property</Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
