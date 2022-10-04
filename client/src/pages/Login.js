import { useRef } from 'react';

const Contact = () => {

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<h2>Ovde se mozete logovati</h2>
				<label for="username">Username: </label><br />
				<input type="text" placeholder="Unesite vas username" ref={usernameRef} /><br />

				<label for="password">Sifra: </label><br />
				<input type="password" placeholder="Unesite vas password" ref={passwordRef} />

				<input type="submit" value="Prijavi se" id="dugme" />
			</form>
		</>
	);
};

export default Contact;
