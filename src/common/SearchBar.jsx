import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = ({ onchange, value, placeholder }) => {
  return (
    <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
      <div className="">
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent text-sm focus:outline-none text-white w-full"
          value={value}
          onChange={(e) => onchange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
