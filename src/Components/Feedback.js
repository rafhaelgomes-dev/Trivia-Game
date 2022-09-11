import React, { Component } from 'react';
import Header from './Header';

class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        Feedback
        <Header />
      </div>
    );
  }
}

export default Feedback;
