import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './styles.sass';

export function NavigationBar() {
  const { user, logout } = useUser(); // Asegúrate de tener una función logout en el UserContext
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentPage = useSelector((state) => state.page.currentPage);
  const open = Boolean(anchorEl);
  const [pageName, setPageName] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

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
      await fetch('https://api-codingcoach-kjuzq4ogha-uc.a.run.app/logout', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      logout();
      navigate('/login');
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
          handleLogout();
          handleClose(); 
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
