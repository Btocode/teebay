import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../ui/Button";
import Description from "../components/Description";
import Categories from "../components/Categories";
import Prices from "../components/Prices";
import Summery from "../components/Summery";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [current, setCurrent] = useState(0);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: 0,
    rent: 0,
    rent_type: "daily",
    categories: ["shirt", "clothing"]
  });

  const next = () => {
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };

  const item = [
    <Title
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Description
      productInfo={productInfo}
      setProductInfo={setProductInfo}
    />,
    <Categories 
        productInfo={productInfo}
        setProductInfo={setProductInfo}
    />,
    <Prices
        productInfo={productInfo}
        setProductInfo={setProductInfo}
    />,
    <Summery 
        productInfo={productInfo}
    />

  ];

  const validateProductInfo = () => {
    if(productInfo.title === ""){
        toast.warning("Please provide a title for your product",{
            toastId: "title"
        });
        return false;
    }
    if(productInfo.description === ""){
        toast.warning("Please provide a description for your product",{
            toastId: "description"
        });
        return false;
    }
    if(productInfo.price === 0){
        toast.warning("Please provide a price for your product",{
            toastId: "price"
        });
        return false;
    }
    if(productInfo.rent === 0){
        toast.warning("Please provide a rent for your product",{
            toastId: "rent"
        });
        return false;
    }
    if(productInfo.rent_type === ""){
        toast.warning("Please provide a rent type for your product",{
            toastId: "rent_type"
        });
        return false;
    }
    if(productInfo.categories.length === 0){
        toast.warning("Please provide a category for your product",{
            toastId: "categories"
        });
        return false;
    }
    return true;
    }

    

  const handleSubmit = () => {
    if(validateProductInfo()){
        console.log("Submit");
    }
    }

  return (
    <main className="w-full flex items-center h-full">
      <div className="container mx-auto flex flex-col items-center h-[700px] overflow-auto justify-center">
        <div className="product-details  xl:w-[800px] overflow-scroll custom-scrollbar p-8 flex flex-col gap-5 text-gray-600">
          {item[current]}
          <div
            className={`
        w-full flex gap-4 mt-4 ${
          current < 1 ? "justify-end" : "justify-between"
        }
        `}>
            <Button
              onclick={() => {
                previous();
              }}
              text={"Previous"}
              classname={`bg-slate-500 text-white px-4 py-2 rounded-md ${
                current < 1 && "hidden"
              }`}
            />
            <Button
              onclick={() => {
                current < 4 ? next() : handleSubmit()
              }}
              text={current < 4 ? "Next" : "Submit"}
              classname={`${current < 4 ? "bg-slate-500" : "bg-blue-500"} text-white px-4 py-2 rounded-md`}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
