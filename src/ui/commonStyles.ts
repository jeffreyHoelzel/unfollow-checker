import { Platform, StyleSheet } from "react-native";
import { theme } from "./theme";

export const common = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.color.bg
  },
  content: {
    padding: theme.space.md,
    paddingBottom: theme.space.xl,
    gap: theme.space.md
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: "700",
    color: theme.color.text,
    letterSpacing: 0.2
  },
  subtitle: {
    fontSize: theme.font.body,
    color: theme.color.textMuted,
    lineHeight: 20
  },
  card: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.border,
    padding: theme.space.md,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 6 },
      default: {}
    })
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.sm
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(124, 58, 237, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.35)"
  },
  chipText: {
    color: theme.color.text,
    fontSize: theme.font.small,
    fontWeight: "600"
  },
  button: {
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: theme.color.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: theme.color.text,
    fontSize: theme.font.body,
    fontWeight: "700",
    letterSpacing: 0.2
  },
  input: {
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: theme.color.surface2,
    borderWidth: 1,
    borderColor: theme.color.border,
    color: theme.color.text,
    fontSize: theme.font.body
  }
});
