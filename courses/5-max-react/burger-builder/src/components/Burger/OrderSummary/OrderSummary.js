import React from 'react'

import Aux from '../../../hoc/Auxx/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
    //this could be a function component, no need for a class(componentWillUpdate not required, only for checking)
    // componentWillUpdate() {
    //     console.log("[OrderSummary] will update")
    // }
    render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}
                </span>: {this.props.ingredients[igKey]}
            </li>)
        })
    
        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
}

export default OrderSummary