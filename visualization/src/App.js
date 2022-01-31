import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import { Icon } from "leaflet";
import HeatmapLayer from "./components/Heatmap";
// import * as parkData from "./data/skateboard-parks.json";

function App() {
  return (
    <MapContainer center={[51, 0]} zoom={250} scrollWheelZoom={true} touchZoom={false}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer/>
    </MapContainer>
  );
}

export default App;