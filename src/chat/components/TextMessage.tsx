import React, {useReducer} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MessageReducer} from '../../reducer';
import TimeStamp from './TimeStamp';

const TextMessage = ({
  message_txt,
  created_at,
  is_image_exist,
  is_audio_exist,
}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message_txt}</Text>
      {/* <TimeStamp
        createdAt={created_at}
        is_image_exist={is_image_exist}
        is_audio_exist={is_audio_exist}
      /> */}
      {/* <Text>kdmskdmcks</Text> */}
    </View>
  );
};
export default TextMessage;

const styles = StyleSheet.create({
  container: {padding: 5},
  text: {
    margin: 5,
  },
});
