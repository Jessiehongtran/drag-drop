import React from 'react';
import '../styles/board.scss'

export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [
                {id: 1, name: 'TypeScript', category: "learn"},
                {id: 2, name: 'PHP', category: "learn"},
                {id: 3, name: 'C', category: "learn"},
                {id: 4, name: 'Java', category: "try"},
                {id: 5, name: 'Ruby on Rails', category: "try"},
                {id: 6, name: 'Go', category: "try"},
                {id: 7, name: 'C++', category: "try"},
                {id: 8, name: 'JavaScript', category: "practice"},
                {id: 9, name: 'React', category: "practice"},
                {id: 10, name: 'Node.js', category: "practice"},
                {id: 11, name: 'Python', category: "practice"},
            ]
        }

    }

    onDragStart(e, id){
        console.log('dragstart:', id)
        e.dataTransfer.setData("id", id)
    }

    onDragOver(e){
        e.preventDefault(); 
       
    }

    onDrop(e, category){
        console.log('drop', category)
        let id = e.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task) => {
            if (task.id == id){
                task.category = category
            }
            return task;
        })

        this.setState({
            ...this.state,
            tasks
        })
        
        
    }   

    render(){

        var tasks = {
            learn: [],
            try: [],
            practice: []
        }

        this.state.tasks.forEach((t) => {
            tasks[t.category].push(
                <div
                    key={t.id}
                    onDragStart = {(e) => this.onDragStart(e,t.id)}
                    draggable
                    className="task"
                    
                >
                    {t.name}
                </div>
            )
        })

        console.log(tasks)

        return (
            <div className="board">
                <div 
                    className="tolearn" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => {this.onDrop(e, "learn")}}
                >
                    <div className="title"> to learn</div>
                    {tasks.learn}
                </div>
                <div 
                    className="totry"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => {this.onDrop(e, "try")}} 
                >
                    <div className="title"> to try</div>
                    {tasks.try}
                </div>
                <div 
                    className="topractice"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => {this.onDrop(e, "practice")}}
                >
                    <div className="title"> to practice</div>
                    {tasks.practice}
                </div>
            </div>
        )
    }
}