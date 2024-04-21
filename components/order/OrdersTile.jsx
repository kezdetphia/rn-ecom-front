import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const OrdersTile = ({ item }) => {
  return (
    <TouchableOpacity style={styles.favContainer("lightblue")}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.productId.imageUrl }} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {item.productId.title}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.productId.supplier}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.productId.price} X {item.productId.quantity}
        </Text>
      </View>

      <View style={styles.orders}>
        <Text style={styles.productTxt}>{item.payment_status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrdersTile;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "bold",
    fontSize: 16,
    color: "teal",
  },
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
    fontSize: 14,
    fontFamily: "regular",
    color: "gray",
    marginTop: 3,
    textTransofrm: "capitalize",
  },
  orders: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 12,
  },
});
