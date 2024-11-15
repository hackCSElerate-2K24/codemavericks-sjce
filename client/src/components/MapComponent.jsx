/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import toast from "react-hot-toast";

const MapComponent = ({ routeData, waypoints }) => {
  const [markerPosition, setMarkerPosition] = useState([13.342393, 75.7982477]);
  const [angle, setAngle] = useState(0);
  const [currentWaypoints, setCurrentWaypoints] = useState(waypoints);

  const busIconUrl = "/busIcon.png";
  const busIcon = new L.Icon({
    iconUrl: busIconUrl,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });

  const routingControlRef = useRef(null);
  const animationTimeoutRef = useRef(null); // Store the timeout reference for animation

  // Custom hook for routing with stops and delays
  function RoutingMachine() {
    const map = useMap();

    // Reinitialize routing machine when waypoints change
    useEffect(() => {
      if (map && waypoints !== currentWaypoints) {
        // Stop the current animation if running
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current); // Stop previous animation
        }

        setCurrentWaypoints(waypoints);

        if (routingControlRef.current) {
          // Remove existing routing control
          routingControlRef.current.remove();
        }

        routingControlRef.current = L.Routing.control({
          waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
          lineOptions: {
            styles: [{ color: "#FFD700", weight: 5, opacity: 0.8 }],
          },
          createMarker: () => null,
          addWaypoints: false,
          show: false, // Disables display of summary info
        }).addTo(map);

        // Function to reverse geocode using Nominatim API (OpenStreetMap)
        const getLocationName = async (lat, lng) => {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.address) {
              const locationName = `${data.address.road || ""}, ${
                data.address.city || ""
              }, ${data.address.country || ""}`;
              return locationName || "Unknown location"; // Return the formatted location or a default message
            }
          } catch (error) {
            console.error("Error in reverse geocoding:", error);
            return "Unknown location"; // Return a fallback value in case of an error
          }
        };

        routingControlRef.current.on("routesfound", (e) => {
          const route = e.routes[0].coordinates;
          let i = 0;

          const animateBus = async () => {
            const delayTime = 200; // Adjust delay time for smoother transitions
            const toastInterval = 2000; // 2 seconds interval for toast

            // This will keep track of the last toast time
            let lastToastTime = Date.now();

            while (i < route.length) {
              const newPosition = route[i];
              const nextPosition = route[i + 1];
              setMarkerPosition(newPosition);

              if (nextPosition) {
                const newAngle = calculateAngle(newPosition, nextPosition);
                setAngle(newAngle);

                // Only raise a toast if 2 seconds have passed
                if (Date.now() - lastToastTime >= toastInterval) {
                  // Reverse geocode to get the location name
                  const locationName = await getLocationName(
                    nextPosition.lat,
                    nextPosition.lng
                  );

                  toast.success(`Moved to next stop: ${locationName}`);
                  lastToastTime = Date.now(); // Update the last toast time
                }
              }

              // Move to next position
              i++;
              map.panTo(newPosition, { animate: true, duration: 3 });

              // Introduce a delay for smooth animation
              await new Promise((resolve) => setTimeout(resolve, delayTime));
            }
          };

          animateBus();
        });
      }
    }, [waypoints, map]);

    return null;
  }

  // Helper functions
  const calculateAngle = (pos1, pos2) => {
    const dy = pos2.lat - pos1.lat;
    const dx = pos2.lng - pos1.lng;
    const theta = Math.atan2(dy, dx);
    return theta * (180 / Math.PI) + 90; // Convert radian to degrees
  };

  return (
    <div style={{ height: "480px", width: "100%" }}>
      <MapContainer
        center={routeData.stops[0].coordinates.coordinates}
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
        <RoutingMachine />

        {/* Display markers at each stop with hoverable popups */}
        {routeData.stops.map((stop) => (
          <Marker
            key={stop._id}
            position={[
              stop.coordinates.coordinates[1],
              stop.coordinates.coordinates[0],
            ]}
          >
            <Popup>{stop.name}</Popup>
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
