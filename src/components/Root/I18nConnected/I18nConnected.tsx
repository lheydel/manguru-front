import React, { ReactNode } from 'react';
import { I18nProvider } from '@lingui/react';
import { Language } from '../../../utils/properties';
import { ApplicationState } from '../../../services/common/app.state';
import { connect } from 'react-redux';
import i18nService from '../../../services/i18n/service/i18n.service';

export interface I18nConnectedProps {
  children: ReactNode;
  language: Language;
}

class RawI18nConnected extends React.Component<I18nConnectedProps> {
  public render() {
    const { i18n } = i18nService;
    const { language } = this.props;
    i18n.activate(language);
    return (
      <I18nProvider language={language} i18n={i18n}>
        {this.props.children}
      </I18nProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    language: state.i18n.language
  };
};

export const I18nConnected = connect(mapStateToProps)(RawI18nConnected);
