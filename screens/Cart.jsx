import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import CartTile from "../components/cart/cartTile";
import { useState } from "react";
import Button from "../components/Button";

const screenWidth = Dimensions.get("window").width;
const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name={"chevron-back-circle"} size={30} color="teal" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Cart</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          data={data}
          renderItem={({ item }) => (
            <CartTile
              item={item}
              onPress={() => {
                setSelect(!select);
                setSelected(item);
              }}
              select={select}
            />
          )}
        />
      )}

      {selected ? (
        <Button title={"Checkout"} isValid={select} onPress={() => {}} />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: screenWidth - 50,
    marginBottom: 12,
  },
  titleText: {
    fontFamily: "bold",
    fontSize: 24,
    letterSpacing: 4,
    marginLeft: 10,
  },
  favContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadow: 16,
    shadowColor: "lightblue",
  },
  imgContainer: {
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
});
