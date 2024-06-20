import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  theader: {
    // marginTop: 20,
    fontSize: 10,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    textAlign: "center",
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  text: { fontFamily: "Roboto" },
  theader2: { flex: 4, borderRightWidth: 0, borderBottomWidth: 1 },
});

const TableHead = () => (
  <View
    style={{
      flexDirection: "row",
    }}
  >
    <View style={styles.theader}>
      <Text style={styles.text}>№</Text>
    </View>
    <View style={styles.theader}>
      <Text style={styles.text}>Код</Text>
    </View>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Назва,колір,матеріал</Text>
    </View>
    <View style={styles.theader}>
      <Text>К-сть</Text>
    </View>
    <View style={styles.theader}>
      <Text>Ціна за шт.</Text>
    </View>
    <View style={styles.theader}>
      <Text>Всього</Text>
    </View>
  </View>
);

export default TableHead;
