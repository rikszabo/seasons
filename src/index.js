import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  //constructor(props) {
  //super(props);
  //This is the only time we do direct assignment to this.state
  //this.state = { lat: null, errorMessage: '' };
  //}

  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    console.log('My component was rendered to the screen');
    //Geolocation API
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        //we called set state
        this.setState({ lat: position.coords.latitude });

        //we did not
        //this.state.lat = position.coords.latitude;
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log('My component was just updated - it rerendered');
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    console.log('render run');
    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
