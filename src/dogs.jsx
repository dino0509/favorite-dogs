import React from "react";
import DogsService from "./service/DogsService";

export default class Dogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
			favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
    };
		this.fetchDogSet = this.fetchDogSet.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentDidMount() {
		this.fetchDogSet();
  }

	fetchDogSet() {
		const promises = [];
		for (let i = 0; i < 6; i++) {
			promises.push(DogsService.fetchDog());
		}
		Promise.all(promises).then((values) => {
			this.setState({ dogs: values });
		})
	}

	handleCheckboxChange(e) {
		if (e.target.checked) {
			if(!this.state.favorites.includes(e.target.id)) {
				this.state.favorites.push(e.target.id);
			}
		} else {
			const index = this.state.favorites.indexOf(e.target.id);
			if (index > -1) {
			  this.state.favorites.splice(index, 1);
			}
		}
		localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
	}

	render() {
		let content = "";
		if (this.state.dogs.length === 6) {
			content = (
				<div>
					<table>
						<tbody>
							<tr>
								{this.state.dogs.map((dog) => {
									return (
										<td>
											<img src={dog} alt="Dog" width="400" height="400" /><br />
											<input type="checkbox" name="favorite" id={dog} onChange={this.handleCheckboxChange} /> Click to save as Favorite
										</td>
									)
								})}
							</tr>
						</tbody>
					</table>
					<br /><br />
					<a href = "/"><button type = 'submit' class = 'btn'>Reload Page</button></a>
					<a href = "/favorites"><button type = 'submit' class = 'btn'>View your favorites</button></a>
				</div>
			);
		} else {
			content = (
				<h1>
					Loading...
				</h1>
			);
		}
    return (<div className="display-box">
				{content}
			</div>);
  }
}
