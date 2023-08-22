import React, { useState } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import ListItemModal from "../ui/modals/ListItemModal";

const Prices = ({ productInfo, setProductInfo }) => {
  const [rentTypeModal, setRentTypeModal] = useState(false);
  const listItems = [
    { id: "1", name: "Daily" },
    { id: "2", name: "Weekly" },
    { id: "3", name: "Monthly" },
  ];
  const handleSelection = (item) => {
    setProductInfo({
      ...productInfo,
      rent_type: item.name,
    });
    setRentTypeModal(false);
  };

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
              // value should be greater than 0 and a number
              if (e.target.value < 0) {
                return;
              }
              // set the value as integer
              setProductInfo({
                ...productInfo,
                price: parseInt(e.target.value),
              });
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
                // value should be greater than 0 and a number
                if (e.target.value < 0) {
                  return;
                }
                // set the value as integer
                setProductInfo({
                  ...productInfo,
                  rent: parseInt(e.target.value),
                });
              }}
              value={productInfo.rent}
            />
            <span className="relative border-2 p-2 rounded outline-gray-400">
              {productInfo.rent_type ? productInfo.rent_type : "Rent type"}
              <LuChevronsUpDown
                onClick={() => {
                  setRentTypeModal(!rentTypeModal);
                }}
                className="inline-block text-gray-600 ml-2 cursor-pointer text-lg"
              />
              <ListItemModal
                trigger={rentTypeModal}
                setTrigger={setRentTypeModal}
                items={listItems}
                triggerFunction={handleSelection}
                cname={"w-[220px] top-10 right-0"}
                selectedItems={productInfo.rent_type}
              />
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Prices;
