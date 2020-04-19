import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  mixins: [commonMixin],
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
    }),
  },
  methods: {
    ...mapMutations({
      setLoginInfo: "loginInfo/setLoginInfo",
    }),
    getLoginInfo: function() {
      // if (this.loginInfo != null) {
      //   return new Promise((resolve, reject) => {
      //     resolve(this.loginInfo);
      //   });
      // }

      return fetch("/api/user/loginInfo")
        .then(this.commonResponseData)
        .then((data) => {
          this.setLoginInfo(data);
          return data;
        });
    },
  },
};
