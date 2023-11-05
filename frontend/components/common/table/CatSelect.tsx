import React from "react";
import { Button } from "@nextui-org/button";
import cx from 'classnames';

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

  const catColor = cx(
    selectedCat === 'Earth & Environmental Sciences' ? 'bg-green-500' :
    selectedCat === 'ICT, Mathematics and Statistics' ? 'bg-blue-500':
    selectedCat === 'Life Sciences' ? 'bg-purple-500' :
    selectedCat === 'Physical Sciences' ? 'bg-pink-500' :
    selectedCat === 'Science Education' ? 'bg-orange-500' : 'bg-zinc-700'
  );

  const handlePrev = () => {
    const currentIndex = categories.indexOf(selectedCat);
    const newIndex = currentIndex === 0 ? currentIndex - 1 : categories.length - 1;
    const newCategory = categories[newIndex];

    onCategoryChange(newCategory);
    console.log(newIndex);
  };
  const handleNext = () => {
    const currentIndex = categories.indexOf(selectedCat);
    const newIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
    const newCategory = categories[newIndex];

    onCategoryChange(newCategory);
    console.log(newIndex);
  };

  return (
    <div className="flex py-1">
      <div className="w-min font-bold text-left">
        <Button onClick={handlePrev}>&lt;</Button>
      </div>
      <div className={`w-full text-center py-2 mx-4 rounded-xl font-medium ${catColor}`}>
        <h1>{selectedCat}</h1>
      </div>
      <div className="w-min text-right">
        <Button onClick={handleNext}>&gt;</Button>
      </div>
    </div>
  );
};

export default CatSelect;
