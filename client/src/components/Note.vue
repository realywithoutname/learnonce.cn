<template lang="html">
  <div  v-if="$root.level" class="note-container">
    <div class="row">
      <div class="form-input xs-8 s-5">
        <input type="text" id="title" v-model="note.title">
        <label for="title" class="input-label">Title</label>
      </div>
      <div class="form-input right xs-8 s-3">
        <input type="text" id="tag" placeholder="" v-model="note.tags">
        <label for="tag" class="input-label">Tags</label>
      </div>
    </div>
    <div class="form-input xs-8">
      <textarea spellcheck="false" id="description" rows="1" v-model="note.description"></textarea>
      <label for="description" class="input-label">Description</label>
    </div>
    <div contenteditable="true" id="note-content-editor" spellcheck="false" v-html="note.content" class="col xs-8 note-content-editor">
    </div>
    <div class="note-action">
      <a>
        <i class="material-icons">photo_size_select_actual</i>
        <input type="file" name="name" value="">
      </a>
      <a @click="save" class="right">
        <i class="material-icons">save</i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      note: {
        title: '',
        description: '',
        content: '',
        tags: ''
      }
    }
  },
  watch: {
    'note.tags' (value) {
      if (!value) {
        return
      }
      this.note.tags = value.replace(/，/, ',')
    }
  },
  methods: {
    upload () {
      console.log('upload image')
    },
    save () {
      this.note.content = document.getElementById('note-content-editor').innerHTML
      if (this.note._id) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this.note.updateTime = new Date()
      this.note.createTime = new Date()
      this
        .Note
        .create(this.note)
        .then((res) => {
          this.note = Object.assign({}, res.json())
          this.$toast('保存成功')
        })
    },
    update () {
      this.note.updateTime = new Date()
      this
        .Note
        .updateById({id: this.note._id}, this.note)
        .then((res) => {
          this.$toast('更新成功')
        })
    }
  },
  components: {}
}
</script>

<style lang="css">
.note-container {
  box-sizing: border-box;
  width: 100%;
}
#description {
  resize: vertical;
}
.note-action {
  width: 100%;
  border-radius: 0;
  display: flex;
  bottom: 0;
  left: 0;
  position: absolute;
  background: #fff;
}
.note-action a, .note-action a i {
  flex: 1 1 auto;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  position: relative;
  color: #999;
  font-size: 1.5rem;
}
.note-content-editor {
  overflow-y:visible;
  width: 100%;
  min-height: 10rem;
  outline: none;
  position: relative;
  -webkit-user-modify: read-write-plaintext-only;
  margin-bottom: 4rem;
}
.note-content-editor:empty::before {
  content: 'Input Some Text';
  color: #999999;
  position: absolute;
}
</style>
