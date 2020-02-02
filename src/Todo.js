import React, {Component} from 'react'

const Todo = (props) => {
	return (
		<li className="list-group-item">
            {props.item.name}
            <button className="btn btn-info ml-3" onClick={props.editTodo}>u</button>
            <button className="btn btn-danger mx-3" onClick={props.delTodo}>x</button>
        </li>
	)
}

export default Todo