const queryKey = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'POST',
  GET_POST: 'GET_POST',
  GET_POSTS: 'GET_POSTS',
  FAVORITE: 'favorite',
  GET_FAVORITE_POST: 'getFavoritePost',
  GET_CALENDAR_POST: 'getCalendarPost',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKey, storageKeys};
