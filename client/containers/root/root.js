import React from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import App from '../app';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <App/>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object
};