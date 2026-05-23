import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-800 sticky top-0 backdrop-blur-md bg-black/50 z-50">
      <div className="px-8 py-3 flex items-center justify-between md:gap-12">
        {/* LOGO - Far left */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition flex-shrink-0"
          onClick={() => handleNavClick("/")}
        >
          <Radar className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-tight hidden sm:inline">
            Resonance
          </span>
        </div>

        {/* NAV LINKS - Center-right (DESKTOP ONLY) */}
        <div className="hidden md:flex gap-8 items-center flex-1">
          <NavLink label="About" onClick={() => handleNavClick("/about")} />
          <NavLink label="Contact" onClick={() => handleNavClick("/contact")} />
          <NavLink label="Ratings" onClick={() => handleNavClick("/task-a")} />
          <NavLink
            label="Find Audience"
            onClick={() => handleNavClick("/task-b")}
          />
        </div>

        {/* AUTH BUTTONS - Far right (DESKTOP ONLY) */}
        <div className="hidden md:flex items-center gap-4 border-l border-gray-700 pl-4 flex-shrink-0">
          <button
            onClick={() => handleNavClick("/login")}
            className="px-4 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition rounded-lg"
          >
            Log in
          </button>
          <button
            onClick={() => handleNavClick("/signup")}
            className="px-4 py-1.5 text-xs text-black font-medium bg-white rounded-lg hover:bg-gray-100 transition"
          >
            Sign up
          </button>
        </div>

        {/* HAMBURGER MENU (MOBILE ONLY) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black/80 py-4 px-8 space-y-3">
          <MobileNavLink
            label="About"
            onClick={() => handleNavClick("/about")}
          />
          <MobileNavLink
            label="Contact"
            onClick={() => handleNavClick("/contact")}
          />
          <MobileNavLink
            label="Ratings"
            onClick={() => handleNavClick("/task-a")}
          />
          <MobileNavLink
            label="Find Audience"
            onClick={() => handleNavClick("/task-b")}
          />

          <div className="border-t border-gray-800 pt-3 space-y-2">
            <button
              onClick={() => handleNavClick("/login")}
              className="block w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded transition"
            >
              Log in
            </button>
            <button
              onClick={() => handleNavClick("/signup")}
              className="block w-full text-left px-3 py-2 text-xs text-black font-medium bg-white rounded hover:bg-gray-100 transition"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-gray-400 hover:text-white transition whitespace-nowrap"
    >
      {label}
    </button>
  );
}

function MobileNavLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded transition"
    >
      {label}
    </button>
  );
}
