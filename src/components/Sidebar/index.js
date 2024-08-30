import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faMessage, faCog } from '@fortawesome/free-solid-svg-icons'; 
import { setCurrentPage } from '../../contexts/redux/pageActions'; // Asegúrate de que la ruta sea correcta
import './styles.sass';

export function SideBar() {
  const currentPage = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_pageName, setPageName] = useState(currentPage);

  useEffect(() => {
    setPageName(currentPage);
  }, [currentPage]);

  const getClassName = (pageName) => {
    return _pageName === pageName ? 'selected' : '';
  };

  const handleNavigation = (pageName) => {
    navigate(`/${pageName.toLowerCase()}`);
    dispatch(setCurrentPage(pageName));
  };

  return (
    <div className='Sidebar'>
      <div>
        <h4>CodingCoach</h4>
        <div className='Navigation'>
          <div 
            className={`${getClassName('Dashboard')} option`} 
            onClick={() => handleNavigation('Dashboard')}
          >
            <FontAwesomeIcon icon={faChartPie} />
            <p>Dashboard</p>
          </div>
          <div
            className={`${getClassName('Chat')} option`} 
            onClick={() => handleNavigation('Chat')}
          >
            <FontAwesomeIcon icon={faMessage} />
            <p>Chat</p>
          </div>
          <div 
            className={`${getClassName('Settings')} option`} 
            onClick={() => handleNavigation('Settings')}
          >
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </div>
        </div>
      </div>
      <p className='Rights'>2024 - All rights reserved</p>
    </div>
  );
}
