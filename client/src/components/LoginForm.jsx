import React, {useState} from 'react';
import "../styles/LoginForm.css"

const LoginForm = ({redirectTo}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const buttonClicked = () => {
        redirectTo("register");
    }

    return (
        <div>
            <div className="LoginForm">
                <div>
                    <h4>EMAIL</h4>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <h4>PASSWORD</h4>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div>
                    <button>
                        SUBMIT
                    </button>
                </div>
                <div>
                    <button style={{background: "darkcyan", padding: "10px"}} onClick={buttonClicked}>
                        Not Registered yet?
                    </button>

                </div>
            </div>
        </div>
    );
};

export default LoginForm;