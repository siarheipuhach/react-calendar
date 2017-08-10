import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import EventForm from './EventForm/EventForm'
import logo from './logo.svg';
import './App.css';
import CalendarBoard from './CalendarBoard/CalendarBoard';
import { Button } from 'react-bootstrap';
import { addNewEvent } from './actions/events'


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: 'day',
            daysInBoard: 1,
            currentDay: moment(),
            week: 0,
            eventFormOpened: false,
            moveDay: 0
        };
    };

    nextDay(){
        if (this.state.type === 'day'){
            let currentDay = this.state.currentDay.add(1, 'days');
            this.setState({currentDay})
        }else if(this.state.type === '4days'){
            this.setState({moveDay: this.state.moveDay + 1})
        }

    }

    prevDay(){
        if (this.state.type === 'day'){
            let currentDay = this.state.currentDay.subtract(1, 'days');
            this.setState({currentDay});
        }else if(this.state.type === '4days'){
            this.setState({moveDay: this.state.moveDay - 1})
        }

    }
    nextWeek(){
        this.setState({week: this.state.week + 7})
    }

    prevWeek(){
        this.setState({week: this.state.week - 7})

    }
    submit = values => {
        console.log({values});
        const { addNewEvent } = this.props;

        // values['startDate'] = moment(values['startDate']).utc().format('YYYY-MM-DDTHH:mm:00.000Z');
        // values['endDate'] = moment(values['endDate']).utc().format('YYYY-MM-DDTHH:mm:00.000Z');
        return addNewEvent(values);
    };

    render() {
        const { type, currentDay, daysInBoard, week, moveDay } = this.state;
        const { events } = this.props;

        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>React Calendar</h2>
            </div>
            <div className="App-intro">
                <p>This is React Calendar</p>
                <div className="eventForm">
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={()=>this.setState({eventFormOpened: true})}
                        style={this.state.eventFormOpened ? {display: 'none'} : {}}
                    >
                        Add event
                    </Button>
                    <Button bsStyle="primary" style={this.state.eventFormOpened ? {} : {display: 'none'}} onClick={()=>this.setState({eventFormOpened: false})}>Close form</Button>
                    <div style={this.state.eventFormOpened ? {} : {display: 'none'}}>
                        <EventForm onSubmit={this.submit}/>
                    </div>
                </div>
                <Button bsStyle="primary" onClick={()=> this.setState({type:'week', daysInBoard: 7})}>Week</Button>
                <Button bsStyle="primary" onClick={()=> this.setState({type:'day', daysInBoard: 1})}>Day</Button>
                <Button bsStyle="primary" onClick={()=> this.setState({type:'4days', daysInBoard: 4})}>4 days</Button>
                <div style={type === 'day' || type === '4days' ? {} : {display: 'none'}}>
                    <Button bsStyle="primary" className="prevButton" onClick={()=>this.prevDay()}>Prev day</Button>
                    <Button bsStyle="primary" className="nextButton" onClick={()=>this.nextDay()}>Next day</Button>
                </div>
                <div style={type === 'week' ? {} : {display: 'none'}}>
                    <Button bsStyle="primary" className="prevButton" onClick={()=>this.prevWeek()}>Prev week</Button>
                    <Button bsStyle="primary" className="nextButton" onClick={()=>this.nextWeek()}>Next week</Button>
                </div>

              <CalendarBoard
                  type={type}
                  daysInBoard={daysInBoard}
                  currentDay={currentDay.format("dd Do MMM YY")}
                  data={events}
                  week={week}
                  moveDay={moveDay}
              />
            </div>
          </div>
        );
    }
}

// const mapStateToProps = (state, ownProps) => ({
//     events: state.events
// });


const mapStateToProps = (state, ownProps) => {
    return {
        events: state.events
    }
};


export default connect(mapStateToProps, { addNewEvent })(App);

