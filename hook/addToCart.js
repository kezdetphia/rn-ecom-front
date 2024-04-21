import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const addToCart = async (productId, quantity) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://localhost:3000/api/cart";

    console.log("addToCartHooktoken", token);

    const data = {
      cartItem: productId,
      quantity: quantity,
    };

    const headers = {
      "Content-Type": "application/json",
      'token': "Bearer " + JSON.parse(token),
    };

    await axios.post(endpoint, data, { headers });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default addToCart;
