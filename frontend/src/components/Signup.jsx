import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const communitiesList = [
  'Maple Grove', 'Oak Hills', 'Pineview Estates', 'Cedar Ridge',
  'Willow Springs', 'Lakewood Park', 'Silver Meadow', 'Sunset Valley',
  'Elm Creek', 'Brookstone'
];

const Signup = () =>{
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    community: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['line1', 'line2', 'city', 'state', 'zip'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = formData;
    if (!fname || !lname || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { community, address } = formData;
    const { line1, city, state, zip } = address;
    if (!community || !line1 || !city || !state || !zip) {
      alert('Please fill in all required address fields.');
      return;
    }

    const payload = {
      firstName: formData.fname,
      lastName: formData.lname,
      email: formData.email,
      password: formData.password,
      community: formData.community,
      address: formData.address
    };

    console.log('Ready to send to backend:', payload);

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (data.status === 'ok') {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      alert('Error: ' + data.error);
    }
  };

  const handleSelectCommunity = (name) => {
    setFormData(prev => ({ ...prev, community: name }));
    setDropdownOpen(false);
    setSearch('');
  };

  const filteredCommunities = communitiesList.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="auth-container fade-in">
      <h2>Sign Up</h2>
      <form onSubmit={step === 1 ? handleContinue : handleSignup} className="auth-form signup-form">
        {step === 1 && (
          <>
            <div className="name-row">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <div
              className="dropdown-container custom-dropdown"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              <img src="/img/search.png" alt="Search Icon" className="search-icon" />
              <div className="selected-value">
                {formData.community || 'Select Community'}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <input
                    type="text"
                    className="dropdown-search"
                    placeholder="Search communities..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                  {filteredCommunities.map((community, idx) => (
                    <div
                      key={idx}
                      className="dropdown-item"
                      onClick={e => {
                        e.stopPropagation();
                        handleSelectCommunity(community);
                      }}
                    >
                      {community}
                    </div>
                  ))}
                  {filteredCommunities.length === 0 && (
                    <div className="dropdown-no-result">No results</div>
                  )}
                </div>
              )}
            </div>

            {formData.community && (
              <>
                <input
                  name="line1"
                  placeholder="Address Line 1"
                  value={formData.address.line1}
                  onChange={handleChange}
                />
                <input
                  name="line2"
                  placeholder="Address Line 2"
                  value={formData.address.line2}
                  onChange={handleChange}
                />
                <input
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                <input
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleChange}
                />
                <input
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.address.zip}
                  onChange={handleChange}
                />

                <button type="submit">Create Account</button>
              </>
            )}
          </>
        )}

        <p className="switch-link">
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;