import { useState, useEffect } from "react";
import MapComponent from "../MapComponent";
import axios from "axios"; // For making HTTP requests
import toast from "react-hot-toast";

function Admin() {
  const [busData, setBusData] = useState([]);
  const [busRoutes, setBusRoutes] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for toast
  const [selectedBus, setSelectedBus] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch bus data
        const busDataResponse = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/getData/bus`
        );
        setBusData(busDataResponse.data);

        // Fetch bus route data
        const busRoutesResponse = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/getData/busRoute`
        );
        setBusRoutes(busRoutesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again."); // Error toast
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">TrackIn Dashboard (Admin)</h1>
        <button className="flex items-center bg-[#2F2E41] py-2 px-4 rounded-xl">
          <span>Admin</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex space-x-4">
        {/* Left Sidebar: Buses List */}
        <div className="w-[28%] bg-[#141414] p-4 rounded-md space-y-3 overflow-y-auto h-[98vh] scrollbar-custom">
          <h2 className="text-lg font-bold mb-2">Buses</h2>
          {loading ? (
            <div>Loading...</div> // Loader while data is being fetched
          ) : (
            busData.map((bus, index) => {
              const speedColor =
                bus.speed > 80
                  ? "text-red-500"
                  : bus.speed > 60
                  ? "text-yellow-500"
                  : "text-blue-400";

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-[#202020] p-3 rounded-lg ${
                    selectedBus === index && "bg-[#d32f]"
                  } cursor-pointer`}
                  onClick={() => setSelectedBus(index)}
                >
                  <div className="flex items-center space-x-2 h-full">
                    <div className="flex items-center justify-center flex-col gap-1">
                      <img
                        src="/admin/bus.png"
                        alt={`Bus ${bus.id}`}
                        className="w-16 rounded-full h-12"
                      />
                      <p className="text-xs font-semibold">{bus.numberplate}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        {bus.busNumberPlate}
                      </p>
                      <p className="text-xs">{bus.driverId.name}</p>
                      <button className="bg-green-500 text-xs px-2 py-1 rounded-md">
                        Call
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p
                      className={`border flex flex-col items-center py-2 px-4 rounded-xl justify-center`}
                    >
                      <span className={`${speedColor} text-xl font-bold`}>
                        {23}
                      </span>
                      <span className="text-xs">kmph</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Map and Driver Info Section */}
        <div className="w-[72%] flex flex-col space-y-4 h-full">
          <div className="flex space-x-4 h-full">
            {/* Map Section */}
            <div className="w-[70%] h-full bg-[#2F2E41] rounded-md overflow-hidden">
              {busRoutes ? (
                <MapComponent
                  routeData={busRoutes[selectedBus]}
                  waypoints={busRoutes[selectedBus].stops.map((stop) => ({
                    lat: stop.coordinates.coordinates[1],
                    lng: stop.coordinates.coordinates[0],
                  }))}
                />
              ) : (
                <p className="text-center p-4">Loading Map...</p>
              )}
            </div>

            {/* Driver Info Section */}
            <div className="flex flex-col justify-around px-1">
              <div className="w-] bg-[#141414] p-4 rounded-md flex flex-col h-fit text-center space-y-2">
                <div className="flex gap-4">
                  <img
                    src="/Driver/driver.png"
                    alt="Driver"
                    className="w-20 h-20 mb-2 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold tracking-wide">
                      Channapa K
                    </h3>
                    <p className="text-sm">KA 06 M 4568</p>
                    <p className="text-xs">Ashok Leyland 500d (50 seater)</p>
                  </div>
                </div>
                <div className="flex flex-col flex-start gap-1 font-medium">
                  <p className="text-xs">Age: 35</p>
                  <p className="text-xs">Phone: 96312487951</p>
                  <p className="text-xs">Email: driver@gmail.com</p>
                  <p className="text-xs">
                    Address: #123, JP nagar, Mysuru, 57006
                  </p>
                </div>
              </div>{" "}
              <div className="flex space-x-4">
                <div className="w-full bg-[#2F2E41] p-4 rounded-md h-40 flex items-center justify-center">
                  Camera
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 flex gap-12 justify-between bg-[#141414] p-4 rounded-3xl ">
              <div className="px-2 ">
                <div className="flex flex-col justify-around items-center gap-16 p-2">
                  <img src="/Driver/staring.png" className="h-12 w-16 " />
                  <p className="text-yellow-600">Door</p>
                </div>
              </div>

              {/* Render 10 Seats dynamically (5 Seats in each row) */}
              <div className="grid grid-cols-5 gap-4 w-full">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-24 bg-[#888]"
                  >
                    <img
                      src="/Driver/seat.png"
                      className="h-12 w-12"
                      alt={`Seat ${index + 1}`}
                    />
                    <p className="text-sm text-center text-gray-100">
                      Seat {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-54 gap-4 p-2">
              <div className="rounded-xl p-2 bg-[#141414]">
                <p className="flex flex-col gap-1 items-center justify-center">
                  <span className="text-lg font-semibold">Total students</span>
                  <span className="text-[#35E856] text-2xl font-extrabold">
                    {/* {busData[selectedBus]?.capacity} */}
                  </span>
                </p>
              </div>
              <div className="rounded-xl p-2 bg-[#141414]">
                <p className="flex flex-col gap-1 items-center justify-center">
                  <span className="text-lg font-semibold">Total stops</span>
                  <span className="text-[#FFD700] text-2xl font-extrabold">
                    {/* {busRoutes[selectedBus].stops.length} */}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
