import { useState } from 'react';
import Axios from 'axios';

const Contact = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [loginStatus, setLoginStatus] = useState('');

	const login = () => {
		Axios.post("http://localhost:3001/login", {
			username: username,
			password: password,
		}).then((response) => {
			if(response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus("Dobrodosao, " + response.data[0].username);
			}
		});		
	}

	return (
		<>
			<h1>Login</h1>
			<form method='post'>
				<h2>Ovde se mozete logovati</h2>
				<label for="username">Username: </label><br />
				<input type="text" placeholder="Unesite vas username" onChange={e => {
					setUsername(e.target.value);
				}} /><br />

				<label for="password">Sifra: </label><br />
				<input type="password" placeholder="Unesite vas password" onChange={e => {
					setPassword(e.target.value);
				}} />

				<input type="button" value="Prijavi se" id="dugme" onClick={login} />
			</form>
			<p>{loginStatus}</p>
		</>
	);
};

export default Contact;
