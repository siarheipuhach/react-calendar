import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';

import moment from 'moment';
import './EventForm.css';
import { Button } from 'react-bootstrap';

momentLocalizer(moment);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
        onChange={onChange}
        format='YYYY-MMM-DD HH:mm'
        time={showTime}
        value={!value ? null : new Date(value)}
    />;

const EventForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit} className="addEventForm">
            <div>
                <label>Event Name</label>
                <div>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Event Name"
                    />
                </div>
            </div>
            <div>
                <label>Start Date</label>
                <Field
                    name="startDate"
                    showTime={true}
                    component={renderDateTimePicker}
                />
            </div>
            <div>
                <label>End Date</label>
                <div>
                    <Field
                        showTime={true}
                        name="endDate"
                        component={renderDateTimePicker}
                    />
                </div>
            </div>

            <div>
                <Button bsStyle="success" type="submit" disabled={pristine || submitting}>
                    Submit
                </Button>
                <Button bsStyle="danger" type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </Button>
            </div>
        </form>
    )
};


// ...

const createReduxForm = reduxForm({ form: 'eventForm' });

const ContactForm = createReduxForm(EventForm);

export default ContactForm;
