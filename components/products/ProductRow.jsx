import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ProductCardView from "./ProductCardView";
import useFetch from "../../hook/useFetch";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();

  // const products = [1, 2, 3, 4];
  console.log(data);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={44} color="teal" />
      ) : error ? (
        <Text>Something went wrong!</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          // keyExtractor={(item) => item._id.toString()}
          horizontal={true}
          data={data}
          renderItem={({ item }) => <ProductCardView item={item} />}
          contentContainerStyle={{ columnGap: 8 }}
        />
      )}
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  container: { marginTop: 16, marginLeft: 12 },
});
