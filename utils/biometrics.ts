import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateWithBiometrics(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Log in with biometrics",
  });

  return result.success;
}

export async function checkBiometricsAvailability(): Promise<{
  ok: boolean;
  error?: "hardware" | "enroll";
}> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  // console.log(hasHardware, isEnrolled, "AUTH CHECK");

  if (!hasHardware) return { ok: false, error: "hardware" };
  if (!isEnrolled) return { ok: false, error: "enroll" };
  return { ok: true, error: undefined };
}
