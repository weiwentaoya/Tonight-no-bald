import {ref, computed} from 'vue'
export default function useTodos() {
    let title = ref('')
    let todos = ref([
        {
            title:'学习',
            done: false
        }
    ])
    function addTodo() {
        todos.value.push({
            title: title.value,
            done: false
        })
        title.value = ''
    }
    let active = computed(()=> todos.value.filter(el=>el.done).length)
    let all = computed(()=>todos.value.length)
    let allDone = computed({
        get: ()=>{
            return active.value===all.value
        },
        set: value=>{
            todos.value.forEach(todo=>todo.done = value)
        }
    })
    return {title, todos, addTodo, active, all, allDone}
}