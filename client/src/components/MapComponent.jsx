/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

// Define coordinates for Bangalore, Mysore, and stops along the route
const locations = {
  bangalore: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  mysore: { lat: 12.2958, lng: 76.6394, name: "Mysore" },
  ramnagar: { lat: 12.7401, lng: 77.2859, name: "Ramnagar" },
  maddur: { lat: 12.5847, lng: 77.0485, name: "Maddur" },
  srirangapatna: { lat: 12.4224, lng: 76.6945, name: "Srirangapatna" },
};

const MapComponent = () => {
  const [markerPosition, setMarkerPosition] = useState(locations.bangalore);
  const [angle, setAngle] = useState(0);

  // Bus icon with rotation capability
  const busIconUrl = "/busIcon.png";
  const busIcon = new L.Icon({
    iconUrl: busIconUrl,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });

  const routingControlRef = useRef(null);

  // Custom hook for routing with stops and delays
  function RoutingMachine({ waypoints }) {
    const map = useMap();

    useEffect(() => {
      if (map) {
        if (!routingControlRef.current) {
          routingControlRef.current = L.Routing.control({
            waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
            lineOptions: {
              styles: [{ color: "#FFD700", weight: 5, opacity: 0.8 }], // Yellow route
            },
            createMarker: () => null,
            addWaypoints: false,
            show: false, // Disables display of summary info
          }).addTo(map);

          routingControlRef.current.on("routesfound", (e) => {
            const route = e.routes[0].coordinates;
            let i = 0;

            const animateBus = async () => {
              while (i < route.length) {
                const newPosition = route[i];
                const nextPosition = route[i + 1];
                setMarkerPosition(newPosition);

                if (nextPosition) {
                  const newAngle = calculateAngle(newPosition, nextPosition);
                  setAngle(newAngle);
                }

                // Move to next position
                i++;
                map.panTo(newPosition);

                await delay(100); // Smooth transition between points
              }
            };

            animateBus();
          });
        }
      }
    }, [map]);

    return null;
  }

  // Helper functions
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const calculateAngle = (pos1, pos2) => {
    const dy = pos2.lat - pos1.lat;
    const dx = pos2.lng - pos1.lng;
    const theta = Math.atan2(dy, dx);
    return theta * (180 / Math.PI) + 90; // Convert radian to degrees
  };

  return (
    <div style={{ height: "480px", width: "100%" }}>
      <MapContainer
        center={locations.bangalore}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // Disable zoom controls
        attributionControl={false} // Disable attribution box
      >
        {/* High-contrast light theme TileLayer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Routing machine with stops */}
        <RoutingMachine
          waypoints={[
            locations.bangalore,
            locations.ramnagar,
            locations.maddur,
            locations.srirangapatna,
            locations.mysore,
          ]} 
        />

        {/* Display markers at each stop with hoverable popups */}
        {Object.values(locations).map((location) => (
          <Marker key={location.name} position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}

        {/* Bus marker with rotation */}
        <Marker
          position={markerPosition}
          icon={busIcon}
          rotationAngle={angle} // Set bus rotation
          rotationOrigin="center"
        >
          <Popup>Bus on its way!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
