import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {colors} from '../values';
import ImageMessage from './components/ImageMessage';
import AudioMessage from './components/AudioMessage';
import TextMessage from './components/TextMessage';
import {USER_ID} from '../../env.json';
import AudioMessage2 from './components/AudioMessage2';

const Item = ({item}: any) => {
  const receiver_userId = item.receiver_userId;
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent:
            item.user_role === 'admin' ? 'flex-start' : 'flex-end',
        },
      ]}>
      <Animatable.View animation="fadeInUp" duration={500} useNativeDriver>
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor:
                item.user_role === 'user' ? "#000" : colors.primary,
            },
          ]}>
          {item.is_image_exist ? (
            <ImageMessage
              image_url={item.image_url}
              created_at={item.created_at}
              message_txt={item.message_txt}
            />
          ) : item.is_audio_exist ? (
            <AudioMessage audio_url={item.audio_url} />
          ) : (
            <TextMessage
              message_txt={item.message_txt}
              created_at={item.created_at}
              is_image_exist={item.is_image_exist}
              is_audio_exist={item.is_audio_exist}
            />
          )}
        </View>
      </Animatable.View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wrapper: {
    borderRadius: 10,
    maxWidth: '100%',
  },
});
