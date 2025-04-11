// components/Sidebar.js
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-80 p-3">
      <h1 className="text-2xl font-bold mb-8">MCP Dashboard</h1>
      <ul className="space-y-4">
        <li><Link to="/" className='text-blue-400'>Dashboard</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/wallet">Wallet</Link></li>
        <li><Link to="/pickup-partners">Pickup Partners</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
    </div>
  );
}
