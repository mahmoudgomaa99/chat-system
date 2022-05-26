import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Chat from './src/chat';
import {USER_ID, API_URL} from './env.json';

export default function App() {
  const [loading, setIsLoading] = useState(true);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    axios
      .post(`${API_URL}v1/chats?uid=${USER_ID}`)
      .then(res => {
        setChatId(res.data.chat[0]['_id']);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      ) : (
        <Chat chatId={chatId} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
