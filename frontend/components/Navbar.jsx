import { useNavigate } from "react-router-dom";
import { Radar } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-800 sticky top-0 backdrop-blur-md bg-black/50">
      <div className="px-8 py-3 flex items-center gap-12">
        {/* LOGO - Far left */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <Radar className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-tight">
            Resonance
          </span>
        </div>

        {/* NAV LINKS - Center-right area */}
        <div className="flex gap-8 items-center flex-1">
          <NavLink label="About" onClick={() => navigate("/about")} />
          <NavLink label="Contact" onClick={() => navigate("/contact")} />
          <NavLink label="Ratings" onClick={() => navigate("/task-a")} />
          <NavLink label="Find Audience" onClick={() => navigate("/task-b")} />
        </div>

        {/* AUTH BUTTONS - Far right with divider */}
        <div className="flex items-center gap-4 border-l border-gray-700 pl-4 flex-shrink-0">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition rounded-lg"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1.5 text-xs text-black font-medium bg-white rounded-lg hover:bg-gray-100 transition"
          >
            Sign up
          </button>
        </div>
      </div>
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
