import React, { Component } from 'react';
import instruments from './components/instruments';
import SideBar from './components/sidebar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPad: 'Drum Machine',
      setting: false,
    };
  }

  componentDidMount() {
    //add a listener to the DOM to detect any keydown
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
  }

  keyDown = event => {
    instruments.forEach(key => {
      //looping through the 'instrumests' object, if the clicked key on the keyboard matches the current val, then click it on the DOM
      if (event.keyCode === key.keycode) {
        this[key.id].className = 'drum-pad keyDown';
        this[key.id].click();
        //close the sidebar by clicking on esc
      } else if (event.keyCode === 27) {
        this.setState({
          ...this.state,
          setting: false,
        });
      }
    });
  };

  keyUp = event => {
    //remove the visual click effect off the clicked pad once the press is finsihed
    instruments.forEach(key => {
      if (event.keyCode === key.keycode) {
        this[key.id].className = 'drum-pad';
      }
    });
  };

  playSound = e => {
    //play the sound and display it on the display container

    const title = e.currentTarget.name;
    const audio = document.getElementById(title);
    //Exception
    const openHitHat = document.getElementById('Open Hit Hat');
    const hitHat = document.getElementById('Hit Hat');

    // If "hit hat" is click while the "open hit hat" is on, pause the later to make it sound as it closed it.
    if (title === 'Hit Hat') {
      openHitHat.pause();
      hitHat.currentTime = 0;
      hitHat.play();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
    //display the clicked pad
    this.setState({
      ...this.state,
      clickedPad: title,
    });
  };

  showSideBar = () => {
    //show the sidebar
    this.setState({
      ...this.state,
      setting: true,
    });
  };
  hideSideBar = () => {
    //hide the side bar
    this.setState({
      ...this.state,
      setting: false,
    });
  };

  componentWillUnmount() {
    // unmounting event listeners
    document.removeEventListener('keydown', this.keyDown, false);
    document.removeEventListener('keyup', this.keyUp, false);
  }
  render() {
    //deconstructing
    const { setting, clickedPad } = this.state;
    return (
      <div style={{ height: window.innerHeight }} id='all'>
        <img
          id='settingIcon'
          alt='clickable setting icon'
          src={require('./components/imgs/settings.png')}
          onClick={this.showSideBar}
        />
        <SideBar
          playSound={this.playSound}
          setting={setting}
          hideSideBar={this.hideSideBar}
        />

        <div id='drum-machine'>
          <div id='display'>
            <div className='innerDisplay'>
              <div className='topLeft pins'></div>
              <div className='bottomLeft pins'></div>
              <div className='topRight pins'></div>
              <div className='bottomRight pins'></div>
              <h2>{clickedPad}</h2>
            </div>
          </div>
          {/* looping through the "Instruments" array and display each object on a pad */}
          {instruments.map(pad => (
            <button
              key={pad.id}
              className='drum-pad'
              id={pad.id}
              name={pad.title}
              ref={val => (this[pad.id] = val)}
              onClick={this.playSound}
            >
              <p id='keyboardText'>{pad.keyboard}</p>
              <img alt={pad.title + ' icon'} src={pad.img} />
              <audio id={pad.title} src={pad.audio}></audio>
            </button>
          ))}
        </div>
        <footer>
          <img
            draggable='false'
            src={require('./components/imgs/footer.png')}
          />
        </footer>
      </div>
    );
  }
}
