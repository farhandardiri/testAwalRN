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

export const options = { headerShown: false };

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Username dan password harus diisi.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === "farhan" && password === "1234") {
        router.replace("/");
      } else {
        Alert.alert("Login gagal", "Username atau password salah.");
      }
    }, 1500); // simulasi loading
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
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            hitSlop={10}
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
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 0, // <= ubah ini
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});
