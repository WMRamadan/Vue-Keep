<template>
  <div>
    <div>
        <input type="text" class="checklist-input" placeholder="Add Item to Checklist." v-model="newItem" @keyup.enter="addItem">
        <button class="btn" @click="addItem">
            Add
        </button>
    </div>
    <div v-for="(item, index) in items" :key="item.id" class="checklist-item">
        <input type="checkbox" v-model="item.checked">
        <div :class="{ checked : item.checked }">
            {{ item.text }}
        </div>
        <div class="remove-item" @click="removeItem(index)">
            &times;
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checklist',
  data () {
    return {
      newItem: '',
      idForItem: 3,
      items: [
          {
              'id': 1,
              'text': 'This is my first item',
              'checked': false,
          },
          {
              'id': 2,
              'text': 'This is my second item',
              'checked': false,
          }
      ]
    }
  },
  methods: {
      addItem() {
          if(this.newItem.trim().length == 0) {
              return
          }
          this.items.push({
              id: this.idForItem,
              text: this.newItem,
              checked: false,
          })
          this.newItem = ''
          this.idForItem++
      },
      removeItem(index) {
          this.items.splice(index, 1)
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
