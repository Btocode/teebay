import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConfirmationModal } from "../redux/features/modal/modalSlice";

const Product = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickProduct = (event) => {
    // check if click is from delete button
    if (event.target.classList.contains("deleteButton")) {
        console.log("click");
      return;
    }
    else{
    // if not, redirect to product page
    navigate(`/product/${productInfo.id}`);
}
  };

  return (
    <div className="w-full p-4 ">
      <div
        onClick={handleClickProduct}
        className="wrapper border-2 hover:border-2 hover:border-gray-700 min-h-[300px] capitalize p-6 flex flex-col gap-5 cursor-pointer">
        <header className="flex justify-between">
          <h1 className="text-2xl font-medium text-gray-600">
            {productInfo.name}
          </h1>
          <AiOutlineDelete
            onClick={() => {
              dispatch(
                setConfirmationModal({
                  isOpen: true,
                  message: `Are you sure you want to delete ${productInfo.name}?`,
                  from: "product",
                })
              );
            }}
            className="deleteButton text-gray-600 cursor-pointer text-3xl hover:text-red-500"
          />
        </header>
        <span className="flex gap-2 text-gray-400">
          <p>Categories:</p>
          {productInfo.categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </span>
        <span className="flex text-gray-400 gap-2">
          <p>Price : ${productInfo.price}</p>|
          <p>
            Rent : ${productInfo.rent} / {productInfo.rent_type}
          </p>
        </span>
        <span className="text-gray-800 w-[70%]">
          {productInfo.description.length > 250 ? (
            <p>
              {productInfo.description.slice(0, 250)}
              <a className="text-blue-400 cursor-pointer">...More Details</a>
            </p>
          ) : (
            productInfo?.description
          )}
        </span>
        <footer className="flex justify-between text-gray-600 mt-5">
          <p>Date Posted : {productInfo.date_posted}</p>

          <p className="lowercase">{productInfo.views} views </p>
        </footer>
      </div>
    </div>
  );
};

export default Product;
