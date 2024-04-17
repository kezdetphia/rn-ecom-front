import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductList } from "../components";

const NewRivals = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View stle={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={"#F6F7F3"}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Products</Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default NewRivals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "darkgrey",
    backgroundColor: "#F6F7F3",
  },
  wrapper: { flex: 1, backgroundColor: "#F6F7F3" },
  // wrapper: { backgroundColor: "white" },
  upperRow: {
    width: "90%",
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "teal",
    borderRadius: 20,
    top: 20,
    zIndex: 999,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: 16,
    color: "#F6F7F3",
    marginLeft: 5,
  },
});
