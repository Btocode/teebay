import React from 'react'
import { LuChevronsUpDown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const Categories = ({productInfo, setProductInfo}) => {
  return (
    <div className="w-full flex flex-col gap-5">
            <p className="text-2xl font-semibold text-center">
        Select categories
      </p>
            <div className="w-full border-2 p-2 rounded outline-gray-400 flex justify-between items-center">
              <span>
                {productInfo.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 mr-2 capitalize">
                    {category}
                    <RxCross2
                      onClick={() => {
                        setProductInfo({
                          ...productInfo,
                          categories: productInfo.categories.filter(
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

          </div>
  )
}

export default Categories