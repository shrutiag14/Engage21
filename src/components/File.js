import React from 'react';
import { storage } from '../firebase/firebase';

import '../styles/File.css';


class File extends React.Component {

	constructor() {
		super();

		// this.view = this.view.bind(this);
	}

	

	render() {
		return (
			<div className="file">
				<div className="file-name">{this.props.fileName}</div>
				<button className="file-view-button" >View &#128065;</button>
			</div>
		);
	}
}

export default File;
