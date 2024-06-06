import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react";

const styles = StyleSheet.create({
  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tbody2: { flex: 4, borderRightWidth: 1 },
});

const TableBody = ({ products }) => {
  return products.map((product, index) => (
    <Fragment key={product.id}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, { textAlign: "center" }]}>
          <Text>{index + 1}</Text>
        </View>
        <View style={[styles.tbody, { textAlign: "center" }]}>
          {/* <Text>{product.productDto.id.replace(/^0+(?=\d)/, "")}</Text> */}
          <Text>{product.product.id}</Text>
        </View>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{product.product.name} </Text>
        </View>
        <View style={[styles.tbody, { textAlign: "center" }]}>
          <Text>{product.quantity}</Text>
        </View>
        <View style={[styles.tbody, { textAlign: "center" }]}>
          <Text>{product.product.price.toFixed(2)}</Text>
        </View>
        <View style={[styles.tbody, { textAlign: "center" }]}>
          <Text>{(product.product.price * product.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </Fragment>
  ));
};

export default TableBody;
