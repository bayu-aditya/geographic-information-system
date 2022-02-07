import { 
  BrowserRouter as Router, 
  Routes, 
  Route } from "react-router-dom";

import Home from "./home"
import Gmaps from "./gmaps"
import MapsLeaflet from "./leafletmaps"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gmaps" element={<Gmaps />} />
        <Route path="/maps-leaflet" element={<MapsLeaflet />} />
      </Routes>
    </Router>
  );
}

export default App;
