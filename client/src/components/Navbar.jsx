import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-white/10 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold neon-glow">
          Extraxy
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/documents" className="hover:text-primary transition">Documents</Link>
          <Link to="/templates" className="hover:text-primary transition">Templates</Link>
          <Link to="/settings" className="hover:text-primary transition">Settings</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FiUser /> {user.email}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1 text-secondary hover:text-red-500">
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
