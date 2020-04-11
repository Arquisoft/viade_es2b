/* eslint-disable constructor-super */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RouteFormWrapper, RouteFormContent } from './route-form.style';

/**
 * A React component page that is displayed when user wants to add a new route.
 */
const RouteForm= () => {
  const { t } = useTranslation();
  return (
    <RouteFormWrapper>
      <RouteFormContent>
        <h3>{t('notFound.title')}</h3>
        <p>{t('notFound.content')}</p>
        <div>
          <Link to="/" className="ids-link">
            {t('notFound.redirectButton')}
          </Link>
        </div>
      </RouteFormContent>
    </RouteFormWrapper>
  );
};

export default RouteForm;
