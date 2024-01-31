import React, { Component } from 'react';
import Grid from './Grid';
class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ posts: json }))
  }render() {
    return (
      <div>
        <Grid  />
      </div>
    );
  }
}
export default App;