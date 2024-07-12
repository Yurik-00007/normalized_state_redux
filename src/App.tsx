import React from 'react';
import logo from './logo.svg';
import './App.css';
import {PostsPage} from "./features/pages/PostsPage";
import {Provider} from "react-redux";


type Props={
  store: any,
}

function App({store}: Props) {
  return (
    <Provider store={store}>
    <div className="App">
     <PostsPage/>
    </div>
    </Provider>
  );
}

export default App;
