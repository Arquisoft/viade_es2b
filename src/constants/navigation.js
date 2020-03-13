/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'home',
    icon: '/img/icon/apps.svg',
    label: 'navBar.home',
    to: '/home'
  },
  {
    id: 'profile',
    icon: '/img/people.svg',
    label: 'navBar.profile',
    to: '/profile'
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
