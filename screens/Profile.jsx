import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  //TODO: make sure user is logged out, asyncstorage is not removing keys
  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      // await AsyncStorage.removeItem(userId);
      // await AsyncStorage.removeItem("id");

      navigation.replace("Bottom Navigation");
    } catch (err) {
      console.log("Error logging out the user: ", err);
    }
  };

  const cacheClear = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `favourites${JSON.parse(id)}`;
    try {
      await AsyncStorage.removeItem(userId);
      // await AsyncStorage.removeItem(userId);
      // await AsyncStorage.removeItem("id");

      navigation.replace("Bottom Navigation");
    } catch (err) {
      console.log("Error logging out the user: ", err);
    }
  };

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error retrieving data: ", err);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Logout Pressed"),
      },
      {
        text: "Continue",
        onPress: () => {
          userLogout();
        },
      },
      { defaultIndex: 1 },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Clear Cache Pressed"),
        },
        {
          text: "Continue",
          onPress: () => {
           cacheClear()
          },
        },
        { defaultIndex: 1 },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Delete Account Pressed"),
        },
        {
          text: "Continue",
          onPress: () => {
            console.log("Continue Delete Account Pressed");
          },
        },
        { defaultIndex: 1 },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor="gray"></StatusBar>
        <View style={{ width: "100%" }}>
          <Image source={require("../assets/space.jpg")} style={styles.cover} />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin == true ? userData.username : "Please Login!"}
          </Text>

          {userLogin == false ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
            </View>
          )}

          {userLogin == false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Favourites");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color="teal"
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color="teal"
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons name="bag" size={24} color="teal" />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  clearCache();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color="teal"
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteAccount();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="deleteuser" size={24} color="teal" />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" size={24} color="teal" />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cover: {
    height: 270,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: "black",
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -90,
  },
  name: {
    fontFamily: "bold",
    color: "teal",
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: "lightblue",
    padding: 2,
    borderWidth: 0.4,
    borderColor: "teal",
    borderRadius: 44,

    // alignItems: "center",
    // justifyContent: "center",
  },
  menuText: {
    fontFamily: "regular",
    color: "grey",
    paddingHorizontal: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: 24,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: "grey",
  }),
});
