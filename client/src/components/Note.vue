<template lang="html">
  <div class="col xs-8" style="position:relative">
    <div v-show="!isPreview && (content || definedContent)" :class="{
      'm-4 l-4 m-left-2 l-left-4': !$root.noting,
      'm-4 l-4 l-left-1': $root.noting
      }" class="content col xs-8 s-6 s-left-1 detail-container zindex-2">
      <slot name="content">
        <div class="xs-8" v-html="content"></div>
        <div class="right padding">
          <a :href="link" target="_blank">阅读原文</a>
        </div>
      </slot>
    </div>
    <div v-show="isPreview" class="content col xs-8 s-6 s-left-1 m-4 l-4 l-left-1 detail-container zindex-2">
      <h2 class="note-title" v-html="note.title || '标题为空'"></h2>
      <p class="note-description" v-html="note.description || '描述为空'"></p>
      <div class="note-content" v-html="note.content || '内容为空' | marked"></div>
    </div>
    <div v-show="$root.noting" class="note-container zindex-2 xs-8 m-3 l-6 l-left-1">
      <form class="dark">
        <div class="note-action zindex-2">
          <a @click="upload">
            <input type="file" name="name" value="">
            <i class="material-icons">photo_size_select_actual</i>
          </a>
          <!-- 小屏幕以上预览不关闭编辑器 -->
          <a class="hidden-med-down" @click="isPreview = !isPreview">
            <i v-show="!isPreview" class="material-icons">visibility</i>
            <i v-show="isPreview" class="material-icons">visibility_off</i>
          </a>
          <!-- 小屏幕预览时关闭编辑器 -->
          <a class="hidden-small-up">
            <i @click="closeEditor" class="material-icons">visibility</i>
          </a>
          <a @click="save" class="right">
            <i class="material-icons">save</i>
          </a>
          <!-- 来自笔记页面时不能关闭编辑器 -->
          <a v-show="content || definedContent" @click="closeEditor" class="right">
            <i class="material-icons">clear</i>
          </a>
        </div>
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
          <textarea id="description" rows="1" v-model="note.description"></textarea>
          <label for="description" class="input-label">Description</label>
        </div>
        <div class="note-content-editor">
          <textarea name="content" rows="3" placeholder="Let`s note something" v-model="note.content"></textarea>
        </div>
      </form>
    </div>
    <button  v-show="!$root.noting && $root.level" @click="$root.noting = true" class="wave-effect note float-btn pink-l-4">
      <i class="material-icons">border_color</i>
    </button>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import './../assets/style/github.min.css'
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
export default {
  data: function () {
    return {
      note: {
        title: '',
        description: '',
        content: '',
        tags: ''
      },
      isPreview: false
    }
  },
  props: ['content', 'editorNote', 'link', 'definedContent'],
  computed: {},
  ready: function () {
    if (this.editorNote) {
      this.note = Object.assign(this.editorNote)
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
      this.$root.noting = false
      if (!this.editorNote) {
        this.isPreview = false
      }
    }
  },
  filters: {
    marked: marked
  },
  components: {}
}
</script>

<style lang="css">
.note-title {

}
.note-description {
  padding: 1rem;
  background: #bdbdbd;
}
.note-content {
  margin-top: 1rem;
}
.note-container {
  position: fixed;
  top: 4rem;
  bottom: 0;
  right: 0;
  background: #424242;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 4;
}
@media screen and (max-width: 1024px) {
  .note-container {
    top: 0;
  }
}
.note-content-editor {
  position: absolute;
  bottom: 0;
  top: 10rem;
  margin: 0.5rem;
  width: calc(100% - 3rem);
  box-sizing: border-box;
}
.note-content-editor textarea {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  font-family: "Roboto Regular";
}
.note-action {
  width: 100%;
  padding: 0 1rem;
  margin: -1rem;
  margin-bottom: 0;
}
.note-action a {
  display: inline-block;
  height: 3rem;
  line-height: 3rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  position: relative;
}
.note-action a i {
  color: #fff;
  font-size: 1.5rem;
}
.note {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
.note i {
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
