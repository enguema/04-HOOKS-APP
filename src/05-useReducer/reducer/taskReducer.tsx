//import { text } from 'stream/consumers';
import * as z from 'zod';
//import { id } from 'zod/locales';
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

//Definimos el tipo de las acciones que se pueden realizar en el reducer
export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };


//Creo un OBJ de validación con zod para validar el estado del reducer
const todoSchema = z.object({
  id:z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema= z.object({
  todos:z.array(todoSchema),
  length: z.number(),
  completed:z.number(),
  pending: z.number(),
});

//creamos un estado inicial para al reducer
export const getTaskInitialState = (): TaskState => {
 const localStorageState= localStorage.getItem('task-state'); //obtenemos el estado guardado en localStorage
 if(!localStorageState){
  return{
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  }
 }

//Validar el estado guardado en localStorage con zod
const result=TaskStateSchema.safeParse(JSON.parse(localStorageState));
if(result.error){
  console.error('Error validating localStorage state:', result.error);
  return{
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  }
}

return JSON.parse(localStorageState); //parseamos el estado guardado en localStorage y lo devolvemos como el estado inicial del reducer
};


export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  //Es una función que siempre recibe el estado actual y una acción, y devuelve un nuevo estado basado en la acción recibida. 
  // Es una función pura, lo que significa que no debe modificar el estado directamente ni tener efectos secundarios. 
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      }
      return {
        ...state,//esparce todas las propiedades del estado actual
        length: state.todos.length + 1, //incrementa la longitud de la lista de tareas
        pending: state.pending + 1, //incrementa el contador de tareas pendientes
        todos: [...state.todos, newTodo],//agrega el nuevo todo a la lista de todos
      };

    case 'DELETE_TODO': {
      const currentsTodo = state.todos.filter((todo) => todo.id !== action.payload);//filtra los todos para eliminar el que tiene el id igual al payload 
      return {
        ...state,
        length: state.todos.length - 1, //decrementa la longitud de la lista de tareas
        todos: currentsTodo,//filtra los todos para eliminar el que tiene el id igual al payload
        completed: currentsTodo.filter((todo) => todo.completed).length, //actualiza el contador de tareas completadas
        pending: currentsTodo.filter((todo) => !todo.completed).length, //actualiza el contador de tareas pendientes
      };
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) { //si es el todo que quiero cambiar, creo una nueva copia de ese todo con completed invertido
          return { ...todo, completed: !todo.completed } //copia de todo pero con completed invertido
        }
        return todo;
      }); //recorro todos y busco el que quiero cambiar

      return {
        ...state,
        length: state.todos.length - 1, //decrementa la longitud de la lista de tareas
        todos: updatedTodos,//filtra los todos para eliminar el que tiene el id igual al payload
        completed: updatedTodos.filter((todo) => todo.completed).length, //actualiza el contador de tareas completadas
        pending: updatedTodos.filter((todo) => !todo.completed).length, //actualiza el contador de tareas pendientes
      };

    }

    default:
      return state;
  }
}