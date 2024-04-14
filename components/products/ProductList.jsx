import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import ProductCardView from "./ProductCardView";

const ProductList = () => {
  const { data, isLoading, error } = useFetch();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={44} color="teal" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item }) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    // paddingTop: StatusBar.currentHeight,
    paddingTop: 44,
    paddingLeft: 6,
  },
  container: {},
  separator: { height: 16 },
});
