const loadBtn = document.querySelector("#loadBtn");
const container = document.querySelector("#postContainer");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const response = await fetch(API_URL);

	// TODO: handle error
	if (!response.ok) { // give nothing if error
		return [];
	}

  const posts = await response.json();

  return posts;
}

async function loadPosts() {
	const posts = await fetchPosts();

	// for testing
	// console.table(posts);
	// postContainer.textContent = JSON.stringify(posts, null, 2);
}

loadBtn.addEventListener('click', loadPosts);
