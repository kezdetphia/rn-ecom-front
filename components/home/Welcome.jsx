import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <View style={styles.container}>
          <Text style={styles.welcomeTxt("black", 8)}>Find The Most</Text>
          <Text style={styles.welcomeTxt("teal", 0)}>Luxurious Furniture</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            value=""
            onPressIn={() => {
              navigation.navigate("Search");
            }}
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
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeTxt: (color) => ({
    fontFamily: "bold",
    fontSize: 30,
    marginTop: 8,
    color: color,
    marginHorizontal: 12,
  }),
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 14,
    marginVertical: 8,
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
