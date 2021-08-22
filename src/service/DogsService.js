import axios from "axios";

class DogsService {
	fetchDog() {
		const url = "https://random.dog/woof.json";
		return axios.get(url)
			.then((response) => {
				return response.data.url;
			})
	}
}

export default new DogsService();
