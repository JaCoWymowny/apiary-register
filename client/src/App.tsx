import React, { FC } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Layout from "./components/Layout";

const App:FC = () => {
  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
