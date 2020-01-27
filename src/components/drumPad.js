import React from 'react';
import instruments from './instruments';

export default function Pad() {
  return (
    <div>
      {instruments.map(pad => (
        <button key={pad.id} className='drum-pad' id={pad.id} name={pad.title}>
          img
        </button>
      ))}
    </div>
  );
}
