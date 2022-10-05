import Axios from 'axios';
import React, { useState } from 'react';

const Register = () => {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPassword1Reg] = useState('');
    const [password2Reg, setPassword2Reg] = useState('');

    const [regStatus, setRegStatus] = useState('');

    const register = () => {

        if (passwordReg === password2Reg) {
            setRegStatus("Registracija odradjena!");
            Axios.post("http://localhost:3001/register", {
                usernameReg: usernameReg,
                passwordReg: passwordReg,
            }).then((response) => {
                if (response.data.message) {
                    setRegStatus(response.data.message);
                } else {
                    setRegStatus("Uspesno ste se registrovali, " + response.data[0].username);
                }
            });
        }
        else {
            setRegStatus("Lozinke se ne podudaraju");
        }
    }

    return (
        <>
            <h1>Registracija</h1>
            <form method='post'>
                <h2>Ovde se mozete registrovati</h2>
                <label for="username">Username: </label><br />
                <input type="text" placeholder="Unesite vas username" onChange={e => {
                    setUsernameReg(e.target.value);
                }} /><br />

                <label for="password">Sifra: </label><br />
                <input id='pas1' type="password" placeholder="Unesite vas password" onChange={e => {
                    setPassword1Reg(e.target.value);
                }} />

                <label for="password">Ponovire sifru: </label><br />
                <input id='pas2' type="password" placeholder="Ponovite sifru" onChange={e => {
                    setPassword2Reg(e.target.value);
                }} />

                <input type="button" value="Registruj se" id="dugme" onClick={register} />
            </form>
            <p>{regStatus}</p>
        </>
    );
}

export default Register;