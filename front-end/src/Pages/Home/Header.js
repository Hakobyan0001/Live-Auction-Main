import React from "react";
import { Button, Input, InputNumber, Select, Typography } from "antd";
import "./styles/items.css";
const { Option } = Select;

const Header = ({
  searchedText,
  handleSearchTextChange,
  onSearchPress,
  sortOrder,
  setSortOrder,
  from,
  setFrom,
  to,
  setTo,
}) => {
  return (
    <div className="items-list-header">
      <div className="filter-item">
        <Input
          placeholder="Search items by the Name or Description"
          value={searchedText}
          onChange={handleSearchTextChange}
          style={{ width: "400px" }}
        />
      </div>
      <div className="price-filter-item">
        <Typography>Sort By Price:</Typography>
        <InputNumber
          value={from}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={(value) => setFrom(value)}
          style={{ marginRight: "10px", width: "100px" }}
          placeholder="From"
          min={0}
          addonBefore="$"
        />
        <InputNumber
          value={to}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={(value) => setTo(value)}
          style={{ marginRight: "10px", width: "100px" }}
          placeholder="To"
          min={0}
          addonBefore="$"
        />
      </div>
      <div className="sort-item">
        <Select
          value={sortOrder}
          style={{ width: "120px" }}
          onChange={(value) => setSortOrder(value)}
          placeholder="sort"
        >
          <Option value="ASC">Ascending</Option>
          <Option value="DESC">Descending</Option>
        </Select>
      </div>
      <div>
        <Button type="link" onClick={onSearchPress}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Header;
