import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { products } from "../data";
import { publicRequest } from "../requestMethods";
import ProductItem from "./ProductItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [productLst, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/Product");
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      {productLst.map((item) => (
        <ProductItem item={item} key={item.productId} />
      ))}
    </Container>
  );
};
export default Products;
