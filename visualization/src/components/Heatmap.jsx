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

    useEffect(() => {

        map.on('zoomend', () => {
            if (map.getZoom() < 12){
                map.removeLayer(layers[1]);
            } else {
                map.removeLayer(layers[1]);
                map.addLayer(layers[1]);
            }
        })
        

    }, []);

    // console.log("RENDERING HEATMAP", {props}, layers);
    
    if (layers !== undefined) {
        layers.forEach((x) => map.removeLayer(x));
    }
    
    let data = props.data ? props.data : [];

    const points = data ? data.map((p) => {
        let coords = p.geometry.coordinates
        let intensity = p.properties.intensity
        return [coords[1], coords[0], intensity * 500]; // lat lng intensity
    }) : [];

    const markers = data ? data.map((p) => {
        let coords = p.geometry.coordinates
        let divIcon = L.divIcon({
            iconAnchor: [25, 25],
            iconSize: [50, 50]
        })
        let marker = L.marker([coords[1], coords[0]], { icon: divIcon })
        marker.setOpacity(0);

        let lastAccidentDate = p.properties.most_recent_accident_date.toString();
        // {"geometry":{"coordinates":[-1.893,52.434],"type":"Point"},"properties":{"id":105,"intensity":0.0909,"local_authority":"Birmingham","most_recent_accident_date":"Tue, 03 Feb 2015 00:00:00 GMT","number_of_accidents":2,"number_of_casualties":2,"number_of_vehicles":4},"type":"Feature"}
        let description = "Number of accidents: <b>" + p.properties.number_of_accidents + "</b><br>" +
                          "Involved vehicles: <b>" + p.properties.number_of_vehicles + "</b><br>" +
                          "Casualties: <b>" + p.properties.number_of_casualties + "</b><br>" +
                          "Local authority: <b>" + p.properties.local_authority + "</b><br>" +
                          "Latest accident: <b>" + lastAccidentDate.slice(0, lastAccidentDate.length - 13) + "</b>"

        marker.bindPopup(description);
    
        return marker;
    }) : [];

    let heatLayer = L.heatLayer(points);
    heatLayer.addTo(map);

    const markerLayer = L.layerGroup(markers);

    layers = [heatLayer, markerLayer]

    return null;
}