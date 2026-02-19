import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CalendarClock, 
  Clock,
  Settings,
  HelpCircle
} from "lucide-react";


export default function Sidebar() {
  const navItems = [
    { path: "/", name: "Dashboard", icon: LayoutDashboard },
    { path: "/employees", name: "Employees", icon: Users },
    { path: "/departments", name: "Departments", icon: Building2 },
    { path: "/leave", name: "Leave", icon: CalendarClock },
    { path: "/attendance", name: "Attendance", icon: Clock },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-[var(--color-primary)] text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)]'
    }`;
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3 top-0 z-20">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl flex items-center justify-center shadow-md">
            <img src="/Short-logo.png" alt="Logo" className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-secondary)] leading-tight">
              Genic Minds
            </h2>
            <p className="text-xs text-gray-500">HR Management</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={getNavLinkClass}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
        
        <NavLink
          to="/help"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors mt-1"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Help</span>
        </NavLink>
      </div>
    </div>
  );
}