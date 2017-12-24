import React from 'react';
import PropTypes from 'prop-types';
import {} from './filter.less';

export default class Filter extends React.Component {
  render() {
    return (
      <div styleName="filters">
        {this.props.filters.map((filter) => {
          return (
            <label key={filter.id}>
              <div>{filter.name}</div>
              <select name="{filter.code}">
                {filter.options.map((option) => {
                  return (
                    <option key={option.id} value="{option.id}">{option.name}</option>
                  );
                })}
              </select>
            </label>
          );
        })}
      </div>
    );
  }
}

Filter.propTypes = {
  filters: PropTypes.array
};