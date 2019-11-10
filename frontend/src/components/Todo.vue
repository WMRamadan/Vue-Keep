<template>
  <div>
    <input type="text" class="todos-input" placeholder="Write a todo." v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
        <div>
            {{ todo.text }}
        </div>
        <div class="remove-item" @click="removeTodo(index)">
            &times;
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      todos: [
          {
              'id': 1,
              'text': 'This is my first todo',
          },
          {
              'id': 2,
              'text': 'This is my second todo',
          }
      ]
    }
  },
  methods: {
      addTodo() {
          if(this.newTodo.trim().length == 0) {
              return
          }
          this.todos.push({
              id: this.idForTodo,
              text: this.newTodo,
          })
          this.newTodo = ''
          this.idForTodo++
      },
      removeTodo(index) {
          this.todos.splice(index, 1)
      }
  }
}
</script>


<style>
    .todos-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;
    }
</style>
