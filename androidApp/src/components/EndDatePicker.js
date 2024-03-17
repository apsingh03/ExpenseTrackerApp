import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EndDatePicker = ({setselectEndDate}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('End Date -> ', date);
    setselectEndDate(date);
    hideDatePicker();
  };

  return (
    <>
      <View>
        <Button title="End Date" color={'#2f2cd8'} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
};

export default EndDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
