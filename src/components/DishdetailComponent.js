import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
        if (dish != null) {
            return(
                <div>
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }       
}
    
function RenderComments({dish}) {
        if(dish != null) {
            return (
                <div>
                <h4>Comments</h4>
                { dish.comments.map((c) =>    
                        <div key={c.id}>
                            <p>{c.comment}</p>
                            <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                        </div> 
                )}
                </div>
            )
            }
            else {
                return(
                <div></div>
                )
            }
}

const DishDetail = (props) => {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.dish} />
                    </div>
                </div>
            </div>
        );       
}

export default DishDetail;