const mainNavigation = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

const authNavigation = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
} as const;

const mapNavigation = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const feedNavigator = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTapNavigation = {
  FEED_HOME: 'FeedHome',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

export {
  authNavigation,
  mapNavigation,
  mainNavigation,
  feedNavigator,
  feedTapNavigation,
};
