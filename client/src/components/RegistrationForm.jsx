import React, {useState} from 'react';
import "../styles/RegistrationForm.css"
import axios from "axios";

const RegistrationForm = ({redirectTo}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const buttonClicked = () => {
        redirectTo("login");
    }

    const pushData = () => {
        axios
            .post("http://localhost:5000/api/auth/register", {
                "name": name,
                "email": email,
                "password": password,
                "region": region,
                withCredentials: true
            })
            .then((response) => {

            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                setErrorMessage(error.toString());
            });
    }
    return (
        <div className="RegistrationForm">
            <div>
                <h4>NAME</h4>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <h4>EMAIL</h4>
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
                <h4>PASSWORD</h4>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div>
                <h4>REGION</h4>
                <input type="text" value={region} onChange={(event) => setRegion(event.target.value)} />
            </div>

            <div>
                <button onClick={pushData}>
                    SUBMIT
                </button>
            </div>
            <div>
                <button style={{background: "darkcyan", padding: "10px"}} onClick={buttonClicked}>
                    Already registered? Sign in!
                </button>

            </div>
            <div>
                <label style={{color: "red"}}>{errorMessage}</label>
            </div>
        </div>
    );
};

export default RegistrationForm;