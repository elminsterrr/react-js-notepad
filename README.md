# react-js-notepad
A notepad (client + server) created with: ReactJS, Redux, NodeJS and MongoDB.

This is a CRUD application working with notes. First a RESTful API server was created (using NodeJS and Express) to act as an interface for querying and persisting data in a MongoDB database. When creating or editing notes the user’s input is checked by Redux-Form for the right data. All requests and connection errors are handled by Redux-Thunk middleware.

You can see it live here: [Heroku](https://react-js-notepad.herokuapp.com/)


## Features

- Add note
- Edit note
- Delete note
- Use toolbar to format your input


## Getting Started

### Installation

Open a Terminal and run:

```sh
git clone https://github.com/elminsterrr/react-js-notepad.git
```

Go to cloned project's folder

```sh
cd react-js-notepad
cd front-end
```

and run:

```sh
npm install
```

### Usage

Start the app by typing:

```sh
npm start
```

### Browser

In your browser go to:

```sh
http://localhost:3000/
```

and start using the notepad. 
