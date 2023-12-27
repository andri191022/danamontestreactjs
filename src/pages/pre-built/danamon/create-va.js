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
import { dateFormatter } from "../../../utils/Utils";

const CreateVA = () => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");  
  
  const today = new Date();
  const formData = {
    UserReferenceNumber: "1200123456784888",
    RequestTime: today.getFullYear() +""+ today.getMonth()+""+today.getDate()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds(),
    VirtualAccountNumber: "8888000000654321",
    VirtualAccountName: "MEDIO MAYO",
    VirtualAccountExpiryDate: today.getFullYear() +""+ today.getMonth()+""+(today.getDate()+5)+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds(),
  };
  
  const onFormSubmit = (data) => {
    setLoading(true);
    console.log(data);
    var bodyFormData = new FormData();
     bodyFormData.append('UserReferenceNumber', data.UserReferenceNumber);
     bodyFormData.append('RequestTime', data.RequestTime); 
     bodyFormData.append('VirtualAccountNumber', data.VirtualAccountNumber); 
     bodyFormData.append('VirtualAccountName', data.VirtualAccountName); 
     bodyFormData.append('VirtualAccountExpiryDate', data.VirtualAccountExpiryDate); 

    // console.log(formData.userid, formData.password)
    const token = localStorage.getItem("accessToken");
    let url = "https://localhost:7253/api/BillPay/CreateVA";
    axios({
      method: "POST",
      url: url +"?tokenId=" + token,
      data: bodyFormData,
      headers: { "Content-Type": "application/json"},
    }).then(function (response) {
        //handle success  
       console.log(response.data);     
      
        setTimeout(() => {
          setError(response.data.message);
          setLoading(false);
        }, 2000);
     

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
                Create Virtual Account
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
                      <p className="sub-title">Danamon Create VA</p>
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
                        <div className="mb-3 row">
                          <label htmlFor="" className="col-sm-3 col-form-label required">User Ref Number :</label>
                          <div className="col-sm-9">
                            <input
                              id="txtUserReferenceNumber"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control"
                              defaultValue={formData.UserReferenceNumber}
                              {...register('UserReferenceNumber', { required: "This field is required" })}
                            />
                            {errors.UserReferenceNumber && <span className="invalid">{errors.UserReferenceNumber.message}</span>}
                          </div>
                        </div>
                        {/* <div className="form-group">
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
                              className="form-control form-control"
                              defaultValue={formData.OACClientID}
                              {...register('OACClientID', { required: "This field is required" })}
                            />
                            {errors.OACClientID && <span className="invalid">{errors.OACClientID.message}</span>}
                          </div>
                        </div> */}
                      </Col>                      
                      <Col md="6">
                        <div className="mb-3 row">
                          <label htmlFor="" className="col-sm-3 col-form-label required">Request Time :</label>
                          <div className="col-sm-9">
                            <input
                              id="txtRequestTime"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control"
                              defaultValue={formData.RequestTime}
                              {...register('RequestTime', { required: "This field is required" })}
                            />
                            {errors.RequestTime && <span className="invalid">{errors.RequestTime.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3 row">
                          <label htmlFor="" className="col-sm-3 col-form-label required">V/A Number :</label>
                          <div className="col-sm-9">
                            <input
                              id="txtVirtualAccountNumber"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control"
                              defaultValue={formData.VirtualAccountNumber}
                              {...register('VirtualAccountNumber', { required: "This field is required" })}
                            />
                            {errors.VirtualAccountNumber && <span className="invalid">{errors.VirtualAccountNumber.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3 row">
                          <label htmlFor="" className="col-sm-3 col-form-label required">V/A Name :</label>
                          <div className="col-sm-9">
                            <input
                              id="txtVirtualAccountName"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control"
                              defaultValue={formData.VirtualAccountName}
                              {...register('VirtualAccountNumber', { required: "This field is required" })}
                            />
                            {errors.VirtualAccountName && <span className="invalid">{errors.VirtualAccountName.message}</span>}
                          </div>
                        </div>
                      </Col>   
                      <Col md="6">
                        <div className="mb-3 row">
                          <label htmlFor="" className="col-sm-3 col-form-label required">V/A ExpiryDate :</label>
                          <div className="col-sm-9">
                            <input
                              id="txtVirtualAccountExpiryDate"                             
                              readOnly={true}
                              type="text"
                              className="form-control form-control"
                              defaultValue={formData.VirtualAccountExpiryDate}
                              {...register('VirtualAccountExpiryDate', { required: "This field is required" })}
                            />
                            {errors.VirtualAccountExpiryDate && <span className="invalid">{errors.VirtualAccountExpiryDate.message}</span>}
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
                                    {loading ? <Spinner size="sm" color="light" /> : "Submit Data"}
                                </Button>
                            </div>
                        </Col>
                        <Col md="9">
                            <BlockDes>
                                {errorVal && (
                                    <div className="mb-3">
                                    <Alert color="danger" className="alert-icon">
                                        <Icon name="alert-circle" /> Unable to Create VA {" "}
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
export default CreateVA;
