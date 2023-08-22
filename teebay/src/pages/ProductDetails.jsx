import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useParams } from "react-router-dom";
import CategoryInputs from "../components/CategoryInputs";
import PriceInput from "../components/PriceInput";
import { UPDATE_PRODUCT } from "../graphql/mutations";
import { GET_PRODUCT } from "../graphql/queries";
import Button from "../ui/Button";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import SuccessModal from "../ui/modals/SuccessModal";
import { validateProductInfo } from "../utils/validateProductInfo";
import NotFound from "./NotFound";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  // get the product id from the url
  const productId = params.id;
  const [hasChanges, setHasChanges] = useState(false);
  const [product, setProduct] = useState({});

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: parseInt(productId) },
  });
  const [updateProduct, { data: uData, loading: uLoading, error: uError }] =
    useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (uData?.updateProduct) {
      setProduct(uData.updateProduct);
      toast.success("Product updated successfully", {
        toastId: "update-product",
      });
    }
  }, [uData]);

  // Find the specific product by its id in the cached data
  useEffect(() => {
    if (data?.getProduct) {
      setProduct(data.getProduct);
    }
  }, [data]);

  if (error) {
    return <NotFound />;
  }

  useEffect(() => {
    // check product is not equal to the cached product
    if (JSON.stringify(product) !== JSON.stringify(data?.getProduct)) {
      // if not equal, set hasChanges to true
      setHasChanges(true);
    } else {
      // if equal, set hasChanges to false
      setHasChanges(false);
    }
  }, [product, data]);

  const handleUpdate = () => {
    if (validateProductInfo(product)) {
      updateProduct({
        variables: {
          id: productId,
          input: {
            title: product.title,
            description: product.description,
            price: product.price,
            rent: product.rent,
            rent_type: product.rent_type,
            categories: product.categories,
          },
        },
      })
    }
  };

  return (
    <main className="w-full flex  h-full">
      <div className="container mx-auto flex flex-col items-center">
        {loading ? (
          <FiLoader className="text-4xl animate-spin" />
        ) : (
          <div className="product-details  xl:w-[800px] mt-5  p-8 flex flex-col gap-4">
            <span className="w-full flex flex-col gap-2">
              <p>Title</p>
              <input
                type="text"
                className="w-full border-2 p-2 rounded outline-gray-400"
                onChange={(e) => {
                  setProduct({ ...product, title: e.target.value });
                }}
                value={product?.title ? product.title : ""}
              />
            </span>
            <div className="w-full flex flex-col gap-2">
              <p>Categories</p>
              <CategoryInputs
                productInfo={product}
                setProductInfo={setProduct}
              />
            </div>
            <span className="w-full flex flex-col gap-2">
              <p>Description</p>
              <textarea
                className="w-full border-2 p-2 rounded outline-gray-400 custom-scrollbar h-56"
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
                value={product?.description}
              />
            </span>
            <PriceInput
              productInfo={product}
              setProductInfo={setProduct}
            />
            <span className="w-full flex justify-end">
              <Button
                onclick={() => {
                  handleUpdate();
                }}
                text={"Save Changes"}
                classname={`text-gray-500 px-4 py-2 rounded-md border  hover:text-white ${
                  hasChanges
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-slate-500"
                }`}
              />
            </span>
          </div>
        )}
      </div>

      <ConfirmationModal />
      <SuccessModal />
    </main>
  );
};

export default ProductDetails;
