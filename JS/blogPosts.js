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
    const blogList = document.getElementById('blogList');

    if(blogs.length) {
        // Update DOM with blogs
        
    }
    
}