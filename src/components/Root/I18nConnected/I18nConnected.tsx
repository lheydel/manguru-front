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

/**
 * Connect I18nProvider to the redux store
 */
export const RawI18nConnected: React.FC<I18nConnectedProps> = (props) => {
    const { i18n } = i18nService;
    const { language, children } = props;
    i18n.activate(language);

    return (
        <I18nProvider language={language} i18n={i18n}>
            {children}
        </I18nProvider>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    language: state.i18n.language
});

export const I18nConnected = connect(mapStateToProps)(RawI18nConnected);
