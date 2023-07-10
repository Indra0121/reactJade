import React from 'react';
import Authentication from './authentication/user';

const MyComponent = () => {
  const email = 'example@example.com';
  const password = 'password';

  // Invoke the Authentication component with email and password props
  const authUser = Authentication({ email :"soso@gmail.com",password: "123456" });

  if (!authUser) {
    // User not found or authentication failed
    return <div>Authentication failed</div>;
  }

  // User found, display user information
  return (
    <div>
      <h1>Welcome, {authUser.name}</h1>
      <p>User ID: {authUser._id}</p>
    </div>
  );
};

export default MyComponent;
