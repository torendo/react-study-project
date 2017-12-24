import React from 'react';
import Grid from '../grid';
import Filter from '../filter';
import {} from './app.less';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section styleName="section-big">
          <h2>Playlist</h2>
          <Grid
            data={[
              {id: 1, author: 'aaa', title: 'sadasd', genre: 'ffff', year: 1234},
              {id: 2, author: 'bbb', title: 'hfghfg', genre: 'gggg', year: 2345},
              {id: 3, author: 'ccc', title: 'yuiyui', genre: 'hhhh', year: 4567}
            ]}
            columns={[
              {id: 1, code: 'author', name: 'Author'},
              {id: 2, code: 'title', name: 'Song'},
              {id: 3, code: 'genre', name: 'Genre'},
              {id: 4, code: 'year', name: 'Year'},
            ]}
            // quantity={2}
            // startPage={1}
          />
        </section>
        <aside styleName="sidebar">
          <h2>Filter</h2>
          <Filter
            filters={[
              {id: 1, code: 'author', name: 'Author', options: [
                {id: 1, name: 'Pooi'},
                {id: 2, name: 'Asse'}
              ]},
              {id: 2, code: 'genre', name: 'Genre', options: [
                {id: 1, name: 'Weeerr'},
                {id: 2, name: 'Awwqqq'}
              ]}
            ]}
          />
        </aside>
      </React.Fragment>
    );
  }
}