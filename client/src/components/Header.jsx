import { Link } from "react-router-dom";

// components/Header.js
export default function Header() {
  const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem("token");
  }
    return (
      <div className="flex justify-between items-center p-4  bg-white shadow-md">
        <h2 className="text-xl font-semibold">Micro collection platfrom</h2>
        <div className="flex gap-4">
          <button className="text-gray-600">🌗 Toggle Theme</button>
        <Link to={'/login'}
        ><button className="bg-blue-500 text-white px-4 py-1 rounded">Login</button>
            </Link>  
          <button className="bg-gray-300 px-4 py-1 rounded" onClick={logout}>logout</button>
        </div>
      </div>
    );
  }
  
