import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet.heat"
import { mockData } from '../mock/mockData'

var layers = []

export default function HeatmapLayer(props) {

    const [ state, setState ] = useState({
        heatmap : {},
        markers: {}
    });

    const map = useMap();

    console.log("RENDERING HEATMAP", {props}, layers);
    if (layers !== undefined) {
        layers.forEach((x) => map.removeLayer(x));
    }
    
    let data = props.data ? props.data : [];

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

    layers = [heatLayer, markerLayer]

    return null;
}