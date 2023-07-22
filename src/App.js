import { useState } from 'react';

import NavComponent from './components/NavComponent';
import TodoList from './components/Todo';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Player from './pages/Player';
import Quest from './pages/Quest';
import Intermediate from './pages/intermediate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestDetail from './pages/QuestDetail';
import WanderingDetail from './pages/WanderingPage';
import RestPage from './pages/RestPage';
import WanderingPage from './pages/WanderingPage';
import OnlinePlayers from './pages/OnlinePlayers';
import BetPage from './pages/BetPage';
import PlaylistPage from './pages/PlaylistPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route Component={Welcome} path="/welcome" exact />
          <Route Component={Login} path="/login" exact />
          <Route Component={Player} path="/" exact />
          <Route Component={Intermediate} path="/authenticating" exact />
          <Route Component={QuestDetail} path="/questdetail" exact />
          <Route Component={WanderingPage} path="/wanderingpage" exact />
          <Route Component={RestPage} path="/restPage" exact />
          <Route Component={OnlinePlayers} path="/onlineplayers" exact />
          <Route Component={BetPage} path="/bet" exact />
          <Route Component={PlaylistPage} path="/playlistpage" exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
