import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import About from './pages/About';
import PowerShell from './pages/PowerShell';
import WebAPIs from './pages/WebAPI';
import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './components/SideBarData';
import './components/NavBar.css';
import { IconContext } from 'react-icons';
import ReactTooltip from 'react-tooltip';

function App() {
  const [sidebar, setSidebar] = useState(false)  
  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
      <Router>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to="#" className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
            </Link>
          </div>
          <div className='center'>
            <p>Build and Deploy helper for Developers</p>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSidebar}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'>
                  <AiIcons.AiOutlineClose></AiIcons.AiOutlineClose>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} data-tip={item.title}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/powerShell' element={<PowerShell />} />
          <Route path='/webAPI' element={<WebAPIs />} />
        </Routes>
      </Router>
      <ReactTooltip />
    </>
  );
}

export default App;
