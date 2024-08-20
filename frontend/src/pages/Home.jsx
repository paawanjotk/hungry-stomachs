import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col p-4 gap-4 justify-center h-full items-center">
      <div className="flex flex-col text-center justify-center bg-secondary rounded-3xl w-5/6 p-20 shadow-md">
        <h1 className="text-[120px] font-medium">Hungry Stomachs</h1>
        <h4 className="text-[30px] font-medium">A HOMEMADE CHOCOLATE SHOP</h4>
      </div>
      
      <div className="flex gap-5 w-5/6 ">
        <div className="flex flex-col w-full py-14 px-4  gap-5 bg-secondary text-black items-center justify-center text-center rounded-3xl">
          <h2 className="text-3xl font-bold">Browse Products</h2>
          <p className="text-lg max-w-80 text-center">
            Browse products- donuts, truffles, bars, bitey-chocolates, hampers
            etc
          </p>
          <Link to="/categories">
            <button className="bg-black text-xl text-white p-4 rounded-md">
              Go to Categories
            </button>
          </Link>
        </div>
        <div className="flex flex-col py-14 w-full px-4  gap-5 bg-secondary items-center text-black justify-center text-center rounded-3xl">
          <h2 className="text-3xl font-bold">Track Order</h2>
          <p className="text-lg max-w-80 text-center">
            Check your order status
          </p>
          <Link to="/track">
            <button className="bg-black text-xl text-white  p-4 rounded-md">
              Track your chocolates!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
