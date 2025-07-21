import { StyleSheet, View, Text } from "react-native";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
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

export default Dashboard;
