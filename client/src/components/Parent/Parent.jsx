import { useState } from "react";
import MapComponent from "../MapComponent";

function Parent() {
  // State to control drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen relative">
      {/* Button to open/close the drawer */}
      <button
        onClick={toggleDrawer}
        className="p-3 bg-blue-500 text-white absolute top-5 left-5 z-50 rounded-full"
      >
        ☰ {/* Hamburger icon */}
      </button>

      {/* Map Component */}
      <div className="h-[80vh] sm:h-[100vh] md:h-[70vh] lg:h-[70vh] xl:h-[70vh]">
        <MapComponent />
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 p-5`}
      >
        {/* Drawer Content */}
        <h2 className="text-xl font-semibold">Drawer Content</h2>
        <p className="mt-4">This is your drawer content.</p>
        <button
          onClick={toggleDrawer}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close Drawer
        </button>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
        ></div>
      )}
    </div>
  );
}

export default Parent;
