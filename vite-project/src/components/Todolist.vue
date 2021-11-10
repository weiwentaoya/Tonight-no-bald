<template>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo">
        <ul v-if="todos.length">
            <li v-for="item in todos" :key="item.title">
                <input type="checkbox" v-model="item.done">
                <span :class="{done:item.done}">{{item.title}}</span>
            </li>
        </ul>
        <div v-else>暂无数据</div>
        <div>
            <input type="checkbox" v-model="allDone">全选
            {{active}}/{{all}}
        </div>
       <p>
            {{x}}, {{y}}
       </p>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import useTodos from './useTodos'
import useMouse from '../utils/mouse'
let {title, todos, addTodo, active, all, allDone} = useTodos()
const {x,y} = useMouse()
</script>

<style scoped>
.done{
    color: red;
}
</style>