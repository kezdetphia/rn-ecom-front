import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      style={styles.btnStyle(isValid ? "teal" : "gray")}
      onPress={onPress}
    >
      {!loader ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator size="small" color="white" />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "bold",
    color: "white",
    fontSize: 18,
  },
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: "90%",
    // marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  }),
});
