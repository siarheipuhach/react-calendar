import { ADD_NEW_EVENT } from '../actions/events';

const initialState = [
    // Temporary
    {
        name: 'event 5',
        startDate: '2017-08-10T14:30:00.000Z',
        endDate: '2017-08-10T16:30:00.000Z'
    },
    {
        name: 'event 1',
        startDate: '2017-08-15T10:00:00.000Z',
        endDate: '2017-08-15T13:00:00.000Z'
    },
    {
        name: 'event 2',
        startDate: '2017-08-10T12:00:00.000Z',
        endDate: '2017-08-10T15:30:00.000Z'
    },
    {
        name: 'event 3',
        startDate: '2017-08-15T09:00:00.000Z',
        endDate: '2017-08-15T11:00:00.000Z'
    },
    {
        name: 'OOO for dentist',
        startDate: '2017-08-10T13:00:00.000Z',
        endDate: '2017-08-10T15:00:00.000Z'
    },
    {
        name: 'engineering interview test prep',
        startDate: '2017-08-10T08:00:00.000+00:00',
        endDate: '2017-08-10T12:00:00.000+00:00'
    },
    {
        name: 'event 3',
        startDate: '2017-08-08T09:00:00.000Z',
        endDate: '2017-08-08T11:00:00.000Z'
    },
    {
        name: 'OOO for dentist',
        startDate: '2017-08-08T13:00:00.000Z',
        endDate: '2017-08-08T15:00:00.000Z'
    },
    {
        name: 'engineering interview test prep',
        startDate: '2017-08-08T08:00:00.000Z',
        endDate: '2017-08-08T12:00:00.000Z'
    }
];

export default function (state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case ADD_NEW_EVENT:
            console.warn('ADD_NEW_EVENT', {payload});
            return [
                ...state,
                payload.event
            ];
        default:
            return state;
    }
}
