import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

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
      onPanResponderRelease: f => f,
    });
  }

  renderCards = () => {
    const { data, renderCard } = this.props;
    return data.map(x => renderCard(x));
  }

  render() {
    return (
      <Animated.View
        style={this.position.getLayout()}
        {...this.panResponder.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>
    );
  }
}

Deck.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  renderCard: PropTypes.func.isRequired,
};

export default Deck;
