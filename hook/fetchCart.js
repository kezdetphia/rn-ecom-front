import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const endpoint = "http://localhost:3000/api/cart/find";
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const res = await axios.get(endpoint, { headers });
      // const newData = JSON.stringify(res.data);
      // setData(newData);
      //TODO: not sure if i need to access the first item in the list
      //since it is indeed an array of objects but the token ensures
      //that only the user's cart is returned
      const cartProducts = res.data[0].products;
      console.log("fetchcart CartPorudcts: ", cartProducts);
      // const parsedData = JSON.parse(newData);

      //delete this func due to performance improvement
      // await AsyncStorage.setItem("cartCount", JSON.stringify(products.length));

      setData(cartProducts);
      console.log("fetchcart data: ", data);
      setLoader(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default fetchCart;
