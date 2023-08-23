import React from "react";
import { GET_PRODUCT } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Button from "../ui/Button";

const ProductBuyRent = ({ productInfo }) => {
  return (
    <div className="container mx-auto flex flex-col capitalize text-gray-600 justify-center items-center ">
      <div className="product-details w-[800px] h-[500px] mt-5  p-8 flex flex-col gap-4 ">
        <span className="flex flex-col gap-4">
          <p className="text-4xl mb-5">
            {productInfo?.title ? productInfo.title : "No name"}
          </p>
          <span className="flex gap-2 text-gray-400">
            <p>Categories:</p>
            <span className="flex flex-wrap gap-2">
              {productInfo?.categories?.map((category, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 capitalize">
                  {category?.split("_").join(" ")}
                </span>
              ))}
            </span>
          </span>
          <span className="flex text-gray-400 gap-2">
            <p>Price : ${productInfo?.price}</p>|
            <p>
              Rent : ${productInfo?.rent} / {productInfo?.rent_type}
            </p>
          </span>
          <p>{productInfo?.description}</p>
        </span>

        <span className="flex gap-4 mt-5 justify-end">
          <Button
            text={"Rent"}
            classname={"bg-blue-500 text-white px-8 py-2 rounded-md"}
          />
          <Button
            text={"Buy"}
            classname={"bg-blue-500 text-white px-8 py-2 rounded-md"}
          />
        </span>
      </div>
    </div>
  );
};

export default ProductBuyRent;
