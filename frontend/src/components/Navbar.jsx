import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <Link to="/" className="hover:text-gray-300">
            MediShift-Align
          </Link>
        </div>

        {/* Sign In Button */}
        <div>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
