async function loadBlogs() {
    let blogs = [];
    try {
        // Get blogs from service which gets it from database
        const response = await fetch('/api/blogs');
        blogs = await response.json();
        // Save blogs to local storage
        localStorage.setItem('blogs', JSON.stringify(blogs));
    } catch {
        // If we can't get blogs from service, get them from local storage
        const blogsText = localStorage.getItem('blogs');
        if (blogsText) {
            blogs = JSON.parse(blogsText);
        }
    }

    displayBlogs(blogs);
}

function displayBlogs(blogs) {
    // Get element to display blogs
    const blogList = document.querySelector('#blogs');

    if(blogs.length) {
        // Update DOM with blogs
        for (const [i, blog] of blogs.entries()) {
             // Create elements to display blog
            const blogElement = document.createElement('div');
            blogElement.classList.add('col');

            // Create card element
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.classList.add('h-100');

            // Create image element for card
            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = `webImages/${blog.image}`;
 
            // Create card body element for card
            const cardBodyElement = document.createElement('div');
            cardBodyElement.classList.add('card-body');

            // Create title element for card body
            const titleElement = document.createElement('h5');
            titleElement.classList.add('card-title');
            titleElement.innerText = blog.title;

            // Create text element for card body
            const textElement = document.createElement('p');
            textElement.classList.add('card-text');
            textElement.innerText = blog.text;

            // Create link element for card body
            const linkElement = document.createElement('a');
            linkElement.classList.add('btn');
            linkElement.classList.add('btn-dark');
            linkElement.href = `blog.html?id=${blog.id}`;
            linkElement.innerText = 'See Post';

            blogList.appendChild(blogElement);
            blogElement.appendChild(cardElement);
            cardElement.appendChild(imgElement);
            cardElement.appendChild(cardBodyElement);
            cardBodyElement.appendChild(titleElement);
            cardBodyElement.appendChild(textElement);
            cardBodyElement.appendChild(linkElement);
        }
    } else {
        blogList.innerHTML = 'No blogs to display';
    }
}

loadBlogs();