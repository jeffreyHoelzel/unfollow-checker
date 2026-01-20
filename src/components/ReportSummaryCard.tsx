import { Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";

/**
 * Props for the ReportSummaryCard component.
 */
export type ReportSummaryCardProps = {
  /** Parsed follow report derived from an Instagram export */
  report: InstagramFollowReport;
};

/**
 * Displays a compact summary of follower and following counts from a report.
 *
 * @param {ReportSummaryCardProps} props Component props
 * @returns {JSX.Element} Rendered summary card
 */
export const ReportSummaryCard = ({ report }: ReportSummaryCardProps) => {
  return (
    <View style={{ padding: 12, borderWidth: 1, borderRadius: 12, gap: 4 }}>
      <Text>Followers: {report.stats.followerCount}</Text>
      <Text>Following: {report.stats.followingCount}</Text>
      <Text>Not following back: {report.stats.notFollowingBackCount}</Text>
      <Text style={{ opacity: 0.7 }}>
        Files found: {report.stats.followerFilesFound} follower, {report.stats.followingFilesFound} following
      </Text>
    </View>
  );
};
