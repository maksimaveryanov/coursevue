Vue.component("hello-message", {
  props: {
    message: String,
  },
  template: `<h1>{{message}}</h1>`,
});


Vue.component('complete-statistics', {
  props: {
    todoitems: Array,
  },
  computed: {
    completedTasks() {
      let tasksDone=[];
      this.todoitems.forEach(item => tasksDone.push(item.done));
      return tasksDone.filter(function(value){return value}).length;
    },
  },
  template: `
  <button type="button" class="btn btn-primary btn-sm" disabled>Completed tasks: {{ completedTasks }}
  </button>`
})

Vue.component('all-statistics', {
  props: {
    todoitems: Array,
  },
  computed: {
    allTasks() {
      let tasksDone=[];
      this.todoitems.forEach(item => tasksDone.push(item.done));
      return tasksDone.length;
      },
  },
  template:`<button type="button" class="btn btn-primary btn-sm" disabled>
      all tasks: {{ allTasks }}
      </button>`
})

Vue.component('percent-statistics', {
  props: {
    todoitems: Array,
  },
  computed: {
    percentComplete(){
      let tasksDone=[];
      this.todoitems.forEach(item => tasksDone.push(item.done));
        return ( (Math.round(((tasksDone.filter(function(value){return value}).length / tasksDone.length) * 100)*10)/10) || '0')
    }
  },
  template:`<button type="button" class="btn btn-primary btn-sm" disabled>
  Percent complete tasklist: {{ percentComplete }}%</button>`
})

Vue.component('form-add', {
  data: function(){
    return {
      value:"",
    }
  },
  methods: {
    addNewTodo() {
      this.$emit("add-new-todo", this.value);
      this.value = "";
    },
  },
  template:`<form class="input-group" v-on:submit.prevent>
  <input type="text" class="form-control" placeholder="Add new task" v-model.trim="value">
  <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="addNewTodo" :disabled="value.length == 0">Add</button>
  </form>`
})

Vue.component("todo-btn", {
  props: {
    value: {
      type: Object,
    },
  },
  template: `<button type="button"
  :class="value.done ? 'btn btn-success' : 'btn btn-secondary'"
  @click="value.done = !value.done">
{{ value.done ? 'completed' : 'in order' }}
</button>`,
});

Vue.component("todo-item", {
  props: {
    value: {
      type: Object,
    },
  },
  template: `<li class="list-group-item">
  <p style="display: inline-block; margin-left: 5px;">{{value.text}}</p>
  <todo-btn v-bind:value="value"></todo-btn>
  </li>`,
});

Vue.component("todo-list", {
  props:  {
    filter: String,
    filtertext: String,
    todoitems: Array,
  },
  template: ` <h1 v-if="todoitems.length==0">Please add new task!</h1>
  <ul v-else class="list-group">
            <todo-item v-for="value of filteredItems"
            v-bind:key="value.id"
            v-bind:value="value"></todo-item>
            </ul>`,
  computed: {
    filteredItems() {
      let todos = this.todoitems.filter(
        (item) =>
          item.text.toLowerCase().indexOf(this.filtertext.toLowerCase()) >
          -1
      );
      if (this.filter == "all") return todos;
      if (this.filter == "completed")
        return todos.filter((item) => item.done);
      if (this.filter == "inorder")
        return todos.filter((item) => !item.done);
    },
  },
});


Vue.component('form-search', {
  data: function(){
    return {
      text:"",
    }
  },
  methods: {
    searchTask() {
      this.$emit("search-task", this.text);
    },
  },
  template: `<input type="text" 
  class="form-control" 
  placeholder="Search task" 
  v-model="text" 
  @input = "searchTask">`
})

Vue.component("todo-filter", {
  props: {
    todo: {
      type: Object,
    },
  },
  template: `<select class="form-select" @change="changeFilter" v-model='filter' aria-label="Default select example">
          <option selected value="all">all</option>
          <option value="completed">completed</option>
          <option value="inorder">in order</option>
        </select>`,
  data() {
    return {
      filter: "all",
    };
  },
  methods: {
    changeFilter() {
      this.$emit("change-filter", this.filter);
    },
  },
});


var vm = new Vue ({
  el:'#app',
  data: {
    message: 'Hello from Vue App',
    todoItems: [
    ],
    filter: "all",
    filterText: "",
  },
  methods: {
    addNewTodo(value) {
      let newId = Date.now()
      this.todoItems.push({
        id: newId,
        done: false,
        text: value,
      })
    },
    searchTask(text) {
      this.filterText = text;
    },
    changeFilter(filter) {
      this.filter = filter;
    },
  },
  }
)
