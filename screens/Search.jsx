import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

const Search = () => {
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
            value=""
            onPressIn={() => {}}
            placeholder="What Are You Looking For?"
            style={styles.searchInput}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
});
