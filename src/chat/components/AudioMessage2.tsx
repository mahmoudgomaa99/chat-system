import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

const w = Dimensions.get('screen').width;

const RenderMessageAudio = ({audio_url}: any) => {
  const [state, setState] = useState({
    Record: new Sound(audio_url, Sound.MAIN_BUNDLE),
    playingTime: 0,
    playing: false,
  });
  useEffect(() => {
    const state = {
      Record: new Sound(audio_url, Sound.MAIN_BUNDLE),
      playingTime: 0,
      playing: false,
    };
    setState(state);
  }, []);
  const onStartPlay = () => {
    let State = {...state};
    State.playing = true;
    setState(State);
    let record = state.Record;
    record.play(success => {
      console.log(success);
      record.stop();
      let newState = {...state};
      newState.playing = false;
      setState(newState);
    });
  };

  const onStopPlay = () => {
    let State = {...state};
    State.playing = false;
    setState(State);
  };
  return (
    <>
      <View style={styles.audioMessagePlayingContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {state.playing === false ? (
            <TouchableOpacity
              onPress={() => onStartPlay()}
              style={styles.audioMessageIconPlaying}
              activeOpacity={1.0}>
              <Icon1 name="play" size={24} color="silver" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onStopPlay()}
              style={styles.audioMessageIcon}
              activeOpacity={1.0}>
              <Icon1 name="pause" size={24} color="silver" />
            </TouchableOpacity>
          )}
          <Text style={styles.playingTime}>{state.Record.getDuration()}</Text>
        </View>
      </View>
    </>
  );
};

export default RenderMessageAudio;
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
