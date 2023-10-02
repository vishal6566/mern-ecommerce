import { useEffect } from 'react';
import './App.css';

import {BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Navbar from './component/layout/Header/Navbar';


function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <Router>
    

    <Navbar />
    <Footer />
    </Router>

  );
}

export default App;
