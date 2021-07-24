import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../routes/HomePage';
import LevelPage from '../routes/LevelPage';
import ModListPage from '../routes/ModListPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/levels">
          {/* LEVEL LIST IS HERE */}
        </Route>

        <Route exact path="/levels/:id">
          <LevelPage />
        </Route>

        <Route exact path="/mods">
          <ModListPage />
        </Route>

        <Route exact path="/">
          <HomePage />
        </Route>

      </Switch>
    </Router>
  );
};

export default AppRouter;