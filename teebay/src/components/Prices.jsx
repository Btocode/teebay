import React from "react";
import { LuChevronsUpDown } from "react-icons/lu";

const Prices = ({ productInfo, setProductInfo }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center">
        Provide description of your product
      </p>
      <div className="w-full flex gap-4 items-center">
        <span className=" flex flex-col gap-2">
          <p>Price</p>
          <input
            type="number"
            placeholder="Purchase price"
            className="w-full border-2 p-2 rounded outline-gray-400"
            onChange={(e) => {
              setProductInfo({ ...productInfo, price: e.target.value });
            }}
            value={productInfo.price}
          />
        </span>
        <span className="flex gap-2 flex-col">
          <p>Rent</p>
          <span className="w-full flex gap-4">
            <input
              type="number"
              placeholder="Rent price"
              className="border-2 p-2 rounded outline-gray-400"
              onChange={(e) => {
                setProductInfo({ ...productInfo, rent: e.target.value });
              }}
              value={productInfo.rent}
            />
            <span className="border-2 p-2 rounded outline-gray-400">
              {productInfo.rent_type ? productInfo.rent_type : "Select Option"}
              <LuChevronsUpDown className="inline-block text-gray-600 ml-2 cursor-pointer text-lg" />
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Prices;
