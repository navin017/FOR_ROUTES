import React, { useState } from 'react'
import './app.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Login = ({ handleLogin }) => {
    const [inputEmail, setInputEmail] = useState('')
    const [enterEmail, setEnterEmail] = useState(true)
    const [inputPassword, setInputPassword] = useState('')
    const [enterPassword, setEnterPassword] = useState(true)
    const [redirectToUser, setRedirectToUser] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const isValidEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const navigate = useNavigate();

    const mailChangeHandler = (e) => {
        setInputEmail(e.target.value)
        if (e.target?.value && e.target.value.match(!isValidEmail)) {
            setValidEmail(false)
        } console.log(inputEmail, "........")
    }
    const passwordChangeHandler = (e) => {
        setInputPassword(e.target.value)
    }

    const LoginFormHandler = (e) => {
        e.preventDefault();

        if (inputEmail.length == 0) {
            setEnterEmail(false)
            return;

        }

        if (inputPassword.length == 0) {
            setEnterPassword(false)
            return;
        }
        // else if(inputEmail !== isValidEmail){
        // setEnterEmail(false);
        // return;     
        // }
        setInputEmail('')
        setInputPassword('')
        setEnterEmail(true)
        setEnterPassword(true)
        handleLogin();
        navigate('/user');
    }
    if (redirectToUser) {
        return <Navigate to="/user" replace />;
    }

    return (
        <div>
            <header className="App-header" >
                <div className='logtopic'>
                    <h1 className='text'>LOGIN-PAGE</h1>
                </div>
            </header>
            <form className='LoginCover' onSubmit={LoginFormHandler}>
                <table className='logTable'>
                    <tr>
                        <td><label for='email'>USER MAIL ID</label>
                            <br></br>
                            <input
                                type='email'
                                className='email' name='email'
                                onChange={mailChangeHandler}
                                value={inputEmail}>
                            </input>
                        </td>
                    </tr>
                    {!enterEmail && inputEmail.length <= 0 ? <p className='validity'>please enter something</p> : ''}
                    {/* {!validEmail && <p className='validity'>Enter a valid email</p>} */}
                    <br></br>
                    <tr>
                        <td><label for='password'>USER PASSWORD</label>
                            <br></br>
                            <input
                                maxLength={10}
                                type='password'
                                className='password' name='password'
                                onChange={passwordChangeHandler}
                                value={inputPassword}>
                            </input>
                        </td>
                    </tr>
                    {!enterPassword && inputPassword.length <= 0 ? <p className='validity'>please enter something</p> : ''}
                    <div>
                        {inputEmail.trim() !== '' && inputPassword.trim() !== '' ?
                            <Link to='/user' className='link' ><button className='login-btn' type='submit' onClick={handleLogin}>Login</button></Link>
                            :
                            <button className='login-btn' type='submit'>Login</button>
                        }
                    </div>
                </table>
            </form>
        </div>
    )
}
