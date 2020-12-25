import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorBase from 'components/Error/ErrorBase';

import serverErrorImage from 'assets/images/error/server-error.svg';

const NotFoundError: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ErrorBase
            title={t('Common.error.notFound.title')}
            description={t('Common.error.notFound.description')}
            image={serverErrorImage}
        />
    )
};

NotFoundError.displayName = 'NotFoundError';

export default NotFoundError;
