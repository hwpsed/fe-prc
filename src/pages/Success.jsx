import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";

const Success = () => {
  const location = useLocation();
  const data = location.state.data;
  const cart = location.state.cart;
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const resetCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  console.log(cart);
  console.log(data);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await publicRequest.post("/Order", {
          accountId: 1,
          orderStatus: 1,
          totalAmount: cart.total,
        });
        setOrderId(res.data.orderId);

        console.log(orderId);

        // await Promise.all(
        //   cart.products.map(async (product) => {
        //     await publicRequest.post("/OrderDetail", {
        //       orderId: res.data.orderId,
        //       productId: product.productId,
        //       quantity: product.quantity,
        //       amount: product.price * product.quantity,
        //     });
        //   })
        // );
        for (const product of cart.products) {
          await publicRequest.post("/OrderDetail", {
            orderId: res.data.orderId,
            productId: product.productId,
            quantity: product.quantity,
            amount: product.price * product.quantity,
          });
        }
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <button
          style={{ padding: 10, marginTop: 20 }}
          onClick={() => resetCart()}
          type="RESET_CART"
        >
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default Success;
