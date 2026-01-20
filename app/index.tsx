import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

function IndexScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Instagram follow checker</Text>
      <Pressable
        onPress={() => router.push("/results")}
        style={{ padding: 12, borderWidth: 1, borderRadius: 10 }}
      >
        <Text>Go/ to results (placeholder)</Text>
      </Pressable>
    </View>
  );
}

export default IndexScreen;
