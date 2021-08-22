import React from 'react';

export default class ViewFavorites extends React.Component {
	constructor() {
    super();
    this.state = {
      favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
    };
		this.removeFromFavorite = this.removeFromFavorite.bind(this);
  }

	removeFromFavorite(e) {
		const favorites = this.state.favorites;
		const index = favorites.indexOf(e.target.id);
		if (index > -1) {
			favorites.splice(index, 1);
			this.setState({ favorites: favorites });
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	}

	render() {
		let content = "";
		if (this.state.favorites.length !== 0) {
			content = (
				<div>
					<table>
						{
							this.state.favorites.map((dog) => {
								return (
									<tr>
										<td>
											<img src={dog} alt="Dog" width="400" height="400" />
										</td>
										<td>
											<button id={dog} onClick={this.removeFromFavorite}> Remove from favorites </button>
										</td>
									</tr>
								)
							})
						}
					</table>
					<a href = "/"><button type = 'submit' class = 'btn'>More dogs</button></a>
				</div>
			)
		} else {
			content = (
				<h1>You have no favorites! Click <a href="/">here</a> to view some dogs now</h1>
			)
		}
		return (
			<div className="display-box">
				{content}
			</div>
		);
	}
}
