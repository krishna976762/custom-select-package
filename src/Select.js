// Select.js
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Children,
} from "react";
import { List } from "react-virtualized";
import debounce from "lodash.debounce";
import "./Select.css";

const Select = ({
  children,
  onSelect,
  placeholder,
  width = 320,
  disabled = false,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);

  // Extract options from children
  let options = [];
  if (children) {
    options = Children.map(children, (child) => ({
      value: child.props.value,
      displayValue: child.props.children,
    }));
  }

  useEffect(() => {
    if (value) {
      const selected = options.find((option) => option.value === value);
      if (selected) {
        setSelectedOption(selected);
        setSearchTerm(selected.displayValue);
      }
    }
  }, [value, options]);

  const handleSearch = useCallback(
    debounce((term) => {
      const filtered = options.filter(
        (option) =>
          option.displayValue.toLowerCase().includes(term.toLowerCase()) &&
          option.value !== selectedOption?.value
      );
      setVisibleOptions(filtered.slice(0, 10));
      setScrollIndex(10);
    }, 300),
    [options, selectedOption]
  );

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const loadMoreRows = ({ stopIndex }) => {
    const filteredOptions = options.filter(
      (option) =>
        option.displayValue.toLowerCase().includes(searchTerm.toLowerCase()) &&
        option.value !== selectedOption?.value
    );
    const newOptions = filteredOptions.slice(scrollIndex, stopIndex + 10);
    setVisibleOptions((prev) => [...prev, ...newOptions]);
    setScrollIndex(stopIndex + 10);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.displayValue);
    setIsDropdownOpen(false);
    onSelect(option?.displayValue);
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      setSearchTerm("");
    } else {
      setIsDropdownOpen(true);
      const filteredOptions = options.filter(
        (option) => option.value !== selectedOption?.value
      );
      setVisibleOptions([selectedOption, ...filteredOptions.slice(0, 10)]); // Include selected option in visible options
      setScrollIndex(10);
      setSearchTerm("");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (disabled) {
    return (
      <div className="select-container" style={{ width }} ref={dropdownRef}>
        <div className="select-input disabled">
          {selectedOption ? selectedOption.displayValue : placeholder}
        </div>
      </div>
    );
  }

  return (
    <div className="select-container" style={{ width }} ref={dropdownRef}>
      <div className="select-input" onClick={toggleDropdown}>
        {isDropdownOpen
          ? ""
          : selectedOption
          ? selectedOption.displayValue
          : placeholder}
      </div>
      {isDropdownOpen && (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input"
            placeholder="Search..."
            style={{ width: `calc(${width}px - 22px)` }} // Adjust based on padding
          />
          <div className="options-list" style={{ width }}>
            <List
              height={Math.min(options.length * 30, 200)} // Limit height based on options count or 200px
              rowCount={visibleOptions.length}
              rowHeight={30}
              width={width}
              rowRenderer={({ index, key, style }) => (
                <div
                  key={visibleOptions[index]?.value}
                  style={style}
                  className="option"
                  onClick={() => handleSelect(visibleOptions[index])}
                >
                  {visibleOptions[index]?.displayValue}
                </div>
              )}
              onRowsRendered={({ stopIndex }) => {
                if (stopIndex + 1 === visibleOptions?.length) {
                  loadMoreRows({ stopIndex });
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Select;
