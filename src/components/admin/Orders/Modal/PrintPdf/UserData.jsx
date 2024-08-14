import { Line, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    // justifyContent: "space-between",
    color: "#3E3E3E",
  },
  addressTitle: { fontSize: 11 },
  address: { fontWeight: 400, fontSize: 10, marginLeft: 10 },
});

const UserData = ({ formik }) => (
  //   <View style={styles.titleContainer}>

  <View style={{ flexDirection: "column", marginTop: 24 }}>
    <Svg height="10" width="700">
      <Line x1="0" y1="5" x2="280" y2="5" strokeWidth={2} stroke="rgb(0,0,0)" />
    </Svg>
    <View style={styles.row}>
      <Text style={styles.addressTitle}>Ім'я і призвище:</Text>
      <Text style={styles.address}>
        {formik.firstName} {formik.secondName}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.addressTitle}>Телефон:</Text>
      <Text style={styles.address}>{formik.phone}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.addressTitle}>E-mail:</Text>
      <Text style={styles.address}>{formik.email}</Text>
    </View>
  </View>
);

export default UserData;
