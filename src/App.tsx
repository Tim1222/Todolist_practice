import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()


    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Bread", isDone: true}
        ]
    });
    // let [filter, setFilter] = useState<FilterValuesType>('all');


    // let tasks = arr[0];
    // let setTasks = arr[1];


    // const tasks2 = [
    //     {id: 1, title: "Hello world", isDone: true},
    //     {id: 2, title: "I am Happy", isDone: false},
    //     {id: 3, title: "Yo", isDone: false}
    // ]

    function removeTask(id: string, todolistID: string) {
        let tasks = tasksObj[todolistID]

        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistID]
        let newTasks = [task, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    let removeTodoList = (todolistID: string) => {
        let filteredTodolist = todoList.filter(tl => tl.id !== todolistID)
        setTodoList(filteredTodolist)

        delete tasksObj[todolistID]
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        const cnageTodoList = todoList.find(tl => tl.id === todoListID)
        if (cnageTodoList) {
            cnageTodoList.title = newTitle;
            setTodoList([...todoList])
        }
    }


    //return t.id === taskID
    // if (t.id === taskID) {
    //         return true;
    //     } else {
    //         return false
    //     }
    // }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todolist = todoList.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoList])
        }
    }

    let [todoList, setTodoList] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    function addTodolists(title: string) {
        let todoListNew: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoList([todoListNew, ...todoList])
        setTasks({...tasksObj, [todoListNew.id]: []})
    }

    return (
        <div className="App">

            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '10px 5px 20px'}}>
                    <AddItemForm addItem={addTodolists}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoList.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id];

                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                            }
                            return <Grid item>
                                <Paper style={ { padding: '15px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;