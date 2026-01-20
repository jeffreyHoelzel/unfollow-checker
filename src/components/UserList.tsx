import { FlatList, Text, View } from "react-native";

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
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "600" }}>
        {title} ({usernames.length})
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 8
            }}
          >
            <Text>{item}</Text>
          </View>
        )}
      />

      {maxCount && usernames.length > maxCount ? (
        <Text style={{ opacity: 0.7 }}>Showing first {maxCount} results.</Text>
      ) : null}
    </View>
  );
};
