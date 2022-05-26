import React from 'react';
import TimeStamp from './TimeStamp';
import {Pressable, Image, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-animatable';

const ImageMessage = ({image_url, created_at, message_txt}: any) => {
  return (
    <Pressable>
      <View>
        <Image source={{uri: image_url}} style={styles.imageContent} />
        {/* {message_txt && <Text style={styles.text}>{message_txt}</Text>} */}
      </View>
    </Pressable>
  );
};
export default ImageMessage;

const styles = StyleSheet.create({
  imageContent: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    margin: 5,
  },
});
