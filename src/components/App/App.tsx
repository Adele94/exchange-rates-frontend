import './App.css';
import Main from '../Main/Main';
import { Fragment} from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {

  return (
    <div className="App">
    <Fragment>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  </div>
  );
}

export default App;
