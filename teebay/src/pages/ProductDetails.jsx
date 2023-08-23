import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ConfirmationModal from "../ui/modals/ConfirmationModal";
import SuccessModal from "../ui/modals/SuccessModal";

import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import EditProduct from "../components/EditProduct";
import ProductBuyRent from "../components/ProductBuyRent";
import { GET_PRODUCT } from "../graphql/queries";

const ProductDetails = () => {
  const params = useParams();
  // get the product id from the url
  const [product, setProduct] = useState({});
  const productId = params.id;
  const { isSeller } = useSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: parseInt(productId) },
  });

  useEffect(() => {
    if (data?.getProduct) {
      setProduct(data.getProduct);
    }
  }, [data]);

  if (error) {
    return <NotFound />;
  }

  return (
    <main className="w-full flex  h-full">
      {isSeller ? (
        <EditProduct productInfo={product} loading = {loading} isSeller = {isSeller} />
      ) : (
        <ProductBuyRent productInfo={product} />
      )}

      <ConfirmationModal />
      <SuccessModal />
    </main>
  );
};

export default ProductDetails;
