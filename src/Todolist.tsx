import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./AddItemForm";
import {EditableStan} from "./EditableStan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onComplitedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3><EditableStan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            // console.log(e.currentTarget.checked + " " + t.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableStan title={t.title}
                                              onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>

                            </div>
                        )
                    })}

                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}

            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

