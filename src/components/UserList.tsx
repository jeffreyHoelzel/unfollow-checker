import { FlatList, Text, View } from "react-native";
import { common } from "../ui/commonStyles";
import { theme } from "../ui/theme";

/** 
 * Props for the UserList component 
 */
export type UserListProps = {
  /** Title displayed above the list */
  title: string;
  /** List of usernames to render */
  usernames: string[];
  /** Optional limit on how many usernames to show */
  maxCount?: number;
};

/**
 * Renders a list of usernames with a title and optional max item limit.
 * Uses FlatList for efficient rendering of larger datasets.
 *
 * Note: scroll is disabled so the parent ScrollView controls the page scroll.
 *
 * @param {UserListProps} props Component props
 * @returns {JSX.Element} Rendered username list
 */
export const UserList = ({ title, usernames, maxCount }: UserListProps) => {
  const data = maxCount ? usernames.slice(0, maxCount) : usernames;

  return (
    <View style={{ gap: 10 }}>
      <View style={common.dividerRow}>
        <Text style={{ color: theme.color.text, fontWeight: "800", fontSize: 16 }}>
          {title}
        </Text>
        <View style={[common.chip, { backgroundColor: "rgba(255,255,255,0.06)", borderColor: theme.color.border }]}>
          <Text style={common.chipText}>{usernames.length}</Text>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={[
              common.card,
              {
                paddingVertical: 12,
                paddingHorizontal: 14
              }
            ]}
          >
            <Text style={{ color: theme.color.text, fontSize: 15, fontWeight: "600" }}>
              {item}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      {maxCount && usernames.length > maxCount ? (
        <Text style={common.subtitle}>Showing first {maxCount} results.</Text>
      ) : null}
    </View>
  );
};
