import {useEffect} from 'react'
import {useMap} from 'react-leaflet'
import L from 'leaflet'
import "leaflet.heat"
import { mockData } from '../mock/mockData'

export default function HeatmapLayer() {
    const map = useMap()
    useEffect(() => {
        let data = mockData.features
        const points = mockData
            ? data.map((p) => {
                let coords = p.geometry.coordinates
                let intensity = p.properties.intensity
                return [coords[1], coords[0], intensity * 5000]; // lat lng intensity
            })
            : [];
        L.heatLayer(points).addTo(map);
    }, []);

    return null;
}