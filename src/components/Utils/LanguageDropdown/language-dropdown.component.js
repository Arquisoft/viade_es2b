import React, { Component } from 'react';
import { Dropdown } from '@util-components';
import { toast } from 'react-toastify';

const languages = {
  en: {
    id: 'en',

  },
  es: {
    id: 'es',

  }
};

type Props = {
  i18n: Object,
  t: Function
};

class LanguageDropdown extends Component<Props> {
  constructor() {
    super();
    this.state = { language: this.getLanguage() };
  }

  getLanguage = () => localStorage.getItem('i18nextLng') || 'en';

  onLanguageSelect = nextLanguage => {
    const { i18n } = this.props;
    toast.dismiss();
    i18n.changeLanguage(nextLanguage);
    this.setState({
      language: this.getLanguage()
    });
  };

  render() {
    const { t } = this.props;
    const { language } = this.state;
    const profileOpts = [
      {
        label: t('navBar.languages.en'),
        onClick: () => this.onLanguageSelect('en'),
      },
      {
        label: t('navBar.languages.es'),
        onClick: () => this.onLanguageSelect('es'),
      }
    ];
    return (
      <Dropdown actions={profileOpts} hover>
        <div>
          {language && languages[language] ? languages[language].id : 'en'}
        </div>      
      </Dropdown>
    );
  }
}

export default LanguageDropdown;
