import React from 'react'
import './Person.css'

const person = (props) => {
    return (
            <div className="Person">
                <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old</p>
                <p>{props.children}</p>
                <input type="text" onChange={props.changed} defaultValue={props.name} />
            </div>
    )
}

export default person;

//with Radium

// import React from 'react'
// import './Person.css'
// import Radium from 'radium'

// const person = (props) => {
//     const style = {
//         '@media(min-width: 500px)': {
//             width: '450px'
//         }
//     }
//     return (
//             <div className="Person" style={style}>
//                 <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old</p>
//                 <p>{props.children}</p>
//                 <input type="text" onChange={props.changed} defaultValue={props.name} />
//             </div>
//     )
// }

// export default Radium(person);