import React from 'react';
import Grid from '../../components/grid/index';
import Filter from '../../components/filter/index';
import {} from './app.less';

//TODO: remove mocks, add database
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
    this.onSorting = this.onSorting.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    //TODO: move state to redux
    this.state = {
      gridData: [],
      filtersData: [],
      filter: {},
      sort: {},
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
            onSorting={this.onSorting}
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
  getPlaylist(count, page, filter = {}, sort = {}) {
    const start = (page - 1) * count;
    const end = page * count;
    const filters = Object.entries(filter);
    //TODO: remove mocks, add database
    //filter
    let data = [...playlist];
    if (filters.length > 0) {
      filters.forEach(([key, value]) => {
        const fullItem = filtersData[key].find((item) => item.id === value);
        if (fullItem) {
          data = data.filter((item) =>  item[key] === fullItem.name);
        }
      });
    }
    //sort
    const sortings = Object.entries(sort);
    if (sortings.length > 0) {
      const sortBy = sortings[0][0];
      const direction = sortings[0][1];
      data = data.sort((itemA, itemB) => {
        const a = itemA[sortBy].toLowerCase();
        const b = itemB[sortBy].toLowerCase();
        if (a < b) {
          return direction === 'ASC' ? -1 : 1;
        }
        if (a > b) {
          return direction === 'ASC' ? 1 : -1;
        }
        return 0;
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
        //TODO: remove mocks, add database
        return {...filter, options: filtersData[filter.code]};
      })
    });
  }
  onPaging(count, page) {
    this.setState({count, page}, () => {
      this.getPlaylist(count, page, this.state.filter, this.state.sort);
    });
  }
  onSorting(sort) {
    this.setState({sort, page: 1}, () => {
      this.getPlaylist(this.state.count, this.state.page, this.state.filter, sort);
    });
  }
  onFilterSelect(filter) {
    this.setState({filter, page: 1}, () => {
      this.getPlaylist(this.state.count, this.state.page, filter, this.state.sort);
    });
  }
}