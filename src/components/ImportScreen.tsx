import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { SearchBar } from "./SearchBar";
import { StatusBanner } from "./StatusBanner";
import { UserList } from "./UserList";
import { common } from "../ui/commonStyles";

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
    <View style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <View style={{ gap: 8 }}>
          <Text style={common.title}>Instagram non followers</Text>
          <Text style={common.subtitle}>
            Import your Instagram export zip and see who does not follow you back.
          </Text>
        </View>

        <Pressable
          onPress={onImportZip}
          disabled={isLoading}
          style={[common.button, isLoading ? common.buttonDisabled : null]}
        >
          <Text style={common.buttonText}>
            {isLoading ? "Importing..." : "Import export zip"}
          </Text>
        </Pressable>

        {isLoading ? (
          <View style={{ paddingTop: 4 }}>
            <ActivityIndicator />
          </View>
        ) : null}

        {error ? <StatusBanner title="Error" message={error} /> : null}

        {report ? (
          <View style={{ gap: 12 }}>
            <ReportSummaryCard report={report} />
            <SearchBar value={query} onChange={onChangeQuery} placeholder="Search username" />
            <UserList title="Not following back" usernames={filteredUsernames} maxCount={250} />
          </View>
        ) : (
          <View style={common.card}>
            <Text style={common.subtitle}>No data imported yet.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
