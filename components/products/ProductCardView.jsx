import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item?.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View styles={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item?.supplier}
          </Text>
          <Text style={styles.price}>${item?.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="add-circle" size={35} color="teal" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 240,
    // backgroundColor: "lightblue",
    backgroundColor: "lightblue",
    borderRadius: 16,
    marginHorizontal: 8,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: 5,
    marginTop: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    padding: 10,
  },

  title: {
    fontFamily: "semibold",
    fontSize: 15,
    marginBotton: 2,
    paddingLeft: 8,
    paddingTop: 3,
    color: "#2D2E2F",
  },
  supplier: {
    fontFamily: "regular",
    fontSize: 12,
    color: "gray",
    paddingLeft: 8,
  },
  price: {
    fontFamily: "semibold",
    fontSize: 13,
    paddingLeft: 8,
    paddingBottom: 5,
    color: "#2D2E2F",
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
