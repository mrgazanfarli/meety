import FormFieldError from 'components/FormFieldError';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import RadioButton from 'components/RadioButton';
import { EEventPrivacy, EEventType, EOrganizationWay } from 'models/enums';
import moment from 'moment';
import * as React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Row,
    Col,
    Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { AddCircleOutlined } from '@material-ui/icons';
import DateTimePicker from 'react-datetime';

import { logout } from 'utils';

import 'react-datetime/css/react-datetime.css';

enum EFormField {
    NAME = 'name',
    DATE_TIME = 'datetime',
    LOCATION = 'location',
    DESCRIPTION = 'description',
    VENDOR = 'vendor',
    EXTRAS = 'extras',
    ORGANIZATION_WAY = 'organizationWay',
}

interface IForm {
    name: string;
    description: string;
    location: string;
    vendor: string;
    organizationWay: EOrganizationWay;
    extras: string;
}

const Layout: React.FC = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAddModalOpen, setAddModalVisibility] = React.useState<boolean>(false);
    const [eventType, setEventType] = React.useState<EEventType>(EEventType.PERSONAL);
    const [eventPrivacy, setEventPrivacy] = React.useState<EEventPrivacy>(EEventPrivacy.PUBLIC);
    const [noiseAllowed, setNoiseAllowed] = React.useState<boolean>(false);
    const [smokingAllowed, setSmokingAllowed] = React.useState<boolean>(true);

    const requiredErrorMessage = 'This field is required';

    const toggle = () => setIsOpen(!isOpen);

    const toggleAddModal = () => setAddModalVisibility(!isAddModalOpen);

    const {
        control,
        errors,
        getValues,
        trigger,
        handleSubmit,
    } = useForm<IForm>({ mode: 'onBlur' });

    const handleEventAddition = () => {
        setAddModalVisibility(true);
    };

    return (
        <div className="layout">
            <div className="layout__navbar">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand className="cursor-pointer"
                                 onClick={() => history.push('/dashboard')}>meety</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/events" className="nav-link">Events</Link>
                            </NavItem>
                            <NavItem>
                                <NavLink className="cursor-pointer" onClick={handleEventAddition}>
                                    <AddCircleOutlined />
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div>
                            <UncontrolledDropdown inNavbar>
                                <DropdownToggle nav caret className="text-light">
                                    Gazanfar Gazanfarli
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => logout(history)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
            <div className="layout__content">
                {props.children}
            </div>
            <Modal
                size="lg"
                isOpen={isAddModalOpen}
                centered
                toggle={toggleAddModal}
            >
                <ModalHeader toggle={toggleAddModal}>Add an event</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Name'} />
                                <Controller
                                    name={EFormField.NAME}
                                    control={control}
                                    rules={{
                                        required: getValues()[EFormField.NAME] || requiredErrorMessage
                                    }}
                                    defaultValue={''}
                                    as={<Input />}
                                />
                                {Boolean(errors[EFormField.NAME]) &&
                                <FormFieldError message={errors[EFormField.NAME].message} />}
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Date & time'} />
                                <Controller
                                    name={EFormField.DATE_TIME}
                                    control={control}
                                    render={({ onChange, value }) => (
                                        <DateTimePicker
                                            onChange={onChange}
                                            initialValue={moment(new Date())}
                                            value={value}
                                            isValidDate={(date, currentDate) => {
                                                return moment(date).isAfter(currentDate);
                                            }}
                                            dateFormat={'DD MMM YYYY'}
                                        />
                                    )}
                                />
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Location'} />
                                <Controller
                                    name={EFormField.LOCATION}
                                    control={control}
                                    defaultValue={''}
                                    rules={{
                                        required: getValues()[EFormField.LOCATION] || requiredErrorMessage
                                    }}
                                    as={<Input />}
                                />
                                {Boolean(errors[EFormField.LOCATION]) &&
                                <FormFieldError message={errors[EFormField.LOCATION].message} />}
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Vendor'} />
                                <Controller
                                    name={EFormField.VENDOR}
                                    control={control}
                                    defaultValue={undefined}
                                    rules={{
                                        required: getValues()[EFormField.VENDOR] || requiredErrorMessage
                                    }}
                                    render={({ onChange, value }) => (
                                        <select
                                            className="form-control"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <option value={undefined}>Select vendor</option>
                                            <option value="vendor1">Vendor 1</option>
                                            <option value="vendor2">Vendor 2</option>
                                        </select>
                                    )}
                                />
                                {Boolean(errors[EFormField.VENDOR]) &&
                                <FormFieldError message={errors[EFormField.VENDOR].message} />}
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Event type'} />
                                <div className="d-flex align-items-center">
                                    <RadioButton
                                        text={'Personal'}
                                        checked={eventType === EEventType.PERSONAL}
                                        onChange={() => setEventType(EEventType.PERSONAL)}
                                    />
                                    <div className="ml-3">
                                        <RadioButton
                                            text={'Corporate'}
                                            checked={eventType === EEventType.CORPORATE}
                                            onChange={() => setEventType(EEventType.CORPORATE)}
                                        />
                                    </div>
                                </div>
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Privacy'} />
                                <div className="d-flex align-items-center">
                                    <RadioButton
                                        text={'Private'}
                                        checked={eventPrivacy === EEventPrivacy.PRIVATE}
                                        onChange={() => setEventPrivacy(EEventPrivacy.PRIVATE)}
                                    />
                                    <div className="ml-3">
                                        <RadioButton
                                            text={'Public'}
                                            checked={eventPrivacy === EEventPrivacy.PUBLIC}
                                            onChange={() => setEventPrivacy(EEventPrivacy.PUBLIC)}
                                        />
                                    </div>
                                </div>
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Is smoking allowed?'} />
                                <div className="d-flex align-items-center">
                                    <RadioButton
                                        text={'Yes'}
                                        checked={smokingAllowed}
                                        onChange={() => setSmokingAllowed(true)}
                                    />
                                    <div className="ml-3">
                                        <RadioButton
                                            text={'No'}
                                            checked={!smokingAllowed}
                                            onChange={() => setSmokingAllowed(false)}
                                        />
                                    </div>
                                </div>
                            </InputContainer>
                        </Col>
                        <Col xs={6} className="mb-2">
                            <InputContainer>
                                <Label text={'Are noisy companies allowed?'} />
                                <div className="d-flex align-items-center">
                                    <RadioButton
                                        text={'Yes'}
                                        checked={noiseAllowed}
                                        onChange={() => setNoiseAllowed(true)}
                                    />
                                    <div className="ml-3">
                                        <RadioButton
                                            text={'No'}
                                            checked={!noiseAllowed}
                                            onChange={() => setNoiseAllowed(false)}
                                        />
                                    </div>
                                </div>
                            </InputContainer>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <InputContainer>
                                <Label text={'Description'} />
                                <Controller
                                    name={EFormField.DESCRIPTION}
                                    control={control}
                                    rules={{
                                        required: getValues()[EFormField.DESCRIPTION] || requiredErrorMessage,
                                    }}
                                    defaultValue={''}
                                    as={<Input />}
                                />
                                {Boolean(errors[EFormField.DESCRIPTION]) &&
                                <FormFieldError message={errors[EFormField.DESCRIPTION].message} />}
                            </InputContainer>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <InputContainer>
                                <Label text={'What will be extra?'} />
                                <Controller
                                    name={EFormField.EXTRAS}
                                    control={control}
                                    rules={{
                                        required: getValues()[EFormField.EXTRAS] || requiredErrorMessage,
                                    }}
                                    defaultValue={''}
                                    as={<Input />}
                                />
                                {Boolean(errors[EFormField.EXTRAS]) &&
                                <FormFieldError message={errors[EFormField.EXTRAS].message} />}
                            </InputContainer>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
};

Layout.displayName = 'Layout';

export default Layout;
