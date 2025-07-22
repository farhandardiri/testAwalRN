// app/_layout.jsx
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");

      if (token) {
        // Jika sudah login dan berada di halaman login, redirect ke halaman utama
        if (pathname === "/login") {
          router.replace("/");
        }
      } else {
        // Jika belum login dan mencoba akses halaman lain, redirect ke login
        if (pathname !== "/login") {
          router.replace("/login");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
