import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isSent,setIsSent]=useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    console.log(email,password)
    if(isLogin){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQBEezsnarDoH5dss_mH1yt7Jn704b3wo',
      {
        method:'POST',
        body:JSON.stringify({
          email:email,
          password:password,
          returnSecureToken:true
        }),
        headers:{
          'Content-type' : 'application/json'
        }
      }
      ).then(res=>{
        if(res.ok){
          res.json().then((data)=>{
            console.log(data)
          })
        }else{
          res.json().then((data)=>{
            console.log(data)
          })
        }
      })
    }else{
      setIsSent(true)
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQBEezsnarDoH5dss_mH1yt7Jn704b3wo',
      {
        method:'POST',
        body:JSON.stringify({email:email,
        password:password,
        returnSecureToken:true
        }),
        headers:{
          'Content-Type' : 'application/json'
        }
      }
      ).then(res =>{
        if(res.ok){

        }else{
          res.json().then((data)=>{
            let errorMessage = "Authentication failed!"
            if(data && data.error && data.error.message){

               errorMessage = data.error.message;
            }
            alert(errorMessage)
          })
        }
      })
      setIsSent(false)
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          {isSent ? 'Sending Request...' : ''}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
