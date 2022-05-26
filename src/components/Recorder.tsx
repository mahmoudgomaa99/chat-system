import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {USER_ID, API_URL} from '../../env.json';
import {ChatContext} from '../chat';
import axios from 'axios';
const w = Dimensions.get('window').width;
const audioRecorderPlayer = new AudioRecorderPlayer();

function Recorder(props: any) {
  const [recordTime, setRecordTime] = useState('');
  const [path, setPath] = useState('');
  const {socket, setChat, chatId} = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onStartRecord();
    return () => {
      onStopRecord();
    };
  }, []);

  async function onStartRecord() {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).slice(0, -3),
      );
      console.log(e);

      return;
    });
    setPath(result);
  }

  async function sendRecord() {
    setIsLoading(true);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log(result);
    const file = {
      uri: result,
      type: 'audio/mp4',
      name: 'record',
    };
    var body = new FormData();
    body.append('attachment', file);
    body.append('chatId', chatId);
    body.append('message[chat_id]', chatId);
    body.append('message[userId]', USER_ID);
    body.append('message[receiver_userId]', '620e1efd60eb088790787342');
    body.append('message[is_image_exist]', false);
    body.append('message[is_audio_exist]', true);
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
        props.cancel();
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
        props.cancel();
      });
    props.cancel();
  }

  async function onStopRecord() {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.part1}>
            <Text style={styles.txt2}>{recordTime}</Text>
          </View>
          <TouchableOpacity style={styles.part2} onPress={() => props.cancel()}>
            <Text style={styles.txt}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.part3}>
            <TouchableOpacity
              style={{
                paddingHorizontal: w * 0.02,
                height: w * 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => sendRecord()}>
              <Icon
                name="send"
                style={{marginBottom: w * 0.02}}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: w,
    height: w * 0.25,
    backgroundColor: 'rgba(39, 39, 39, 1)',
    flexDirection: 'row',
    paddingBottom: w * 0.05,
  },
  part1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  part2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  part3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: w * 0.03,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Anderson Grotesk',
  },
  txt2: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Anderson Grotesk',
    marginLeft: w * 0.03,
  },
});

export default Recorder;
