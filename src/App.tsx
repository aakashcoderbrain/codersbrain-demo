import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import SignUp from './components/email-registration/SignUp';
import Login from './components/email-login/Login';
import Question from './components/quix/Question';


function App() {
  return (
    <BrowserRouter>
		<Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/email_login" element={<Login/>} />
      <Route path="/Question" element={<Question/>} />

		</Routes>
	</BrowserRouter>
  );
}

export default App;
