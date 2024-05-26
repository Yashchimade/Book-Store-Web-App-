import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(fname, email, phonenumber, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name</label>
      <input
        type="text"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
        placeholder="Enter your name"
      />

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />

      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhonenumber(e.target.value)}
        value={phonenumber}
        placeholder="Enter a 10-digit mobile number"
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter a password"
      />

      <br />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;