import React, { useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { Logo } from '../../UI/Logo/Logo';
import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUserId } from '../../store/userSlice';

export const Login = ({ handlePopup }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem('userLogin', email)
    localStorage.setItem('userPassword', password)
    dispatch(setCurrentUser({
      userEmail: email,
      userPassword: password,
    }))
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserId(userInfo.user.uid))
      localStorage.setItem('userId', userInfo.user.uid)
      navigate('/profile');
    } catch (error) {
      console.error(error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <div className={style.popup_wrapper}>
      <div className={style.container} onClick={handlePopup}>
        <header>
          <Logo className={style.logo} />
        </header>

        <div className={style.inputs}>
          <div className={style.input}>
            <input type='email' placeholder='Логин' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={style.input}>
            <input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={style.buttonsContainer}>

          {/* <Button onClick={handleLogin} children={'Войти'} className={styleButton.button_blue} />
           <Button onClick={handleRegisterClick} children={'Зарегистрироваться'} className={styleButton.button_white} />         */}

          <Button onClick={handleLogin} children={'Войти'} className={'button_blue'} />
          <Button onClick={handleRegisterClick} children={'Зарегистрироваться'} className={'button_white'} />
          {/* <button className={style.registerButton} onClick={handleRegisterClick}>
            Зарегистрироваться
          </button> */}
        

        </div>
      </div>
    </div>
  );
};

//export default LoginSignup
