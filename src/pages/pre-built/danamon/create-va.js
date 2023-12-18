import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../../components/Component";
import Logo from "../../../images/logo.png";
import LogoDark from "../../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import Head from "../../../layout/head/Head";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import axios from 'axios';

const CreateVA = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
// -----------------
    var User;
    var message;
  


  
  const onFormSubmit = (formData) => {
    setLoading(true);
   console.log(formData);
    var bodyFormData = new FormData();
     bodyFormData.append('userid', formData.userid);
     bodyFormData.append('password', formData.password); 
    // console.log(formData.userid, formData.password)
    let url = "https://go-api-inventory.up.railway.app/api/users/login"
    axios({
      method: "POST",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success  
      // console.log(response.data.Data);  
      User = response.data.Data.ID_USER   
        message = response.data.Message 
      // console.log(asu);   

       console.log("User ID : " + User);   
       console.log("Message : " + message);   
      if (formData.userid === User) {
        localStorage.setItem("accessToken", "token");
        setTimeout(() => {
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
          );
          window.location.reload();
        }, 2000);
       } else {
        setTimeout(() => {
          setError("Cannot login with credentials");
          setLoading(false);
        }, 2000);
      }

      }).catch(function (response) {
        //handle error
        console.log(response);
      });


  // axios.get('https://go-api-inventory.up.railway.app/api/users/login')
  // .then(response => this.setState({ state_iduser: response.Data.ID_USER }))
  // .catch(error => {
  //     this.setState({ errorMessage: error.message });
  //     console.error('There was an error!', error);
  // });
    // const loginName = "info@softnio.com";
    // const pass = "123456"; 
   
  };

  const { formState: { errors }, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access AMS using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"     
                    name="userid"               
                    {...register('userid', { required: "This field is required" })}
                    // ref={register({ required: "This field is required" })} 
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.userid && <span className="invalid">{errors.userid.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password" 
                    {...register('password', { required: "This field is required" })}
                    // ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
          
          </PreviewCard>
        </Block>
       
    </React.Fragment>
  );
};
export default CreateVA;
