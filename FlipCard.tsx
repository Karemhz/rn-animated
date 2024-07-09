import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, interpolate, runOnJS } from 'react-native-reanimated'


const FlipCard = () => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const animatedValue = useSharedValue<number>(0);

  const toggleFlip: VoidFunction = () => {
    animatedValue.value = withTiming(flipped ? 0 : 1, {duration: 500}, (finished)=>{
        if(finished)
            runOnJS(setFlipped)(!flipped)
    })
  };

  const frontInterpolate = useAnimatedStyle(()=>{
    return{
        transform: [{rotateY: `${interpolate(animatedValue.value, [0, 1], [0, 180])} deg`}],
        opacity: interpolate(animatedValue.value, [0, 0.5, 1], [1, 0, 0])
    }
  }, [])

  const backInterpolate = useAnimatedStyle(()=>{
    return{
        transform: [{rotateY: `${interpolate(animatedValue.value, [0, 1], [180, 360])} deg`}],
        opacity: interpolate(animatedValue.value, [0, 0.5, 1], [0, 0, 1])
    }
  }, [])


  return (
    <TouchableWithoutFeedback onPress={toggleFlip}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.face,
            styles.front,
            frontInterpolate,
          ]}>
          <Text>Front</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.face,
            styles.back,
            backInterpolate,
          ]}>
          <Text>Back</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 380,
  },
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  front: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotateY: '180deg' }],
  },
});

export default FlipCard;