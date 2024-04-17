import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;

const Favourites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    checkFavourites();
  }, []);

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
        const favList = Object.values(favourites);
        setFavData(favList);
        console.log(favList.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFavourites = async (product) => {
    const id = await AsyncStorage.getItem("id");
    //favourites+mongo user id
    const favouritesId = `favourites${JSON.parse(id)}`;

    //mongo doc product id
    let productId = product;

    try {
      //check if we have any facourites in the AsyncStorage
      //under 'favourites' + mongo user id' key
      const existingItem = await AsyncStorage.getItem(favouritesId);
      let favouritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favouritesObj[productId]) {
        delete favouritesObj[productId];
        checkFavourites();
      }

      await AsyncStorage.setItem(favouritesId, JSON.stringify(favouritesObj));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(favData);
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
        <Text style={styles.titleText}>Favourites</Text>
      </View>
      <FlatList
        data={favData}
        renderItem={({ item }) => (
          <View style={styles.favContainer}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.favTitle}>{item.title}</Text>
              <Text style={styles.favSupplier}>{item.supplier}</Text>
              <Text style={styles.favPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity>
              <SimpleLineIcons
                name="trash"
                size={20}
                color="red"
                onPress={() => deleteFavourites(item.id)}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(itemn, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Favourites;

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
    justifyContent: "space-between",
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
  favTitle: {
    fontFamily: "bold",
    fontSize: 16,
    color: "teal",
  },
  favSupplier: {
    fontFamily: "regular",
    fontSize: 12,
    color: "gray",
  },
  favPrice: {
    fontFamily: "regular",
    fontSize: 12,
    color: "gray",
  },
});
