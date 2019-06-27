import Vue from 'vue';
import App from './App.vue';
import 'formula-css/develop/formula.scss'; // 共通のリセットCSSを読み込む


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
