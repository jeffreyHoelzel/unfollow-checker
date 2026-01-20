import { Text, View } from "react-native";

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
    <View style={{ padding: 12, borderWidth: 1, borderRadius: 12 }}>
      <Text style={{ fontWeight: "600" }}>{title}</Text>
      <Text style={{ marginTop: 6 }}>{message}</Text>
    </View>
  );
};
