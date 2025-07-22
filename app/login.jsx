import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants"; // Tambahkan ini

export const options = { headerShown: false };

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username dan password harus diisi.");
      return;
    }

    setLoading(true);

    try {
      const LOCAL_IP = "172.16.43.131"; // Ganti dengan IP komputer Andazr
      const response = await fetch(
        `http://${LOCAL_IP}:3000/api/v2/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      // Perbaikan 2: Handle response error dengan lebih baik
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Login gagal (Status: ${response.status})`
        );
      }

      const data = await response.json();

      // Perbaikan 3: Validasi token sebelum menyimpan
      if (!data.token) {
        throw new Error("Token tidak ditemukan dalam respons server");
      }

      // Simpan token JWT
      await AsyncStorage.setItem("userToken", data?.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Redirect ke halaman utama
      router.replace("/");
    } catch (err) {
      // Perbaikan 4: Error handling yang lebih informatif
      Alert.alert(
        "Login Gagal",
        err.message || "Terjadi kesalahan saat menghubungi server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/faviconok.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>PERSURATAN</Text>
          <Text style={styles.appSubTitle}>Pondok Pesantren Nurul Jadid</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          editable={!loading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            disabled={loading}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleLogin}
          disabled={loading}
        >
          <LinearGradient
            colors={["#003c39", "#b5b57f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, loading && styles.disabledButton]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.appSubTitle}>
            Aplikasi Persuratan Pondok Pesantren Nurul Jadid
          </Text>
          <Text style={styles.appSubTitle1}>2025 - {date.getFullYear()}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff", // Pastikan ada background color
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 20, // Beri ruang di bawah
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  footer: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6e6e6d",
  },
  appSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#757571",
  },
  appSubTitle1: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "400",
    color: "#757571",
  },
  input: {
    height: 42,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 14,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fafafa",
    height: 42,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10, // Tambahkan padding vertikal
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  buttonWrapper: {
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});
