import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Cabinet from './components/Cabinet';
import './styles/App.css';

function App() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCabinet, setShowCabinet] = useState(false);

  const redirectTo = (to) => {
    if (to === 'login') {
      setShowRegistrationForm(false);
      setShowCabinet(false);
      setShowLoginForm(true);
    } else if (to === 'cabinet') {
      setShowRegistrationForm(false);
      setShowLoginForm(false);
      setShowCabinet(true);
    } else if (to === 'register'){
      setShowRegistrationForm(true);
      setShowLoginForm(false);
      setShowCabinet(false);
    }
  };

  return (
      <div className="App">
        {showRegistrationForm && <RegistrationForm redirectTo={redirectTo} />}
        {showLoginForm && <LoginForm redirectTo={redirectTo} />}
        {showCabinet && <Cabinet />}
      </div>
  );
}

export default App;
