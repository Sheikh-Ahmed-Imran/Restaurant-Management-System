import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { FoodCard } from "./FoodCard";
import { Pagination } from "./Pagination";
import { MenuSection } from "./MenuSection";
import { Footer } from "../HomePage/Footer";
import { Header } from "../HomePage/Navbar";

const categories = [
  { id: "all", name: "All Items" },
  { id: "Pizza", name: "Pizza" },
  { id: "Burger", name: "Burgers" },
  { id: "Pastas", name: "Pasta" },
  { id: "Shwarma", name: "Shwarma" },
  { id: "Desserts", name: "Desserts" },
  { id: "Drinks", name: "Drinks" },
];

const ITEMS_PER_PAGE = 6;

export const MenuLayout = () => {
  const { food_list, addToCart } = useContext(StoreContext);


  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredItems = food_list.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const displayedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <div className="flex flex-col items-center w-full pt-[72px] px-0">
        <header className="flex justify-center items-center w-full bg-white px-20 py-8 max-md:px-10 max-sm:px-5">
          <div className="flex flex-col items-center gap-[27px] w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Browse Our Menu
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

        <nav className="flex justify-center items-center w-full bg-white pt-4 pb-[17px] px-20 max-md:px-10 max-sm:px-5">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </nav>

        <section className="flex justify-center w-full bg-orange-50 px-20 py-8 max-md:px-10 max-sm:px-5">
          <MenuSection title="Menu Items">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
              {displayedItems.map((item) => (
               <FoodCard
               image={item.image}
               id={item._id}
               name={item.name}
               prices={item.prices}
               description={item.description}
               subcategories={item.subcategory}
               onAddToCart={(quantity, subcategory) => addToCart(item._id, subcategory, quantity)}
             />
             
              ))}
            </div>
          </MenuSection>
        </section>

        <section className="flex justify-center w-full px-20 py-8 max-md:px-10 max-sm:px-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>

        <Footer />
      </div>
    </div>
  );
}; 