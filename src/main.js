// main.js
const App = {
    data() {
      return {
        message: "Дозирование материалов работает!"
      }
    },
    template: `
      <div>
        <h1>{{ message }}</h1>
      </div>
    `
  };
  
  const app = Vue.createApp(App);
  app.mount('#app');
