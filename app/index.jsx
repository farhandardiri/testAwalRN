import { StyleSheet, View, Text } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // penting agar halaman memenuhi layar
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
