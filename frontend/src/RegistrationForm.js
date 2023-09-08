// frontend/src/RegistrationForm.js
import React, { useState } from 'react';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your backend API to register the user and store the address
    const userResponse = await fetch('http://localhost:7000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      const userId = userData.user._id;

      const addressResponse = await fetch('http://localhost:7000/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ street, city, state, postalCode, userId }),
      });

      if (addressResponse.ok) {
        // Address stored successfully
        // Retrieve the registered user's information and display it
        setRegisteredUser({ name, street, city, state, postalCode });
      } else {
        // Handle address storage error
        console.error('Error storing address');
      }
    } else {
      // Handle user registration error
      console.error('Error registering user');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display registered user information */}
      {registeredUser && (
        <div className="mt-4">
          <h3>Registered User Information</h3>
          <p><strong>Name:</strong> {registeredUser.name}</p>
          <p><strong>Street:</strong> {registeredUser.street}</p>
          <p><strong>City:</strong> {registeredUser.city}</p>
          <p><strong>State:</strong> {registeredUser.state}</p>
          <p><strong>Postal Code:</strong> {registeredUser.postalCode}</p>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
