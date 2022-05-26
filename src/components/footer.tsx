import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors} from '../values';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {ChatContext} from '../chat';
import {USER_ID, API_URL} from '../../env.json';
import axios from 'axios';

const Footer = ({openModal}: any) => {
  const [message, setMessage] = useState('');
  const {socket, setChat, chatId} = useContext(ChatContext);
  const sendMessage = () => {
    setMessage('');
    const messageCreated = {
      message_txt: message,
      chat_id: chatId,
      userId: USER_ID,
      receiver_userId: '620e1efd60eb088790787342',
      is_image_exist: false,
      is_audio_exist: false,
      user_role: 'user',
      created_at: new Date().toString(),
    };
    setChat((prev: any) => [messageCreated, ...prev]);
    socket.emit('chat', messageCreated);
    axios
      .put(`${API_URL}v1/chats`, {chatId: chatId, message: messageCreated})
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => openModal('recorder')}>
        <Icon name="microphone" size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.InputView}>
        <TextInput
          style={styles.input}
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <TouchableOpacity onPress={() => openModal('imagePicker')}>
          <Icon2
            name="attachment"
            size={22}
            color={colors.primary}
            style={styles.iconAt}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.icon} onPress={sendMessage}>
        <Icon name={'paper-plane'} size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: colors.grey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    alignItems: 'flex-start',
    paddingTop: 15,
  },
  input: {
    height: 30,
    marginHorizontal: 10,
    paddingTop: 2,
    paddingRight: 0,
    paddingBottom: 2,
    paddingLeft: 10,
    flex: 1,
    color: '#000',
  },
  icon: {
    margin: 3,
    marginTop: 7,
  },
  InputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: colors.dark_grey,
    borderRadius: 15,
    marginHorizontal: 7,
  },
  iconAt: {padding: 6},
});
