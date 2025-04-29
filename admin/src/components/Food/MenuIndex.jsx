import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MenuHeader } from "./MenuHeader";
import { MenuFilters } from "./MenuFilter";
import { useNavigate } from "react-router-dom";
import { MenuGrid } from "./MenuGrid";
import { Sidebar } from "../Dashboard/Sidebar";

const Menu = ({url}) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

const navigate=useNavigate()
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        toast.error("Failed to load food items");
      }
    } catch (err) {
      toast.error("Error fetching food items");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchItems(); // Refresh list
      } else {
        toast.error("Failed to delete item");
      }
    } catch (err) {
      toast.error("Error deleting item");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editfood/${id}`);
  };

  const handleSelect = (id, selected) => {
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Optional: Apply search & filter logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? item.subcategory === selectedSubcategory : true;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex">
     
      <div className="flex flex-col min-h-screen bg-gray-50 w-full">
        <main className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto p-8">
          <MenuHeader onAddItem={() => navigate("/addfood")} />
          <div className="flex flex-col gap-8">
            <MenuFilters
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
            <MenuGrid
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Menu;
