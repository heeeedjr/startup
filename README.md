# CS 260 Start Up Application Project

## Lessons Learned
- I learned more about how to resolve merge conflicts. Usually, I do everything through the CLI, which can be a pain, but using the GitLens extension on VSCode made it quite easy to resolve without completely overwriting one of the commits. 
- I learned more about how to use SVGs in the Simon HTML assignment. Here are some of the optionsand what they do: M move <to x,y> Q quadratic curve <control point x,y> <to x,y>

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
