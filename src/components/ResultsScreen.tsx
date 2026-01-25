import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { SearchBar } from "./SearchBar";
import { UserList } from "./UserList";
import { common } from "../ui/commonStyles";

export type ResultsScreenProps = {
  report?: InstagramFollowReport;
};

export const ResultsScreen = ({ report }: ResultsScreenProps) => {
  const [query, setQuery] = useState("");

  if (!report) {
    return (
      <View style={[common.screen, { justifyContent: "center", padding: 16 }]}>
        <Text style={common.subtitle}>No report could be loaded from memory.</Text>
      </View>
    );
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return report.notFollowingBack;
    return report.notFollowingBack.filter((u) => u.includes(q));
  }, [report, query]);

  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <Text style={common.title}>Not following back</Text>

        <ReportSummaryCard report={report} />

        <SearchBar value={query} onChange={setQuery} placeholder="Search username" />

        <UserList title="Accounts" usernames={filtered} maxCount={500} />

        {report.notFollowingBack.length === 0 ? (
          <View style={common.card}>
            <Text style={common.subtitle}>Everyone you follow also follows you :)</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
