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
import updateCart from "../hook/updateCart";
import deleteCart from "../hook/deleteCart";

const screenWidth = Dimensions.get("window").width;

//TODO: when theres too many items in the cart, the checkout button and total amount are not visible

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [paymentUrl, setPaymentUrl] = useState(false);

  const deleteCartItem = (cartItemId) => {
    // Remove the item from the data and myItems arrays
    const updatedData = data.filter((item) => item._id !== cartItemId);
    const updatedItemQuantity = myItems.filter(
      (item) => item.cartItemId !== cartItemId
    );

    // Update the state
    refetch(); // This will refetch the cart data from the server
    setMyItems(updatedItemQuantity);
  };

  const submitCartItemQuantityChange = async () => {
    try {
      myItems.map((item) => {
        const { cartItemId, cartItemQuantity } = item;
        updateCart(cartItemId, cartItemQuantity);
      });
    } catch (error) {
      console.log("Error updtingcart,", error);
    }
  };
  // const submitCartItemQuantityChange = async () => {
  //   try {
  //     const item = myItems.find((item) => {
  //       return selectedItems.includes(item.cartItemId);
  //     });

  //     if (item) {
  //       const { cartItemId, cartItemQuantity } = item;
  //       await updateCart(cartItemId, cartItemQuantity);
  //     } else {
  //       console.log("Item not found");
  //     }
  //   } catch (error) {
  //     console.log("Error updtingcart,", error);
  //   }
  // };

  const onIncrement = async (cartItemId) => {
    const updatedItemQuantity = myItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          cartItemQuantity: item.cartItemQuantity + 1,
        };
      }
      return item;
    });
    setMyItems(updatedItemQuantity);
  };

  const onDecrement = (cartItemId) => {
    const updatedItemQuantity = myItems.map((item) => {
      if (item.cartItemId === cartItemId && item.cartItemQuantity > 1) {
        return {
          ...item,
          cartItemQuantity: item.cartItemQuantity - 1,
        };
      }
      return item;
    });
    setMyItems(updatedItemQuantity);
  };

  useEffect(() => {
    const intialItemQuantityDetails = data.map((item) => ({
      cartItemTitle: item.cartItem.title,
      cartItemId: item.cartItem._id,
      cartItemQuantity: item.quantity,
      cartItemPrice: item.cartItem.price,
    }));
    setMyItems(intialItemQuantityDetails);
  }, [data]);

  useEffect(() => {
    calculateTotalAmount();
  }, [data]);

  const calculateTotalAmount = () => {
    let totalPrice = 0;

    selectedItems.forEach((selectedItemId) => {
      const selectedItem = myItems.find(
        (item) => item.cartItemId === selectedItemId
      );

      if (selectedItem) {
        const price = parseFloat(selectedItem.cartItemPrice);
        const quantity = selectedItem.cartItemQuantity;
        totalPrice += price * quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const toggleSelectItem = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem === item.cartItem._id
    );

    if (isSelected) {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item.cartItem._id
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item.cartItem._id]);
    }
  };

  const createCheckOut = async () => {
    const id = JSON.parse(await AsyncStorage.getItem("id"));

    const selectedCartItemsMatch = myItems.filter((item) =>
      selectedItems.includes(item.cartItemId)
    );

    const cartItemss = selectedCartItemsMatch.map((item) => ({
      name: item.cartItemTitle, // Make sure this matches the actual property name
      id: item.cartItemId,
      price: parseFloat(item.cartItemPrice), // Convert to float
      cartQuantity: item.cartItemQuantity,
    }));

    try {
      const res = await fetch(
        "https://rn-ecom-payment-server-production.up.railway.app/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            cartItems: cartItemss,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create checkout sessiong", Error);
      }

      const data = await res.json();
      setPaymentUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      deleteCart();
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
              onPress={async () => {
                await submitCartItemQuantityChange();
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
                  myItems={myItems}
                  setMyItems={setMyItems}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  deleteCartItem={deleteCartItem}
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
