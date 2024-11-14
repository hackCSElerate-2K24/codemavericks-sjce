/* eslint-disable no-unused-vars */
import { IoMdCheckmarkCircle } from "react-icons/io";
import MapComponent from "../MapComponent";
import { useState } from "react";
function d() {
  const [isStudentListOpen, setIsStudentListOpen] = useState(false);

  const toggleStudentList = () => setIsStudentListOpen(!isStudentListOpen);
  const closeStudentList = () => setIsStudentListOpen(false);
  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#141414] p-4 rounded-t-3xl shadow-lg transition-transform duration-300 z-20 ${
          isStudentListOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Student List</h2>
          <button
            onClick={closeStudentList}
            className="bg-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-700 transition-all"
          >
            Close
          </button>
        </div>

        {/* List of Students */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center bg-[#202020] p-3 rounded-lg shadow-md gap-4"
            >
              <img
                src="/Driver/profile.png"
                alt="Student Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white">Vasudev Shetty</h3>
                <p className="text-sm text-gray-400">Ayyarahalli 571311</p>
              </div>
              <div className="ml-auto text-center">
                <p className="text-xs text-gray-400">Time left</p>
                <p className="text-red-500 font-bold text-sm">1 hr 12 mins</p>
                <p className="text-xs text-gray-400">Distance left</p>
                <p className="text-yellow-500 font-bold text-sm">10 kms</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MapComponent />
      <div className="fixed top-4 left-6 right-6 bg-[#141414] flex items-center justify-between p-3 rounded-xl shadow-lg z-20">
        <div className="flex items-center gap-4">
          <img src="/Driver/zoom.png" className="h-12 w-12" alt="Zoom Icon" />
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

      <button
        onClick={toggleStudentList}
        className="fixed bottom-20 right-6 bg-blue-600 p-3 rounded-full shadow-lg z-10 hover:bg-blue-700 transition-all"
      >
        {isStudentListOpen ? "Close List" : "Open List"}
      </button>
    </div>
  );
}

export default d;
