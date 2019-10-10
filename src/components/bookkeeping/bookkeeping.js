import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapMutations([]),

    getMyBookkeeping: function() {
      return fetch("/bookkeeping.json", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      });
    },
    moveMyBlogList: function() {
      this.$router.push("/blog/" + this.myBlog.id + "/list");
    }
  },
  created: function() {
    if (this.myBlog === null) {
      this.getMyBlog();
    }
  }
};
