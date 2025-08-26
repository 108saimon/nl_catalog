<script setup>
import { ref, computed, onMounted } from 'vue';

const modalVisible = ref(false);

const currentCity = ref('Новосибирск');

const tempCurrentCity = ref('Новосибирск');
</script>

<template>
  <header class="header wrapper">
    <div class="container">
      <div class="current-city" @click="modalVisible = true">
        <span class="current-city__icon"></span>
        {{ currentCity }}
      </div>
    </div>
    <div class="modal" v-show="modalVisible">
      <div class="modal-background" @click="modalVisible = false"></div>
      <div class="modal-window">
        <div class="close-icon" @click="modalVisible = false"></div>
        <div class="city-select__wrapper">
          <div class="city-select">
            <div class="city-select__header">
              Выбор населённого пункта:
            </div>
            <div class="city-select__input-wrapper">
              <input type="text" name="city-input" v-model="tempCurrentCity" class="city-select__input" placeholder="Например, Санкт-петербург" />
              <div class="city-select-clear__icon"></div>
              <div class="city-select__list-wrapper">
                <div class="city-select__list"></div>
              </div>
            </div>
          </div>
          <button class="city-select__submit-button">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  </header>

</template>

<style scoped>
div {
  box-sizing: border-box;
}

.header {
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px 0px #2727271A;
  height: 72px;
  margin-bottom: 35px;
}

.current-city {
  font-family: 'FuturaPTBold', sans-serif;
  font-weight: normal;
	font-style: normal;
  cursor: pointer;
}
.current-city__icon {
  width: 11px;
  height: 16px;
  display: inline-block;
  background-image: url('geo-icon.svg');
  position: relative;
  top: 2px;
  margin-right: 7px;
}

.modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-background {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 110;
  background: rgba(53, 54, 71, 0.4);
}
.modal-window {
  width: 769px;
  height: 144px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  z-index: 120;
}

.close-icon {
  margin: 16px;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0;
  left: auto;
  right: 0;
  background-image: url('cross.svg');
  background-repeat: no-repeat;
  cursor: pointer;
}

.city-select__wrapper {
  padding: 28px 18px 32px 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.city-select__header {
  font-family: 'FuturaPTBold', sans-serif;
  font-size: 20px;
  margin-bottom: 12px;
}

.city-select {
  width: calc(100% - 192px);
}

.city-select__input-wrapper {
  position: relative;
}
.city-select__input {
  width: 100%;
  box-sizing: border-box;
  outline: 0;
  font-size: 18px;
  height: 48px;
  padding: 12px 48px 13px 16px;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
}

.city-select-clear__icon {
  margin: 0;
  width: 48px;
  height: 48px;
  position: absolute;
  top: 0;
  left: auto;
  right: 0;
  background-image: url('small-cross.svg');
  background-repeat: no-repeat;
  cursor: pointer;
  background-position: 50% 50%;
}

/* 
<div class="city-select__wrapper">
  <div class="city-select">
    <div class="city-select__header"></div>
    <div class="city-select__input-wrapper">
      <div class="city-select__input"></div>
      <div class="city-select__list-wrapper">
        <div class="city-select__list"></div>
      </div>
    </div>
  </div>
  <div class="city-select__submit-button">
    Подтвердить
  </div>
</div> */
</style>