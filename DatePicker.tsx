import DatePicker from 'react-native-modern-datepicker';
import React from 'react';
import {useState} from 'react';

const PickDate = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DatePicker
      mode='date' isGregorian={true} onSelectedChange={date => setSelectedDate(date)}
    />
  );
};

export default PickDate;
