import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { getBestSellers } from "../http/orders";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function Home() {
  const [topProducts, setTopProducts] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    (async () => {
      try {
        const res = await getBestSellers();
        console.log(res);
        setTopProducts(res);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    })();
  }, []);
  return (
    <div className="min-h-screen bg-cream text-darkBrand">
      <main className="container mx-auto px-4 py-6">
        <section className="text-center p-10 mb-16 bg-secondary">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-cursive mb-4 leading-tight">
            Hungry Stomachs
          </h2>
          <p className="text-xl md:text-2xl mb-8">A HOMEMADE CHOCOLATE SHOP</p>
          <Link
            to="/categories"
            className="bg-primary/90 text-secondary px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition"
          >
            Shop Now
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-secondary p-8 rounded-lg shadow-lg">
            <FaSearch className="text-4xl mb-4 text-gold" />
            <h3 className="text-2xl font-semibold mb-4">Browse Products</h3>
            <p className="mb-6">
              Explore our delightful range of donuts, truffles, bars, and luxury
              chocolate hampers.
            </p>
            <Link to="/categories" className="text-gold hover:underline">
              View Categories →
            </Link>
          </div>
          <div className="bg-secondary p-8 rounded-lg shadow-lg">
            <FaShoppingBag className="text-4xl mb-4 text-gold" />
            <h3 className="text-2xl font-semibold mb-4">Track Your Order</h3>
            <p className="mb-6">
              Eagerly awaiting your chocolates? Check your order status here.
            </p>
            <Link to="/track" className="text-gold hover:underline">
              Track Order →
            </Link>
          </div>
        </section>

        <section className="text-center mb-16">
          <h3 className="text-3xl font-semibold mb-4">Our Bestsellers</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Add your bestseller products here */}
            {/* Example: */}
            {topProducts &&
              topProducts.map((product) => {
                return (
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <Link to={`/categories/${product.productDetails.category}`}>
                      <img
                        src={product.productDetails.imgUrl}
                        alt={product.productDetails.name}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    </Link>
                    <h4 className="text-xl font-semibold mb-2">
                      {product.productDetails.name}
                    </h4>
                    <p className="text-gold font-semibold">
                      ₹{product.productDetails.price}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
