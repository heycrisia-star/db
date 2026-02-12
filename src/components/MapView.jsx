import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LOCATIONS, TYPES } from '../data/events';

// Leaflet icon fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker component
const CustomMarker = ({ position, type, title, desc }) => {
    const typeInfo = TYPES[type] || TYPES.CULT;

    const divIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div class="pulse-marker" style="background-color: ${typeInfo.color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.4);"></div>`,
        iconSize: [24, 24]
    });

    return (
        <Marker position={position} icon={divIcon}>
            <Popup>
                <b>{title}</b><br />{desc}
            </Popup>
        </Marker>
    );
};

// Component to handle View updates
const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapView = ({ activeWeek }) => {
    const defaultCenter = [41.3851, 2.1734];
    const defaultZoom = 12;

    const markers = [];
    if (activeWeek && activeWeek.events.length > 0) {
        activeWeek.events.forEach(evt => {
            const locKey = Object.keys(LOCATIONS).find(k => (evt.desc && evt.desc.includes(LOCATIONS[k].name)) || (evt.name.includes("F1") && k === 'CIRCUIT') || (evt.name.includes("Primavera") && k === 'FORUM') || (evt.name.includes("Goya") && k === 'CCIB'));
            const loc = locKey ? LOCATIONS[locKey] : LOCATIONS.CENTER;
            markers.push({ ...evt, position: [loc.lat, loc.lng] });
        });
    }

    const center = markers.length > 0 ? markers[0].position : defaultCenter;
    const zoom = markers.length > 0 ? 13 : defaultZoom;

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapUpdater center={center} zoom={zoom} />
            {markers.map((evt, idx) => (
                <CustomMarker
                    key={idx}
                    position={evt.position}
                    type={evt.type}
                    title={evt.name}
                    desc={evt.desc}
                />
            ))}
        </MapContainer>
    );
};

export default MapView;
