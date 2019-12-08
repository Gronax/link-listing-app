import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>Aradığınız sayfa bulunamadı!</h3>
      <code>{location.pathname}</code>
    </div>
  );
};
export default NoMatch;
