class Comment {
    constructor(name, text, blogId) {
        this.name = name;
        this.comment = text;
        this.date = getDate();
        this.blogId = blogId;
    }
}

class BlogPost {
    constructor(date, image, title, text, id, preview) {
        this.date = date;
        this.image = image;
        this.title = title;
        this.text = text;
        this.id = id;
        this.preview = preview;
    }
}


async function loadBlog() {
    let blogPost;
    try {
        // Get blogs from service which gets it from database
        const id = window.location.search.split('=')[1];
        const response = await fetch(`/api/blogs/${id}`);
        blogPost = await response.json();

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

async function loadComments() {
    let comments = [];
    try {
        // Get blogs from service which gets it from database
        const id = window.location.search.split('=')[1];
        const response = await fetch(`/api/blogs/${id}/comments`);
        comments = await response.json();

        // Save blogs to local storage
        localStorage.setItem('comments', JSON.stringify(comments));
    } catch {
        // If we can't get blogs from service, get them from local storage
        const commentSection = localStorage.getItem('comments');
        if (commentSection) {
            comments = JSON.parse(commentSection);
        }
    }
    displayComments(comments);
}

function displayComments(comments) {
    // Get element to display comments
    const theCommentSection = document.querySelector('#comments');

    if (comments.length) {
        for (const [i, comment] of comments.entries()) {
            // Update DOM with comments
            // Create elements to display comments
            const commentElement = document.createElement('div');
            commentElement.classList.add('card');
            commentElement.style.width = '60%';

            // Create card body element for comment
            const commentCardBody = document.createElement('div');
            commentCardBody.classList.add('card-body');

            // Create card title element for comment
            const commentCardTitle = document.createElement('h5');
            commentCardTitle.classList.add('card-title');
            commentCardTitle.innerText = comment.name;

            // Create card text element for comment
            const commentCardText = document.createElement('p');
            commentCardText.classList.add('card-text');
            commentCardText.innerText = comment.text;

            // Create card footer element for comment
            const commentCardFooter = document.createElement('small');
            commentCardFooter.classList.add('text-muted');
            commentCardFooter.innerText = comment.date;

            theCommentSection.appendChild(commentElement);
            commentElement.appendChild(commentCardBody);
            commentCardBody.appendChild(commentCardTitle);
            commentCardBody.appendChild(commentCardText);
            commentCardBody.appendChild(commentCardFooter);            
        }
    } else {
        const noComments = document.createElement('p');
        noComments.innerText = "Be the first to comment!";
        theCommentSection.appendChild(noComments);
     }
}

loadComments();



async function createComment(event) {
    event.preventDefault();
    
    let formEntry = new FormData(event.currentTarget);

    let cleanTitle = formEntry.get('commentName');
    cleanTitle = DOMPurify.sanitize(cleanTitle);

    let cleanText= formEntry.get('commentText');
    cleanText = DOMPurify.sanitize(cleanText);


    const newComment = { blogId: window.location.search.split('=')[1], name: cleanTitle, text: cleanText, date: getDate() };
    try {
        const response = await fetch('/api/blogs/:id/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });
        const result = await response.json();
        console.log(result);
    } catch {
        console.log('error creating comment');
    }
}




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