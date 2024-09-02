import React from "react";
import { useContext } from "react";
import { Context } from "../context/contextApi.jsx";
import { categories } from "../utils/Constants.jsx"; // Adjust the import path as needed

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory } = useContext(Context);
  const filteredCategories = categories.filter((category) =>
    [1, 2, 3].includes(category.id)
  );

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-21 bg-black text-white flex flex-col items-center py-4 space-y-8">
      {filteredCategories.map((category) => (
        <React.Fragment key={category.id}>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              selectedCategory === category.name ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className="text-2xl mb-1">{category.icon}</div>
            <span className="text-xs">{category.name}</span>
          </div>
          {category.divider && <hr className="my-2 border-white/[0.2]" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LeftNav;
