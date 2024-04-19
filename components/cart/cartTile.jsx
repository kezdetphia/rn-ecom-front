import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

const CartTile = ({ item, onPress, select }) => {
  return (
    <TouchableOpacity
      style={styles.favContainer(!select ? "#FFF" : "lightblue")}
      onPress={onPress}
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
        <Text style={styles.supplier} numberOfLines={1}>
          {item.cartItem.price} X {item.quantity}
        </Text>
      </View>

      <TouchableOpacity
        style={{ paddingBottom: 8, paddingLeft: 75 }}
        onPress={() => {
          onPress;
        }}
      >
        <AntDesign name="delete" size={18} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartTile;

const styles = StyleSheet.create({
  // titleText: {
  //   fontFamily: "bold",
  //   fontSize: 16,
  //   letterSpacing: 4,
  //   marginLeft: 10,
  //   color: "teal",
  // },
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
    fontsize: 16,
    fontFamily: "bold",
    color: "teal",
  },
  supplier: {
    fontsize: 14,
    fontFamily: "regular",
    color: "gray",
    marginTop: 3,
    textTransofrm: "capitalize",
  },
});
