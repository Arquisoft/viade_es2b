/* eslint-disable constructor-super */
import React from 'react';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import { FriendsWrapper, FriendsContent } from './friends.style';

/**
 * A React component page that is displayed when the user wants to check his/her friends list and each 
 * friend's routes.
 */
const Friends = () => {
  const { t } = useTranslation();
  return (
    <FriendsWrapper>
      <FriendsContent>
        <h3>{t('friends.title')}</h3>
        <p>{t('friends.content')}</p>

      </FriendsContent>
    </FriendsWrapper>
  );
};

export default Friends;
