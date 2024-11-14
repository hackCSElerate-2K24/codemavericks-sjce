import MapComponent from "../MapComponent";

function Parent() {
  return (
    <div className=" flex flex-col bg-[#141414] text-white relative">
      {/* Map Component (70% Height) */}
      <div className="h-[70%] relative z-0">
        <MapComponent />
      </div>

      {/* Speed and Driver Information */}
      <div className="absolute bottom-[15rem] left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4 w-11/12 max-w-md">
        <div className="flex flex-col items-center bg-[#1C1C1E] h-fit p-4 rounded-xl shadow-lg transition-all transform hover:scale-105 text-center">
          <p className="text-3xl font-bold text-[#35E856]">45</p>
          <span className="text-xs text-gray-300">kmph</span>
        </div>

        <div className="flex items-center gap-4 bg-[#1C1C1E] rounded-lg p-4 shadow-lg transition-all transform hover:scale-105 w-fit">
          <img src="/Driver/driver.png" className="h-12 w-12 rounded-full border-2 border-gray-600" />
          <div className="flex flex-col text-sm">
            <h1 className="font-semibold text-lg">Changappa</h1>
            <p className="text-xs text-gray-400">KA 09 MD 2619</p>
            <div className="flex items-center gap-2 mt-1">
              <button className="bg-[#35E856] text-xs px-2 py-1 rounded-md hover:bg-[#2cc74d] transition duration-200">
                Call
              </button>
              <p className="text-xs text-gray-300">+91 7338134484</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="h-[30%] flex flex-col justify-center items-center bg-[#141414] p-6 space-y-4">
        {/* Trip Time */}
        <h1 className="text-red-500 text-3xl font-bold">1 hr 15 mins</h1>

        {/* Trip Distance and Time */}
        <div className="flex items-center text-sm space-x-2 text-gray-400">
          <p>25 kms</p>
          <span>•</span>
          <p>4:55 pm</p>
        </div>

        {/* Driver Info */}
        <div className="flex items-center gap-4 bg-[#202020] p-4 rounded-lg w-full max-w-md shadow-md">
          <img
            src="/student.png"
            alt="Driver"
            className="h-14 w-14 rounded-full border-2 border-gray-600"
          />
          <div className="text-sm">
            <h1 className="font-semibold text-lg">Thejas C</h1>
            <p className="text-gray-400">Address 571444</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parent;
