import React from 'react';
import PropTypes from 'prop-types';
import {} from './filter.less';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {};
  }
  componentWillMount() {
    this.initFilters(this.props);
  }
  render() {
    return (
      <div styleName="filters">
        {this.props.filters.map((filter) => {
          return filter.options ? (
            <label styleName="filter" key={filter.id}>
              <div styleName="name">{filter.name}</div>
              <select onChange={this.changeHandler} styleName="dropdown" name={filter.code} defaultValue="all">
                <option key={0} value="all">All</option>
                {filter.options.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  );
                })}
              </select>
            </label>
          ) : (null);
        })}
      </div>
    );
  }
  initFilters(props) {
    const state = {};
    props.filters.forEach(filter => {
      state[filter.code] = null;
    });
    this.setState(state);
  }
  changeHandler(e) {
    const filter = e.target.name;
    const value = e.target.selectedOptions[0].value;
    this.setState({[filter]: value === 'all' ? null : Number(value)}, () => {
      this.props.onSelect(this.state);
    });
  }
}

Filter.propTypes = {
  filters: PropTypes.array,
  onSelect: PropTypes.func
};