import React, { ReactNode } from 'react';
import { I18nProvider } from '@lingui/react';
import { Language } from '../../../utils/properties';
import { setupI18n } from '@lingui/core';
import catalogs from '../../../services/i18n/locales';
import { ApplicationState } from '../../../services/common/app.state';
import { connect } from 'react-redux';
import { I18nState } from '../../../services/i18n/reducers/i18n.states';

export interface I18nConnectedProps {
    children: ReactNode;
    language: Language;
    // i18nState: I18nState;
}

export const i18n = setupI18n({
  language: Language.EN,
  catalogs: catalogs
});

export class RawI18nConnected extends React.Component<I18nConnectedProps> {
  public render() {
    return (
      <I18nProvider language={this.props.language} i18n={i18n}>
        {this.props.children}
      </I18nProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    language: state.i18n.language
    // i18nState: state.i18n
  };
};

export const I18nConnected = connect(mapStateToProps)(RawI18nConnected);
