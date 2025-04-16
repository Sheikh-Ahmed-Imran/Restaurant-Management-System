import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../ui/ImageUpload";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { Select } from "../ui/Select";
import Button from "../ui/Button";
import { PreviewCard } from "./PreviewCard";
import axios from "axios";
import { toast } from "react-toastify";

// Define subcategories based on category
const subcategoriesMap: Record<string, string[]> = {
  Pizza: ["Large", "Medium", "Small"],
  Pastas: ["F1", "F2"],
  IceCream: ["2 Scoop", "3 Scoop", "4 Scoop"],
  Shwarma: ["zingershwarma", "zingercheeseshwarma", "chickenshwarma"],
  Extras: ["extras"],
  Burger: ["cheese", "zinger", "chicken"],
  Coldrinks: ["colddrinks"],
  Fries: ["fries"],
};

interface FoodItemFormData {
  name: string;
  description: string;
  price: string;
  cookTime: string;
  category: string;
  subcategory: string;
  image?: File | null;
}

const AddFoodPage= ({url:String}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Partial<FoodItemFormData>>({});
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm<FoodItemFormData>();

  const category = watch("category");

  // Update subcategories when category changes
  useEffect(() => {
    const newSubs = subcategoriesMap[category] || [];
    setSubcategories(newSubs);
    if (newSubs.length > 0) {
      setValue("subcategory", newSubs[0]); // set default subcategory
    }
  }, [category, setValue]);

  // Live preview
  useEffect(() => {
    const subscription = watch((value) => {
      setPreviewData((prev) => ({ ...prev, ...value }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onFormSubmit = async (data: FoodItemFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("cookTime", data.cookTime);
      if (imageFile) formData.append("image", imageFile);

      const res = await axios.post(`http://localhost:4000/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Food added successfully!");
      } else {
        toast.error(res.data.message || "Failed to add food");
      }
      console.log(res)
    } catch (error) {
      console.error("Error adding food:", error);
      console.log(error)
      toast.error("An error occurred while adding food");
    }
  };

  return (
    <main className="max-w-none flex gap-8 min-h-screen bg-gray-50 mx-auto px-4 py-8 max-md:max-w-[991px] max-md:flex-col max-sm:max-w-screen-sm max-sm:p-4">
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1 max-w-[821px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 leading-[30px] mb-[5px]">
            Add New Food Item
          </h1>
          <span className="text-base text-gray-600 leading-4">
            Fill in the details below to add a new item to your menu.
          </span>
        </div>

        <div className="shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 rounded-xl">
          <div className="mb-6">
          
            <ImageUpload onImageChange={setImageFile} />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2">Food Name</label>
            <Input
              register={register}
              name="name"
              placeholder="e.g., Zinger Burger"
              className="w-full border text-base text-black px-4 py-3 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-2">Description</label>
            <Textarea
              register={register}
              name="description"
              placeholder="Describe your food item..."
              className="w-full border text-base text-black h-[114px] resize-none px-4 py-3 rounded-lg"
            />
          </div>

          <div className="flex gap-6 mb-6 max-sm:flex-col">
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2">Price</label>
              <Input
                register={register}
                name="price"
                placeholder="e.g., 1000"
                className="w-full border text-base text-black px-4 py-3 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2">
                Cook Time (minutes)
              </label>
              <Input
                register={register}
                name="cookTime"
                placeholder="e.g., 30"
                className="w-full border text-base text-black px-4 py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-6 mb-6 max-sm:flex-col">
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2">Category</label>
              <Select
                register={register}
                name="category"
                options={Object.keys(subcategoriesMap).map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2">Subcategory</label>
              <Select
                register={register}
                name="subcategory"
                options={subcategories.map((sub) => ({
                  label: sub,
                  value: sub,
                }))}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" variant='dark'>
            Add Food
          </Button>
        </div>
      </form>

      <PreviewCard
        name={previewData.name || ""}
        description={previewData.description || ""}
        price={previewData.price || ""}
        category={previewData.category || ""}
        subcategory={previewData.subcategory || ""}
        imageUrl={
          imageFile
            ? URL.createObjectURL(imageFile)
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/2308ed851d838ad164371c5bde2bf29ce1f6b4fb"
        }
      />
    </main>
  );
};

export default AddFoodPage;
