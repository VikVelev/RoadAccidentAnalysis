import {useEffect, useState} from 'react'
import {useMap} from 'react-leaflet'
import L from 'leaflet'
import "leaflet.heat"
import { mockData } from '../mock/mockData'
import axios from 'axios';

export default function HeatmapLayer() {

    const [ state, setState ] = useState({
        heatmap : {},
        markers: {}
    });

    const map = useMap()
    useEffect(async () => {
        map.removeLayer(state.heatmap)
        map.removeLayer(state.markers)

        let data = await axios.post("http://localhost:4242/heatmap", {
            "detail" : 4,
            "light_conditions" : [ 1 ],
            "date" : {
                "start" : "02/02/2015",
                "end" : "02/04/2015"
            }
        });
        
        data = data ? data.data.features : mockData.features;

        const points = data ? data.map((p) => {
            let coords = p.geometry.coordinates
            let intensity = p.properties.intensity
            return [coords[1], coords[0], intensity * 2000]; // lat lng intensity
        }) : [];

        const markers = data ? data.map((p) => {
            let coords = p.geometry.coordinates
            let marker = L.marker([coords[1], coords[0]])
            marker.setOpacity(0);
            marker.bindPopup(JSON.stringify(p));
            
            let icon = marker.options.icon;
            icon.options.iconSize = [50, 50];
            icon.options.iconAnchor = [ 25, 25];
            marker.setIcon(icon);
            return marker;
        }) : [];

        let heatLayer = L.heatLayer(points);
        heatLayer.addTo(map);

        const markerLayer = L.layerGroup(markers);
        markerLayer.addTo(map);

        setState({ heatmap : heatLayer, markers: markerLayer });

    }, []);

    return null;
}