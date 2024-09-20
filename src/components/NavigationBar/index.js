import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as authLogout } from '../../services/Auth'; // Importar el logout de auth.js
import './styles.sass';

export function NavigationBar() {
  const { user, logout } = useUser(); // Función logout del contexto
  const [anchorEl, setAnchorEl] = useState(null);
  const currentPage = useSelector((state) => state.page.currentPage);
  const open = Boolean(anchorEl);
  const [pageName, setPageName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageName(currentPage);
  }, [currentPage]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authLogout(); // Llamar a la función logout desde auth.js
      logout(); // Limpiar el estado del usuario en el contexto
      navigate('/login'); // Redirigir a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='NavigationBar'>
      <h4>{pageName}</h4>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleLogout(); // Cerrar sesión
          handleClose(); // Cerrar el menú
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
