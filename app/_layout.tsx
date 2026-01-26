import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0F1A" },
        headerTitleStyle: { color: "#E5E7EB", fontWeight: "700" },
        headerTintColor: "#E5E7EB"
      }}
    >
      <Stack.Screen name="index" options={{ title: "Import" }} />
      <Stack.Screen name="results" options={{ title: "Not following back" }} />
    </Stack>
  );
}

export default RootLayout;
