import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorBase from 'components/Error/ErrorBase';

import serverErrorImage from 'assets/images/error/server-error.svg';

const ServerError: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ErrorBase
            title={t('Common.error.server.title')}
            description={t('Common.error.server.description')}
            image={serverErrorImage}
        />
    )
};

ServerError.displayName = 'ServerError';

export default ServerError;
