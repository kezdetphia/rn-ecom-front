import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import axios from "axios";
import SearchTile from "../components/products/SearchTile";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        // `https://rn-ecom-back.vercel.app/api/products/search/${searchKey}`
        `https://localhost:3000/api/products/search/${searchKey}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  console.log("sreachresultsssss", searchResults);

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Ionicons
          style={{ paddingLeft: 10 }}
          name="camera-outline"
          size={20}
          color="white"
        />

        <View style={styles.searchWrapper}>
          <TextInput
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What Are You Looking For?"
            style={styles.searchInput}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}
          >
            <Ionicons name="search-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/search.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 14,
    marginVertical: 14,
    marginHorizontal: 10,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: "gray",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "lighblue",
    borderRadius: 10,
    marginRight: 10,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
  },
  searchImage: {
    resizeMode: "contain",
    width: 100,
    opacity: 0.9,
  },
});
