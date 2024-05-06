import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const App = () => {
  const [password, setPassword] = useState('');
  const [rangeValue, setRangeValue] = useState(1);
  const [checkbox, setCheckbox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });

  const passwordRef = useRef(null);

  const generatePassword = (checkbox, rangeValue) => {
    let characters = '';
    if (checkbox.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (checkbox.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (checkbox.symbols) characters += '!@#$%^&*()<>,.?/[]{}-=_+|/';
    if (checkbox.numbers) characters += '0123456789';

    let password = '';
    for (let i = 0; i < rangeValue; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const pwd = generatePassword(checkbox, rangeValue);
    setPassword(pwd);
  };

  const handleCopyPassword = () => {
    passwordRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div>
      <h1 className="text-bg-secondary py-2 text-center">Random Password Generator</h1>
      <div className="text-center">
        <label className="fs-5">Range:</label>
        <input className="ms-3 mt-3"
          type="range"
          min="1"
          max="100"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <span className="ms-2">{rangeValue}</span>
      </div>
      <div className="text-center pt-2">
        <label>Uppercase:</label>
        <input className="mx-2"
          type="checkbox"
          checked={checkbox.uppercase}
          onChange={(e) => setCheckbox({...checkbox, uppercase: e.target.checked })}
        />
        <label>Lowercase:</label>
        <input className="mx-2"
          type="checkbox"
          checked={checkbox.lowercase}
          onChange={(e) => setCheckbox({...checkbox, lowercase: e.target.checked })}
        />
        <label>Symbols:</label>
        <input className="mx-2"
          type="checkbox"
          checked={checkbox.symbols}
          onChange={(e) => setCheckbox({...checkbox, symbols: e.target.checked })}
        />
        <label>Numbers:</label>
        <input className="mx-2"
          type="checkbox"
          checked={checkbox.numbers}
          onChange={(e) => setCheckbox({...checkbox, numbers: e.target.checked })}
        />
      </div>
      <div className="text-center my-4">
      <button className="text-center btn btn-danger "  onClick={handleGeneratePassword}>Generate Password</button>
      </div>
      
      <div className="input-group justify-content-center">
      <input className="rounded-start-3"
        type="text"
        value={password}
        ref={passwordRef}
        readOnly
      />
      <button className="btn btn-outline-success" onClick={handleCopyPassword}>Copy Password</button>
      </div>
    </div>
  );
};

export default App;