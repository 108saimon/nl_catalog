<script setup>
import { ref, computed, onMounted } from 'vue';

const modalVisible = ref(false);

const currentCity = ref('Новосибирск');

const tempCurrentCity = ref('Новосибирск');

function changeCityInput(event) {
  if (event?.target?.value && event.target.value.length > 2) {
    console.log(event.target.value);
  }
}

function clearInput() {
  tempCurrentCity.value = ('');
}
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
              <input type="text"
                name="city-input"
                class="city-select__input"
                placeholder="Например, Санкт-петербург"
                v-model="tempCurrentCity"
                @input="changeCityInput"
                />
              <div class="city-select-clear__icon" @click="clearInput"></div>
              <div class="city-select__list-wrapper">
                <div class="city-select__list"></div>
              </div>
            </div>
          </div>
          <button class="city-select__submit-button">
            ПОДТВЕРДИТЬ
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
  position: fixed;
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

.city-select__submit-button {
  box-sizing: border-box;
  width: 174px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid rgba(151, 151, 151, 0.3);
  color: rgba(172, 172, 172, 1);
  font-size: 16px;
  font-family: 'FuturaPTBold', sans-serif;
  background: #fff;
  position: relative;
  top: 32px;
  z-index: 130;
}
.city-select__submit-button:hover {
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  color: #fff;
  cursor: pointer;
  border: none;
  background: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
}
/* .city-select__submit-button:hover::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
  filter: blur(15px);
  z-index: 125;
  border-radius: 10px;
} */


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