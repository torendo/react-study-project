import React from 'react';
import Grid from '../../components/grid/index';
import Filter from '../../components/filter/index';
import {} from './app.less';

import playlist from '../../../mock/playlist';
import filters from '../../../mock/filters';
import author from '../../../mock/authors';
import genre from '../../../mock/genres';
import year from '../../../mock/years';
const filtersData = {author, genre, year};

export default class App extends React.Component {
  constructor() {
    super();
    this.onPaging = this.onPaging.bind(this);
    this.state = {
      data: [],
      filters: [],
      columns: [
        {id: 1, code: 'author', name: 'Author'},
        {id: 2, code: 'title', name: 'Song'},
        {id: 3, code: 'genre', name: 'Genre'},
        {id: 4, code: 'year', name: 'Year'},
      ],
      total: 0
    };
  }
  componentWillMount() {
    this.getPlaylist();
    this.getFilters();
  }
  render() {
    return (
      <main styleName="main">
        <section styleName="section-big">
          <h2>Playlist</h2>
          <Grid
            data={this.state.data}
            columns={this.state.columns}
            total={this.state.total}
            // onFilter={}
            // onSort={}
            onPaging={this.onPaging}
          />
        </section>
        <aside styleName="sidebar">
          <h2>Filter</h2>
          <Filter
            filters={this.state.filters}
          />
        </aside>
      </main>
    );
  }
  getPlaylist(count = 10, page = 1) {
    const start = (page - 1) * count;
    const end = page * count;
    this.setState({
      data: playlist.slice(start, end),
      total: playlist.length
    });
  }
  getFilters() {
    this.setState({
      filters: filters.map((filter) => {
        return {...filter, options: filtersData[filter.code]};
      })
    });
  }
  onPaging(count, page) {
    this.getPlaylist(count, page);
  }
}