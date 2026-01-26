import { Text, View } from "react-native";
import type { InstagramFollowReport } from "../types/instagram";
import { common } from "../ui/commonStyles";

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
    <View style={[common.card, { gap: 12 }]}>
      <View style={common.dividerRow}>
        <Text style={{ color: "rgba(229, 231, 235, 0.85)", fontWeight: "700", fontSize: 16 }}>
          Summary
        </Text>

        <View style={common.chip}>
          <Text style={common.chipText}>{report.stats.notFollowingBackCount} not back</Text>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: "rgba(229, 231, 235, 0.85)" }}>
          Followers <Text style={{ fontWeight: "800" }}>{report.stats.followerCount}</Text>
        </Text>
        <Text style={{ color: "rgba(229, 231, 235, 0.85)" }}>
          Following <Text style={{ fontWeight: "800" }}>{report.stats.followingCount}</Text>
        </Text>
      </View>

      <Text style={common.subtitle}>
        Files found {report.stats.followerFilesFound} follower, {report.stats.followingFilesFound} following
      </Text>
    </View>
  );
};
