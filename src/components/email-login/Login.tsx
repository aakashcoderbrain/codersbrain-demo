import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate a successful login
    setIsLoggedIn(true);
  };

  const closePopup = () => {
    setIsLoggedIn(false); // Close the popup
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>

      {isLoggedIn && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>Login Successful!</h3>
            <p style={styles.popupMessage}>Welcome back!</p>
            <button onClick={closePopup} style={styles.popupButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  form: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center' as 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block' as 'block',
    marginBottom: '0.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none' as 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer' as 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  popupOverlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  popup: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
  },
  popupTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  popupMessage: {
    marginBottom: '1rem',
    color: '#666',
  },
  popupButton: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none' as 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer' as 'pointer',
  },
};

export default Login;
