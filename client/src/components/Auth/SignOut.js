import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SignOut(props) {
  const history = useHistory();

  useEffect(() => {
    axios.delete('/api/signout').then(data => {
      props.onSignoutSuccess().then(() => {
        history.push('/signin');
      });
    });
  }, [props, history]);

  return (null);
}

export default SignOut;
