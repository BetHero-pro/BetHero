import { useState } from 'react';
import './App.css';
import './css/general.css'
import NavComponent from './components/NavComponent';
import TodoList from './components/Todo';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Player from './pages/Player';
import Quest from './pages/Quest';

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const onChangeCurrentPage = (page) => {
    setCurrentPage(page);
  }

  const pages = [
    <Welcome currentPage={currentPage} setCurrentPage={onChangeCurrentPage} />,
    <Login currentPage={currentPage} setCurrentPage={onChangeCurrentPage} />,
    <Player />,
  ]

  return (
    <>
      <div class="d-flex justify-content-center margin-custom back-white reponsive-container">
        {
          pages[currentPage]
        }
      </div>
    </>
    );
}

export default App;
