import MapComponent from "../MapComponent";
import { useAuth } from "../../context/auth";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverDesktop() {
  const { user } = useAuth();
  const [routeData, setRouteData] = useState();
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student data based on the user
    const fetchDriver = async () => {
      try {
        setLoading(true);
        const { data: busdata } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/getData/bus`
        );

        const busassigned = busdata.find(
          (bus) => bus.driverId._id === user._id
        );

        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/getData/busRoute`
        );
        const busRoute = data.find((route) => route.name === busassigned.name);
        const { data: studentdata } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/getData/student`
        );
        setStudent(
          studentdata.filter(
            (student) => student.assignedBus._id === busassigned._id
          )
        );
        console.log(
          studentdata.filter(
            (student) => student.assignedBus._id === busassigned._id
          )
        );
        setRouteData(busRoute);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student or bus data", error);
      }
    };

    fetchDriver();
  }, [user]);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex justify-between p-2">
        <h1 className="text-white text-xl font-bold tracking-wide">
          TrackIn Dash Board(driver)
        </h1>
        <div className="flex items-center justify-center">
          <button className="flex bg-[#2F2E41] py-2 px-6 items-center justify-center gap-2 font-medium text-white rounded-xl">
            My profile <img src="/Driver/driver.png" />
          </button>
        </div>
      </div>

      <div className="flex  w-full   text-white">
        {/* Left Side (Map and Information) */}
        <div className="w-[72%] p-2 flex flex-col space-y-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MapComponent
              routeData={routeData}
              waypoints={routeData.stops.map((stop) => ({
                lat: stop.coordinates.coordinates[1],
                lng: stop.coordinates.coordinates[0],
              }))}
            />
          )}
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
                    <span className="text-lg px-4  font-semibold">
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
              <div className="px-2 ">
                <div className="flex flex-col justify-around items-center gap-16 p-2">
                  <img src="/Driver/staring.png" className="h-12 w-16 " />
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
                <img src="/Driver/zoom.png" className="h-12 w-12" />
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
              <img src="/Driver/profile.png" />
              <p className="flex flex-col">
                <span className="font-bold tracking-wider text-lg">
                  THEJAS C
                </span>
                <span className="text-sm tracking-wide text-gray-100">
                  Address 57144
                </span>
              </p>
            </div>
          </div>

          {/* Upcoming Stops */}
          <div className="bg-[#141414] p-3 rounded-md space-y-2 max-h-96 overflow-y-auto scrollbar-custom">
            <h2 className="text-xl font-bold tracking-wide">Upcoming Stops</h2>
            {student?.map((stud, i) => (
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
                    {stud.name}
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
