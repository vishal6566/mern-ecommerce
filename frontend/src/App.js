import { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Navbar from "./component/layout/Header/Navbar";
import Home from "./component/Home/Home.jsx";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route extact path="/" element={<Home />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
