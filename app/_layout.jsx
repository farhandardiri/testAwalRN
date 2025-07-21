// app/_layout.jsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Menyembunyikan header untuk semua halaman
        }}
      />
    </SafeAreaProvider>
  );
}
