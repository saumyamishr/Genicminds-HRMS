import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 bg-gradient-to-b from-[#F4F6F8] to-[#E9EEF2] relative">
        {/* Subtle overlay pattern for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent pointer-events-none"></div>
        
        <Header />
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 min-h-full border border-white/20 ring-1 ring-gray-200/50">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}