import { cn } from "../../lib/utils";

const NavItem = ({ icon, label, isActive }) => (
  <div
    className={cn(
      "flex items-stretch gap-3 text-base font-normal whitespace-nowrap pl-3 pr-[45px] py-3 rounded-lg",
      isActive && "bg-orange-50 text-orange-600",
      !isActive && "text-gray-600 hover:bg-gray-50",
    )}
  >
    <img
      src={icon}
      className="aspect-[1.25] object-contain w-5 shrink-0 my-auto"
    />
    <div className="py-0.5">{label}</div>
  </div>
);

export const Sidebar = () => {
  return (
    <div className="bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.1)] h-screen">
      <div className="border text-2xl text-orange-600 font-bold whitespace-nowrap leading-none px-6 py-[26px] border-b">
        FoodAdmin
      </div>
      <nav className="flex flex-col items-stretch justify-center p-4">
        <div className="w-full">
          <NavItem icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/d9af55e4d29671006eaada67c182ab53bb4647c8?placeholderIfAbsent=true" label="Dashboard" isActive />
          <NavItem icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/e98cf6fd78c9df247cc597b127dbdef98612fc57?placeholderIfAbsent=true" label="Orders" />
          <NavItem icon="https://cdn.builder.io/api/v1/image/assets/26d5a69107b541308c8fc309cac8cffb/d3e0ccf02aec2e6c2d3ba6d4352b20d9d1ab85d9?placeholderIfAbsent=true" label="Menu" />
        </div>
      </nav>
    </div>
  );
};