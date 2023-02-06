import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './style.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import DashNav from './Components/DashNav';
import MyResearch from './Components/MyResearch';
import DashTable from './Components/DashTable';
import ResearchInfo from './Components/ResearchInfo';
import Stats from './Components/Stats';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard/' element={<DashNav/>}>
          <Route path='' element={<DashTable/>}/>
          <Route path='myresearch' element={<MyResearch/>}/>
          <Route path='statistics' element={<Stats/>}/>
        </Route>
        <Route path='/researchinfo/:res_id' element={<ResearchInfo/>}/>
      </Routes>
    </Router>
  );
}