import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const endpoint = "https://rn-ecom-back.vercel.app/api/orders";
      // const endpoint = "http://localhost:3000/api/orders";
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const res = await axios.get(endpoint, { headers });

      setData(res.data);

      setLoading(false);
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

export default fetchOrders;
