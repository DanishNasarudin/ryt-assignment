import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  authenticateWithBiometrics,
  checkBiometricsAvailability,
} from "../utils/biometrics";

type User = {
  name: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkBiometric = async () => {
      const biometricsEnabled = await AsyncStorage.getItem("biometricEnabled");
      //   console.log(biometricsEnabled, "BIO");
      if (biometricsEnabled === "true") {
        const { ok: bioAuthAvailable, error: bioAuthError } =
          await checkBiometricsAvailability();

        if (bioAuthError) {
          switch (bioAuthError) {
            case "hardware":
              Alert.alert("Biometric Auth Error", "Hardware is not available", [
                { text: "OK" },
              ]);
              router.replace("/biometric-failed");
              break;
            case "enroll":
              Alert.alert(
                "Biometric Auth Error",
                "Device not enrolled into biometrics",
                [{ text: "OK" }]
              );
              await AsyncStorage.setItem("biometricEnabled", "false");
              router.replace("/setup-biometrics");
              return;
            default:
              Alert.alert("Biometric Auth Error", "Unknown Error", [
                { text: "OK" },
              ]);
              await AsyncStorage.setItem("biometricEnabled", "false");
              return;
          }
        }

        if (bioAuthAvailable) {
          await AsyncStorage.setItem("biometricEnabled", "true");
        }

        const success = await authenticateWithBiometrics();
        if (!success) {
          router.replace("/biometric-failed");
          return;
        }
        setUser({ name: "Anonymous" });
        router.replace("/(app)");
        return;
      }
      router.replace("/setup-biometrics");
    };
    const inAuthGroup = segments[0] === "(auth)";
    // console.log(user, inAuthGroup, segments[0], "CHECK");

    if (!user && !inAuthGroup) {
      checkBiometric();
    } else if (user && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user, setUser);

  const authContext: AuthType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
