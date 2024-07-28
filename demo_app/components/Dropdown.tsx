import React from "react";
import { Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  open: boolean;
  value: string;
  items: DropdownItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
};

export const Dropdown: React.FC<DropdownProps> = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
}) => (
  <View style={[Platform.OS !== "android" ? { zIndex: 1 } : { elevation: 10 }]}>
    <DropDownPicker
      placeholder="Zvolte team"
      closeAfterSelecting={true}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={5000} // Ensure dropdown appears above other components
      zIndexInverse={6000} // Use to adjust stacking context
    />
  </View>
);
