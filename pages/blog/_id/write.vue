<template>
  <div class="m-3">
    <b-form-group>
      <b-form-input v-model="blogArticle.title" :placeholder="$t('blogArticle.title')"></b-form-input>
    </b-form-group>
    <b-form-group>
      <editor ref="toastuiEditor" />
    </b-form-group>
    <div class="text-right">
      <b-button @click="createAction">{{ $t("blogArticle.write") }}</b-button>
      <b-button>{{ $t("blogArticle.cancel") }}</b-button>
    </div>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";

export default {
  mixins: [blogMixin, blogArticleMixin],
  components: {
    editor: Editor
  },
  data() {
    return {
      blogArticle: {
        title: "",
        content: ""
      }
    };
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  methods: {
    createAction() {
      this.blogArticle.content = this.$refs.toastuiEditor.invoke("getHtml");
      this.create(this.blogArticle)
        .then(data => {
          if (data !== undefined) {
            this.moveUserBlogArticleListView();
          }
          return data;
        })
        .catch(this.commonErrorHandler);
    }
  },
  mounted() {}
};
</script>

<style></style>
