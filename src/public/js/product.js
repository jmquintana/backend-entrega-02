const cartId = "643c5e9e7c350807cef915d7";
const form = document.querySelector(".add-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const productId = e.target.id;
	try {
		fetch(`/api/carts/${cartId}/product/${productId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	} catch (error) {
		console.log(error);
	}
});
