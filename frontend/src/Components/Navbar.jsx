import { Settings, MessageSquare, Building, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import log1 from "/images/Header.png";
import { useSelector } from "react-redux";
export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  let role = currentUser?.role;

  return (
    <>
      <div className="navbar ">
        <div className="flex-1  ">
          <a className="btn btn-ghost text-xl">
            <Link to="/">
              <img className="h-12 w-12 rounded-full" src={log1} alt="" />
            </Link>

            <span>Realestate</span>
          </a>
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
              <Link
                to={"/signup"}
                className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
              >
                <User className="w-4 h-4 " size={20} strokeWidth={1.75} />

                <span className="hidden sm:inline "></span>
              </Link>
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Add Property</a>
                </li>
                <li>
                  <a>Show Property</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
