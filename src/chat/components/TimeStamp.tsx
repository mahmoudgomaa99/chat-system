import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../values';

const TimeStamp = ({createdAt, is_image_exist, is_audio_exist}: any) => {
  return (
    <Text
      style={
        is_audio_exist || is_image_exist ? styles.imageTime : styles.textTime
      }>
      {'sdcsdc'}
    </Text>
  );
};

export default TimeStamp;

const styles = StyleSheet.create({
  imageTime: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 5,
    backgroundColor: colors.grey,
    padding: 3,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textTime: {
    marginTop: '5',
    padding: '5',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
