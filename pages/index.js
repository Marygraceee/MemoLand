import React, { useContext } from 'react';
import Router from 'next/router';


import { AuthContext } from '@/context/AuthContext';
import Home from '@/components/Home';

function Index() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    Router.push('/login');
  } else {
    return (
      <Home />
    );
  }
}

export default Index;