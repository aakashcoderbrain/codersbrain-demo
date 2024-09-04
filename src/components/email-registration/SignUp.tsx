import React, { useState, useEffect } from 'react';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showOTPInput, setShowOTPInput] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);     
  };
// console.log
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    
    // Simulate a successful registration
    setIsRegistered(true);

    // Simulate sending OTP to user's email
    console.log('OTP sent to email:', email);
  };

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        setIsRegistered(false);
        setShowOTPInput(true);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

  const handleOtpSubmit = () => {
    // Simulate OTP verification
    const correctOtp = '123456'; // Replace this with the actual OTP logic
    if (otp === correctOtp) {
      setIsOtpVerified(true);
      setError('');
      console.log('OTP Verified!');
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  if (isOtpVerified) {
    return (
      <div style={styles.container}>
        <h3 style={styles.otpVerifiedTitle}>OTP Verified Successfully!</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {!showOTPInput ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Register</h2>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>
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
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
      ) : (
        <div style={styles.otpContainer}>
          <h3 style={styles.otpTitle}>Verify Your Email</h3>
          <p style={styles.otpMessage}>Please enter the OTP sent to your email.</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.otpInput}
            placeholder="Enter OTP"
          />
          <button onClick={handleOtpSubmit} style={styles.otpButton}>Verify OTP</button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      )}

      {isRegistered && !showOTPInput && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>Registration Successful!</h3>
            <p style={styles.popupMessage}>Welcome, {username}!</p>
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
  otpContainer: {
    marginTop: '2rem',
    textAlign: 'center' as 'center',
  },
  otpTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  otpMessage: {
    marginBottom: '1rem',
    color: '#666',
  },
  otpInput: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  otpButton: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none' as 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer' as 'pointer',
  },
  otpVerified: {
    marginTop: '2rem',
    textAlign: 'center' as 'center',
  },
  otpVerifiedTitle: {
    fontSize: '1.5rem',
    color: '#28a745',
  },
};

export default Registration;
