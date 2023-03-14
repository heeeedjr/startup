class Post
{
    constructor({date, image, title, text, id})
    {
        this.date = date;
        this.image = image;
        this.title = title;
        this.text = text;
        this.id = id;
    }

    toCard()
    {
        return `
        <div class="col"
            <div class="card h-100" id="${this.id}">
                <img src="webImages/${this.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.text}</p>
                    <button type="button" class="btn btn-danger" onclick="deletePost(${this.id})">Delete Card</button>
                </div>
            </div> 
        </div>
        `
    }

    toPost()
    {
        return `
        <div class="container" id="${this.id}">
            <div><p class="text-muted">Date Created: ${this.prettyDate()}</p></div>
            <div>
                <div>
                    <img src="webImages/${this.image}" class="mx-auto d-block" alt="..." style="max-width: 60%;">
                </div>
                <h2 class="display-4">${this.title}</h2>
                <p>${this.text}</p>    
                <button type="button" class="btn btn-danger" onclick="deletePost(${this.id})">Delete Card</button>               
            </div>
        </div>
        `
    }

    prettyDate() 
    {
        let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
        let matches = regex.exec(this.date)

        let year = matches[1]
        let month = matches[2]
        let day = matches[3]

        return `${month}/${day}/${year}`
    }
}


let posts = [];

function updateStorage(myArray)
{
    localStorage.setItem('database', JSON.stringify(myArray));
    readStorage();
}

function readStorage()
{
    let result = JSON.parse(localStorage.getItem('database')) || [];
    posts = result.map(postData => new Post(postData));
    readPosts(posts);
}

function createPost(event)
{
    event.preventDefault();

    let formEntry = new FormData(event.currentTarget);

    let cleanTitle = formEntry.get('blogTitle');
    cleanTitle = DOMPurify.sanitize(cleanTitle);

    let cleanText= formEntry.get('blogPost');
    cleanText = DOMPurify.sanitize(cleanText);

    let newPost = new Post({
        date: getDate(),
        image: 'router.jpg',
        title: cleanTitle,
        text: cleanText,
        id: Date.now()
    });

    posts.push(newPost);
    updateStorage(posts);
}

function readPostsToCards(myArray)
{
    document.getElementById('testCards').innerHTML = "";

    let htmlString = `
    <h2 class="display-3 m-4 p-4" style="text-align: center;" id="BlogCards">Blog Posts</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
    `;
    let tempString;

    for (const i in myArray)
    {
        tempString = myArray.at(i).toCard();
        htmlString = htmlString + tempString;
    }
    document.getElementById('testCards').innerHTML = htmlString;
}

function readPosts(myArray)
{
    document.getElementById('testPosts').innerHTML = "";

    let htmlString = "";
    let tempString;

    for (const i in myArray)
    {
        tempString = myArray.at(i).toPost();
        htmlString = htmlString + tempString;
    }
    document.getElementById('testPosts').innerHTML = htmlString;
}

function deletePost(id)
{
    for (const i in posts)
    {
        if (posts[i].id == id)
        {
            posts.splice(i, 1);
        }
    }
    updateStorage(posts);
}


function storeFormData()
{
    let blogTitle = document.getElementById('blogTitle').value;
    localStorage.setItem('blogTitle', DOMPurify.sanitize(blogTitle));
    let blogPost = document.getElementById('blogPost').value;
    localStorage.setItem('blogPost', DOMPurify.sanitize(blogPost));
}

function reloadFormData()
{
    let blogTitle = localStorage.getItem('blogTitle')
    if (blogTitle !== null)
    {
        document.getElementById('blogTitle').value = blogTitle
    }
    let blogPost = localStorage.getItem('blogPost');
    if (blogPost !== null)
    {
        document.getElementById('blogPost').value = blogPost;
    }
}
window.addEventListener('load', reloadFormData)

function clearFormData()
{
    localStorage.removeItem('blogTitle');
    localStorage.removeItem('blogPost');
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogPost').value = '';
}

function getDate()
{
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