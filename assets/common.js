import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    ...mapMutations({}),
    commonErrorHandler: function(response) {
      if(response.status == 401) {
        if (this.loginInfo != null) {
          location.reload();
        } 
        return response.json().then(data => {
          return this.$nuxt.error({ statusCode: 401, message: data.result.message })
        });
      }
      
      return response.json().then(data => {
        if (data.result === undefined) {
          alert("알수 없는 오류");
        }

        if (Array.isArray(data.result)) {
          var message = "";
          for (var i = 0; i < data.result.length; i++) {
            message += data.result[i].message + "\n";
          }
          alert(message);
          return;
        }

        var errorMessage = data.result;
        if (errorMessage.displayableMessage) {
          alert(errorMessage.message);
        } else {
          alert("에러가 발생하였습니다.");
        }
      });
    },
    commonResponseData: function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    }
  }
};
