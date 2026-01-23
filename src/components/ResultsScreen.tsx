import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { SearchBar } from "./SearchBar";
import { UserList } from "./UserList";

export type ResultsScreenProps = {
  report: InstagramFollowReport;
};

export const ResultsScreen = ({ report }: ResultsScreenProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return report.notFollowingBack;
    return report.notFollowingBack.filter((u) => u.includes(q));
  }, [report, query]);

  return (
    <ScrollView style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Not following back</Text>

      <ReportSummaryCard report={report} />

      <SearchBar value={query} onChange={setQuery} placeholder="Search username" />

      <UserList title="Accounts" usernames={filtered} maxCount={500} />

      {report.notFollowingBack.length == 0 ? (
        <View style={{ paddingTop: 8 }}>
          <Text style={{ opacity: 0.7 }}>Everyone you follow also follows you :)</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};
