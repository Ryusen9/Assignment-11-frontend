import { gsap } from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import Context from "./Context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  //!context
  const { theme, setTheme, user, logoutUser } = useContext(Context);
  const [userPhoto, setUserPhoto] = useState(null);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (openMenu) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [openMenu]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/usersInfo?email=${user.email}`)
        .then((res) => {
          console.log(res);
          setUserPhoto(res.data.photoUrl);
        });
    }
  }, [user]);
  console.log(userPhoto);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          logoutUser().then(() => {
            Swal.fire("Signed Out!", "You have been logged out.", "success");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  };
  return (
    <>
      <nav className="fixed text-black top-0 left-0 w-full flex justify-between items-center z-50">
        <div className="flex rounded-none bg-white items-center px-10 py-5 lg:px-32 lg:rounded-4xl justify-between w-full lg:w-[80%] mx-auto">
          {/* Logo */}
          <div>
            <p className="font-Heebo font-semibold text-xl">
              Marathon<span className="text-emerald-400">Mate</span>
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center gap-7">
              <li className="cursor-pointer hover:text-emerald-400">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="cursor-pointer hover:text-emerald-400">
                <Link to={"/moreEvents"}>Marathons</Link>
              </li>
              <li className="cursor-pointer hover:text-emerald-400">
                Dashboard
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            {/* Login Button */}
            {!user ? (
              <Link to={"/logIn"}>
                <button
                  className={`btn btn-outline btn-primary text-black btn-sm lg:btn-md border-emerald-300 hover:bg-emerald-400`}
                >
                  Login
                </button>
              </Link>
            ) : (
              <div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <div className="avatar">
                    <div className="w-9 rounded-full">
                      <img src={userPhoto} />
                    </div>
                  </div>
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box text-white">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">You are logged in as {user.email}.</p>
                    <p>Do you wanna logout?</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn mx-4" onClick={handleLogout}>
                          Log Out
                        </button>
                        <button className="btn">Update Profile</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            )}

            {/* Theme Switcher */}
            <button
              className="btn btn-circle btn-sm btn-outline ml-3 border-emerald-400 hover:bg-emerald-400"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <IoMoon className="text-base" />
              ) : (
                <IoSunny className="text-base" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-3">
              {openMenu ? (
                <IoClose
                  className="text-2xl cursor-pointer"
                  onClick={() => setOpenMenu(false)}
                />
              ) : (
                <IoMenu
                  className="text-2xl cursor-pointer"
                  onClick={() => setOpenMenu(true)}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-full text-black px-10 py-20 bg-white flex flex-col gap-4 translate-y-[-100%] opacity-0 lg:hidden z-40"
      >
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-emerald-400">Home</li>
          <li className="cursor-pointer hover:text-emerald-400">Marathons</li>
          <li className="cursor-pointer hover:text-emerald-400">Dashboard</li>
        </ul>
      </div>
    </>
  );
};
