"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactVirtualized = require("react-virtualized");
var _lodash = _interopRequireDefault(require("lodash.debounce"));
require("./Select.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Select.js
var Select = function Select(_ref) {
  var children = _ref.children,
    onSelect = _ref.onSelect,
    placeholder = _ref.placeholder,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 320 : _ref$width,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    value = _ref.value;
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchTerm = _useState2[0],
    setSearchTerm = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    visibleOptions = _useState4[0],
    setVisibleOptions = _useState4[1];
  var _useState5 = (0, _react.useState)(10),
    _useState6 = _slicedToArray(_useState5, 2),
    scrollIndex = _useState6[0],
    setScrollIndex = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isDropdownOpen = _useState8[0],
    setIsDropdownOpen = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedOption = _useState10[0],
    setSelectedOption = _useState10[1];
  var dropdownRef = (0, _react.useRef)(null);

  // Extract options from children
  var options = [];
  if (children) {
    options = _react.Children.map(children, function (child) {
      return {
        value: child.props.value,
        displayValue: child.props.children
      };
    });
  }
  (0, _react.useEffect)(function () {
    if (value) {
      var selected = options.find(function (option) {
        return option.value === value;
      });
      if (selected) {
        setSelectedOption(selected);
        setSearchTerm(selected.displayValue);
      }
    }
  }, [value, options]);
  var handleSearch = (0, _react.useCallback)((0, _lodash["default"])(function (term) {
    var filtered = options.filter(function (option) {
      return option.displayValue.toLowerCase().includes(term.toLowerCase()) && option.value !== (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value);
    });
    setVisibleOptions(filtered.slice(0, 10));
    setScrollIndex(10);
  }, 300), [options, selectedOption]);
  var onSearchChange = function onSearchChange(e) {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };
  var loadMoreRows = function loadMoreRows(_ref2) {
    var stopIndex = _ref2.stopIndex;
    var filteredOptions = options.filter(function (option) {
      return option.displayValue.toLowerCase().includes(searchTerm.toLowerCase()) && option.value !== (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value);
    });
    var newOptions = filteredOptions.slice(scrollIndex, stopIndex + 10);
    setVisibleOptions(function (prev) {
      return [].concat(_toConsumableArray(prev), _toConsumableArray(newOptions));
    });
    setScrollIndex(stopIndex + 10);
  };
  var handleSelect = function handleSelect(option) {
    setSelectedOption(option);
    setSearchTerm(option.displayValue);
    setIsDropdownOpen(false);
    onSelect(option === null || option === void 0 ? void 0 : option.displayValue);
  };
  var toggleDropdown = function toggleDropdown() {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      setSearchTerm("");
    } else {
      setIsDropdownOpen(true);
      var filteredOptions = options.filter(function (option) {
        return option.value !== (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value);
      });
      setVisibleOptions([selectedOption].concat(_toConsumableArray(filteredOptions.slice(0, 10)))); // Include selected option in visible options
      setScrollIndex(10);
      setSearchTerm("");
    }
  };
  var handleClickOutside = function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setSearchTerm("");
    }
  };
  (0, _react.useEffect)(function () {
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (disabled) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "select-container",
      style: {
        width: width
      },
      ref: dropdownRef
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "select-input disabled"
    }, selectedOption ? selectedOption.displayValue : placeholder));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "select-container",
    style: {
      width: width
    },
    ref: dropdownRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "select-input",
    onClick: toggleDropdown
  }, isDropdownOpen ? "" : selectedOption ? selectedOption.displayValue : placeholder), isDropdownOpen && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: searchTerm,
    onChange: onSearchChange,
    className: "search-input",
    placeholder: "Search...",
    style: {
      width: "calc(".concat(width, "px - 22px)")
    } // Adjust based on padding
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "options-list",
    style: {
      width: width
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.List, {
    height: Math.min(options.length * 30, 200) // Limit height based on options count or 200px
    ,
    rowCount: visibleOptions.length,
    rowHeight: 30,
    width: width,
    rowRenderer: function rowRenderer(_ref3) {
      var _visibleOptions$index, _visibleOptions$index2;
      var index = _ref3.index,
        key = _ref3.key,
        style = _ref3.style;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: (_visibleOptions$index = visibleOptions[index]) === null || _visibleOptions$index === void 0 ? void 0 : _visibleOptions$index.value,
        style: style,
        className: "option",
        onClick: function onClick() {
          return handleSelect(visibleOptions[index]);
        }
      }, (_visibleOptions$index2 = visibleOptions[index]) === null || _visibleOptions$index2 === void 0 ? void 0 : _visibleOptions$index2.displayValue);
    },
    onRowsRendered: function onRowsRendered(_ref4) {
      var stopIndex = _ref4.stopIndex;
      if (stopIndex + 1 === (visibleOptions === null || visibleOptions === void 0 ? void 0 : visibleOptions.length)) {
        loadMoreRows({
          stopIndex: stopIndex
        });
      }
    }
  }))));
};
var _default = exports["default"] = Select;