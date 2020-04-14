/* eslint-disable constructor-super */
import React from 'react';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import { GroupsWrapper, GroupsContent } from './groups.style';

/**
 * A React component page that is displayed when the user wants to see his/her friend's groups.
 */
const Groups = () => {
  const { t } = useTranslation();
  return (
    <GroupsWrapper>
      <GroupsContent>
        <h3>{t('groups.title')}</h3>
        <p>{t('groups.content')}</p>
      </GroupsContent>
    </GroupsWrapper>
  );
};

export default Groups;
