import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ButtonAppBar from '../uiElements/ButtonAppBar';
import Routing from './Routing';


function App() {
  return (
    <>
      <BrowserRouter>
          <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
