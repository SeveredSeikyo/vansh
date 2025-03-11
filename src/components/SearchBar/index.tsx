import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    return (
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-full max-w-md shadow-sm focus-within:border-gray-500 transition">
            <FaSearch className="text-gray-500" />
            <input 
                type="search" 
                placeholder="Search events..." 
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
        </div>
    );
};

export default SearchBar;
