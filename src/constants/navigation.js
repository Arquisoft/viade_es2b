/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'home',
    icon: '../img/icon/routes.svg',
    label: 'navBar.home',
    to: '/home'
  },
  {
    id: 'profile',
    icon: '../img/icon/user.svg',
    label: 'navBar.profile',
    to: '/profile'
  },
  {
    id: 'friends',
    icon: '../img/icon/friends.svg',
    label: 'navBar.friends',
    to: '/friends'
  },
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
