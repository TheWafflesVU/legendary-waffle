import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Confirmation() {
  let {email} = useParams();
  let {emailToken} = useParams();
  const [isValidToken, setIsValidToken] = useState(false);

  function verifyEmailToken(email, emailToken) {
    console.log('testing function')
    const usernameAndToken = {
      email: email,
      emailToken: emailToken,
    }
    axios.post("/api/user/verifyEmailToken", usernameAndToken)
      .then(response => {
        const responseStatus = response.data.status;
        if (responseStatus === 'okay') {
          setIsValidToken(true);
        }
      })
  }

  useEffect(() => {
    verifyEmailToken(email, emailToken);
  }, [])

  return (
    <div>
      {isValidToken ?
        <div>
          Email has been verified you can now sign in
          <Link to="/login">
            Login
          </Link>
          </div>
          :
          <div>
            Could not verify email or token is no longer valid
          </div>
        }
    </div>
  )
}

export default Confirmation