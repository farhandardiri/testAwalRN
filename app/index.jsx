import { View, Text, StyleSheet } from "react-native";
import BottomMenu from "./components/BottomMenu";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Aplikasi Persuratan</Text>
      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
});
