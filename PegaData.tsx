import React, {useState} from 'react';
import {View, TouchableOpacity, Platform, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PegaData = ({ onChange: parentOnChange }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (parentOnChange) {
      parentOnChange(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatDate = (date) => {
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    return dateFormatter.format(date);
  };

  const styles = StyleSheet.create({
    buttao: {
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: '#e5e7eb',
    borderWidth: 2,
    height: 35,
    padding: 6,
    }
  })

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker} style={styles.buttao}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>{formatDate(date)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PegaData;
