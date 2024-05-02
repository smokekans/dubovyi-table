import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "../../../../../img/logo-wood-crafts.png";

const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", marginTop: 24 },
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },
  logo: { width: 90 },
  reportTitle: { fontSize: 16, textAlign: "center" },
});

const InvoiceTitle = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Image style={styles.logo} src={logo} />
      <Text style={styles.reportTitle}>wood-crafts</Text>
    </View>
  </View>
);

export default InvoiceTitle;
