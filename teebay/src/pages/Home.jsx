import React from 'react'
import Layout from "../ui/Layout"
import Product from "../components/Product"

const products = [
  {
    id : 1,
    name : "T-Shirt",
    price : 100,
    rent : 10,
    rent_type : "daily",
    categories : ["clothing", "t-shirt"],
    description : "This is a t-shirt for sale on teebay",
    date_posted : "2021-09-01",
    views : 100,
  },
  {
    id : 2,
    name : "Shirt",
    price : 200,
    rent : 20,
    rent_type : "weekly",
    categories : ["clothing", "shirt"],
    description : "This is a shirt for sale on teebay",
    date_posted : "2021-09-02",
    views : 200,
  },
  {
    id : 3,
    name : "Pants",
    price : 300,
    rent : 30,
    rent_type : "monthly",
    categories : ["clothing", "pants"],
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis reiciendis nobis impedit consequuntur tenetur! Eius voluptatibus impedit rem est consequatur culpa? Nemo nihil quae dicta. Facilis officia quia dolore rerum placeat odio, ipsa fugiat distinctio? Iusto sit repellat sequi autem optio nulla quia pariatur! Error doloribus dolorem, illum eos minima a accusantium, cum totam dolore praesentium cumque ipsam, debitis tempora quasi eaque. Omnis nisi eius temporibus repellat id, debitis quos voluptatibus animi vel beatae corrupti dolore dicta, quidem in blanditiis vero illum laudantium doloribus, inventore quasi enim recusandae possimus. Porro possimus quasi minima assumenda veniam perferendis, sequi asperiores quae officia reiciendis quaerat provident, blanditiis iure quia praesentium illum qui nesciunt suscipit, numquam adipisci explicabo. Saepe quisquam consectetur accusantium distinctio est?",
    date_posted : "2021-09-03",
    views : 300,
  },
  {
    id : 4,
    name : "Shoes",
    price : 400,
    rent : 40,
    rent_type : "daily",
    categories : ["clothing", "shoes"],
    description : "This is a shoes for sale on teebay",
    date_posted : "2021-09-04",
    views : 400,
  },
  {
    id : 5,
    name : "Socks",
    price : 500,
    rent : 50,
    rent_type : "weekly",
    categories : ["clothing", "socks"],
    description : "This is a socks for sale on teebay",
    date_posted : "2021-09-05",
    views : 500,
  },
  {
    id : 6,
    name : "Jacket",
    price : 600,
    rent : 60,
    rent_type : "monthly",
    categories : ["clothing", "jacket"],
    description : "This is a jacket for sale on teebay",
    date_posted : "2021-09-06",
    views : 600,
  },
]

const Home = () => {
  return (
    <main className="w-full flex items-center h-full">
        <div
        className="container mx-auto flex flex-col items-center h-[700px]"
        >
        <h1 className="text-4xl text-gray-600 tracking-tighter">
            My Products
        </h1>
        <div className="product-container w-[90%] mt-5 overflow-scroll custom-scrollbar">
            {products.map((product) => (
              <Product key={product.id} productInfo={product} />
            ))}
        </div>
        </div>
    </main>
  )
}

export default Home