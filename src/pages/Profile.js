import React, { useState } from 'react';

const Profile = () => {

    const [searchString, setSearchString] = useState();

  return (
  <>
    <h2>Profile</h2>
    <input id="a" type="text" name="username" autoComplete='off'
                        placeholder="Your Username" />
  </>
  )
};

export default Profile;
