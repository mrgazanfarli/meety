import FormFieldError from 'components/FormFieldError';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import { EEventPrivacy, EEventType, EOrganizationWay } from 'models/enums';
import moment from 'moment';
import * as React from 'react';
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
    EVENT_TYPE = 'eventType',
    EVENT_PRIVACY = 'eventPrivacy',
    EXTRAS = 'extras',
    ORGANIZATION_WAY = 'organizationWay'
}

interface IForm {
    name: string;
    description: string;
    location: string;
    eventType: EEventType;
    vendor: string;
    eventPrivacy: EEventPrivacy;
    organizationWay: EOrganizationWay;
    extras: string[];
}

const Layout: React.FC = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAddModalOpen, setAddModalVisibility] = React.useState<boolean>(false);

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
                        <Col xs={6}>
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
                        <Col xs={6}>
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
                        <Col xs={6}>
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
                        <Col xs={6}>
                            <InputContainer>
                                <Label text={'Vendor'} />
                                <Controller
                                    name={EFormField.VENDOR}
                                    control={control}
                                    defaultValue={undefined}
                                    rules={{
                                        required: getValues()[EFormField.VENDOR] || requiredErrorMessage
                                    }}
                                    render={({onChange, value}) => (
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
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
};

Layout.displayName = 'Layout';

export default Layout;
