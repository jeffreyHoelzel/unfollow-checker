import { Text, View } from "react-native";
import { theme } from "../ui/theme";
import { common } from "../ui/commonStyles";

/**
 * Props for the StatusBar component.
 * 
 */
export type StatusBannerProps = {
  /** Short title describing the status (for example, "Error") */
  title: string;
  /** Detailed status message to display to the user */
  message: string;
};

/**
 * Renders a simple bordered banner used to display status information
 * such as errors or informational messages.
 *
 * @param {StatusBannerProps} props Component props
 * @returns {JSX.Element} Rendered status banner
 */
export const StatusBanner = ({ title, message }: StatusBannerProps) => {
  return (
    <View
      style={[
        common.card,
        {
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          borderColor: "rgba(239, 68, 68, 0.28)"
        }
      ]}
    >
      <Text style={{ color: theme.color.text, fontWeight: "800", fontSize: 15 }}>{title}</Text>
      <Text style={{ color: theme.color.textMuted, marginTop: 6, lineHeight: 20 }}>{message}</Text>
    </View>
  );
};
