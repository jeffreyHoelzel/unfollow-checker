import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { SearchBar } from "./SearchBar";
import { StatusBanner } from "./StatusBanner";
import { UserList } from "./UserList";

/** 
 * Props for the ImportScreen component.
 */
export type ImportScreenProps = {
  /** Whether an import is currently in progress */
  isLoading: boolean;
  /** Error message to display, or empty string if none */
  error: string;
  /** Parsed follow report, or null before import */
  report: InstagramFollowReport | null;
  /** Current search query */
  query: string;
  /** Filtered list of usernames to display */
  filteredUsernames: string[];
  /** Handler invoked when the user taps the import button */
  onImportZip: () => void;
  /** Handler invoked when the user changes the search query */
  onChangeQuery: (value: string) => void;
};

/**
 * Renders the import and results UI for the application.
 * This component is presentational only and does not perform ZIP import itself.
 *
 * @param {ImportScreenProps} props Component props
 * @returns {JSX.Element} Rendered import screen UI
 */
export const ImportScreen = ({
  isLoading,
  error,
  report,
  query,
  filteredUsernames,
  onImportZip,
  onChangeQuery
}: ImportScreenProps) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Instagram non followers</Text>

      <Text style={{ opacity: 0.8 }}>
        Import your Instagram export zip and see who does not follow you back.
      </Text>

      <Pressable
        onPress={onImportZip}
        disabled={isLoading}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 14,
          borderRadius: 12,
          borderWidth: 1,
          opacity: isLoading ? 0.6 : 1
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {isLoading ? "Importing..." : "Import export zip"}
        </Text>
      </Pressable>

      {isLoading ? (
        <View style={{ paddingVertical: 6 }}>
          <ActivityIndicator />
        </View>
      ) : null}

      {error ? <StatusBanner title="Error" message={error} /> : null}

      {report ? (
        <View style={{ gap: 10 }}>
          <ReportSummaryCard report={report} />

          <SearchBar value={query} onChange={onChangeQuery} placeholder="Search username" />

          <UserList title="Not following back" usernames={filteredUsernames} maxCount={250} />
        </View>
      ) : (
        <Text style={{ opacity: 0.7 }}>No data imported yet.</Text>
      )}
    </ScrollView>
  );
}
