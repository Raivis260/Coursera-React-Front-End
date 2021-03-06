import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'; 
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state= {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.firstName, values.comment);
    }

    render() {
        return(
            <div>
            <Button onClick={this.toggleModal} className="btn btn-outline-secondary"><span className="fa fa-pencil"> Submit Comment</span></Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group" md={2}>
                    <Col md={10}>
                        <Label htmlFor="rating"  className="p-0 pb-2" md={4}><strong>Rating</strong></Label>
                        <Control.select 
                        className="form-control"
                        model=".rating"
                        id="rating"
                        name="rating"
                        >
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </Control.select>
                    </Col>
                    </Row>
                    <Row className="form-group">
                    <Col md={10}>
                        <Label htmlFor="firstName" className="p-0 pb-2" md={4}><strong>Your Name</strong></Label>
                        <Control.text
                        className="form-control"
                        placeholder="Your Name"
                        model=".firstName"
                        id="firstName"
                        name="firstName"
                        validators = {{
                            required, minLength: minLength(3), maxLength: maxLength(15) 
                        }}
                        />
                        <Errors className="text-danger"
                            model=".firstName"
                            show="touched"
                            messages= {{
                                required: 'Required ',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                        }}/>
                    </Col>
                    </Row>
                    <Row className="form-group">
                    <Col md={10}>
                        <Label htmlFor="comment" className="p-0 pb-2" md={2}><strong>Comment</strong></Label>
                        <Control.textarea 
                        rows={15}
                        className="form-control"
                        model=".comment"
                        id="comment"
                        name="comment"/>
                    </Col>
                    </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </div>
        )
    }
}

function RenderDish({dish}) {
        if (dish != null) {
            return(
                <div>
                <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                    </Card>
                </FadeTransform>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }       
}
    
function RenderComments({comments, errMess, postComment, dishId}) {
        if(comments != null) {
            return (
                <div>
                <h4>Comments</h4>
                <Stagger in>
                { comments.map((c) =>    
                        <Fade in>
                        <div key={c.id}>
                            <p>{c.comment}</p>
                            <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                        </div>
                        </Fade> 
                )}
                </Stagger>
                <div>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
                </div>
            )
            }
            else {
                return(
                <div>{errMess}</div>
                )
            }
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMessage) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMessage}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                    errMess={props.commentsErrMessage}
                    postComment={props.postComment}
                    dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    }
                  
}

export default DishDetail;