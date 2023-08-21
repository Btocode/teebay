import React from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import SuccessModal from "../ui/modals/SuccessModal";
import Button from "../ui/Button";

const data = {
  id: 3,
  name: "Best Pants",
  price: 300,
  rent: 30,
  rent_type: "monthly",
  categories: ["clothing", "pants"],
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis reiciendis nobis impedit consequuntur tenetur! Eius voluptatibus impedit rem est consequatur culpa? Nemo nihil quae dicta. Facilis officia quia dolore rerum placeat odio, ipsa fugiat distinctio? Iusto sit repellat sequi autem optio nulla quia pariatur! Error doloribus dolorem, illum eos minima a accusantium, cum totam dolore praesentium cumque ipsam, debitis tempora quasi eaque. Omnis nisi eius temporibus repellat id, debitis quos voluptatibus animi vel beatae corrupti dolore dicta, quidem in blanditiis vero illum laudantium doloribus, inventore quasi enim recusandae possimus. Porro possimus quasi minima assumenda veniam perferendis, sequi asperiores quae officia reiciendis quaerat provident, blanditiis iure quia praesentium illum qui nesciunt suscipit, numquam adipisci explicabo. Saepe quisquam consectetur accusantium distinctio est?",
  date_posted: "2021-09-03",
  views: 300,
};

const ProductDetails = () => {
  const [product, setProduct] = React.useState(data);
  return (
    <main className="w-full flex items-center h-full">
      <div className="container mx-auto flex flex-col items-center h-[700px] overflow-auto">
      <h1>
      </h1>
        <div className="product-details  xl:w-[800px] mt-5 overflow-scroll custom-scrollbar p-8 flex flex-col gap-4">
          <span className="w-full flex flex-col gap-2">
            <p>Title</p>
            <input
              type="text"
              className="w-full border-2 p-2 rounded outline-gray-400"
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
              value={product.name}
            />
          </span>
          <div className="w-full flex flex-col gap-2">
            <p>Categories</p>
            <div className="w-full border-2 p-2 rounded outline-gray-400 flex justify-between items-center">
              <span>
                {product.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 mr-2 capitalize">
                    {category}
                    <RxCross2
                      onClick={() => {
                        setProduct({
                          ...product,
                          categories: product.categories.filter(
                            (cat) => cat !== category
                          ),
                        });
                      }}
                      className="inline-block text-gray-600 ml-2 cursor-pointer text-lg"
                    />
                  </span>
                ))}
              </span>
              {/* Select button to select other categories */}
              <LuChevronsUpDown className="inline-block text-gray-600 ml-2 cursor-pointer text-xl" />
            </div>

            <span></span>
          </div>
          <span className="w-full flex flex-col gap-2">
            <p>Description</p>
            <textarea
              className="w-full border-2 p-2 rounded outline-gray-400 custom-scrollbar h-56"
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              value={product.description}
            />
          </span>
          <div className="w-full flex gap-4 items-center">
            <span className="w-1/3 flex flex-col gap-2">
              <p>Price</p>
              <input
                type="number"
                className="w-full border-2 p-2 rounded outline-gray-400"
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
                value={product.price}
              />
            </span>
            <span className="flex gap-2 flex-col">
              <p>Rent</p>
              <span className="w-full flex gap-4">
                <input
                  type="number"
                  className="w-1/3 border-2 p-2 rounded outline-gray-400"
                  onChange={(e) => {
                    setProduct({ ...product, rent: e.target.value });
                  }}
                  value={product.rent}
                />
                <span className="border-2 p-2 rounded outline-gray-400">
                  {product.rent_type}
                  <LuChevronsUpDown className="inline-block text-gray-600 ml-2 cursor-pointer text-lg" />
                </span>
              </span>
            </span>
          </div>
          <span className="w-full flex justify-end">
                  <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-36"
                  >
                    Save Changes
                  </button>
          </span>
        </div>
      </div>
      <ConfirmationModal />
      <SuccessModal />
    </main>
  );
};

export default ProductDetails;
