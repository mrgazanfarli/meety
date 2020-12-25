import * as React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner />
        </div>
    )
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
