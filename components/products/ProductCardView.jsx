import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={styles.image}
          />
        </View>
        <View styles={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Supplier
          </Text>
          <Text style={styles.price}>$4343</Text>
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
    backgroundColor: "lightblue",
    borderRadius: 16,
    marginEnd: 22,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: 6,
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
    fontFamily: "bold",
    fontSize: 18,
    marginBotton: 2,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: 12,
    color: "gray",
  },
  price: {
    fontFamily: "bold",
    fontSize: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
