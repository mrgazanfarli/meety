import {
    EmojiPeople,
    Info,
    Person,
    QueryBuilder,
    RecordVoiceOver,
    Room,
    SmokingRooms,
    SentimentSatisfiedAlt,
} from '@material-ui/icons';
import { getUserEvents } from 'actions/events';
import EventCard from 'components/EventCard';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import LoadingSpinner from 'components/Loading';
import { IAppState, IAsyncData } from 'models';
import moment from 'moment';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import { gapi } from 'gapi-script';
import { IEventsResponse } from 'services/events/models';
import { isError, isPending, isSuccess } from 'utils/redux';

const EventsPage: React.FC = () => {
    const dispatch = useDispatch();
    const eventsBranch = useSelector<IAppState, IAsyncData<IEventsResponse>>((state) => state.userEvents);

    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);

    React.useEffect(
        () => {
            dispatch(getUserEvents({
                limit,
                offset: (page - 1) * limit,
            }));
        },
        [page, limit]
    );

    const [signedIn, setSignedIn] = React.useState(false);
    const [googleEvents, setGoogleEvents] = React.useState(undefined);
    const [isGoogleDataReceived, setGoogleDataReceived] = React.useState(false);
    const [currentAttendees, setCurrentAttendees] = React.useState([]);
    const [isAttendeesModalOpen, setAttendeesModalVisibility] = React.useState(false);
    const [isGoogleEventsLoading, setGoogleEventsLoading] = React.useState(false);

    const toggleAttendeesModal = () => setAttendeesModalVisibility(!isAttendeesModalOpen);

    const initClient = () => {
        gapi.client.init({
            apiKey: 'AIzaSyB3KmvpaXydYr67TA9midTKLghsP0OtYK4',
            clientId: '629285308214-e38cqi86q01asifjrgm5n2sv2f65al35.apps.googleusercontent.com',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
            if (!gapi.auth2.getAuthInstance().isSignedIn?.je) {
                gapi.auth2.getAuthInstance().signIn();
            } else {
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }
        }).catch(e => {
            console.log('GOOGLE INIT FAILED: ', e);
        });
    };

    const updateSigninStatus = (isSignedIn: boolean) => {
        setSignedIn(isSignedIn);
    };

    const getCalendarEvents = () => {
        if (signedIn) {
            setGoogleEventsLoading(true);
            gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            }).then(res => {
                setGoogleDataReceived(true);
                setGoogleEvents(res.result.items);
                setGoogleEventsLoading(false);
            }).catch(() => {
                gapi.auth2.getAuthInstance().signIn();
                setGoogleEventsLoading(false);
            });
        } else {
            gapi.load('client:auth2', initClient);
        }
    };

    let userEventsContent = null;

    if (isPending(eventsBranch)) {
        userEventsContent = <LoadingSpinner />;
    } else if (isError(eventsBranch)) {
        userEventsContent = <h4 className="text-danger">Unexpected error occurred! Please, try again later...</h4>
    } else if (isSuccess(eventsBranch)) {
        userEventsContent = eventsBranch.data.events.length > 0 ? (
            <>
                <h3 className="text-primary my-3">Events:</h3>
                <Row>
                    {eventsBranch.data.events.map((e) => {
                        return (
                            <Col key={e.id} xs={6} className="py-3">
                                <EventCard event={e} />
                            </Col>
                        );
                    })}
                </Row>
            </>
        ) : (
            <h4>You do not have any events.</h4>
        );
    }

    const renderPaginationOptions = () => {
        let content: JSX.Element[] = [];

        if (isSuccess(eventsBranch)) {
            for (let i = 0; i < eventsBranch.data.totalPageCount; i++) {
                content.push((
                    <option value={i + 1}>{i + 1}</option>
                ))
            }
        }

        return content;
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    {!isGoogleDataReceived && (
                        <Button
                            color="basic"
                            className="p-0 my-2 text-secondary"
                            onClick={getCalendarEvents}
                            disabled={isGoogleEventsLoading}
                        >
                            Click to get your Google events
                        </Button>
                    )}
                    <div className="d-flex">
                        <InputContainer>
                            <Label text={'Per page'} />
                            <select
                                value={limit}
                                onChange={e => setLimit(+e.target.value)}
                                className="form-control"
                                style={{ width: '150px' }}
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </InputContainer>
                        <InputContainer className="ml-3">
                            <Label text={'page'} />
                            <select
                                disabled={isPending(eventsBranch) || isError(eventsBranch)}
                                value={page}
                                onChange={e => setPage(+e.target.value)}
                                className="form-control"
                                style={{ width: '150px' }}
                            >
                                {renderPaginationOptions()}
                            </select>
                        </InputContainer>
                    </div>
                    {googleEvents?.length > 0 ? (
                        <>
                            <h3 className="text-primary my-3">Google events:</h3>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Event</th>
                                    <th>Attendees</th>
                                    <th>Organizer</th>
                                    <th>Starts at</th>
                                    <th>Ends at</th>
                                    <th>Location</th>
                                    <th>Meeting</th>
                                </tr>
                                </thead>
                                <tbody>
                                {googleEvents?.map((e, i) => {
                                    const {
                                        attendees,
                                        location,
                                        iCalUID,
                                        organizer,
                                        htmlLink,
                                        hangoutLink,
                                        start: {
                                            dateTime: startDateTime
                                        },
                                        end: {
                                            dateTime: endDateTime,
                                        }
                                    } = e;

                                    return (
                                        <tr key={iCalUID}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <a rel="noreferrer" target="_blank" href={htmlLink}>Go to event</a>
                                            </td>
                                            <td>
                                                <Button color="secondary" onClick={() => {
                                                    setCurrentAttendees(attendees);
                                                    setAttendeesModalVisibility(true);
                                                }}>Attendees</Button>
                                            </td>
                                            <td>{organizer.self ? 'You' : organizer.email}</td>
                                            <td>{moment(startDateTime).format('DD.MM.YYYY HH:mm')}</td>
                                            <td>{moment(endDateTime).format('DD.MM.YYYY HH:mm')}</td>
                                            <td>{location ? <a rel="noreferrer" target="_blank"
                                                               href={`https://www.google.com/search?q=${location}`}>{location}</a> : <>&mdash;</>}</td>
                                            <td>
                                                {hangoutLink ? <a rel="noreferrer" target="_blank"
                                                                  href={hangoutLink}>Join</a> : <>&mdash;</>}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </>
                    ) : googleEvents?.length === 0 && (
                        <h5 className="my-3 text-dark">You have no Google events</h5>
                    )}
                </Col>
                <Col className="my-3" xs={12}>
                    {userEventsContent}
                </Col>
            </Row>
            <Modal
                centered
                isOpen={isAttendeesModalOpen}
                toggle={toggleAttendeesModal}
                size="lg"
            >
                <ModalHeader toggle={toggleAttendeesModal}>
                    The list of attendees
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Response</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentAttendees.map(a => {
                            const {
                                email,
                                self,
                                responseStatus
                            } = a;

                            return (
                                <tr key={email}>
                                    <td>{email} {self && ' (you)'}</td>
                                    <td>{responseStatus === 'accepted' ? 'Accepted' : responseStatus === 'needsAction' ? 'Not reacted yet' : 'Rejected'}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Container>
    )
};

export default EventsPage;
