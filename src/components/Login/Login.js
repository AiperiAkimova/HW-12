import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');//email почта жазылат
  const [emailIsValid, setEmailIsValid] = useState();//email туурабы жокпу текшеоет
  const [enteredPassword, setEnteredPassword] = useState('');//password жазылат
  const [passwordIsValid, setPasswordIsValid] = useState();// password тууралыгын текшерет
  const [formIsValid, setFormIsValid] = useState(false);// email менен password туура болсо форма туурабы текшерет

  useEffect(() =>{
    const timer = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6)
      console.log('changed');
    }, 3000); //ар бир жазган маалыматты канча жолу жазсак ошончо отчет ар бири учун жаныдан ачылып иштейт ар бирине оз озунчо убакыт ачылат


    //clean up function
    return () => {
      clearTimeout(timer) // ар бир жолу жазганда отчет кетет бирок кийинки жолку жазганда биринчи иштеп жаткан 3000 кайсы жерге жетсе да 
      //аны кайра 3000 кылып башынан баштатып койот мурункуну тазалап турат жана ар бирине оз озунчо убакыт ачпастан бироо менен эле иштетип койот 
    }
  
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => { //input ка жазылат жана event тен келген данныйды алып берет 
    setEnteredEmail(event.target.value); // ал event setEneteredEmail га барып сакталат 

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6 //бул жерде почтада @ болушу керек жана пароль 6 дан жогору болуш керек
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  }; 
// почта менен паролдун тууралыгын бул эки функция текшерип жатат жана бул эки функция onBlur фокус болгондо иштейт
//эгер пустой кылсак кызыл болуп калат эгер туура толтурсак border кызыл болбой калат
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };// submit кылганда props ичине келген onlogin ди чакырабыз loginHandler функциясын иштетбиз, 
  //submitHandler функциясынын ичинде чакырылган onLogin озуно параметрлерди алат(жазган email м-н password алат) 
  //жана ал App.js теги loginHandler функциясындагы email, password ко келет
  //эки параметрди состояниедан алабыз туура толтурулса гана иштейт, антпесе кнопко иштебейт

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}> 
            Login
          </Button> 
          {/* Эгерде форма туура толтурулса жарактуу болсо анда кнопканы басууга болот антпесе иштебейт */}
        </div>
      </form>
    </Card>
  );
};

export default Login;

//React Hooks - бул функционалдык компоненттерден Reactтын абалына жана жашоо циклине кошулууга мүмкүндүк берген функциялар. 
//Бул React'ти класстарсыз колдонууга мүмкүндүк берет. Эң негизгиси, хуктар өз каалоосу боюнча иштетилет жана учурдагы код менен иштейт.


/*useState: абалдын маанисин жана аны түзөтүү функциясын кайтарат. Бул хук класстын компоненттеринде табылган this.state жана this.setState ге барабар.
useEffect: Функционалдык компоненттерден терс таасирлерди аткарат. Рендер болгондон кийин дагы бир терс эффект ишке ашырылат, бул React'те чектелген итеративдик жүрүм-турумга мүмкүндүк берет.*/

//useEffect - функционалдык компоненттин ичиндеги программанын абалына тиешелүү шарттуу өзгөртүүлөрдү түзүүгө мүмкүндүк берет.
// ал функционалдык компоненттерде терс таасирлерди аткарат
// UseEffect React DOMди жаңырткандан кийин кошумча кодду иштетүүгө мүмкүндүк берет.
// useEffect(() => {
//   // какой-то код
//     }, [someProp, someState]);

//Биринчи аргумент -  кайра чалуу функциясы болуп саналат, ар бир перезагрузкада чакырылат.

//Экинчи аргумент көз карандылыктардын кошумча массивдери болуп саналат, ал хукка максаттуу абалда өзгөрүү болгондо гана кайра чалууну аткарууну айтат. 

/////////////////////////////////////////////////////////////////////
//Элемент фокусту жоготкондо onBlur событиясы иштейт. Бул адатта учурдагы документтин башка элементин басканда болот
//Onblur окуясы onfocus окуясына карама-каршы келет.