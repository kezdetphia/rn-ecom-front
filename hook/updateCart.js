import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const updateCart = async (cartItemId, quantity) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://localhost:3000/api/cart/update";

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };

    body = {
      cartItemId,
      quantity,
    };

    const res = await axios.put(endpoint, body, { headers });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export default updateCart;
