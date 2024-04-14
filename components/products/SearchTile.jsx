import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SearchTile = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("ProductDetails", { item });
        }}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
          <Text>{item.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.supplier}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  image: {
    width: 70,
    borderRadius: 16,
    backgroundColor: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: 12,
    resizeMode: "cover",
  },
  textContainer: { flex: 1, marginHorizontal: 16 },
  productTitle: { fontSize: 16, fontFamily: "bold", color: "teal" },
  supplier: {
    fontSize: 14,
    fontFamily: "regular",
    color: "gray",
    marginTop: 3,
  },
});
