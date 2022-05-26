import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {createContext, useEffect, useRef, useState} from 'react';
import Footer from '../components/footer';
import {Modalize} from 'react-native-modalize';
import {connect} from 'socket.io-client';
import {SOCKET_URL, USER_ID, API_URL} from '../../env.json';
import axios from 'axios';
import Item from './item';
import Recorder from '../components/Recorder';
import ImagePickerModal from '../components/ImagePickerModal';

const socket = connect(SOCKET_URL);
export const ChatContext = createContext<any>({});

const Chat = ({chatId}: any) => {
  const modalizeRef = useRef<Modalize>(null);
  const [chat, setChat] = useState<any>([]);
  const [modalType, setModalType] = useState('');
  const [page, setPage] = useState(1);
  const [momentumScroll, setMomentumScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const openModalRecorder = (type: string) => {
    setModalType(type);
    modalizeRef.current?.open();
  };

  useEffect(() => {
    setIsLoading(true);
    socket.emit('signin', USER_ID);
    axios
      .get(`${API_URL}v1/chats?chat_id=${chatId}&page=${page}&limit=${30}`)
      .then(res => {
        setChat((prev: any) => [...prev, ...res.data.messages?.docs]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    socket.on('chat', payload => {
      setChat((prev: any) => [payload, ...prev]);
    });
  }, [socket]);

  const renderItem = ({item}: any) => <Item item={item} />;

  return (
    <ChatContext.Provider value={{socket, setChat, chatId}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>
        <FlatList
          data={chat}
          renderItem={renderItem}
          inverted
          onEndReached={() => {
            if (!momentumScroll) {
              setPage(prev => prev + 1);
              setMomentumScroll(true);
            }
          }}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() => setMomentumScroll(false)}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        />
        <Footer openModal={openModalRecorder} />
      </KeyboardAvoidingView>
      <Modalize
        adjustToContentHeight={true}
        withHandle={false}
        ref={modalizeRef}>
        {modalType === 'recorder' ? (
          <Recorder cancel={() => modalizeRef?.current?.close()} />
        ) : (
          <ImagePickerModal cancel={() => modalizeRef?.current?.close()} />
        )}
      </Modalize>
    </ChatContext.Provider>
  );
};

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
