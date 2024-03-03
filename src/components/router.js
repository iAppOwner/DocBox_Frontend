import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';

const DocRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/board" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default DocRouter;