import React from 'react';
import instruments from './instruments';

const SideBar = props => {
  const controlVolume = e => {
    const value = e.currentTarget.value;
    const targetId = e.currentTarget.name;
    const target = document.getElementById(targetId);
    //
    target.volume = value / 100;
    target.currentTime = 0;
    target.play();
  };

  var random = Math.floor(Math.random() * 10 + 1);

  return (
    <>
      <div className={props.setting ? 'showSideBar' : 'hidden'} id='sideBar'>
        <img
          alt='close sidebar'
          src={require('./imgs/arrow.png')}
          onClick={props.hideSideBar}
        />
        <img data-img='2' src={require('./imgs/speaker.png')} />

        {instruments.map((pad, index) => (
          <div key={index} className='volumeBlock'>
            <p>{pad.keyboard}</p>
            <input
              name={pad.title}
              onChange={controlVolume}
              type='range'
              max='100'
              defaultValue='90'
              className='progressBar'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
