<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <div>
    <button v-for="tab in tabs" :key="tab" @click="selected = tab;" :class="['tab-btn', { active: selected === tab }]">
      {{ tab }}
    </button>

    <component :is="selected" class="tab"></component>
  </div>
  </div>
</template>

<script>
import Checklist from './components/Checklist'
import Notes from './components/Notes'

export default {
  data: function() {
    return {
      tabs: ["Notes", "Checklist"],
      selected: "Notes"
    };
  },
  components: {
    Checklist,
    Notes,
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}

.active {
  border-bottom: 3px solid green;
  background: #fcfcf;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
