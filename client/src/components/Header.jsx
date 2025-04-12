import { Link, useNavigate } from "react-router-dom";

// components/Header.js
export default function Header() {
  const history=useNavigate();
  const logout=()=>{

    localStorage.removeItem("token");
    history("/login")
  }
    return (
      <div className="flex justify-between items-center p-4  bg-white shadow-md">
        <h2 className="text-xl font-semibold">Micro collection platfrom</h2>
        <div className="flex gap-4">
          <button className="text-gray-600">🌗 Toggle Theme</button>
        <Link to={'/login'}
        ><button className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">Login</button>
            </Link>  
          <button className="bg-gray-300 px-4 py-1 rounded cursor-pointer" onClick={()=>logout()}>logout</button>
        </div>
      </div>
    );
  }
  
