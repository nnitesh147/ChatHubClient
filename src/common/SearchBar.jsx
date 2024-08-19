import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = ({ onchange, value }) => {
  return (
    <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
      <div className="">
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search or Start a New Chat"
          className="bg-transparent text-sm focus:outline-none text-white w-full"
          value={value}
          onChange={(e) => onchange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
