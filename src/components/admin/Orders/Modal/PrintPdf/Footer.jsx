import { Text, View } from "@react-pdf/renderer";

const Footer = ({ products, totalPrice, totalPayment }) => (
  <>
    <View style={{ marginTop: 10 }}>
      <Text>
        Усього найменувань {products.length}, на суму {totalPrice} грн
      </Text>
    </View>
    <View style={{ marginTop: 10 }}>
      <Text>Оплачено {totalPayment} грн</Text>
    </View>
  </>
);

export default Footer;
