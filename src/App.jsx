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
            daysInBoard: 1,
            currentDay: moment(),
            eventFormOpened: false,
            moveDay: 0
        };
    };

    changeMoveDay(value){
        if (this.state.daysInBoard === 1){
            let currentDay = this.state.currentDay.add(value, 'days');
            this.setState({currentDay})
        }else if(this.state.daysInBoard !== 1){
            this.setState({moveDay: this.state.moveDay + value})
        }
    }

    submit = values => {
        const { addNewEvent } = this.props;
        return addNewEvent(values);
    };

    render() {
        const { currentDay, daysInBoard, moveDay, eventFormOpened } = this.state;
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
                        style={eventFormOpened ? {display: 'none'} : {}}
                    >
                        Add event
                    </Button>
                    <Button
                        bsStyle="danger" style={eventFormOpened ? {} : {display: 'none'}}
                        onClick={()=>this.setState({eventFormOpened: false})}>
                        Close form
                    </Button>
                    <div style={eventFormOpened ? {} : {display: 'none'}}>
                        <EventForm onSubmit={this.submit}/>
                    </div>
                </div>
                <Button bsStyle="primary" onClick={()=> this.setState({daysInBoard: 7})}>Week</Button>
                <Button bsStyle="primary" onClick={()=> this.setState({daysInBoard: 1})}>Day</Button>
                <Button bsStyle="primary" onClick={()=> this.setState({daysInBoard: 4})}>4 days</Button>
                <div style={daysInBoard < 7  ? {} : {display: 'none'}}>
                    <Button bsStyle="primary" className="prevButton" onClick={()=>this.changeMoveDay(-1)}>Prev day</Button>
                    <Button bsStyle="primary" className="nextButton" onClick={()=>this.changeMoveDay(1)}>Next day</Button>
                </div>
                <div style={daysInBoard === 7 ? {} : {display: 'none'}}>
                    <Button bsStyle="primary" className="prevButton" onClick={()=>this.changeMoveDay(-7)}>Prev week</Button>
                    <Button bsStyle="primary" className="nextButton" onClick={()=>this.changeMoveDay(7)}>Next week</Button>
                </div>

              <CalendarBoard
                  daysInBoard={daysInBoard}
                  currentDay={currentDay.format("dd Do MMM YY")}
                  data={events}
                  moveDay={moveDay}
              />
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
};

export default connect(mapStateToProps, { addNewEvent })(App);

