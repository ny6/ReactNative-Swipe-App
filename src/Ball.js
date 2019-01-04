import React from 'react';
import { Animated, View } from 'react-native';

const ballStyle = {
  height: 60,
  width: 60,
  borderRadius: 30,
  borderWidth: 30,
  borderColor: 'black',
};

const Ball = () => {
  const position = new Animated.ValueXY({ x: 30, y: 30 });

  Animated.spring(position, {
    toValue: { x: 200, y: 500 },
  }).start();

  return (
    <Animated.View style={position.getLayout()}>
      <View style={ballStyle} />
    </Animated.View>
  );
};

export default Ball;
