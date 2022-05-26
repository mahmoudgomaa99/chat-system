import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {USER_ID, API_URL} from '../../env.json';
import axios from 'axios';
import {useState} from 'react';
import {ChatContext} from '../chat';

const ImagePickerModal = ({cancel}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {socket, setChat, chatId} = useContext(ChatContext);
  const pickFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: any) => {
      setIsLoading(true);
      console.log(image.path);
      const file = {
        uri: image.path,
        type: image.mime,
        name: image.modificationDate,
      };
      var body = new FormData();
      body.append('attachment', file);
      body.append('chatId', chatId);
      body.append('message[chat_id]', chatId);
      body.append('message[userId]', USER_ID);
      body.append('message[receiver_userId]', '620e1efd60eb088790787342');
      body.append('message[is_image_exist]', true);
      body.append('message[is_audio_exist]', false);
      body.append('message[user_role]', 'user');
      body.append('message[created_at]', new Date().toString());
      axios
        .put(`${API_URL}v1/chats`, body, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          const messageCreated = res.data.messageCreated;
          setChat((prev: any) => [messageCreated, ...prev]);
          socket.emit('chat', messageCreated);
          setIsLoading(false);
          cancel();
        })
        .catch(e => {
          console.log(e);
          cancel();
        });
    });
  };

  const takeFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: any) => {
      setIsLoading(true);
      console.log(image.path);
      const file = {
        uri: image.path,
        type: image.mime,
        name: image.modificationDate,
      };
      var body = new FormData();
      body.append('attachment', file);
      body.append('chatId', chatId);
      body.append('message[chat_id]', chatId);
      body.append('message[userId]', USER_ID);
      body.append('message[receiver_userId]', '620e1efd60eb088790787342');
      body.append('message[is_image_exist]', true);
      body.append('message[is_audio_exist]', false);
      body.append('message[user_role]', 'user');
      body.append('message[created_at]', new Date().toString());
      axios
        .put(`${API_URL}v1/chats`, body, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          const messageCreated = res.data.messageCreated;
          setChat((prev: any) => [messageCreated, ...prev]);
          socket.emit('chat', messageCreated);
          setIsLoading(false);
          cancel();
        })
        .catch(e => {
          console.log(e);
          cancel();
        });
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity style={styles.wrapper} onPress={takeFromCamera}>
            <Image
              source={require('../assets/camera.png')}
              style={styles.image}
            />
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFromGallery} style={styles.wrapper}>
            <Image
              source={require('../assets/gallery.png')}
              style={styles.image}
            />
            <Text style={styles.text}>Gallary</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 150,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 40,
  },
  text: {
    color: '#000',
    textAlign: 'center',
  },
});
