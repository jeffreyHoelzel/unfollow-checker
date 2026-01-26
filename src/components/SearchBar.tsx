import { TextInput } from "react-native";
import { common } from "../ui/commonStyles";

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
      placeholderTextColor={"rgba(229, 231, 235, 0.55"}
      autoCapitalize="none"
      autoCorrect={false}
      style={common.input}
    />
  );
};
