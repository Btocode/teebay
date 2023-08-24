import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BUY_PRODUCT_MUTATION, RENT_PRODUCT_MUTATION } from "../graphql/mutations";
import { setConfirmationModal } from "../redux/features/modal/modalSlice";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const ProductBuyRent = ({ productInfo }) => {
  const dispatch = useDispatch();
  const { confirmationModal } = useSelector((state) => state.modals);

  const navigate = useNavigate();
  const [buyProduct, { loading, error }] = useMutation(BUY_PRODUCT_MUTATION, {
    variables: { productId: productInfo.id },
    update(cache) {
      cache.modify({
        fields: {
          getAllProducts(existingProductRefs, { readField }) {
            return existingProductRefs.filter(
              (productRef) => productInfo.id !== readField("id", productRef)
            );
          },
        },
      });
    },

    onCompleted: (data) => {
      // Handle successful completion, e.g., show a success message
      toast.success("Product bought successfully", {
        toastId: "buyProduct",
      });
      navigate("/");
      
    },
    onError: (error) => {
      toast.error(error.message, {
        toastId: "buyProductError",
      });
      // Handle error, e.g., show an error message
      console.error("Error buying product:", error);
    },
  });

  const [rentProduct, { loading: rentLoading, error: rentError }] = useMutation(
    RENT_PRODUCT_MUTATION,
    {
      variables: { productId: productInfo.id },
      update(cache) {
        cache.modify({
          fields: {
            getAllProducts(existingProductRefs, { readField }) {
              return existingProductRefs.filter(
                (productRef) => productInfo.id !== readField("id", productRef)
              );
            },

          }
        });
      },
      onCompleted: (data) => {
        // Handle successful completion, e.g., show a success message
        toast.success("Product rented successfully", {
          toastId: "rentProduct",
        });
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message, {
          toastId: "rentProductError",
        });
        // Handle error, e.g., show an error message
        console.error("Error renting product:", error);
      },
    }
  );



  useEffect(() => {
    if (confirmationModal.confirmed && confirmationModal.from === "buy") {
      buyProduct();
    }
    if (confirmationModal.confirmed && confirmationModal.from === "rent") {
      rentProduct();
    }
  }, [confirmationModal]);

  const handleBuy = (isBuy) => {
    dispatch(
      setConfirmationModal({
        isOpen: true,
        from: isBuy ? "buy" : "rent",
        confirmed: false,
        message: `Are you sure you want to ${
          isBuy ? "buy" : "rent"
        } this product?`,
      })
    );
  };

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
            onclick={() => handleBuy(false)}
          disabled={loading}
            text={"Rent"}
            classname={"bg-gray-500 text-white px-8 py-2 rounded-md"}
          />
          <Button
          disabled={loading}
            onclick={() => handleBuy(true)}
            text={"Buy"}
            classname={"bg-gray-700 text-white px-8 py-2 rounded-md"}
          />
        </span>
      </div>
    </div>
  );
};

export default ProductBuyRent;
