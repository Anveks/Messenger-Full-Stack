### Frontend Setup
- npm i axios
- npm i jwt-decode
- npm i moment
- npm i node-sass
- npm i react-hot-toast
- npm i react-icons
- npm i react-alert
- npm i react-alert-template-basic
- npm i react-redux
- npm i redux
- npm i redux-thunk
- npm i react-router-dom
- npm i socket.io-client

### Backend Setup
- npm i bcrypt
- npm i body-parser
- npm i concurrently
- npm i cookie-parser
- npm i dotenv
- npm i express
- npm i formidable
- npm i jsonwebtoken
- npm i mongoose
- npm i nodemon
- npm i validator


## About Proxy-Server:
Notes on 
 "proxy": "http://localhost:5000/"
in package.json file on the client:

The "proxy" field in the package.json file on the client side is used to specify a proxy server that will be used during development when making API requests.

When you run the client-side application, for example using npm start, the development server provided by create-react-app or another similar tool will serve your client-side code on a specific port (e.g., http://localhost:3000).

If you need to make API requests to a different server during development (e.g., an Express server running on http://localhost:5000), you may encounter cross-origin issues. To bypass these issues, you can specify a proxy server using the "proxy" field in the package.json file.

By setting "proxy": "http://localhost:5000/", any API requests made by the client-side code will be automatically proxied to the specified URL (http://localhost:5000/ in this case). This allows you to make requests to the server without running into cross-origin issues.

For example, if you make an API request to /api/posts in your client-side code, it will be proxied to http://localhost:5000/api/posts.

Note that the "proxy" setting is only applicable during development. In production, you would typically build the client-side code and serve it from the same server as your API.

## npm run build

npm run build is a command used in Node.js projects to create a production-ready build of the application. It is typically used in the context of building frontend applications, such as those created with React, Angular, or Vue.

When you run npm run build, it triggers the build script specified in the scripts section of your package.json file. This script is responsible for compiling, optimizing, and bundling your source code, resulting in a set of static files that can be served by a web server.

The exact build process and the output generated depend on the specific configuration and tooling used in your project. However, common actions performed during the build process include:

Transpiling and bundling JavaScript code: The build process may use a tool like Babel to transpile modern JavaScript syntax and features into a format supported by older browsers. It can also bundle multiple JavaScript files into a single file to reduce the number of HTTP requests.

Compiling CSS: If you're using a CSS preprocessor like Sass or Less, the build process may compile your CSS files into a single, optimized CSS file.

Optimizing assets: Images, fonts, and other static assets may be optimized during the build process to reduce their size and improve performance.

Creating an output directory: The build process typically creates a new directory (often called build or dist) that contains all the compiled and optimized files ready for deployment.

By running npm run build, you trigger this build process, and once it completes, you'll have a production-ready version of your application that you can deploy to a web server or a hosting platform.






