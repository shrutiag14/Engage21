import React from "react";
import { Notification } from "react-notification";
import { history } from "../routes/AppRouter";
import { auth } from "../firebase/firebase";
import SignUp from "./SignUp";
import "../styles/SignIn.css";

class SignIn extends React.Component {
	constructor() {
		super();

		this.state = {
			errorSnackbar: false,
			errorMessage: "",
		};

		this.signIn = this.signIn.bind(this);
	}

	signIn(event) {
		event.preventDefault();
		auth.signInWithEmailAndPassword(
			this.refs.email.value,
			this.refs.password.value
		)
			.then((user) => {
				if (user.user.emailVerified) {
					setTimeout(() => {
						history.push("/homepage");
					}, 500);
				} else {
					history.push("/verifyuser?email=" + user.user.email);
				}
			})
			.catch((error) => {
				this.setState(
					{
						errorSnackbar: true,
						errorMessage: error.message,
					},
					() => {
						setTimeout(() => {
							this.setState({
								errorSnackbar: false,
								errorMessage: "",
							});
						}, 3000);
					}
				);
			});
	}

	render() {
		return (
			<div className="container">
				<div id="sign-in-page">
					<div className="sign-in" onSubmit={this.signIn}>
						<Notification
							isActive={this.state.errorSnackbar}
							message={this.state.errorMessage}
							title="Error"
						/>
						<div className="form-container">
							<form className="sign-in-form">
								<h1>Sign In</h1>
								<div className="sp sepration"></div>
								<div className="form-container">
									<input
										type="email"
										className="form-input"
										ref="email"
										placeholder="Email"
										minlength="6"
										maxlength="200"
										autofocus
									/>
								</div>
								<div class="social-container">
									<input
										type="password"
										className="form-input"
										ref="password"
										placeholder="Password"
										minlength="6"
										maxlength="20"
									/>
									<i className="far fs-eye-slash"></i>
								</div>
                               <button class="btn-1">Sign In</button>
							   <div class=" sp sepration-1"></div>
							   <p>Don't have an account? <a href="SignUp">Sign Up</a></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;
