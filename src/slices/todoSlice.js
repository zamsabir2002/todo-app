import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem('todoList');
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    // If nothing exists add an empty array to the local storage and return an empty array
    window.localStorage.setItem('todoList', JSON.stringify([]))
    return [];
}

const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodo()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        // function to add todo
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            // Getting List from local storage
            const todoList = window.localStorage.getItem('todoList');
            // IF it exists then update the existing todoList
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({ ...action.payload });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            }
            //if it doesn't exist
            // Not necessary cuz already defined in initial state
            // but if manually deleted from loacalstorage than this
            else {
                window.localStorage.setItem('todoList', JSON.stringify([{ ...action.payload }]))
            }
        },

        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList')
            if (todoList) {
                const todoArr = JSON.parse(todoList);
                todoArr.forEach((todo, index) => {
                    if (todo.id === action.payload) {
                        todoArr.splice(index, 1);
                    }
                });

                window.localStorage.setItem('todoList', JSON.stringify(todoArr));
                state.todoList = todoArr;
            }
        },

        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoArr = JSON.parse(todoList);
                todoArr.forEach((todo, index) => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.status = action.payload.status;
                    }
                });

                window.localStorage.setItem('todoList', JSON.stringify(todoArr));
                state.todoList = todoArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    }
})

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;