import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        props = super(props);
    }
    
    renderDish(dish) {
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
    
    renderComments(dish) {

        if(dish != null) {
        return (
            <div>
            <h4>Comments</h4>
            { dish.comments.map((c) =>    
                    <div key={c.id}>
                        <p>{c.comment}</p>
                        <p>-- {c.author}, {c.date}</p>
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

    render() {
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish)} 
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail;