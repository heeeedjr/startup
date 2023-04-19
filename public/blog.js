class Comment {
    constructor(name, comment, date, id, blogId) {
        this.name = name;
        this.comment = comment;
        this.date = date;
        this.id = id;
        this.blogId = blogId;
    }
    prettyDate() {
        let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
        let matches = regex.exec(this.date)

        let year = matches[1]
        let month = matches[2]
        let day = matches[3]

        return `${month}/${day}/${year}`
    }
}



async function loadBlog() {
    try {
        // Get blogs from service which gets it from database
        const id = window.location.search.split('=')[1];
        const response = await fetch('/api/blogs/' + id);
        const blogPost = await response.json();

        // Save blogs to local storage
        localStorage.setItem('blogPost', JSON.stringify(blogPost));
    } catch {
        // If we can't get blogs from service, get them from local storage
        const blogText = localStorage.getItem('blogPost');
        if (blogText) {
            blogPost = JSON.parse(blogText);
        }
    }

    displayBlog(blogPost);
}

function displayBlog(blogPost) {
    // Get element to display blog
    const theBlogPost = document.querySelector('#blogPost');

    if (blogPost) {
    // Update DOM with blog
        // Create elements to display blog
        const blogElement1 = document.createElement('div');
        
        // Create date element for blog
        const dateElement = document.createElement('p');
        dateElement.classList.add('text-muted');
        dateElement.innerText = "Date Created: " + blogPost.date;

        // Create another Div for rest of blog
        const blogElement2 = document.createElement('div');

        // Create div for image
        const imgDivElement = document.createElement('div');

        // Create image element for blog
        const imgElement = document.createElement('img');
        imgElement.classList.add('mx-auto');
        imgElement.classList.add('d-block');
        imgElement.style.maxWidth = '60%';
        imgElement.src = `webImages/${blogPost.image}`;

        // Create title element for blog
        const titleElement = document.createElement('h2');
        titleElement.classList.add('display-4');
        titleElement.innerText = blogPost.title;

        // Create text element for blog
        const textElement = document.createElement('div');
        textElement.style.whiteSpace = 'pre-wrap';
        textElement.innerText = blogPost.text;

        theBlogPost.appendChild(blogElement1);
        blogElement1.appendChild(dateElement);
        theBlogPost.appendChild(blogElement2);
        blogElement2.appendChild(imgDivElement);
        imgDivElement.appendChild(imgElement);
        blogElement2.appendChild(titleElement);
        blogElement2.appendChild(textElement);
    } else {
        theBlogPost.innerText = "No blog post found";
    }
}

loadBlog();



function getDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1 //January is 0!
    let yyyy = today.getFullYear()
    
    if (dd < 10) { dd = '0' + dd } 
    if (mm < 10) { mm = '0' + mm } 
    
    let theDate = yyyy + '-' + mm + '-' + dd
    return theDate;
}

window.addEventListener('load', getDate)