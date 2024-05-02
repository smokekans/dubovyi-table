import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 3,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },
});

const TableTotal = ({ totalPrice }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View
      style={{
        fontSize: 11,
        paddingTop: 4,
        paddingLeft: 7,
        flex: 2.2,
        textAlign: "center",
        borderColor: "whitesmoke",
        borderRightWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      <Text>Всього</Text>
    </View>
    <View
      style={{
        fontSize: 11,
        paddingTop: 4,
        paddingLeft: 7,
        flex: 1,
        textAlign: "center",
        borderColor: "whitesmoke",
        borderRightWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      <Text>{totalPrice}</Text>
    </View>
  </View>
);

export default TableTotal;
