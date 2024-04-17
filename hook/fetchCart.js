import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchCart = async () => {
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
      const newData = JSON.stringify(res.data);
      setData(newData);

      const parsedData = JSON.parse(newData);
      const products = parsedData[0].products;
      await AsyncStorage.setItem("cartCount", JSON.stringify(products.length));

      setData(products);
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
