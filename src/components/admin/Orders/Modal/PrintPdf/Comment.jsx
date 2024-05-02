import { Line, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  addressTitle: { fontSize: 11 },
  address: { fontWeight: 400, fontSize: 10, maxWidth: 500, marginTop: 5 },
});

const Comment = ({ formik }) => {
  const commentLines = [];
  const maxWidth = 500;
  let currentLine = "";
  let lineWidth = 0;

  for (let i = 0; i < formik.comment.length; i++) {
    const char = formik.comment.charAt(i);
    const charWidth = char === " " ? 5 : 7;
    if (lineWidth + charWidth <= maxWidth) {
      currentLine += char;
      lineWidth += charWidth;
    } else {
      commentLines.push(currentLine);
      currentLine = char;
      lineWidth = charWidth;
    }
  }
  commentLines.push(currentLine);

  return (
    <View
      style={{
        marginTop: 15,
        width: 500,
      }}
    >
      <Svg height="10" width="500">
        <Line
          x1="0"
          y1="5"
          x2="280"
          y2="5"
          strokeWidth={2}
          stroke="rgb(0,0,0)"
        />
      </Svg>
      <Text style={styles.addressTitle}>Коментар:</Text>
      {commentLines.map((line, index) => (
        <Text key={index} style={styles.address}>
          {line}
        </Text>
      ))}
    </View>
  );
};

export default Comment;
