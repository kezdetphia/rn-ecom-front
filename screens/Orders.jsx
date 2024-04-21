import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrdersTile from "../components/order/OrdersTile";
import fetchOrders from "../hook/fetchOrders";

const screenWidth = Dimensions.get("window").width;

const Orders = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchOrders();

  console.log("Ordersdata: ", data);

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
        <Text style={styles.titleText}>Orders</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          data={data}
          renderItem={({ item }) => <OrdersTile item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;

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
