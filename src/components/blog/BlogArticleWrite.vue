<template>
  <div>
    <b-form>
      <b-form-group
        label-cols-sm="4"
        label-cols-lg="3"
        label-class="text-sm-right"
        :label="$t('blog.article.title')"
        :invalid-feedback="blogArticleStateInfo.title.invalidFeedback"
        :state="blogArticleStateInfo.title.state"
      >
        <b-form-input v-model.trim="title"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="4"
        label-cols-lg="3"
        label-class="text-sm-right"
        :label="$t('blog.article.content')"
        :invalid-feedback="blogArticleStateInfo.content.invalidFeedback"
        :state="blogArticleStateInfo.content.state"
      >
        <b-form-textarea v-model="content" :rows="16" :max-rows="6"></b-form-textarea>
      </b-form-group>
      <div class="text-center">
        <b-button variant="primary" @click="postArticle">{{ $t("blog.article.write") }}</b-button>
        <blog-button-article-list-view :blog-id="blogId"/>
      </div>
    </b-form>
  </div>
</template>

// TODO invalid 처리는 어떻게 해야하는지 확인 필요
// TODO NUXT 공부하자
<script>
import BlogButtonArticleListView from "@/components/blog/button/BlogButtonArticleListView";
import blogMixin from "@/components/blog/blog.js";
import { mapState } from "vuex";

export default {
  name: "BlogArticleWrite",
  mixins: [blogMixin],
  props: ["blogId"],
  components: { BlogButtonArticleListView },
  computed: {
    ...mapState({
      blogArticleStateInfo: state => state.blog.blogArticleStateInfo
    })
  },
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    postArticle: function() {
      this.initBlogArticleStateInfo();

      var _this = this;
      this.$http
        .post("/api/blogArticles", {
          title: this.title,
          content: this.content,
          blog: this.myBlog._links.blog.href
        })
        .then(function() {
          _this.moveMyBlogList();
        })
        .catch(function(error) {
          var blogArticleStateInfo = _this.blogArticleStateInfo;
          if (
            error.response.data.result !== undefined &&
            Array.isArray(error.response.data.result)
          ) {
            for (var idx in error.response.data.result) {
              var errorMessage = error.response.data.result[idx];
              var targetField = blogArticleStateInfo[errorMessage.field];
              if (targetField !== undefined) {
                targetField.state = false;
                targetField.invalidFeedback = errorMessage.message;
              }
            }
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
