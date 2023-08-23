import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConfirmationModal } from "../redux/features/modal/modalSlice";
import { DELETE_PRODUCT } from "../graphql/mutations";

const Product = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({});
  const { confirmationModal } = useSelector((state) => state.modals);
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT);
  const {isSeller} = useSelector(store => store.user)

  const navigate = useNavigate();


  useEffect(() => {
    if (confirmationModal.confirmed && confirmationModal.from === "product" && selectedProduct) {
      deleteProduct({
        variables: {
          id: selectedProduct,
        },
        
        update(cache) {
          cache.modify({
            fields: {
              getProductListOfUser(existingProductRefs, { readField }) {
                return existingProductRefs.filter(
                  (productRef) => productInfo.id !== readField("id", productRef)
                );
              },
            },
          });
        },
      })
    }
  }, [confirmationModal]);

  const handleClickProduct = (event) => {
    // check if click is from delete button
    if (event.target.classList.contains("deleteButton")) {
      return;
    } else {
      // if not, redirect to product page
      navigate(`/product/${productInfo.id}`);
    }
  };

  const handleDateTime = (unix) => {
    const date = new Date(parseInt(unix));
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="w-full p-4 ">
      <div
        onClick={handleClickProduct}
        className="wrapper border-2 hover:border-2 hover:border-gray-700 min-h-[300px] capitalize p-6 flex flex-col gap-5 cursor-pointer">
        <header className="flex justify-between">
          <h1 className="text-2xl font-medium text-gray-600">
            {productInfo.title ? productInfo.title : "No name"}
          </h1>
          <AiOutlineDelete
            onClick={() => {
              setSelectedProduct(productInfo?.id);
              dispatch(
                setConfirmationModal({
                  isOpen: true,
                  message: `Are you sure you want to delete ${productInfo.name}?`,
                  from: "product",
                })
              );
            }}
            className={`${!isSeller && "hidden" } deleteButton text-gray-600 cursor-pointer text-3xl hover:text-red-500`}
          />
        </header>
        <span className="flex gap-2 text-gray-400">
          <p>Categories:</p>
          <span className="flex flex-wrap gap-2">
            {productInfo.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 capitalize">
                {category}
              </span>
            ))}
          </span>
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
          <p>Date Posted : {handleDateTime(productInfo.date_posted)}</p>

          <p className="lowercase">{productInfo.views} views </p>
        </footer>
      </div>
    </div>
  );
};

export default Product;
