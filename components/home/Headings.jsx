import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Headings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Arrivals</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductList");
          }}
        >
          <Ionicons name="grid" size={24} color="lightblue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Headings;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    // marginBottom: -10,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "semibold",
    fontSize: 20,
  },
});
