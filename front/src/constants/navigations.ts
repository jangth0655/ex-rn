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
} as const;

export {authNavigation, mapNavigation, mainNavigation};
