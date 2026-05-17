import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Popular');  // Default text

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    // handleSearch(item); // Uncomment and define handleSearch if you want to trigger a search
  };

  const items = ['Newest', "Popular"];  // Only two options

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 bg-[#fff] lg:px-[2rem] md:px-[2rem] px-[2rem] lg:py-[0.8rem] md:py-[0.8rem] py-[0.5rem] lg:text-[18px] md:text-[18px] text-[12px] rounded-md hover:tracking-[1px] focus:outline-none border-[1px] inline-flex justify-between w-full ease-in-out duration-300"
      >
        {selectedItem}
        <IoMdArrowDropdown className="w-5 h-5 ml-2 mt-[] -mr-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
