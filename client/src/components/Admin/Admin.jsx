import { useEffect, useState } from "react";
import io from "socket.io-client";
import MapComponent from "../MapComponent";

// Initialize Socket connection
const socket = io();

const busData = [
  { id: 1, plate: "KA 06 M 4568", driver: "Channapa K", speed: 45 },
  { id: 2, plate: "KA 06 M 1234", driver: "Arjun N", speed: 75 },
  { id: 3, plate: "KA 06 M 5678", driver: "Rahul R", speed: 85 },
  { id: 4, plate: "KA 06 M 7890", driver: "Suresh M", speed: 55 },
  { id: 5, plate: "KA 06 M 2345", driver: "Mohan K", speed: 90 },
  { id: 6, plate: "KA 06 M 6789", driver: "Vijay S", speed: 60 },
  { id: 7, plate: "KA 06 M 1011", driver: "Rajesh B", speed: 40 },
  { id: 8, plate: "KA 06 M 1213", driver: "Kiran C", speed: 65 },
  { id: 9, plate: "KA 06 M 1415", driver: "Ramesh D", speed: 78 },
  { id: 10, plate: "KA 06 M 1617", driver: "Mahesh E", speed: 88 },
  { id: 11, plate: "KA 06 M 1819", driver: "Anand F", speed: 52 },
  { id: 12, plate: "KA 06 M 2021", driver: "Naveen G", speed: 70 },
  { id: 13, plate: "KA 06 M 2223", driver: "Prakash H", speed: 85 },
  { id: 14, plate: "KA 06 M 2425", driver: "Siddharth I", speed: 67 },
  { id: 15, plate: "KA 06 M 2627", driver: "Ganesh J", speed: 45 },
  { id: 16, plate: "KA 06 M 2829", driver: "Sanjay K", speed: 95 },
];

function Admin() {
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    socket.on("adminStream", (data) => {
      setChunks((prevChunks) => [...prevChunks, data]);
    });

    return () => {
      socket.off("adminStream");
    };
  }, []);

  useEffect(() => {
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl(url);
    }
  }, [chunks]);

  return (
    <div className="bg-black min-h-screen text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">TrackIn Dashboard (Driver)</h1>
        <button className="flex items-center bg-[#2F2E41] py-2 px-4 rounded-xl">
          <span>Admin</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex space-x-4">
        {/* Left Sidebar: Buses List */}
        <div className="w-[28%] bg-[#141414] p-4 rounded-md space-y-3 overflow-y-auto h-[98vh] scrollbar-custom">
          <h2 className="text-lg font-bold mb-2">Buses</h2>
          {busData.map((bus, index) => {
            const speedColor =
              bus.speed > 80
                ? "text-red-500"
                : bus.speed > 60
                ? "text-yellow-500"
                : "text-blue-400";

            return (
              <div
                key={bus.id}
                className="flex items-center justify-between bg-[#202020] p-3 rounded-lg"
              >
                <div className="flex items-center space-x-2 h-full">
                  <div className="flex items-center justify-center flex-col gap-1">
                    <img
                      src="/admin/bus.png"
                      alt={`Bus ${bus.id}`}
                      className="w-16 rounded-full h-12"
                    />
                    <p className="text-xs font-semibold">Bus {index + 1}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{bus.plate}</p>
                    <p className="text-xs">{bus.driver}</p>
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
                      {bus.speed}
                    </span>
                    <span className="text-xs">kmph</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Map and Driver Info Section */}
        <div className="w-[72%] flex flex-col space-y-4 h-full">
          <div className="flex space-x-4 h-full">
            {/* Map Section */}
            <div className="w-[70%] h-full bg-[#2F2E41] rounded-md overflow-hidden">
              <MapComponent />
            </div>

            {/* Driver Info Section */}
            <div className="flex flex-col justify-around px-1">
              <div className="bg-[#141414] p-4 rounded-md flex flex-col h-fit text-center space-y-2">
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
                    Address: #123, JP Nagar, Mysuru, 57006
                  </p>
                </div>
              </div>

              {/* Camera Section */}
              <div className="flex space-x-4">
                <div className="w-full bg-[#2F2E41] p-4 rounded-md h-40 flex items-center justify-center">
                  {videoBlobUrl ? (
                    <video
                      controls
                      autoplay
                      src={videoBlobUrl}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-gray-400">Camera is loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Seats and Stats */}
          <div className="flex">
            <div className="flex-1 flex gap-12 justify-between bg-[#141414] p-4 rounded-3xl">
              <div className="px-2">
                <div className="flex flex-col justify-around items-center gap-16 p-2">
                  <img src="/Driver/staring.png" className="h-12 w-16" />
                  <p className="text-yellow-600">Door</p>
                </div>
              </div>

              {/* Render 10 Seats dynamically (5 Seats in each row) */}
              <div className="grid grid-cols-5 gap-4 w-full">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
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

            {/* Stats Section */}
            <div className="flex flex-col w-54 gap-4 p-2">
              <div className="bg-[#141414] rounded-lg py-8 px-6">
                <h3 className="text-xs font-semibold">Speed Limit</h3>
                <p className="text-2xl font-bold">60 KMPH</p>
              </div>
              <div className="bg-[#141414] rounded-lg py-8 px-6">
                <h3 className="text-xs font-semibold">Total Seats</h3>
                <p className="text-2xl font-bold">50</p>
              </div>
              <div className="bg-[#141414] rounded-lg py-8 px-6">
                <h3 className="text-xs font-semibold">Max Speed</h3>
                <p className="text-2xl font-bold">120 KMPH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
