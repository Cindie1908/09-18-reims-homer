import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
      flash: "",
      openFlash: false
    };

    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  updateFormField = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitSignUp(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      fetch("/auth/signup", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        })
      })
        .then(res => res.json())
        .then(res =>
          this.setState({ flash: res.flash, open: true }, () => {
            if (res.type === "success") {
              this.props.history.push("/");
            }
          })
        );
    } else {
      alert("Passwords don't match!!!!!");
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <form>
        <p>Inscription</p>
        <TextField
          value={this.state.email}
          type="email"
          name="email"
          placeholder="Your email"
          onChange={event => this.updateFormField(event)}
        />

        <TextField
          type="password"
          name="password"
          placeholder="Your password"
          value={this.state.password}
          onChange={event => this.updateFormField(event)}
        />

        <TextField
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={this.state.confirmPassword}
          onChange={event => this.updateFormField(event)}
        />

        <TextField
          type="firstname"
          name="firstname"
          placeholder="Your firstname"
          value={this.state.firstname}
          onChange={event => this.updateFormField(event)}
        />

        <TextField
          type="lastname"
          name="lastname"
          placeholder="Your lastname"
          value={this.state.lastname}
          onChange={event => this.updateFormField(event)}
        />
        <hr />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          value="Soumettre"
          onClick={e => this.handleSubmitSignUp(e)}
        >
          S'inscrire
        </Button>

        <hr />
        <Link to="/signin">
          <Button>Dèjà inscrit ?</Button>
        </Link>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.flash}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </form>
    );
  }
}

export default withRouter(SignUp);
