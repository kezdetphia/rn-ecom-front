import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import addToCart from "../hook/addToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favourites, setFavourites] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (id !== null) {
        setIsLoggedIn(true);
        console.log("User logged in");
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      console.log("Error checking user: ", err);
    }
  };

  useEffect(() => {
    checkUser();
    checkFavourites();
  }, []);

  const addToFavourites = async () => {
    const id = await AsyncStorage.getItem("id");
    //favourites+mongo user id
    const favouritesId = `favourites${JSON.parse(id)}`;

    //mongo doc product id
    let productId = item._id;

    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location,
    };

    try {
      //check if we have any facourites in the AsyncStorage
      //under 'favourites' + mongo user id' key
      const existingItem = await AsyncStorage.getItem(favouritesId);

      let favouritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favouritesObj[productId]) {
        delete favouritesObj[productId];
        console.log("Item removed from favourites");
        setFavourites(false);
      } else {
        favouritesObj[productId] = productObj;
        console.log("added to fav");
        setFavourites(true);
      }

      await AsyncStorage.setItem(favouritesId, JSON.stringify(favouritesObj));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavourites = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      addToFavourites();
    }
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      console.log("pressed");
    }
  };
  const handleCart = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      addToCart(item._id, count);
    }
  };

  const checkFavourites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favouritesId = `favourites${JSON.parse(id)}`;

    try {
      // const existingItem = await AsyncStorage.getItem(favouritesId);
      const favouritesObj = await AsyncStorage.getItem(favouritesId);
      // let favouritesObj = existingItem ? JSON.parse(existingItem) : {};

      // if (favouritesObj[item._id]) {
      if (favouritesObj !== null) {
        const favourites = JSON.parse(favouritesObj);

        if (favourites[item._id]) {
          console.log(item._id, "is in favourites");
          setFavourites(true);
        }
      } else {
        setFavourites(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFavourites();
          }}
        >
          <Ionicons
            name={favourites ? "heart" : "heart-outline"}
            size={30}
            color="teal"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                increment();
              }}
            >
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
          <View style={{ marginBottom: 12 }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text>{item.product_location}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={20}
                />
                <Text> Free Delivery </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() => {
              handleBuy();
            }}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleCart();
            }}
            style={styles.addCart}
          >
            <Fontisto
              name="shopping-bag"
              size={22}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 50,
    zIndex: 999,
    width: "90%",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  details: {
    marginTop: -24,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    top: 12,
  },
  ratingRow: {
    // marginHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "99%",
    top: 5,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 20,
  },
  priceWrapper: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  price: {
    color: "lightgray",
    // padding: 1,
    fontFamily: "semibold",
    fontSize: 14,
  },
  rating: {
    top: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 20,
  },
  ratingText: {
    color: "gray",
    fontWeight: "medium",
    paddingHorizontal: 10,
  },

  descriptionWrapper: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  description: {
    fontFamily: "medium",
    fontSize: 18,
  },
  descText: {
    fontFamily: "regular",
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 12,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "teal",
    padding: 7,
    borderRadius: 20,
  },
  cartRow: {
    paddingBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginLeft: 10,
  },
  cartBtn: {
    width: "70%",
    backgroundColor: "black",
    padding: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  cartTitle: {
    fontFamily: "semibold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
