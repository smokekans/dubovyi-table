import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoceTitle";
import UserData from "./UserData";
import Comment from "./Comment";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableTotal from "./TableTotal";
import Footer from "./Footer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

// const UserAddress = ({ userData }) => (
//   <View style={styles.titleContainer}>
//     <View style={styles.spaceBetween}>
//       <View style={{ maxWidth: 200 }}>
//         <Text style={styles.addressTitle}>Bill to </Text>
//         <Text style={styles.address}>{userData.address}</Text>
//       </View>
//       <Text style={styles.addressTitle}>{userData.city}</Text>
//     </View>
//   </View>
// );

const PdfOrder = ({
  row,
  products,
  userData,
  totalPrice,
  formik,
  totalPayment,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <InvoiceTitle />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 14 }}>
          Замовлення №{row.id} від {row.creationDate.split(" ")[0]}
        </Text>
      </View>
      <UserData formik={formik} />
      <View style={{ display: "flex", textAlign: "center" }}>
        <Text>Товари</Text>
      </View>
      <TableHead />
      <TableBody products={products} />
      <TableTotal totalPrice={totalPrice} />
      <Footer
        products={products}
        totalPrice={totalPrice}
        totalPayment={totalPayment}
      />
      <Comment formik={formik} />
    </Page>
  </Document>
);

export default PdfOrder;
