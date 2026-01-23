import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { getReport } from "../src/utils/reportStore";
import { ResultsScreen } from "../src/components/ResultsScreen";

const ResultsRoute = () => {
  const router = useRouter();
  const report = getReport();

  if (!report) {
    return (
      <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>No results yet</Text>
        <Text style={{ opacity: 0.8 }}>
          Import your Instagram zip export first, then come back to see results.
        </Text>
        <Pressable onPress={() => router.replace("/")} style={{ padding: 14, borderWidth: 1, borderRadius: 12 }}>
          <Text>Go to import</Text>
        </Pressable>
      </View>
    );
  }

  return <ResultsScreen report={report} />
};

export default ResultsScreen;
