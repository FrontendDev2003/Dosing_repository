<template>
  <div class="container">
    <h1>Оптимизация дозирования материалов</h1>
    
    <div class="criteria-inputs">
      <div class="input-group">
        <label>Минимальная точность (%):</label>
        <input
          type="number"
          v-model.number="criteria.accuracy"
          min="0"
          max="99"
          placeholder="0-99"
        >
        <input
          type="range"
          v-model.number="criteria.accuracy"
          min="0"
          max="99"
          class="range-slider"
        >
      </div>

      <div class="input-group">
        <label>Минимальная скорость (ед/мин):</label>
        <input
          type="number"
          v-model.number="criteria.speed"
          min="10"
          max="500"
          placeholder="10-500"
        >
        <input
          type="range"
          v-model.number="criteria.speed"
          min="10"
          max="500"
          class="range-slider"
        >
      </div>
    </div>

    <div class="results-grid">
      <div class="column">
        <h2>🎯 По точности (≥ {{ criteria.accuracy }}%)</h2>
        <div class="method-card" v-for="method in speedMethods" :key="method.id">
          <h3>{{ method.name }}</h3>
          <p>Тип: {{ method.type === 'continuous' ? 'Непрерывный' : 'Дискретный' }}</p>
          <div class="stats">
            <span>📈 Точность: {{ method.accuracy }}%</span>
            <span>⚡ Скорость: {{ method.speed }} ед/мин</span>
          </div>
        </div>
      </div>

      <div class="column">
        <h2>🚀 По быстродействию (≥ {{ criteria.speed }} ед/мин)</h2>
        <div class="method-card" v-for="method in accuracyMethods" :key="method.id">
          <h3>{{ method.name }}</h3>
          <p>Тип: {{ method.type === 'continuous' ? 'Непрерывный' : 'Дискретный' }}</p>
          <div class="stats">
            <span>📈 Точность: {{ method.accuracy }}%</span>
            <span>⚡ Скорость: {{ method.speed }} ед/мин</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      criteria: {
        accuracy: 80,
        speed: 300
      },
      methods: [
        {
          id: 1,
          name: 'Шнековый прецизионный',
          type: 'continuous',
          accuracy: 95,
          speed: 280
        },
        {
          id: 2,
          name: 'Ленточный турбо-дозатор',
          type: 'continuous',
          accuracy: 85,
          speed: 450
        },
        {
          id: 3,
          name: 'Пневматический клапанный',
          type: 'discrete',
          accuracy: 75,
          speed: 500
        },
        {
          id: 4,
          name: 'Порционный роботизированный',
          type: 'discrete',
          accuracy: 99,
          speed: 150
        }
      ]
    }
  },
  computed: {
    speedMethods() {
      return this.methods
        .filter(m => 
          m.speed >= this.criteria.speed && 
          m.accuracy >= this.criteria.accuracy
        )
        .sort((a, b) => b.speed - a.speed) // Сортировка по скорости
    },

    accuracyMethods() {
      return this.methods
        .filter(m => 
          m.accuracy >= this.criteria.accuracy && 
          m.speed >= this.criteria.speed
        )
        .sort((a, b) => b.accuracy - a.accuracy) // Сортировка по точности
    }
  },
  watch: {
    'criteria.accuracy'(newVal) {
      if (newVal < 0) this.criteria.accuracy = 0
      if (newVal > 99) this.criteria.accuracy = 99
    },
    'criteria.speed'(newVal) {
      if (newVal < 10) this.criteria.speed = 10
      if (newVal > 500) this.criteria.speed = 500
    }
  }
}
</script>

<style>
@import './assets/styles/main.css';
</style>