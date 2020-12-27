import { EOrganizationWay } from 'models/enums';
import moment from 'moment';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button, } from 'reactstrap';
import { ArrowBackIos } from '@material-ui/icons';

import { getEventDetails, resetEventDetails } from 'actions/events';
import { IAppState, IAsyncData, IEvent } from 'models';
import { isError, isPending, isSuccess } from 'utils/redux';

import LoadingSpinner from 'components/Loading';

const organizedByTranslation = {
    [EOrganizationWay.BY_PROFESSIONAL]: 'Professional',
    [EOrganizationWay.BY_GUIDE]: 'Standard guides',
    [EOrganizationWay.CUSTOM]: 'Author',
};

const EventDetails: React.FC = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const detailsBranch = useSelector<IAppState, IAsyncData<IEvent>>((state) => state.eventDetails);
    const { id } = useParams<{ id: string }>();

    // we only have IDs as number. If it is not a number, it is not valid
    if (isNaN(+id)) {
        history.push('/dashboard');
    }

    React.useEffect(
        () => {
            dispatch(getEventDetails(id));

            return () => {
                dispatch(resetEventDetails());
            }
        },
        []
    );

    let content = null;

    if (isPending(detailsBranch)) {
        content = <LoadingSpinner />;
    } else if (isError(detailsBranch)) {
        content = <h4 className="text-danger">Unexpected error occurred! Please, try again later...</h4>
    } else if (isSuccess(detailsBranch)) {
        const {
            name,
            description,
            noiseAllowed,
            smokingAllowed,
            location,
            dateTime,
            eventStatus,
            eventType,
            eventPrivacy,
            vendor,
            imgUrl,
            extras,
            createdBy,
            organizationWay,
        } = detailsBranch.data;

        content = (
            <Card>
                <CardHeader>
                    {name}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={12} md={6} lg={4}>
                            <img style={{ width: '100%' }} src={imgUrl} alt={name} />
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <h6 className="font-weight-bold">Description:</h6>
                            <p className="mb-2">{description}</p>
                            <h6 className="font-weight-bold">Location:</h6>
                            <p className="mb-2">{location}</p>
                            <h6 className="font-weight-bold">Privacy:</h6>
                            <p className="mb-2">{eventPrivacy}</p>
                            <h6 className="font-weight-bold">Type:</h6>
                            <p className="mb-2">{eventType}</p>
                            <h6 className="font-weight-bold">Vendor:</h6>
                            <p className="mb-2">{vendor.name}</p>
                            <h6 className="font-weight-bold">Status:</h6>
                            <p className="mb-2">{eventStatus}</p>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <h6 className="font-weight-bold">Date & time:</h6>
                            <p className="mb-2">{moment(dateTime).format('DD MMM YYYY, HH:mm')}</p>
                            <h6 className="font-weight-bold">Author:</h6>
                            <p className="mb-2">{createdBy}</p>
                            <h6 className="font-weight-bold">Noise:</h6>
                            <p className="mb-2">{noiseAllowed ? 'Allowed' : 'Not allowed'}</p>
                            <h6 className="font-weight-bold">Smoking:</h6>
                            <p className="mb-2">{smokingAllowed ? 'Allowed' : 'Not allowed'}</p>
                            <h6 className="font-weight-bold">Organized by:</h6>
                            <p className="mb-2">{organizedByTranslation[organizationWay]}</p>
                        </Col>
                        {extras && <Col xs={12}>
                            <h5 className="font-weight-bold text-primary mt-3">These will be extra at the meeting:</h5>
                            <p>{extras}</p>
                        </Col>}
                    </Row>
                    <CardFooter className="d-flex justify-content-end">
                        <Button
                            color="secondary"
                            className="d-flex align-items-center mr-3"
                            onClick={() => history.push('/events')}
                        >
                            <ArrowBackIos />
                            Back to events
                        </Button>
                        <Button color="primary">
                            Join
                        </Button>
                    </CardFooter>
                </CardBody>
            </Card>
        )
    }

    return (
        <Row className="py-3">
            <Col xs={12}>
                {content}
            </Col>
        </Row>
    )
};

export default EventDetails;
