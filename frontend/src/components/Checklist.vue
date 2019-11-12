<template>
  <div>
    <div>
        <input type="text" class="checklist-input" placeholder="Add Item to Checklist." v-model="newItem" @keyup.enter="addItem">
        <button class="btn" @click="addItem">
            Add
        </button>
    </div>
    <div v-for="(item, index) in items" :key="item.id" class="checklist-item">
        <input type="checkbox" v-model="item.checked" @change="updateItem(item)">
        <div :class="{ checked : item.checked }">
            {{ item.text }}
        </div>
        <div class="remove-item" @click="removeItem(index, item)">
            &times;
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Items',
  data () {
    return {
      items: [],
      newItem: '',
      checked: false
    }
  },
  async created(){
      try {
          const res = await axios.get('http://127.0.0.1:3000/items');
          this.items = res.data;
      } catch (e) {
          console.error(e);
      }
  },
  methods: {
    async addItem() {
          if(this.newItem.trim().length == 0) {
              return
          }
          const res = await axios.post('http://127.0.0.1:3000/items', {text: this.newItem});
          this.items.push({
              id: this.newItem,
              text: this.newItem,
          })
          this.newItem = '';
      },
      async updateItem(item) {
          console.log(item.checked);
          const res = await axios.patch('http://127.0.0.1:3000/items/' + item.id, {checked: item.checked});
      },
      removeItem(index, item) {
          const res = axios.delete('http://127.0.0.1:3000/items/' + item.id);
          this.items.splice(index, 1);
      }
  }
}
</script>


<style>
    .btn {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .checklist-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .checklist-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;
    }

    .checked {
        text-decoration: line-through;
        color: grey;
    }
</style>
