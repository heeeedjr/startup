async function createPost(event) {
    let formEntry = new FormData(event.currentTarget);

    let cleanTitle = formEntry.get('blogTitle');
    cleanTitle = DOMPurify.sanitize(cleanTitle);

    let cleanText= formEntry.get('blogPost');
    cleanText = DOMPurify.sanitize(cleanText);

    let cleanPreview = formEntry.get('blogPreview');
    cleanPreview = DOMPurify.sanitize(cleanPreview);


    const newPost = { date: getDate(), image: 'router.jpg', title: cleanTitle, text: cleanText, id: Date.now(), preview: cleanPreview };
    try {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        const result = await response.json();
        console.log(result);
    } catch {
        console.log('error creating post');
        updateStorage(newPost);
    }

}


async function deletePost(id) {
    try {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
    } catch {
        console.log('error deleting post');
    }
}

async function updatePost(date, image, title, text, id) {
    const newPost = { date: date, image: image, title: title, text: text, id: id };

    try {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        const result = await response.json();
        console.log(result);
    } catch {
        console.log('error updating post');
        updateStorage(newPost);
    }

}

function updateStorage(myPost) {
    const result = JSON.parse(localStorage.getItem('database')) || [];
    posts = result.map(postData => new Post(postData))
    posts.push(myPost);
    localStorage.setItem('database', JSON.stringify(posts));
}

function storeFormData() {
    let blogTitle = document.getElementById('blogTitle').value;
    localStorage.setItem('blogTitle', DOMPurify.sanitize(blogTitle));
    let blogPost = document.getElementById('blogPost').value;
    localStorage.setItem('blogPost', DOMPurify.sanitize(blogPost));
}

function reloadFormData() {
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

function clearFormData() {
    localStorage.removeItem('blogTitle');
    localStorage.removeItem('blogPost');
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogPost').value = '';
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

 


// Functionality for peer communication using WebSocket
 async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'user', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'user', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
      }
    };
  }

  function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }





  // Old Code
// function readPostsToCards(myArray) {
//     document.getElementById('testCards').innerHTML = "";

//     let htmlString = `
//     <h2 class="display-3 m-4 p-4" style="text-align: center;" id="BlogCards">Blog Posts</h2>
//     <div class="row row-cols-1 row-cols-md-3 g-4">
//     `;
//     let tempString;

//     for (const i in myArray)
//     {
//         tempString = myArray.at(i).toCard();
//         htmlString = htmlString + tempString;
//     }
//     document.getElementById('testCards').innerHTML = htmlString;
// }

// function readPosts(myArray) {
//     document.getElementById('testPosts').innerHTML = "";

//     let htmlString = "";
//     let tempString;

//     for (const i in myArray)
//     {
//         tempString = myArray.at(i).toPost();
//         htmlString = htmlString + tempString;
//     }
//     document.getElementById('testPosts').innerHTML = htmlString;
// }
// function readStorage() {
//     let result = JSON.parse(localStorage.getItem('database')) || [];
//     return posts = result.map(postData => new Post(postData));
// }
