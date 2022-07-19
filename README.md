# Nicolas Gabrenas 
```
// Note: to enjoy the application more use the full screen of the browser.
```
This is an application made with React.js. It's goal is to show all the Rick & Morty characters, their episodes and planets.
```
Used technology:
  > React ^18.2.0
  > GraphQL
  > Apollo Cliet
  > Redux 
  > React-Redux
  > @reduxjs/toolkit
  > Styled-Components
  > @tanstack/react-location
```

 The application manages two states. It breaks the redux pattern, with the store as the only source of truth, and takes advantage of Apollo Client's caching (InMemoryCache()). In this way, two states are handled within the application.

With redux, a query state is handled, where each component has its current query with its respective variables. And in the cache of Apollo Client the information that was previously requested is stored.

The goal of this implementation is to use GraphQL as the focus of development, so I made this decision to split the application state in two.
  
  
To run the application you need to have NPM and Node.js installed.
To use the application simply clone the repository to your local machine and run the `npm install` and `npm start` commands in that order.

Enjoy the application. 😃
