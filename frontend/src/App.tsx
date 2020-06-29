import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Router } from './Router'

function App() {
  // const { data, loading } = useQuery(gql`
  //   {
  //     hello
  //   }
  // `);

  // if (loading) return <div>Loading...</div>

  // return <div>{JSON.stringify(data)}</div>
  return <Router />
}

export default App;
