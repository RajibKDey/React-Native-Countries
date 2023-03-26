import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleVars} from '../styles';

const styles = StyleSheet.create({
  dropdownOverallStyle: {
    borderRadius: StyleVars.BORDER_RADIUS_SM,
  },
  dropdownContainer: {},
  dropdownLabelStyle: {
    fontSize: StyleVars.FONT_SIZES.md,
  },
});

type DropdownItems = {
  label: string;
  value: string;
};

type DropdownProps = {
  dropdownItems: DropdownItems[];
  value: string;
  setValue: (value: any) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
};

const Dropdown: FC<DropdownProps> = ({
  dropdownItems,
  value,
  setValue,
  open,
  setOpen,
  placeholder,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={placeholder}
      containerStyle={[styles.dropdownContainer]}
      style={[styles.dropdownOverallStyle]}
      labelStyle={[styles.dropdownLabelStyle]}
    />
  );
};

export default Dropdown;
