import React, { Component } from 'react';
import {
  Animated, PanResponder, View, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
class Deck extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx: x, dy: y } = gesture;
        this.position.setValue({ x, y });
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx, dy } = gesture;
        if (dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (dy > -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });
  }

  forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start();
  }

  resetPosition = () => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  getCardStyle = () => {
    const { position } = this;
    const width = SCREEN_WIDTH * 1.5;
    const rotate = position.x.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }

  renderCards = () => {
    const { data, renderCard } = this.props;
    return data.map((x, i) => {
      if (i === 0) {
        return (
          <Animated.View
            key={x.id}
            style={this.getCardStyle()}
            {...this.panResponder.panHandlers}
          >
            {renderCard(x)}
          </Animated.View>
        );
      }
      return renderCard(x);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

Deck.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  renderCard: PropTypes.func.isRequired,
};

export default Deck;
