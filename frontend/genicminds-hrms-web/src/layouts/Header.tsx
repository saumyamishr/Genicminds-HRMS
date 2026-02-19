import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="p-2 bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-6 flex items-center justify-between h-16">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <img 
            src="/src/assets/Genicminds-logo.png" 
            alt="Genicminds" 
            className="h-8 w-auto"
          />
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold text-gray-800">
            HR Management System
          </h1>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-500">admin@genicminds.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}