import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductCardView from "./ProductCardView";

const ProductRow = () => {
  const products = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={products}
        renderItem={({ item }) => <ProductCardView />}
        contentContainerStyle={{ columnGap: 8 }}
      />
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  container: { marginTop: 16, marginLeft: 12 },
});
