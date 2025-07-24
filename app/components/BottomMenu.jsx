// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Modal,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, usePathname } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function BottomMenu() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const slideUpAnim = useRef(new Animated.Value(100)).current;
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   useEffect(() => {
//     Animated.timing(slideUpAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleLogout = async () => {
//     setShowLogoutModal(false);
//     await AsyncStorage.removeItem("userToken");
//     await AsyncStorage.removeItem("user");
//     router.replace("/login");
//   };

//   const leftMenus = [
//     { label: "Surat Masuk", icon: "mail-outline", route: "/surat/suratMasuk" },
//     {
//       label: "Surat Keluar",
//       icon: "send-outline",
//       route: "/surat/suratKeluar",
//     },
//     {
//       label: "Disposisi",
//       icon: "checkmark-done-circle-outline",
//       route: "/surat/disposisi",
//     },
//   ];

//   const rightMenus = [
//     { label: "Riwayat", icon: "time-outline", route: "/history" },
//     { label: "Profil", icon: "person-outline", route: "/profile" },
//     {
//       label: "Logout",
//       icon: "log-out-outline",
//       action: () => setShowLogoutModal(true),
//       isLogout: true,
//     },
//   ];

//   return (
//     <>
//       {/* Barcode Floating Button */}
//       <TouchableOpacity
//         onPress={() => router.push("/barcode")}
//         style={styles.floatingBarcodeButton}
//       >
//         <Ionicons name="qr-code-outline" size={30} color="white" />
//       </TouchableOpacity>

//       {/* Footer Menu */}
//       <Animated.View
//         style={[
//           styles.footerMenu,
//           { transform: [{ translateY: slideUpAnim }] },
//         ]}
//       >
//         <View style={styles.menuContainer}>
//           {/* Left Menus */}
//           <View style={styles.leftMenu}>
//             {leftMenus.map((item) => {
//               const isActive = pathname.startsWith(item.route);
//               return (
//                 <View key={item.route} style={styles.menuItemContainer}>
//                   <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => router.push(item.route)}
//                   >
//                     <Ionicons
//                       name={
//                         isActive ? item.icon.replace("-outline", "") : item.icon
//                       }
//                       size={22}
//                       color={isActive ? "#1976d2" : "#444"}
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={[
//                       styles.menuText,
//                       { color: isActive ? "#1976d2" : "#444" },
//                     ]}
//                     numberOfLines={2}
//                   >
//                     {item.label}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>

//           {/* Spacer untuk barcode */}
//           <View style={styles.barcodeSpacer} />

//           {/* Right Menus */}
//           <View style={styles.rightMenu}>
//             {rightMenus.map((item, index) => {
//               const isActive = item.route && pathname.startsWith(item.route);
//               return (
//                 <View key={index} style={styles.menuItemContainer}>
//                   <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={item.action || (() => router.push(item.route))}
//                   >
//                     <Ionicons
//                       name={
//                         item.isLogout
//                           ? item.icon
//                           : isActive
//                           ? item.icon.replace("-outline", "")
//                           : item.icon
//                       }
//                       size={22}
//                       color={
//                         item.isLogout
//                           ? "#c62828"
//                           : isActive
//                           ? "#1976d2"
//                           : "#444"
//                       }
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={[
//                       styles.menuText,
//                       {
//                         color: item.isLogout
//                           ? "#c62828"
//                           : isActive
//                           ? "#1976d2"
//                           : "#444",
//                       },
//                     ]}
//                     numberOfLines={2}
//                   >
//                     {item.label}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       </Animated.View>

//       {/* Modal Konfirmasi Logout */}
//       <Modal
//         visible={showLogoutModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowLogoutModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
//             <Text style={styles.modalMessage}>
//               Yakin ingin keluar dari aplikasi?
//             </Text>

//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, { backgroundColor: "#ccc" }]}
//                 onPress={() => setShowLogoutModal(false)}
//               >
//                 <Text style={{ color: "#000" }}>Batal</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, { backgroundColor: "#c62828" }]}
//                 onPress={handleLogout}
//               >
//                 <Text style={{ color: "#fff" }}>Keluar</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   footerMenu: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//     paddingBottom: 10,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 10,
//     zIndex: 1,
//   },
//   menuContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   leftMenu: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end", // Item menu kiri di-align ke kanan
//     paddingRight: 10, // Spasi antara menu kiri dan spacer
//   },
//   rightMenu: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-start", // Item menu kanan di-align ke kiri
//     paddingLeft: 10, // Spasi antara spacer dan menu kanan
//   },
//   barcodeSpacer: {
//     width: 15, // Sama dengan lebar tombol barcode
//   },
//   menuItemContainer: {
//     alignItems: "center",
//     minWidth: 60,
//     maxWidth: 80,
//     paddingHorizontal: 8,
//   },
//   menuItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 6,
//   },
//   menuText: {
//     fontSize: 10,
//     marginTop: 2,
//     lineHeight: 13,
//     textAlign: "center",
//     flexWrap: "wrap",
//     maxWidth: "100%",
//   },
//   floatingBarcodeButton: {
//     position: "absolute",
//     bottom: 34,
//     left: "50%",
//     transform: [{ translateX: -35 }],
//     backgroundColor: "#1976d2",
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2,
//     elevation: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
// });

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

  const leftMenus = [
    { label: "Surat Masuk", icon: "mail-outline", route: "/surat/suratMasuk" },
    {
      label: "Surat Keluar",
      icon: "send-outline",
      route: "/surat/suratKeluar",
    },
    {
      label: "Disposisi",
      icon: "checkmark-done-circle-outline",
      route: "/surat/disposisi",
    },
  ];

  const rightMenus = [
    { label: "Riwayat", icon: "time-outline", route: "/history" },
    { label: "Profil", icon: "person-outline", route: "/profile" },
    {
      label: "Logout",
      icon: "log-out-outline",
      action: () => setShowLogoutModal(true),
      isLogout: true,
    },
  ];

  return (
    <>
      {/* Barcode Floating Button */}
      <TouchableOpacity
        onPress={() => router.push("/barcode")}
        style={styles.floatingBarcodeButton}
      >
        <Ionicons name="qr-code-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Footer Menu */}
      <Animated.View
        style={[
          styles.footerMenu,
          { transform: [{ translateY: slideUpAnim }] },
        ]}
      >
        <View style={styles.menuContainer}>
          {/* Left Menus */}
          <View style={styles.sideMenu}>
            {leftMenus.map((item) => {
              const isActive = pathname.startsWith(item.route);
              return (
                <TouchableOpacity
                  key={item.route}
                  style={styles.menuItem}
                  onPress={() => router.push(item.route)}
                >
                  <Ionicons
                    name={
                      isActive ? item.icon.replace("-outline", "") : item.icon
                    }
                    size={22}
                    color={isActive ? "#1976d2" : "#444"}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      { color: isActive ? "#1976d2" : "#444" },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Spacer untuk barcode */}
          {/* <View style={{ width: 40 }} /> */}

          {/* Right Menus */}
          <View style={styles.sideMenu}>
            {rightMenus.map((item, index) => {
              const isActive = item.route && pathname.startsWith(item.route);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={item.action || (() => router.push(item.route))}
                >
                  <Ionicons
                    name={
                      item.isLogout
                        ? item.icon
                        : isActive
                        ? item.icon.replace("-outline", "")
                        : item.icon
                    }
                    size={22}
                    color={
                      item.isLogout ? "#c62828" : isActive ? "#1976d2" : "#444"
                    }
                  />
                  <Text
                    style={[
                      styles.menuText,
                      {
                        color: item.isLogout
                          ? "#c62828"
                          : isActive
                          ? "#1976d2"
                          : "#444",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Animated.View>

      {/* Modal Konfirmasi Logout */}
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

// style di bagian bawah:
const styles = StyleSheet.create({
  footerMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    alignItems: "center",
  },
  sideMenu: {
    flexDirection: "row",
    gap: 6,
    marginLeft: -10,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    minWidth: 50,
  },
  menuText: {
    fontSize: 10,
    marginTop: 4,
    lineHeight: 13,
    textAlign: "center",
  },
  floatingBarcodeButton: {
    position: "absolute",
    bottom: 34,
    left: "50%",
    transform: [{ translateX: -30 }],
    backgroundColor: "#1976d2",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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
