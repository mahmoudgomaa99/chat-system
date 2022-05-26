import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
var Sound = require('react-native-sound');
import SoundPlayer from 'react-native-sound';
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const AudioMessage = ({audio_url}: any) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState();
  const [duration, setDuration] = useState(0);

  let record: SoundPlayer;
  if (!record) {
    record = new Sound(audio_url, null, (err: any) => {
      setLoading(false);
      if (err) {
        console.log(err);
      }
    });
  }

  // useEffect(() => {
  //   record?.getCurrentTime((seconds: any) => setCurrentTime(seconds));
  //   if (record?.getDuration() == currentTime) {
  //     record?.stop(() => {
  //       setPlaying(false);
  //     });
  //   }
  // }, [record]);

  const onStartPlay = () => {
    console.log('jjj');
    record.play(success => {});
    setPlaying(true);
  };

  const onStopPlay = () => {
    record.pause(() => {});
    setPlaying(false);
  };
  return (
    <>
      <View style={styles.audioMessagePlayingContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator />
          ) : playing === false ? (
            <TouchableOpacity
              onPress={() => onStartPlay()}
              style={styles.audioMessageIconPlaying}
              activeOpacity={1.0}>
              <Icon name="play" size={24} color="silver" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onStopPlay}
              style={styles.audioMessageIcon}
              activeOpacity={1.0}>
              <Icon name="pause" size={24} color="silver" />
            </TouchableOpacity>
          )}
          <Text style={styles.playingTime}>
            {playing ? currentTime : record?.getDuration()}
          </Text>
        </View>
      </View>
    </>
  );
};

export default AudioMessage;

const styles = StyleSheet.create({
  audioMessagePlayingContainer: {
    position: 'relative',
    padding: w * 0.05,
    alignItems: 'center',
  },
  audioMessageContainer: {
    position: 'relative',
    padding: w * 0.05,
    alignItems: 'center',
  },
  audioMessageIconPlaying: {
    paddingHorizontal: w * 0.05,
  },
  audioMessageIcon: {
    paddingHorizontal: w * 0.05,
  },
  audioSlider: {
    width: w * 0.4,
    transform: [{scaleX: 0.75}, {scaleY: 0.75}],
  },
  audioPlayingSlider: {
    width: w * 0.4,
    transform: [{scaleX: 0.75}, {scaleY: 0.75}],
  },
  playingTime: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Anderson Grotesk',
    alignSelf: 'flex-end',
    marginRight: w * 0.05,
  },
});
