<template>
  <div class="m-3">
    <b-form-group>
      <b-form-input
        v-model="blogArticle.title"
        :placeholder="$t('blogArticle.title')"
      ></b-form-input>
    </b-form-group>
    <b-form-group v-if="blogArticleCategoryList.length > 0">
      <b-form-select
        v-model="blogArticle.blogArticleCategory.id"
        :options="blogArticleCategoryList"
        text-field="name"
        value-field="id"
      ></b-form-select>
    </b-form-group>
    <b-form-group>
      <editor ref="toastuiEditor" />
    </b-form-group>
    <div class="text-right">
      <b-button variant="outline-primary" @click="createAction">{{
        $t("blogArticle.write")
      }}</b-button>
      <b-button variant="outline-secondary" @click="historyBack">{{
        $t("blogArticle.cancel")
      }}</b-button>
    </div>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";
import blogArticleCategoryMixin from "@/assets/blog/blogArticleCategory.js";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";

export default {
  mixins: [blogMixin, blogArticleMixin, blogArticleCategoryMixin],
  components: {
    editor: Editor,
  },
  data() {
    return {
      blogArticle: {
        title: "",
        content: "",
        blogArticleCategory: {},
      },
      blogArticleCategoryList: [],
    };
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  methods: {
    createAction() {
      // TODO 어떤 에디터 모드를 선택했는지도 저장이 필요할 듯함 - markdown, wysiwyg
      this.blogArticle.content = this.$refs.toastuiEditor.invoke("getMarkdown");

      this.createBlogArticle(this.blogArticle)
        .then((data) => {
          if (data !== undefined) {
            this.moveUserBlogArticleListPage();
          }
          return data;
        })
        .catch(this.commonErrorHandler);
    },
  },
  mounted() {
    this.getUserBlogArticleCategoryList().then((data) => {
      if (data !== undefined) {
        this.blogArticleCategoryList = data;
      }
    });
  },
};
</script>

<style></style>
