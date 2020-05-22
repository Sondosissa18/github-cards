import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  align-self: start;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  padding: 0.25em 1em;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  flex-direction: column;
`;

class App extends Component {
  state = {
    user: {},
    active: false,
  };

  handleToggle = () => {
    fetch("https://api.github.com/users/Sondosissa18")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState((state) => ({ ...state, user: data, active: !state.active }));
      })

      .catch((err) => {
        console.log("promise rejected, err");
      });
  };

  render() {
    return (
      <Container>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={this.handleToggle}>Toggle User</Button>

          {this.state.active ? (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={this.state.user.avatar_url} />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h1>{this.state.user.login}</h1>{" "}
                </Card.Title>
                <Card.Text> {this.state.user.type}</Card.Text>
                <Card.Text>{this.state.user.created_at}</Card.Text>
                <Card.Text>{this.state.user.url}</Card.Text>
                <div style={{ borderTop: "1px  solid #DDD" }}>
                  {" "}
                  <Card.Text>Followers: {this.state.user.followers}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default App;
