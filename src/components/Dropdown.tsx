import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleVars} from '../styles';

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: StyleVars.BORDERS.md,
    borderRadius: StyleVars.BORDER_RADIUS_SM,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: StyleVars.FONT_SIZES.md,
  },
  selectedTextStyle: {
    fontSize: StyleVars.FONT_SIZES.md,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: StyleVars.FONT_SIZES.md,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
  // open: boolean;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
};

const CustomDropdown: FC<DropdownProps> = ({
  dropdownItems,
  value,
  setValue,
  // open,
  // setOpen,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={dropdownItems}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default CustomDropdown;
