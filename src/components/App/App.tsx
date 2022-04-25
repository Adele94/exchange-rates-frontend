import './App.css';
import Main from '../Main/Main';
import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import * as MainApi from "../../utils/MainApi";
import '../../i18n'

function App() {
  return (
    <div className="App">
    <Fragment>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  </div>
  );
}

export default App;
