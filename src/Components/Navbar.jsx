import { gsap } from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import Context from "./Context/Context";
export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const { theme, setTheme } = useContext(Context);
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
              <li className="cursor-pointer hover:text-emerald-400">Home</li>
              <li className="cursor-pointer hover:text-emerald-400">
                Marathons
              </li>
              <li className="cursor-pointer hover:text-emerald-400">
                Dashboard
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            {/* Login Button */}
            <button
              className={`btn btn-outline btn-primary text-black btn-sm lg:btn-md border-emerald-300 hover:bg-emerald-400`}
            >
              Login
            </button>

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
