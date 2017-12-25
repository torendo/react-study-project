import React from 'react';
import PropTypes from 'prop-types';
import {} from './grid.less';

export default class Grid extends React.Component {
  constructor() {
    super();
    this.quantityChangedHandler = this.quantityChangedHandler.bind(this);
    this.pagingChangedHandler = this.pagingChangedHandler.bind(this);
    this.state = {
      page: 1,
      quantity: 10
    };
    this.quantities = [10, 25, 50, 100];
  }
  render() {
    return (
      <table styleName="table">
        <thead>
          <tr>
            {this.props.columns.map((column) => {
              return (
                <th styleName="th" key={column.id}>
                  {column.name}
                  <button styleName="sortAsc"/>
                  <button styleName="sortDesc"/>
                </th>
              );
            })}
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
            <td colSpan={this.props.columns.length}>
              <div styleName="footer">
                <div styleName="paging" onClick={this.pagingChangedHandler}>
                  {this.getPages().map(page => page)}
                </div>
                <div styleName="quantity" onClick={this.quantityChangedHandler}>
                  {this.quantities.map((qty) => {
                    return (
                      <button key={qty} name={qty} styleName={(this.state.quantity === qty ? 'btn current' : 'btn')}>{qty}</button>
                    );
                  })}
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
  quantityChangedHandler(e) {
    if (!e.target.name) return;
    const quantity = Number(e.target.name);
    this.setState({quantity, page: 1});
    this.props.onPaging(quantity, 1);
  }
  pagingChangedHandler(e) {
    if (!e.target.name || e.target.disabled) return;
    let page;
    if (e.target.name === 'prev') {
      page = this.state.page - 1;
    } else if (e.target.name === 'next') {
      page = this.state.page + 1;
    } else {
      page = Number(e.target.name);
    }
    this.setState({page});
    this.props.onPaging(this.state.quantity, page);
  }
  getPages() {
    const pagesCount = Math.ceil(this.props.total / this.state.quantity);
    const pages = [];
    pages.push(
      <button key="prev" name="prev" styleName="prev" disabled={this.state.page === 1}/>
    );
    for(let i = 1; i <= pagesCount; i++) {
      pages.push(
        <button key={i} name={i} styleName={(this.state.page === i ? 'page current' : 'page')}>{i}</button>
      );
    }
    pages.push(
      <button key="next" name="next" styleName="next" disabled={this.state.page === pagesCount}/>
    );
    return pages;
  }
}

Grid.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  total: PropTypes.number,
  onPaging: PropTypes.func
};