import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {auth} from '../firebase/firebase';
import Classroom from '../components/Classroom';
import SignIn from '../components/SignIn';
import VerifyUser from '../components/VerifyUser';
import SignUp from '../components/SignUp';
import HomePage from '../components/HomePage';
import SubjectHomePage from '../components/SubjectHomePage';
import Announcements from '../components/Announcements';
import OpenDiscussion from '../components/OpenDiscussion';
import Discussion from '../components/Discussion';
import StudyMaterials from '../components/StudyMaterials';
import Assm from '../components/Assm'
import AllSubjects from '../components/AllSubjects';

export const history = createHistory();

let dbUserKey;
auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('Logged In');
		const uid = auth.currentUser.uid;
		console.log(uid)
		dbUserKey=uid;

		
	}
	else
		console.log('Logged Out');
});


const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route exact path='/' component={Classroom} />
			<Route path='/signin' component={SignIn} />
			<Route path='/verifyuser' component={VerifyUser} />
			<Route path='/signup' component={SignUp} />
			<Route path='/homepage' render={(props) => <HomePage {...props} dbUserKey={dbUserKey} />} />
			<Route path='/allsubjects' render={(props) => <AllSubjects {...props} dbUserKey={dbUserKey} />} />
			<Route path='/subjecthomepage' render={(props) => <SubjectHomePage {...props} dbUserKey={dbUserKey} />} />
			<Route path='/announcements' render={(props) => <Announcements {...props} dbUserKey={dbUserKey} />} />
			<Route path='/opendiscussion' render={(props) => <OpenDiscussion {...props} dbUserKey={dbUserKey} /> } />
			<Route path='/discussion' render={(props) => <Discussion {...props} dbUserKey={dbUserKey} />} />
			<Route path='/studymaterials' render={(props) => <StudyMaterials {...props} dbUserKey={dbUserKey} /> } />
			<Route path='/assignment' render={(props) => <Assm {...props} dbUserKey={dbUserKey} /> } />
		</Switch>
	</Router>
);

export default AppRouter;
