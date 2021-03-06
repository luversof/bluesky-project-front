import { mapState, mapMutations } from "vuex";

/**
 * String format 처리
 * 문자열에 "{0}.."와 같이 대치 예약어가 있는 경우 넘겨받은 argument로 치환 처리함
 * @returns
 */
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function() {
    return args[arguments[1]];
  });
};

export default {
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
    }),
  },
  methods: {
    ...mapMutations({
      setLoginInfo: "loginInfo/setLoginInfo",
    }),
    /**
     * 에러를 catch 하여 alert message 처리하는 handler
     * @param {*} response
     */
    commonErrorHandler: function(response) {
      if (response.status == 401) {
        if (this.loginInfo != null) {
          this.setLoginInfo(null);
        }
        return this.$nuxt.error({
          statusCode: 401,
          message: this.$t("NEED_LOGIN"),
        });
        // return response.json().then((data) => {
        //   return this.$nuxt.error({
        //     statusCode: 401,
        //     message: data.result.message,
        //   });
        // });
      }

      return response.json().then((data) => {
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
     * 응답이 정상이면 json을 반환, 에러면 throw 처리? <- 동작안하는 듯?
     */
    commonResponseData: function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    },

    /**
     * 뒤로가기 액션
     * @param {*} step
     */
    historyBack: function() {
      history.go(-1);
    },

    commonHeaders: function() {
      return { "Content-Type": "application/json", Accept: "application/json" };
    },

    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function(el) {
        el.focus();
      },
    },
  },
};
