import { TextInput } from "react-native";

/**
 * Props for the SearchBar component.
 */
export type SearchBarProps = {
  /** The current search bar query */
  value: string;
  /** Called whenever the search query is changed */
  onChange: (value: string) => void;
  /** An optional placeholder for the text input box */
  placeholder?: string;
};

/**
 * Renders a minimal search input for filtering usernames.
 *
 * @param {SearchBarProps} props Component props
 * @returns {JSX.Element} Rendered search input
 */
export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder ?? "Search"}
      autoCapitalize="none"
      autoCorrect={false}
      style={{
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10
      }}
    />
  );
};
