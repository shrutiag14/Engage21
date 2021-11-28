import React from 'react';
import { Notification } from 'react-notification';
import { history } from '../routes/AppRouter';
import { auth, database, } from '../firebase/firebase';
import SignIn from './SignIn';
import '../styles/SignUp.css';

class SignUp extends React.Component {

	constructor() {
		super();

		this.state = {
			passwordMatchSnackbar: false,
			errorSnackbar: false,
			emailVerificationSnackbar: false,
			errorMessage: '',
			user: '',
			branch: '',
			userType: '',
			userEmail: '',
			userUID: ''
		};

		this.signUp = this.signUp.bind(this);
		this.setBranch = this.setBranch.bind(this);
		this.setUser = this.setUser.bind(this);
		//this.submitDetails = this.submitDetails.bind(this);
	}
	setBranch(branch) {
		this.setState({ branch });
	}

	setUser(user) {
		this.setState({ user });
	}

	signUp(event) {
		event.preventDefault();

		if (this.refs.password.value !== this.refs.confirmPassword.value) {
			this.setState({ passwordMatchSnackbar: true }, () => {
				setTimeout(() => {
					this.setState({ passwordMatchSnackbar: false });
				}, 2500);
			});
			return;
		}

		auth.createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then((user) => {
			if (this.state.user === 'Student') {
				database.collection('users').add({
					userEmail: user.user.email,
					userUID: user.user.uid,
					studentID: this.refs.studentID.value,
					branch: this.state.branch,
					userType: 'Student'

				})
			}
			if (this.state.user === 'Teacher') {
				database.collection('users').add({
					userEmail: user.user.email,
					userUID: user.user.uid,
					userType: 'Teacher'

				})
			}

			auth.currentUser.sendEmailVerification().then(() => {
				this.setState({ emailVerificationSnackbar: true }, () => {
					setTimeout(() => {
						this.setState({ emailVerificationSnackbar: false });
						history.push('/homepage');
					}, 1500);
				});
			});
		}).catch((error) => {
			this.setState({
				errorSnackbar: true,
				errorMessage: error.message
			}, () => {
				setTimeout(() => {
					this.setState({
						errorSnackbar: false,
						errorMessage: ''
					});
				}, 3000);
			});
		});
	}
	cancelSignUp() {
		const uid = auth.currentUser.uid;
		let key;

		database.collection('users').once('value', (users) => {
			users.forEach((user) => {
				if (user.val().userUID === uid)
					key = user.key;
			});
		}).then(() => {
			database.ref('users/' + key).remove().then(() => {
				auth.currentUser.delete();
				history.push('/');
			});
		});
	}

	renderStudent() {
		console.log(this.refs.studentID)
		console.log(this.refs.userName)
		return (
			<div>
				<div>ID</div>
				<input type="text" className="details-id" ref="studentID" required />
				<div>Branch</div>
				<label className="radio"><input type="radio" name="branch" value="Computer Science" onClick={() => this.setBranch('Computer Science')} /> Computer Science </label>
				<label className="radio-1"><input type="radio" name="branch" value="Information Technology" onClick={() => this.setBranch('Information Technology')} /> Information Technology </label>
			</div>
		);
	}
	render() {
		const student = this.state.user === 'Student' ? this.renderStudent() : <div></div>;

		return (
			<div id="sign-up-page">
				<div className="sign-up" onSubmit={this.signUp}>
					<Notification isActive={this.state.passwordMatchSnackbar} message="Password does not match" title="Error" />
					<Notification isActive={this.state.errorSnackbar} message={this.state.errorMessage} title="Error" />
					<Notification isActive={this.state.emailVerificationSnackbar} message="Email verification sent. Check your email." />
					<div className="container-1">
					<div className="form-container">
					<form className="sign-up-form">
					  <h1>Sign Up</h1>
					  <div className="form-container">
						<input type="text" className="form-input" ref="userName" placeholder="Name" required />
						<input type="text" className="form-input" ref="email" placeholder="Email" />
						<input type="password" className="form-input" ref="password" placeholder="Password" />
						<input type="password" className="form-input" ref="confirmPassword" placeholder="Confirm Password"/>
						</div>
					
						<div>You are a...</div>
						<div>
							<label className="radio"><input  type="radio" name="user" value="Teacher" onClick={() => this.setUser('Teacher')} /> Teacher </label>
							<label className="radio-1"><input   type="radio" name="user" value="Student" onClick={() => this.setUser('Student')} /> Student </label>
						</div>
						{student}
						<button class="btn-1">Sign Up</button>
						<p>Already have an account? <a href="./SignIn">Sign In</a></p>
						
					</form>
					</div>
				</div>
			</div>
			</div>
		);
	}
}

export default SignUp;
