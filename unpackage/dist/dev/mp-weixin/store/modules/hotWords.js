"use strict";
const hotWords = {
  namespaced: true,
  state: {
    // 搜索关键字
    hotWord: []
  },
  getters: {},
  mutations: {
    setHotWord(state, fastsearchforhotwords) {
      state.hotWord = fastsearchforhotwords;
    }
  }
};
exports.hotWords = hotWords;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/hotWords.js.map
