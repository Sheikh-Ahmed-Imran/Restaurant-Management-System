import React, { useState } from 'react';
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon, label, isActive, isOpen, to }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 text-base font-normal whitespace-nowrap px-3 py-3 rounded-lg transition-all duration-200",
      isActive && "bg-orange-50 text-orange-600",
      !isActive && "text-gray-600 hover:bg-gray-100"
    )}
  >
    <img
      src={icon}
      alt=""
      className="aspect-square w-5 shrink-0"
    />
    {isOpen && <div className="py-0.5">{label}</div>}
  </Link>
);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // ✅ React Router location hook

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={cn(
        "bg-white shadow h-screen transition-all duration-300 relative",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {isOpen && (
        <div className=" text-2xl text-orange-600 font-bold whitespace-nowrap leading-none px-6 py-[26px] ">
          TasteBuds
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-12px] bg-orange-600 text-white p-2 rounded-full z-10"
      >
        {isOpen ? '←' : '→'}
      </button>

      <nav className="flex flex-col p-2">
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/d9af55e4d29671006eaada67c182ab53bb4647c8?placeholderIfAbsent=true"
          label="Dashboard"
          isOpen={isOpen}
          isActive={location.pathname === '/'}
          to="/"
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/e98cf6fd78c9df247cc597b127dbdef98612fc57?placeholderIfAbsent=true"
          label="Orders"
          isOpen={isOpen}
          isActive={location.pathname === '/allorders'}
          to="/allorders"
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/d3e0ccf02aec2e6c2d3ba6d4352b20d9d1ab85d9?placeholderIfAbsent=true"
          label="Menu"
          isOpen={isOpen}
          isActive={location.pathname === '/food'}
          to="/food"
        />
      </nav>
    </div>
  );
};
