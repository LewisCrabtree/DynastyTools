import Navbar from '../components/Navbar';
import RankingsPage from '../pages/RankingsPage';
import React from 'react';
import { Router, Route, Routes, Navigate } from "react-router-dom";
import VotePage from '../pages/VotePage';
import UserRankingsPage from '../pages/UserRankingsPage';
import { withAuthenticationRequired } from "@auth0/auth0-react";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
            <Route path="/" exact element={<Navigate to="/vote" />}></Route>
            <Route path="/vote" element={ <VotePage /> }></Route>
            <Route path="/rankings" element={<RankingsPage personalrankings={false} />}></Route>
            <Route path="/myrankings" element={<UserRankingsPage personalrankings={true} />}></Route>
            <Route path="/calculator"></Route>
        </Routes>
      </main>
    </Router>
  )
}
export default App;