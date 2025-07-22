import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BottomMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

  const menuItems = [
    {
      label: "Surat Masuk",
      icon: "mail-outline",
      route: "/surat/suratMasuk",
    },
    {
      label: "Surat Keluar",
      icon: "send-outline",
      route: "/surat/suratKeluar",
    },
    {
      label: "Disposisi",
      icon: "checkmark-done-outline",
      route: "/surat/disposisi",
    },
  ];

  return (
    <>
      <Animated.View
        style={[
          styles.footerMenu,
          {
            transform: [{ translateY: slideUpAnim }],
            flexDirection: "row",
            justifyContent: "space-around",
          },
        ]}
      >
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.route);
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? "#1976d2" : "#333"}
              />
              <Text
                style={[
                  styles.menuText,
                  { color: isActive ? "#1976d2" : "#333" },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowLogoutModal(true)}
        >
          <Ionicons name="log-out-outline" size={24} color="#c62828" />
          <Text style={[styles.menuText, { color: "#c62828" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
            <Text style={styles.modalMessage}>
              Yakin ingin keluar dari aplikasi?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={{ color: "#000" }}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#c62828" }]}
                onPress={handleLogout}
              >
                <Text style={{ color: "#fff" }}>Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footerMenu: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
