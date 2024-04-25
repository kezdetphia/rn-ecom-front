import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";

const CartTile = ({
  item,
  onPress,
  myItems,
  onIncrement,
  onDecrement,
  deleteCartItem,
}) => {
  const [select, setSelect] = useState(false);

  //this gets the quantity for each id but its coming from DB,

  const quantity =
    myItems.find((prod) => prod.cartItemId === item.cartItem._id)
      ?.cartItemQuantity || 0;

  const cartSingleItemId = item._id.toString();

  const handleDelete = async (itemId) => {
    // const res = await axios.delete(
    //   `https://rn-ecom-back.vercel.app/api/cart/${itemId}`
    // );
    const res = await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
    if (!res.data.error) {
      console.log("Item deleted");
    } else {
      console.log("Item not deleted");
    }
    deleteCartItem();
  };

  //need a state that increases each items quantity separate based on id

  return (
    <TouchableOpacity
      style={styles.favContainer(!select ? "#FFF" : "lightblue")}
      onPress={() => {
        setSelect(!select);
        onPress(item);
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.cartItem.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.cartItem.title}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.cartItem.supplier}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.supplier} numberOfLines={1}>
            {item.cartItem.price}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                onDecrement(item.cartItem._id);
              }}
            >
              <AntDesign name="minuscircleo" size={18} color="black" />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 7 }}> {quantity}</Text>

            <TouchableOpacity
              onPress={() => {
                onIncrement(item.cartItem._id);
              }}
            >
              <AntDesign name="pluscircleo" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleDelete(cartSingleItemId);
        }}
      >
        {/* //TODO: Add delete functionality */}
        <AntDesign name="delete" size={18} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartTile;

const styles = StyleSheet.create({
  favContainer: (color) => ({
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: color,
    shadow: 16,
    shadowColor: "lightblue",
  }),
  imageContainer: {
    width: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 65,
    borderRadius: 12,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  productTxt: {
    fontSize: 16,
    fontFamily: "bold",
    color: "teal",
  },
  supplier: {
    fontSize: 14,
    fontFamily: "regular",
    color: "gray",
    marginTop: 3,
    textTransform: "capitalize",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 10,
  },
});
