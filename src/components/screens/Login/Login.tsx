import React from 'react'
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <div className='bg-gradient-to-br from-black to-slate-900 h-screen flex items-center justify-center'>
      <button
        className='btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black'
        onClick={handleLogin}
      >
        Iniciar Sesión
      </button>
    </div>
  );
};