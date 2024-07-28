import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showWarning?: boolean;
  warningText?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  showWarning,
  warningText,
}) => (
  <View>
    <Text style={styles.labelText}>{label}</Text>
    <TextInput style={styles.input} onChangeText={onChangeText} value={value} />
    {showWarning && <Text style={styles.warningText}>{warningText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  labelText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  warningText: {
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
});
