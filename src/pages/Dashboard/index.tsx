import { getUpcomingEvents } from 'actions/events';
import EventCard from 'components/EventCard';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import LoadingSpinner from 'components/Loading';
import RadioButton from 'components/RadioButton';
import { IAppState, IAsyncData } from 'models';
import { EEventType } from 'models/enums';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Input,
    Row,
    UncontrolledCollapse,
} from 'reactstrap';
import {
    Room,
    QueryBuilder,
    Person,
    EmojiPeople,
    SmokingRooms,
    RecordVoiceOver,
} from '@material-ui/icons';
import { IEventsResponse } from 'services/events/models';
import { isError, isPending, isSuccess } from 'utils/redux';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const upcomingEventsBranch = useSelector<IAppState, IAsyncData<IEventsResponse>>(state => state.upcomingEvents);

    const [name, setName] = React.useState<string>('');
    const [location, setLocation] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [eventType, setEventType] = React.useState<EEventType | undefined>();
    const [limit, setLimit] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(1);
    const [smokingAllowed, setSmokingAllowed] = React.useState<boolean | undefined>();
    const [noiseAllowed, setNoiseAllowed] = React.useState<boolean | undefined>();

    const getUpcomingEventsByFilters = (withoutFilters: boolean = false) => {
        withoutFilters ? dispatch(getUpcomingEvents({
            limit,
            offset: (page - 1) * +limit
        })) : dispatch(getUpcomingEvents({
            limit,
            name,
            location,
            vendor,
            eventType,
            offset: (page - 1) * +limit
        }));
    };

    React.useEffect(
        () => {
            getUpcomingEventsByFilters();
        },
        [limit, page]
    );

    const handleFilterApply = () => {
        getUpcomingEventsByFilters();
    };

    const resetFilters = () => {
        setName('');
        setLocation('');
        setVendor('');
        setEventType(undefined);
        getUpcomingEventsByFilters(true);
    };

    const renderPaginationOptions = () => {
        let content: JSX.Element[] = [];

        if (isSuccess(upcomingEventsBranch)) {
            for (let i = 0; i < upcomingEventsBranch.data.totalPageCount; i++) {
                content.push((
                    <option value={i + 1}>{i + 1}</option>
                ))
            }
        }

        return content;
    };

    let content = null;

    if (isPending(upcomingEventsBranch)) {
        content = <LoadingSpinner />;
    } else if (isError(upcomingEventsBranch)) {
        content = <h4 className="text-danger my-3">Unexpected error occurred! Please, try again later.</h4>
    } else if (isSuccess(upcomingEventsBranch)) {
        const { events } = upcomingEventsBranch.data;

        content = (
            <Row>
                {events.map(e => {
                    return (
                        <Col key={e.id} xs={6} className="py-3">
                            <EventCard event={e} isUpcomingEvent={true} />
                        </Col>
                    )
                })}
            </Row>
        );
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div className="d-flex align-items-end my-2">
                        <InputContainer>
                            <Label text={'Per page'} />
                            <select
                                className="form-control"
                                style={{ width: '100px' }}
                                value={limit}
                                onChange={e => setLimit(+e.target.value)}
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </InputContainer>
                        <InputContainer className="ml-3">
                            <Label text={'Page'} />
                            <select
                                className="form-control"
                                style={{ width: '100px' }}
                                disabled={isPending(upcomingEventsBranch) || isError(upcomingEventsBranch)}
                                value={page}
                                onChange={e => setPage(+e.target.value)}
                            >
                                {renderPaginationOptions()}
                            </select>
                        </InputContainer>
                        <Button className="ml-3" color="primary" id="toggleFilters">Filters</Button>
                        <Button className="ml-3" color="danger" onClick={resetFilters}>Reset filters</Button>
                    </div>
                    <UncontrolledCollapse className="mt-3" toggler="#toggleFilters">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Name" />
                                            <Input
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </InputContainer>
                                    </Col>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Location" />
                                            <Input
                                                value={location}
                                                onChange={e => setLocation(e.target.value)}
                                            />
                                        </InputContainer>
                                    </Col>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Vendor" />
                                            <select value={vendor} onChange={e => setVendor(e.target.value)}
                                                    className="form-control">
                                                <option value="">Select vendor</option>
                                            </select>
                                        </InputContainer>
                                    </Col>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Event type" />
                                            <div className="d-flex align-items-center">
                                                <RadioButton
                                                    text="Personal"
                                                    value={EEventType.PERSONAL}
                                                    checked={eventType === EEventType.PERSONAL}
                                                    onChange={() => setEventType(EEventType.PERSONAL)}
                                                />
                                                <div className="ml-3">
                                                    <RadioButton
                                                        text="Corporate"
                                                        value={EEventType.CORPORATE}
                                                        checked={eventType === EEventType.CORPORATE}
                                                        onChange={() => setEventType(EEventType.CORPORATE)}
                                                    />
                                                </div>
                                            </div>
                                        </InputContainer>
                                    </Col>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Smoking" />
                                            <div className="d-flex align-items-center">
                                                <RadioButton
                                                    text="Allowed"
                                                    checked={smokingAllowed}
                                                    onChange={() => setSmokingAllowed(true)}
                                                />
                                                <div className="ml-3">
                                                    <RadioButton
                                                        text="Not allowed"
                                                        checked={smokingAllowed === false}
                                                        onChange={() => setSmokingAllowed(false)}
                                                    />
                                                </div>
                                            </div>
                                        </InputContainer>
                                    </Col>
                                    <Col xs={4}>
                                        <InputContainer>
                                            <Label text="Noise" />
                                            <div className="d-flex align-items-center">
                                                <RadioButton
                                                    text="Allowed"
                                                    checked={noiseAllowed}
                                                    onChange={() => setNoiseAllowed(true)}
                                                />
                                                <div className="ml-3">
                                                    <RadioButton
                                                        text="Not allowed"
                                                        checked={noiseAllowed === false}
                                                        onChange={() => setNoiseAllowed(false)}
                                                    />
                                                </div>
                                            </div>
                                        </InputContainer>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" onClick={handleFilterApply}
                                        disabled={isPending(upcomingEventsBranch)}>Apply</Button>
                            </CardFooter>
                        </Card>
                    </UncontrolledCollapse>
                </Col>
            </Row>
            <div className="py-3">
                {content}
            </div>
        </Container>
    );
};

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
