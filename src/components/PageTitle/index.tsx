import * as React from 'react';

interface IProps extends React.HTMLAttributes<any> {
    titleText: string;
    actionsSection?: JSX.Element
}

const PageTitle: React.FC<IProps> = ({titleText, actionsSection, ...rest}) => {
    return (
        <div className="page-title d-print-none">
            <h2 className="font-weight-semi-bold">{titleText}</h2>
            {actionsSection && (
                <div>
                    {actionsSection}
                </div>
            )}
        </div>
    )
};

PageTitle.displayName = 'PageTitle';

export default PageTitle;
