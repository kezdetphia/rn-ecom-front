import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const deleteCart = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://localhost:3000/api/cart/delete";

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (!res.ok) {
      console.log("Failed to create checkout sessiong", Error);
    }

    console.log("cart deleted");
    console.log(res.data);
  } catch (err) {
    console.log("error deleting cart", err);
  }
};

export default deleteCart;
