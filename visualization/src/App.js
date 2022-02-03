import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import './App.css';
import HeatmapLayer from "./components/Heatmap";
import FilteringOptions from "./components/FilteringOptions";
import axios from 'axios';

function App() {

  const [ state, setState ] = useState({
    query_parameters: {
        "detail" : 4,
        "light_conditions" : [ 1, 4, 6 ],
        "date" : {
            "start" : "02/02/2015",
            "end" : "02/04/2015"
        }
    },
    data : [],
    layers : []
  });

  function setLayers(layers) {
    setState({ ...state, layers: layers });
  }

	async function queryBackend(query_parameters) {
    if (query_parameters === undefined || query_parameters === null) {
      query_parameters = {
          "detail" : 4,
          "light_conditions" : [ 1, 4, 6 ],
          "date" : {
              "start" : "02/02/2015",
              "end" : "02/04/2015"
          }
      }
    }

    query_parameters = Object.fromEntries(Object.entries(query_parameters).filter(([_, v]) => v != null));
    console.log("QUERY PARAMS: " + JSON.stringify(query_parameters));

    setState(query_parameters);

    let data = await axios.post(
      "http://localhost:4242/heatmap",
      query_parameters
    );
    
    setState({ ...state, data: data.data.features })
    console.log("RESPONSE", data);
	}

  useEffect(queryBackend, []);

  return (
    <MapContainer center={[53, -2]} zoom={7} scrollWheelZoom={true} zoomControl={false}>
      <FilteringOptions submit={queryBackend} numDataPoints={state.data !== undefined ? state.data.length : 0}/>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
      <HeatmapLayer data={state.data}/>
    </MapContainer>
  );
}

export default App;