import {
    EmojiPeople,
    Info,
    Person,
    QueryBuilder,
    RecordVoiceOver,
    Room,
    SentimentSatisfiedAlt,
    SmokingRooms
} from '@material-ui/icons';
import moment from 'moment';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { IEvent } from 'models';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';

interface IProps {
    event: IEvent;
    isUpcomingEvent?: boolean;
}

const EventCard: React.FC<IProps> = ({ event, isUpcomingEvent = false }) => {
    const history = useHistory();

    const {
        name,
        description,
        createdBy,
        imgUrl,
        noiseAllowed,
        smokingAllowed,
        id,
        dateTime,
        eventType,
        eventStatus,
        location,
    } = event;

    return (
        <Card>
            <CardHeader>
                {name} {!isUpcomingEvent && `(${eventStatus})`}
            </CardHeader>
            <CardBody className="pt-0 px-0">
                <img
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    src={imgUrl}
                    alt={name}
                />
                <div className="px-3 mt-2 text-justify">
                    <p>{description}</p>
                    <Row>
                        <Col xs={6}>
                                <span className="text-muted d-flex align-items-center">
                                    <QueryBuilder />
                                    <span className="ml-2">
                                        {moment(dateTime).format('DD.MM.YYYY HH:mm')}
                                    </span>
                                </span>
                            <span className="text-muted mt-2 d-flex align-items-center">
                                    <Room />
                                    <span className="ml-2">{location}</span>
                                </span>
                            <span className="text-muted mt-2 d-flex align-items-center">
                                    <SmokingRooms />
                                    <span className="ml-2">
                                        {smokingAllowed ? 'Allowed' : 'Not allowed'}
                                    </span>
                                </span>
                        </Col>
                        <Col xs={6}>
                                <span className="text-muted d-flex align-items-center">
                                    <Person />
                                    <span className="ml-2">{createdBy}</span>
                                </span>
                            <span className="text-muted mt-2 d-flex align-items-center">
                                    <EmojiPeople />
                                    <span className="ml-2">{eventType}</span>
                                </span>
                            <span className="text-muted mt-2 d-flex align-items-center">
                                    <RecordVoiceOver />
                                    <span
                                        className="ml-2">{noiseAllowed ? 'Allowed' : 'Not allowed'}</span>
                                </span>
                        </Col>
                    </Row>
                </div>
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
                <Button
                    color="secondary"
                    className="d-flex align-items-center"
                    onClick={() => history.push(`/events/${id}/details`)}
                >
                    <Info className="mr-2" /> Details
                </Button>
                {isUpcomingEvent && <Button
                    color="primary"
                    className="d-flex align-items-center ml-3"
                >
                    <SentimentSatisfiedAlt className="mr-2" /> Join
                </Button>}
            </CardFooter>
        </Card>
    )
};

EventCard.displayName = 'EventCard';

export default EventCard;
