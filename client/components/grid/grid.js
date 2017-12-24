import React from 'react';
import PropTypes from 'prop-types';
import {} from './grid.less';

export default class Grid extends React.Component {

  render() {
    return (
      <table styleName="table">
        <thead>
          <tr>
            {this.props.columns.map((column) => <th styleName="th" key={column.id}>{column.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((item) => {
            return (
              <tr key={item.id}>
                {this.props.columns.map((column) => {
                  return <td styleName="td" key={column.id}>{item[column.code]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td styleName="footer">
              <div styleName="paging">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
              </div>
              <div>
                <button></button>
                <button></button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

Grid.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};