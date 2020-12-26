import moment from 'moment';
import * as React from 'react';
import { Button, Col, Container, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { gapi } from 'gapi-script';

const EventsPage: React.FC = () => {
    React.useEffect(
        () => {
            gapi.load('client:auth2', initClient);
        },
        []
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
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch(e => {
            console.log('GOOGLE INIT FAILED: ', e);
        });
    };

    const updateSigninStatus = (isSignedIn: boolean) => {
        setSignedIn(isSignedIn);

        if (isSignedIn) {
            getCalendarEvents();
        }
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
            gapi.auth2.getAuthInstance().signIn()
        }
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
                                            <td>{location ?  <a rel="noreferrer" target="_blank" href={`https://www.google.com/search?q=${location}`}>{location}</a> : <>&mdash;</>}</td>
                                            <td>
                                                {hangoutLink ? <a rel="noreferrer" target="_blank" href={hangoutLink}>Join</a> : <>&mdash;</>}
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
