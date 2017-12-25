import React from 'react';
import Grid from '../../components/grid/index';
import Filter from '../../components/filter/index';
import {} from './app.less';

//TODO: remove work with mocks
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
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.state = {
      gridData: [],
      filtersData: [],
      filter: {},
      columns: [
        {id: 1, code: 'author', name: 'Author'},
        {id: 2, code: 'title', name: 'Song'},
        {id: 3, code: 'genre', name: 'Genre'},
        {id: 4, code: 'year', name: 'Year'},
      ],
      count: 10,
      page: 1,
      total: 0
    };
  }
  componentWillMount() {
    this.getPlaylist(this.state.count, this.state.page);
    this.getFilters();
  }
  render() {
    return (
      <main styleName="main">
        <section styleName="section-big">
          <h2>Playlist</h2>
          <Grid
            data={this.state.gridData}
            columns={this.state.columns}
            total={this.state.total}
            page={this.state.page}
            onPaging={this.onPaging}
          />
        </section>
        <aside styleName="sidebar">
          <h2>Filter</h2>
          <Filter
            filters={this.state.filtersData}
            onSelect={this.onFilterSelect}
          />
        </aside>
      </main>
    );
  }
  getPlaylist(count, page, filter = {}) {
    const start = (page - 1) * count;
    const end = page * count;
    const filters = Object.entries(filter);
    //TODO: remove work with mocks
    let data = [...playlist];
    if (filters.length > 0) {
      filters.forEach(([key, value]) => {
        const fullItem = filtersData[key].find((item) => item.id === value);
        if (fullItem) {
          data = data.filter((item) =>  item[key] === fullItem.name);
        }
      });
    }
    this.setState({
      gridData: data.slice(start, end),
      total: data.length
    });
  }
  getFilters() {
    this.setState({
      filtersData: filters.map((filter) => {
        //TODO: remove work with mocks
        return {...filter, options: filtersData[filter.code]};
      })
    });
  }
  onPaging(count, page) {
    this.setState({count, page}, () => {
      this.getPlaylist(count, page, this.state.filter);
    });
  }
  onFilterSelect(filter) {
    this.setState({filter, page: 1}, () => {
      this.getPlaylist(this.state.count, this.state.page, filter);
    });
  }
}