import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Button,
  BlockHeadContent,
  BlockTitle,
  BlockHead,
  Block,
  Icon,
  BlockDes,
  TooltipComponent,
} from "../../../components/Component";
import { Form, Spinner, Alert, Card, Col,  Row } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';


const GetAuth02 = () => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");  

  // handles ondrop function of dropzone
  const formData = {
    OACClientID: "b42386e2-4a8e-4cf6-9266-533c95aae002",
    OACClientIDSecret: "e70a54f2-a08e-4e56-bd87-b0328e135301",
    BDIKey: "e0ddf155-089b-4623-b86f-c535df7bf078",
    BDIKeySecret: "5e1225e6-675f-44c0-ae7b-31d60e5af6cd",
  };
 
//   const onFormSubmit = (data) => {
//     console.log(data);
//     setLoading(true);
//     const loginName = "info@softnio.com";
//     const pass = "123456";
//     if (data.name === loginName && data.passcode === pass) {
//       localStorage.setItem("accessToken", "token");
//       setTimeout(() => {
//         window.history.pushState(
//           `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
//           "auth-login",
//           `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
//         );
//         window.location.reload();
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         setError("Cannot login with credentials");
//         setLoading(false);
//       }, 1000);
//     }
//   };

const onFormSubmit = (formData) => {
    setLoading(true);
    console.log(formData);
    var bodyFormData = new FormData();
     bodyFormData.append('OACClientID', formData.OACClientID);
     bodyFormData.append('OACClientIDSecret', formData.OACClientIDSecret); 
     bodyFormData.append('BDIKey', formData.BDIKey); 
     bodyFormData.append('BDIKeySecret', formData.BDIKeySecret); 

    // console.log(formData.userid, formData.password)
    let url = "https://localhost:7253/api/BillPay"
    axios({
      method: "POST",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "application/json"},
    }).then(function (response) {
        //handle success  
       console.log(response.data);  
    
      if (response.data.access_token.length > 10) {
        
        localStorage.setItem("accessToken", JSON.stringify(response.data));
        //setToken(response.data.access_token);
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
    };


  const { formState: { errors }, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Get Auth02"></Head>
      <Content size="lg">
        <div className="m-auto">
          <BlockHead size="lg" className="wide-xs mx-auto">
            <BlockHeadContent className="text-center">
              <BlockTitle tag="h2" className="fw-normal">
                Begin your ID-Verification
              </BlockTitle>             
            </BlockHeadContent>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="nk-kycfm">
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="nk-kycfm-head">
                    <div className="nk-kycfm-count">01</div>
                    <div className="nk-kycfm-title">
                      <h5 className="title">Danamon Details</h5>
                      <p className="sub-title">Danamon Auth identification</p>
                    </div>
                  </div>
                  <div className="nk-kycfm-content">
                    <div className="nk-kycfm-note">
                      <TooltipComponent icon="info-fill" direction="right" text="KYC forms" id="kyc-forms-tooltip" />
                      <p>
                        Please type carefully and fill out the form with your information details. Your can’t edit these
                        details once you submitted the form.
                      </p>
                    </div>
                    <Row className="g-4">                        
                      <Col md="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label">
                              Client ID <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-group">
                            <input
                              id="txtOACClientID"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control-lg"
                              defaultValue={formData.OACClientID}
                              {...register('OACClientID', { required: "This field is required" })}
                            />
                            {errors.OACClientID && <span className="invalid">{errors.OACClientID.message}</span>}
                          </div>
                        </div>
                      </Col>                      
                      <Col md="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label">
                              Client ID Secret <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-group">
                            <input id="txtOACClientIDSecret"
                              readOnly={true}
                              type="text"
                              className="form-control form-control-lg"
                              {...register('OACClientIDSecret', { required: "This field is required" })}
                              defaultValue={formData.OACClientIDSecret} />
                            {errors.OACClientIDSecret && <span className="invalid">{errors.OACClientIDSecret.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label">
                              BDI Key <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-group">
                            <input
                              readOnly={true}
                              type="text"
                              className="form-control form-control-lg"
                              {...register('BDIKey', { required: "This field is required" })}
                              defaultValue={formData.BDIKey} />
                            {errors.BDIKey && <span className="invalid">{errors.BDIKey.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label">
                              BDI Secret <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-control-group">
                            <input
                              readOnly={true}
                              type="text"
                              className="form-control form-control-lg"
                              {...register('BDIKeySecret', { required: "This field is required" })}
                              defaultValue={formData.BDIKeySecret} />
                            {errors.BDIKeySecret && <span className="invalid">{errors.BDIKeySecret.message}</span>}
                          </div>
                        </div>
                      </Col>                      
                    </Row>
                  </div>
                  <div className="nk-kycfm-footer">   
                    <Row>
                        <Col md="3">
                            <div className="nk-kycfm-action pt-2">
                                <Button type="submit" className="btn btn-lg btn-primary">
                                    {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                                </Button>
                            </div>
                        </Col>
                        <Col md="9">
                            <BlockDes>
                                {errorVal && (
                                    <div className="mb-3">
                                    <Alert color="danger" className="alert-icon">
                                        <Icon name="alert-circle" /> Unable to login with credentials{" "}
                                    </Alert>
                                    </div>
                                )}
                            </BlockDes>
                        </Col>
                    </Row>                 
                    
                    
                  </div>
                </Form>
              </div>
            </Card>
          </Block>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default GetAuth02;
