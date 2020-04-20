/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: "home",
    icon: "./img/icon/apps.svg",
    label: "navBar.home",
    to: "/home"
  }
];

export const ProfileOptions = [
  {
    label: "navBar.logOut",
    onClick: "logOut",
    icon: "lock"
  }
];
