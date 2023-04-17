console.log("products.js: loaded");

const forms = document.querySelectorAll(".add-form");
const cartId = "643c5e9e7c350807cef915d7";

forms.forEach((form) => {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		productId = e.target.id;
		console.log(cartId, productId);
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
					//update cart total
					// document.querySelector(".cart-total").innerHTML = data.total;
				});
		} catch (error) {
			console.log(error);
		}
	});
});
