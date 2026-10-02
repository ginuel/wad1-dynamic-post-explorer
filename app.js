const loadBtn = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const postContainer = document.querySelector("#postContainer");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const response = await fetch(API_URL);

	if (!response.ok) { // give nothing if error
		throw new Error(`Failed to Fetch: ${response.status}: ${response.statusText}`);
	}

  const posts = await response.json();

  return posts;
}

function renderPosts(posts) {
  postContainer.innerHTML = ""; // remove content of unordered list including elements, not just text

  const selectedPosts = posts
		.sort(() => 0.5 - Math.random())
		.slice(0, 5); // get 5 random posts

  for (const post of selectedPosts) {
    const li = document.createElement("li"); 

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    li.appendChild(title);
    li.appendChild(body);
    postContainer.appendChild(li);
  }
}

async function loadPosts() {
	loadBtn.disabled = true;
	status.textContent = "Loading...";

	try {
		let posts = await fetchPosts();
		// posts = []; // test for empty result

		if (posts.length === 0) {
			throw new Error("No posts available!");
		}

		renderPosts(posts);
		status.textContent = "Posts loaded!";
	} catch (error) {
		status.textContent = `Error: ${error.message}`;
	} finally {
		loadBtn.disabled = false;
	}
}

loadBtn.addEventListener('click', loadPosts);
