export function playlistReducer(state = null, action) {
  switch (action.type) {
    case 'PLAYLIST_FETCH_REQUEST':
      return state;
    case 'PLAYLIST_FETCH_ERROR':
      //TODO: maybe move it into error reducer
      return state;
    case 'PLAYLIST_FETCH_SUCCESS':
      return state;
    default:
      return state;
  }
}