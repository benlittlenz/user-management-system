import React, { useState, useEffect } from 'react';
import { Router } from './Router'
import { SetAccessToken } from './UserToken';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  /*
    Before app renders, send request to server and send 
    refresh token and to get a new user access token
  */
  useEffect(() => {
    fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      const { userToken } = await res.json();
      SetAccessToken(userToken);
      console.log(userToken)
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }


  return <Router />
}

