import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { GET_PRODUCT_LIST_OF_USER } from "../graphql/queries";
import Button from "../ui/Button";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import SuccessModal from "../ui/modals/SuccessModal";
import { FiLoader } from "react-icons/fi";


const Home = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST_OF_USER);
  const [productList, setProductList] = React.useState([]);

  useEffect(() => {
    if (data?.getProductListOfUser) {
      setProductList(data.getProductListOfUser);
    }
  }, [data]);


  return (
    <main className="w-full flex items-center h-full">
      <div className="container mx-auto flex flex-col items-center h-[750px] gap-4">
        <h1 className="text-4xl text-gray-600 tracking-tighter">My Products</h1>
        {
          loading ? (
            <FiLoader className="animate-spin text-4xl text-gray-600 h-full" />
          ) : error ? (
            <p className="text-red-500 text-xl mt-10">{error.message}</p>
          ) : 
        <div className="product-container w-[90%] mt-5 overflow-scroll custom-scrollbar">
          {productList.map((product) => (
            <Product
              key={product.id}
              productInfo={product}
            />
          ))}
        </div>
      }
        <span className={`flex justify-end w-[90%] mr-12 ${(error || loading) && "hidden"}`}>
          <Button
            onclick={() => {
              navigate("/add-product");
            }}
            classname={"bg-slate-500 text-white px-4 py-2 rounded-md"}
            text={"Add Product"}
          />
        </span>
      </div>
      <ConfirmationModal />
      <SuccessModal />
    </main>
  );
};

export default Home;
