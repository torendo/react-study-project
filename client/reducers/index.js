import {combineReducers} from 'redux';
import {playlistReducer} from './playlist.reducer';

export default combineReducers({
  playlist: playlistReducer
});