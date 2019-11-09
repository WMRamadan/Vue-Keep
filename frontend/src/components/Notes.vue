<template>
  <div>
    <input type="textarea" class="notes-input" placeholder="Write a note." v-model="newNote" @keyup.enter="addNote">
    <div v-for="(note, index) in notes" :key="note.id" class="note-item">
        <div>
            {{ note.text }}
        </div>
        <div class="remove-item" @click="removeNote(index)">
            &times;
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notes',
  data () {
    return {
      newNote: '',
      idForNote: 3,
      notes: [
          {
              'id': 1,
              'text': 'This is my first note',
          },
          {
              'id': 2,
              'text': 'This is my second note',
          }
      ]
    }
  },
  methods: {
      addNote() {
          if(this.newNote.trim().length == 0) {
              return
          }
          this.notes.push({
              id: this.idForNote,
              text: this.newNote,
          })
          this.newNote = ''
          this.idForNote++
      },
      removeNote(index) {
          this.notes.splice(index, 1)
      }
  }
}
</script>


<style>
    .notes-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .note-item {
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
