# virtuselect

## Introduction
`virtuselect` is a React component that allows you to create a select input with search functionality and virtualization. This ensures that only the visible options are rendered, improving performance when dealing with large datasets.

## Installation
To use `virtuselect`, you can install it via npm or yarn:

```bash
npm install virtuselect
```
or

```bash
yarn add virtuselect
```

## Usage
### Import
```javascript
import Select from 'virtuselect';
import Option from 'virtuselect/Option';
import 'virtuselect/lib/select.css';
```

### Props
| Prop        | Type                | Description                                              |
|-------------|---------------------|----------------------------------------------------------|
| children    | ReactNode           | The `Option` components to be rendered in the select     |
| onSelect    | function            | Callback triggered when an option is selected            |
| placeholder | string              | Placeholder for the search input                         |
| width       | number (optional)   | Width of the select input, default is 320px              |
| disabled    | boolean (optional)  | If true, the select input is disabled                    |
| value       | string              | The value of the selected option                         |

### Example
```javascript
import React, { useState } from "react";
import Select from "virtuselect";
import Option from "virtuselect/Option";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    console.log(option);
    setSelectedOption(option);
  };

  return (
    <div className="app-container">
      <h1>React Select Component Example</h1>
      <Select
        onSelect={handleSelect}
        value={selectedOption}
        placeholder="Select an option..."
        width={150} // Optional: specify the width, default is 320px
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="yiminghe">Yiminghe</Option>
        <Option value="option4">Option 4</Option>
        <Option value="option5">Option 5</Option>
        <Option value="option6">Option 6</Option>
        <Option value="option7">Option 7</Option>
        <Option value="option8">Option 8</Option>
        <Option value="option9">Option 9</Option>
        <Option value="option10">Option 10</Option>
        <Option value="option11">Option 11</Option>
        <Option value="option12">Option 12</Option>
        <Option value="option13">Option 13</Option>
        <Option value="option14">Option 14</Option>
        <Option value="option15">Option 15</Option>
        <Option value="option16">Option 16</Option>
        <Option value="option17">Option 17</Option>
        <Option value="option18">Option 18</Option>
        <Option value="option19">Option 19</Option>
        <Option value="option20">Option 20</Option>
        <Option value="option21">Option 21</Option>
        <Option value="option22">Option 22</Option>
        <Option value="option23">Option 23</Option>
        <Option value="option24">Option 24</Option>
        <Option value="option25">Option 25</Option>
        <Option value="option26">Option 26</Option>
        <Option value="option27">Option 27</Option>
        <Option value="option28">Option 28</Option>
        <Option value="option29">Option 29</Option>
        <Option value="option30">Option 30</Option>
      </Select>
      <div className="selected-value">
        {selectedOption ? `Selected: ${selectedOption}` : "No option selected"}
      </div>
    </div>
  );
};

export default App;
```

## Version
1.0.8

## Author
tk0038

## License
ISC
```

This README file includes an introduction, installation instructions, a detailed usage example, and a table of the available props for the `Select` component. This should help users understand how to use your `virtuselect` package effectively.