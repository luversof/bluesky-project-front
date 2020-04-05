import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    ...mapMutations({
      setLoginInfo: "loginInfo/setLoginInfo"
    }),
    commonErrorHandler: function(response) {
      if (response.status == 401) {
        if (this.loginInfo != null) {
          this.setLoginInfo(null);
        }
        return response.json().then(data => {
          return this.$nuxt.error({
            statusCode: 401,
            message: data.result.message
          });
        });
      }

      return response.json().then(data => {
        if (data.result === undefined) {
          alert("알수 없는 오류");
        }

        if (Array.isArray(data.result)) {
          var message = "";
          data.result.forEach(function(result) {
            message += result.message + "\n";
          });

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

    /**
     * 응답이 정상이면 json을 반환, 에러면 throw 처리
     */
    commonResponseData: function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    },

    commonHeaders: function() {
      return { "Content-Type": "application/json", Accept: "application/json" };
    },

    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
