import MapComponent from "../MapComponent";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useEffect } from "react";
import io from "socket.io-client"; // Assuming you have socket.io-client installed

export default function DriverDesktop() {
  useEffect(() => {
    // Function to start the camera and stream video
    function startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          // Do not display the video element, just send the stream to the server
          const socket = io(); // Connect to the socket server

          // Send the stream to the server using WebSocket
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            socket.emit('driverStream', e.data); // Send data to the server
          };
          mediaRecorder.start(10);  // Send data in chunks every 100ms
        })
        .catch(err => console.error('Error accessing camera:', err));
    }

    startCamera(); // Start the camera when the component mounts
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex justify-between p-2">
        <h1 className="text-white text-xl font-bold tracking-wide">
          TrackIn Dash Board(driver)
        </h1>
        <div className="flex items-center justify-center">
          <button className="flex bg-[#2F2E41] py-2 px-6 items-center justify-center gap-2 font-medium text-white rounded-xl">
            My profile <img src="/Driver/driver.png" alt="Driver profile" />
          </button>
        </div>
      </div>

      <div className="flex w-full text-white">
        {/* Left Side (Map and Information) */}
        <div className="w-[72%] p-2 flex flex-col space-y-2">
          <MapComponent />
          {/* Bottom Info Section */}
          <div className="flex items-center justify-between h-fit rounded-md">
            <div className="p-4">
              <div className="flex flex-col w-54 gap-4 p-2">
                <div className="rounded-xl p-2 bg-[#141414]">
                  <p className="flex flex-col gap-1 items-center justify-center">
                    <span className="text-lg font-semibold">
                      Total students
                    </span>
                    <span className="text-[#35E856] text-2xl font-extrabold">
                      50
                    </span>
                  </p>
                </div>
                <div className="rounded-xl p-2 bg-[#141414]">
                  <p className="flex flex-col gap-1 items-center justify-center">
                    <span className="text-lg px-4 font-semibold">
                      Total students
                    </span>
                    <span className="text-[#FFD700] text-2xl font-extrabold">
                      50
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Starting and Door Divs */}
            <div className="flex-1 flex gap-12 justify-between bg-[#141414] p-4 rounded-3xl ">
              <div className="px-2">
                <div className="flex flex-col justify-around items-center gap-16 p-2">
                  <img src="/Driver/staring.png" className="h-12 w-16" alt="Steering wheel" />
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
          </div>
        </div>

        {/* Right Side (Details Panel) */}
        <div className="w-[28%] p-2 space-y-2">
          {/* Profile and Trip Info */}
          <div className="bg-[#141414] p-3 rounded-md">
            <div className="flex justify-around">
              <div className="flex gap-4">
                <img src="/Driver/zoom.png" className="h-12 w-12" alt="Zoom" />
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="text-3xl font-bold text-[#35E856]">24 min</h1>
                <p className="text-lg font-medium">25 kms • 4:55 pm</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#35E85610] px-4 py-2 rounded-xl text-xl">
                <IoMdCheckmarkCircle fill="white" size={32} />
                <p className="text-base">Dropped</p>
              </div>
            </div>

            <div className="flex p-2 gap-20 items-center bg-[#202020] rounded-xl my-4">
              <img src="/Driver/profile.png" alt="Driver profile" />
              <p className="flex flex-col">
                <span className="font-bold tracking-wider text-lg">THEJAS C</span>
                <span className="text-sm tracking-wide text-gray-100">
                  Address 57144
                </span>
              </p>
            </div>
          </div>

          {/* Upcoming Stops */}
          <div className="bg-[#141414] p-3 rounded-md space-y-2 max-h-96 overflow-y-auto scrollbar-custom">
            <h2 className="text-xl font-bold tracking-wide">Upcoming Stops</h2>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-around bg-[#202020] p-2 rounded-md mb-2"
              >
                <img
                  src="/Driver/profile.png"
                  alt="Driver Avatar"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-2">
                  <h3 className="font-semibold tracking-wide text-gray-50">
                    Vasudev Shetty
                  </h3>
                  <p className="text-xs text-gray-300">Ayyarahalli 571311</p>
                </div>

                <div className="text-xs border border-white rounded-xl px-4 py-1">
                  <div className="flex flex-col items-center justify-center gap-0">
                    <p className="text-[10px]">Time left</p>
                    <p className="text-red-500 font-bold">1 hr 12 mins</p>
                  </div>
                  <hr />
                  <div className="flex flex-col items-center justify-center gap-0">
                    <p className="text-[10px]">Distance left</p>
                    <p className="text-yellow-500 font-bold">10 kms</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SOS Button */}
          <button className="w-full bg-red-600 text-white py-3 rounded-md text-lg font-bold">
            SOS
          </button>
        </div>
      </div>
    </div>
  );
}
