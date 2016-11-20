<template lang="html">
    <div v-show="noting" class="note-container">
      <div class="note-action zindex-2">
        <a @click="upload">
          <input type="file" name="name" value="">
          <i class="material-icons">photo_size_select_actual</i>
        </a>
        <a class="hidden-med-down" @click="isPreview = !isPreview">
          <i v-show="!isPreview" class="material-icons">visibility</i>
          <i v-show="isPreview" class="material-icons">visibility_off</i>
        </a>
        <a @click="save" class="right">
          <i class="material-icons">save</i>
        </a>
        <a @click="closeEditor" class="hidden-small-up">
          <i  class="material-icons">visibility</i>
        </a>
        <a @click="closeEditor" class="right hidden-small-down">
          <i class="material-icons">close</i>
        </a>
      </div>
      <div class="note-editor">
        <div class="row">
          <div class="form-input xs-5">
            <input type="text" id="title" v-model="note.title">
            <label for="title" class="input-label">Title</label>
          </div>
          <div class="form-input right xs-3">
            <input type="text" id="tag" placeholder="" v-model="note.tags">
            <label for="tag" class="input-label">Tags</label>
          </div>
        </div>
        <div class="form-input xs-8">
          <textarea spellcheck="false" id="description" rows="1" v-model="note.description"></textarea>
          <label for="description" class="input-label">Description</label>
        </div>
        <div class="note-content-editor">
          <textarea spellcheck="false" name="content" rows="3" placeholder="Let`s note something" v-model="note.content"></textarea>
        </div>
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
      },
      isPreview: false,
      noting: false
    }
  },
  props: ['content', 'editorNote', 'link', 'definedContent'],
  computed: {},
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
      if (this.note._id) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this
        .Note
        .create(this.note)
        .then((res) => {
          this.$toast('保存成功')
        })
    },
    update () {
      this
        .Note
        .updateById({id: this.note._id}, this.note)
        .then((res) => {
          this.$toast('更新成功')
        })
    },
    closeEditor () {
      this.noting = false
      this.isPreview = false
    }
  },
  components: {}
}
</script>

<style lang="css">
.note-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 13;
  width: 100%;
}
.note-action {
  background: #3d3b4a;
  margin: 0.5rem 1rem;
  width: calc(100% - 2rem);
  border-radius: 5px;
  display: flex;
  bottom: 0;
  position: absolute;
}
.note-action a, .note-action a i {
  flex: 1 1 auto;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  position: relative;
  color: #fff;
  font-size: 1.5rem;
}
.note-editor {
  background: #3d3b4a;
  margin: 0.5rem 1rem;
  width: calc(100% - 2rem);
  bottom: 4rem;
  top: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  position: absolute;
}
.note-content-editor {
  position: absolute;
  bottom: 0.5rem;
  top: 7.5rem;
  /*margin: 0.5rem ;*/
  width: calc(100% - 1rem);
  box-sizing: border-box;
}
.note-content-editor textarea {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

</style>
