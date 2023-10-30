import React from "react";
import { Button } from "@nextui-org/button";
interface CatSelectProps {
  selectedCat: string;
  onCategoryChange: (newCategory: string) => void;
}

const categories = [
  "ICT, Mathematics and Statistics",
  "Science Education",
  "Life Sciences",
  "Physical Sciences",
  "Earth & Environmental Sciences",
];

const CatSelect: React.FC<CatSelectProps> = ({
    selectedCat,
    onCategoryChange,
  }) => {
    const handlePrev = () => {
        const currentIndex = categories.indexOf(selectedCat);
        const newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
        const newCategory = categories[newIndex];
    
        onCategoryChange(newCategory);
      };
    const handleNext = () => {
      const currentIndex = categories.indexOf(selectedCat);
      const newIndex = currentIndex + 1 >= categories.length ? categories.length - 1 : currentIndex + 1;
      const newCategory = categories[newIndex];
  
      onCategoryChange(newCategory);
    };

  return (
    <div className="flex py-1">
      <div className="w-min font-bold text-left">
        <Button onClick={handlePrev}>&lt;</Button>
      </div>
      <div className="w-full text-center py-2 bg-zinc-700 mx-4 rounded-xl font-medium">
        <h1>{selectedCat}</h1>
      </div>
      <div className="w-min text-right">
        <Button onClick={handleNext}>&gt;</Button>
      </div>
    </div>
  );
};

export default CatSelect;
