import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const PickerTipo = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState('racao');

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    if (onChange) {
      onChange(itemValue);
    }
  };

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
    >
      <Picker.Item label="Ração" value="racao" />
      <Picker.Item label="Banho" value="banho" />
      <Picker.Item label="Shop" value="shop" />
      <Picker.Item label="Clínica" value="clinica" />
    </Picker>
  );
};

export default PickerTipo;
