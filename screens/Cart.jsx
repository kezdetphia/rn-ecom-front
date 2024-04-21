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
import { Ionicons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import CartTile from "../components/cart/cartTile";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const screenWidth = Dimensions.get("window").width;

//TODO: work out price based on items in the cart, also add a checkout function

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState(false);

  console.log("Cart item quantity:", itemQuantity);

  const deleteCartItem = (cartItemId) => {
    // Remove the item from the data and itemQuantity arrays
    const updatedData = data.filter((item) => item._id !== cartItemId);
    const updatedItemQuantity = itemQuantity.filter(
      (item) => item.cartItemId !== cartItemId
    );

    // Update the state
    refetch(); // This will refetch the cart data from the server
    setItemQuantity(updatedItemQuantity);
  };

  const onIncrement = (cartItemId) => {
    const updatedItemQuantity = itemQuantity.map((item) => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          cartItemQuantity: item.cartItemQuantity + 1,
        };
      }
      return item;
    });
    setItemQuantity(updatedItemQuantity);
  };

  const onDecrement = (cartItemId) => {
    const updatedItemQuantity = itemQuantity.map((item) => {
      if (item.cartItemId === cartItemId && item.cartItemQuantity > 0) {
        return {
          ...item,
          cartItemQuantity: item.cartItemQuantity - 1,
        };
      }
      return item;
    });
    setItemQuantity(updatedItemQuantity);
  };

  useEffect(() => {
    const intialItemQuantityDetails = data.map((item) => ({
      // cartItemId: item.cartItem._id,
      cartItemQuantity: item.quantity,
    }));
    setItemQuantity(intialItemQuantityDetails);
  }, [data]);

  useEffect(() => {
    calculateTotalAmount();
  }, [data]);

  const calculateTotalAmount = () => {
    let totalPrice = 0;

    selectedItems.forEach((selectedItem) => {
      const item = data.find((cartItem) => cartItem._id === selectedItem._id);
      const price = parseFloat(item.cartItem.price);
      const quantity = item.quantity;
      totalPrice += price * quantity;
    });

    return totalPrice.toFixed(2);
  };

  const toggleSelectItem = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem._id === item._id
    );

    if (isSelected) {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem._id !== item._id
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const createCheckOut = async () => {
    const id = JSON.parse(await AsyncStorage.getItem("id"));

    const cartItems = data.map((item) => ({
      name: item.cartItem.title,
      id: item.cartItem._id,
      price: item.cartItem.price,
      cartQuantity: item.quantity,
    }));

    console.log("cartItems map:", cartItems);
    await fetch(
      "https://rn-ecom-payment-server-production.up.railway.app/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          cartItems: cartItems,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => setPaymentUrl(data.url))
      .catch((error) => console.error(error));
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (
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
                    toggleSelectItem(item);
                  }}
                  select={selectedItems.some(
                    (selectedItem) => selectedItem._id === item._id
                  )}
                  itemQuantity={itemQuantity}
                  setItemQuantity={setItemQuantity}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onDelete={deleteCartItem}
                />
              )}
            />
          )}

          <View>
            <Text>Total: {calculateTotalAmount()} </Text>
          </View>

          {selectedItems.length === 0 ? (
            <View></View>
          ) : (
            <Button
              title={"Checkout"}
              isValid={true}
              onPress={() => {
                createCheckOut();
              }}
            />
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 8,
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
