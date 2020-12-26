import { getUpcomingEvents } from 'actions/events';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import LoadingSpinner from 'components/Loading';
import RadioButton from 'components/RadioButton';
import { IAppState, IAsyncData, IUpcomingEvent } from 'models';
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
import { isError, isPending, isSuccess } from 'utils/redux';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const upcomingEventsBranch = useSelector<IAppState, IAsyncData<IUpcomingEvent[]>>(state => state.upcomingEvents);

    const [name, setName] = React.useState<string>('');
    const [location, setLocation] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [eventType, setEventType] = React.useState<EEventType | undefined>();
    const [limit, setLimit] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(1);
    const [smokingAllowed, setSmokingAllowed] = React.useState<boolean | undefined>();
    const [noiseAllowed, setNoiseAllowed] = React.useState<boolean | undefined>();

    const getUpcomingEventsByFilters = () => {
        dispatch(getUpcomingEvents({
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
        getUpcomingEventsByFilters();
    };

    let content = null;

    if (isPending(upcomingEventsBranch)) {
        content = <LoadingSpinner />;
    } else if (isError(upcomingEventsBranch)) {
        content = <h4 className="text-danger my-3">Unexpected error occurred! Please, try again later.</h4>
    } else if (isSuccess(upcomingEventsBranch)) {
        content = (
            <Row>
                <Col xs={6} className="py-3">
                    <Card>
                        <CardHeader>
                            Some party title
                        </CardHeader>
                        <CardBody className="pt-0 px-0">
                            <img
                                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                src="data:image/jpeg;base64,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"
                                alt="" />
                            <div className="px-3 mt-2 text-justify">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet assumenda
                                    blanditiis cum cupiditate dolores, explicabo hic ipsum nisi non odit officiis
                                    perspiciatis quam quo rem repellat rerum velit voluptatibus!
                                </p>
                                <Row>
                                    <Col xs={6}>
                                        <span className="text-muted d-flex align-items-center">
                                            <QueryBuilder />
                                            <span className="ml-2">10.12.2021 10:10</span>
                                        </span>
                                        <span className="text-muted mt-2 d-flex align-items-center">
                                            <Room />
                                            <span className="ml-2">10.12.2021 10:10</span>
                                        </span>
                                        <span className="text-muted mt-2 d-flex align-items-center">
                                            <SmokingRooms />
                                            <span className="ml-2">Allowed</span>
                                        </span>
                                    </Col>
                                    <Col xs={6}>
                                        <span className="text-muted d-flex align-items-center">
                                            <Person />
                                            <span className="ml-2">Gazanfar Gazanfarli</span>
                                        </span>
                                        <span className="text-muted mt-2 d-flex align-items-center">
                                            <EmojiPeople />
                                            <span className="ml-2">Party</span>
                                        </span>
                                        <span className="text-muted mt-2 d-flex align-items-center">
                                            <RecordVoiceOver />
                                            <span className="ml-2">Not allowed</span>
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-end">
                            <Button color="primary">Join</Button>
                        </CardFooter>
                    </Card>
                </Col>
                <Col xs={6} className="py-3">
                    <Card>
                        <CardHeader>
                            Some party title
                        </CardHeader>
                        <CardBody>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet assumenda
                                blanditiis cum cupiditate dolores, explicabo hic ipsum nisi non odit officiis
                                perspiciatis quam quo rem repellat rerum velit voluptatibus!
                            </p>
                            <span className="text-muted d-flex align-items-center">
                                <QueryBuilder />
                                <span className="ml-2">10.12.2021 10:10</span>
                            </span>
                            <span className="text-muted mt-2 d-flex align-items-center">
                                <Room />
                                <span className="ml-2">10.12.2021 10:10</span>
                            </span>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-end">
                            <Button color="primary">Register</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
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
                                disabled
                                value={page}
                                onChange={e => setLimit(+e.target.value)}
                            >
                                <option value="1">1</option>
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
