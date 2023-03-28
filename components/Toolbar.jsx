import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FaSortAlphaDown, FaCalendar, FaFilter } from 'react-icons/fa';


const Toolbar = ({
  sortType,
  setSortType,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
}) => {
  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-100 px-4 py-2">
  <div className="flex items-center gap-2">
    <label htmlFor="searchTerm" className="font-semibold">Search:</label>
    <input
      type="text"
      id="searchTerm"
      value={searchTerm}
      onChange={handleSearchTermChange}
      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
    />
  </div>

  <div className="flex items-center gap-4 mt-4 lg:mt-0">
    <div className="flex flex-col lg:flex-row items-center gap-2">
      <label htmlFor="sortType" className="font-semibold">Sort by:</label>
      <select
        id="sortType"
        value={sortType}
        onChange={handleSortTypeChange}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
      >
        <option value="title">Title</option>
        <option value="dueDate">Due date</option>
      </select>
    </div>

    <div className="flex flex-col lg:flex-row items-center gap-2">
      <label htmlFor="filterType" className="font-semibold">Filter:</label>
      <select
        id="filterType"
        value={filterType}
        onChange={handleFilterTypeChange}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
      >
        <option value="all">All</option>
        <option value="important">Important</option>
      </select>
    </div>
  </div>
</div>

  
  );
};

export default Toolbar;
