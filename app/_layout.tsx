import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Import" }} />
      <Stack.Screen name="results" options={{ title: "Not following back" }} />
    </Stack>
  );
}

export default RootLayout;
