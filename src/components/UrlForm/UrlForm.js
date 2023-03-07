import React, { Component } from "react";
import { postRequest, getUrls } from "../../apiCalls";

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      urlToShorten: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      long_url: this.state.urlToShorten,
      title: this.state.title,
    };
    postRequest(post).then((response) => {
      getUrls().then((data) => this.props.addUrl(data.urls));
    });
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ title: "", urlToShorten: "" });
  };

  render() {
    return (
      <form>
        <input
          id="titleInput"
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />

        <input
          id="urlInput"
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />

        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
      </form>
    );
  }
}

export default UrlForm;
