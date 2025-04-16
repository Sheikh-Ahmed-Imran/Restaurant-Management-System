import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CartHeader = () => {
  return (
    <header className="flex justify-center items-center w-full h-[125px] bg-white border border-gray-100 px-20 py-4 max-md:px-10 max-sm:px-5">
      <div className="w-full max-w-screen-xl">
        <nav
          className="flex items-center gap-2 text-sm mb-6"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="w-[8px] h-[12px] text-gray-400" />
          <Link to="/menu" className="text-gray-500 hover:text-gray-700">
            Menu
          </Link>
          <ChevronRight className="w-[8px] h-[12px] text-gray-400" />
          <span className="text-orange-500" aria-current="page">
            Cart
          </span>
        </nav>
        <h1 className="text-3xl font-bold text-black mb-1">Your Cart</h1>
        <p className="text-base text-gray-600">
          Review and finalize your delicious picks
        </p>
      </div>
    </header>
  );
};
