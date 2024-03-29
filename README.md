# CS 260 Start Up Application Project

## Lessons Learned
- I learned more about how to resolve merge conflicts. Usually, I do everything through the CLI, which can be a pain, but using the GitLens extension on VSCode made it quite easy to resolve without completely overwriting one of the commits. 
- I learned more about how to use SVGs in the Simon HTML assignment. Here are some of the optionsand what they do: M move <to x,y> Q quadratic curve <control point x,y> <to x,y>
- I learned how powerful using a framework like Bootstrap really is. I could not have done so much without its help.
- I learned that you have so much power over what you are doing, but that means you must be super careful otherwise you code things with little security.
- I learned that CSS is the game changer. It can alter EVERYTHING about the web page (aside from the structure).

## Start up Pitch
- I will create an interactive blog website to track my journey with Information Technology (IT). It will provide funny misconceptions I had, common problems when first starting, personal goals for my career, and commentary on the current state of all things cyber. The blog will be a place where any beginner in IT can go to feel comfortable and understood. It will be well designed and maintained by me as an example of how far I have come. If users wish to comment on the blog posts, they must create an account. There will be some fun small features like using dad joke/funny quote APIs to pre-fill the comment section among other ideas.  

## Key Features
- Secure login over HTTPS
- OAuth 2.0 with Facebook and Google
- Ability to comment on blog posts when logged in
- Several web pages including about the author, featured posts, all posts, etc.
- Search bar for easy navigation
- Comments and posts are stored in database for persistant storage
- Admin can create, update, and delete blog posts and comments on the posts
- Likes on posts and comments to be displayed in real time on the blog

## First Draft Design
Here is the home page.
![Home Page](/images/home_page.png)  

Here is the about me page.
![About Me Page](/images/aboutMe_page.png)  

Here is the page with all the blog posts.
![Blog Posts Page](/images/blogPosts_page.png)  

Here is one blog post.
![One Blog Post Page](/images/oneBlogPost_page.png)  

Here is the end of a blog post showing the related posts section.
![One Blog Post Continued Page](/images/oneBlogPost_page_continued.png)  

Here is the end of a blog post showing off the comment section.
![One Blog Post with Comments Page](/images/oneBlogPost_page_comments.png)  

Here is the login page using OAuth and an option for local account creation.
![Login Page](/images/login_page.png)  

## Connecting to WebServer
There are several ways to connect to the webserver we created, I will inlcude the command to connect over SSH. 
- ```ssh -i cs260-webserver.pem ubuntu@password123.click```

## SSL/TLS Certs
I did not know you could have a service set up to automatically renew certs. This is something I currently do manually and need to find a way to implement this! The service being used to do this for our implementation is Caddy. It is hooked up to Let's Encrypt. Food for thought...

## JavaScript
JavaScript is amazing. It has so much power and usefulness. I learned that you can store data in local and session storages and use them for the application, but my favorite thing about JavaScript is its ability to interact with the DOM. It is something I will need to use in my startup application to dynamically load in blog posts from storage.
I really liked using it for my startup, but its functionality in my blog is minimal. I need to be able to dynamically pull things from a database, and local and session storage is not an actual database. I don't have too many buttons or anything else to add. I could add a lot of API's using JavaScript, but I decided to create a page where I can test what blog posts would look like before actually posting them, a staging area if you will.  

## Node.js and Express  
I learned that Node.js is super useful for allowing/creating backend web services. I learned how endpoints allow for different services to work and how HTTP can interact with these services. I learned that you can install many useful premade packages such as Express to do a lot of the heavy lifting while I tweak them into what I want them to be. It is nice to use tools that so many other people use and help improve. It is much better than having to recreate the wheel every time I want to add something to my web application.

## Databases
I find it interesting that there are so many different types of databases that offer specific advantages for specific data types and structures. In this portion of the class, I learned how important it is to understand how things connect. Understanding which services need to be reset in order for us to store sensitive information is really important for debugging, otherwise, nothing will work.

## Login
I learned that there was a whole lot more going on behind the scenes when it comes to creating users and allowing them access to a web application. I understand how endpoints work, but creating so many and ensuring they are secured, and using so many different services to assist us in doing so got really confusing. It made it seem that it is a miracle that anything stay secure!  

I also had a lot of problems working with Node.js on windows. It is really a pain trying to use WSL. I gave up on it trying to work and switched to Powershell. It would at least run the npm commands, but it still had lots of problems. I decided to switch to my Linux worksatation as I am more comfortable with it. However, I kept getting an error on it about my MongoDB URI. I researched and it mentioned special characters in the password section, but that wasn't my problem. After some debugging I realized that my environment variables were undefined. I didn't reboot my machine so my changes in my /etc/environment file had not taken place. After the reboot it worked as intended.

## WebSockets
I found it really interesting that there have been many attempts to get around the standard client-server architecture. I wonder if WebSockets are here to stay or if in the future we will find a whole other architecture. Using WebSockets for chat is really cool, I wonder what the other common uses for WebSockets are and how I could potentially add them into my application in the future. 

## React
I learned that react is super powerful and useful for real-world web applications. However, the most imporant thing I learned about this part of the project was being able to debug complex problems and how to work together to do so. Many students were struggling to deploy the code and there were many threads discussing potential solves. After helping others and looking at it our professor recognized the bug and provided a solution. Team work seems to be the most effect way to solve problems and it was a very meaningful thing during this part of the project. 

## Final Thoughts
This was super difficult. I ran into lots of bugs while trying to implement Node.js and Websockets. Learning how to debug a server is not the same as debugging code and it is a skill that I need to work on apparently.

## Sources
[W3 Schools](https://www.w3schools.com/bootstrap5/index.php)  
[BootStrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)  



