import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../modules/firebase'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import GoogleButton from 'react-google-button';

interface Props {
  setPageID: (id:number) => void;
}

async function validateAuthToken(): Promise<boolean> {
    const token = Cookies.get('authToken');
    const resp = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);

    if(resp.ok) {
        const data = await resp.json();
        return data.verified_email;
    }

    return false;
}

export const SignIn = ({setPageID}: Props) => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateAuthToken().then((res) => {
      if(res)
        setPageID(1); //jump to group page immediately

      setLoading(false);
    })
  }, []);

  const signin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      Cookies.set('authToken', token!);
      Cookies.set('userName', user.displayName!);

      setPageID(1);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(`Error logging in ${errorCode}: ${errorMessage}`);
      console.log(`User: ${email} : ${credential}`);
    });
  }

  return (
    <div className="d-flex flex-column gap-2 pt-5">
      <h1 className="d-flex justify-content-center">Sign In</h1>

      {loading ? 
        <>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </> 
        : 
        <GoogleButton onClick={signin}/>
      }
    </div>
  )
}
