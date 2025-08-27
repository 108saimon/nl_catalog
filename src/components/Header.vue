<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const currentCity = ref('Новосибирск');
const currentCityId = ref(1);

const cityLabel = ref('');

const cityIsSelect = ref(false);
const cityLabelTemp = ref('');
const cityTemp = ref(null);

const cityList = ref([]);
const listIsVisible = ref(false);

// таймаут для ввода
let inputTimeout = null;

function changeCityInput(event) {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    if (event?.target?.value && event.target.value.length > 2) {
      getCityByString(event.target.value);
    } else {
      cityList.value = [];
      listIsVisible.value = false;
    }
  }, 300);
}

function clearInput() {
  cityLabelTemp.value = ('');
  listIsVisible.value = false;
  cityList.value = [];
}

function cityInputFocus() {
  if (cityList.value.length > 0) {
    listIsVisible.value = true;
  }
}

function getCityByString(str) {
  axios.get('/api/api/catalog3/v1/city/', {
    params: {
      'term': str,
      'country': 'ru'
    }, 
  })
  .then(response => {
    if (response?.data?.data) {
      cityList.value = response.data.data;
      if (cityList.value.length > 0) {
        listIsVisible.value = true;
      }
      console.log(cityList.value);
    }
  })
  .catch(error => {
    console.error('Ошибка при запросе:', error);
  });
}

function selectCity(city) {
  cityTemp.value = city;
  console.log(city);
  console.log(cityTemp.value.label);
  cityLabelTemp.value = cityTemp.value.label;
  // listIsVisible.value = false;
}

const modalVisible = ref(false);

function showModal () {
  modalVisible.value = true
}

function hideModal() {
  modalVisible.value = false
}

</script>

<template>
  <header class="header wrapper">
    <div class="container">
      <div class="current-city" @click="showModal">
        <span class="current-city__icon"></span>
        {{ currentCity }}
      </div>
    </div>
    <div class="modal" v-show="modalVisible">
      <div class="modal-background" @click="hideModal"></div>
      <div class="modal-window">
        <div class="close-icon" @click="hideModal"></div>
        <div class="city-select__wrapper">
          <div class="city-select">
            <div class="city-select__header">
              Выбор населённого пункта:
            </div>
            <div class="city-select__input-wrapper" :class="{ 'city-select__input-wrapper_show-list': listIsVisible }">
              <input type="text"
                name="city-input"
                autocomplete="off"
                class="city-select__input"
                :class="{'city-select__input-focus': listIsVisible }"
                placeholder="Например, Санкт-петербург"
                v-model="cityLabelTemp"
                @input="changeCityInput"
                @focus="cityInputFocus"
                />
              <div class="city-select-clear__icon" @click="clearInput"></div>
              <div class="city-select__list-wrapper" v-show="listIsVisible">
                <div class="city-select__list">
                  <div class="city-select__item"
                    v-for="city in cityList"
                    :key="city.id"
                    @click="selectCity(city)"
                    >
                    {{ city.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button 
            class="city-select__submit-button"
            :class="{
              'city-select__submit-button-active': cityIsSelect
            }"
            >
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
.city-select__input-wrapper_show-list::after {
  content: '';
  position: absolute;
  height: 1px;
  width: calc(100% - 24px);
  top: 42px;
  left: 12px;
  background: rgba(151, 151, 151, 0.3);
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
  font-family: 'FuturaPTLight';
  height: 48px;
  padding: 12px 48px 13px 16px;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
}
.city-select__input:focus, .city-select__input-focus {
  border: 1px solid rgba(39, 39, 39, 1);
  color: #272727;
}

.city-select__list-wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  padding-top: 3px;
  padding-bottom: 4px;
  max-height: 174px;
  background: #fff;
  overflow: auto;
  border: 1px solid rgba(39, 39, 39, 1);
  border-top: 0px;
  border-radius: 0 0 5px 5px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.city-select__list-wrapper::-webkit-scrollbar {
  display: none;
}

.city-select__list {
  margin-top: 12px;
}
.city-select__item {
  font-size: 18px;
  font-family: 'FuturaPTLight';
  color: #979797;
  line-height: 24px;
  margin-bottom: 7px;
  padding: 0 16px;
}
.city-select__item:hover {
  color: #272727;
  cursor: pointer;
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
.city-select__submit-button-active {
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  color: #fff;
  cursor: pointer;
  border: none;
  background: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
}
.city-select__submit-button-active::before {
  content: "";
  position: absolute;
  inset: 0px;
  transform: translate(2px, 6px);
  z-index: -1;
  background: linear-gradient(270deg, rgba(255, 168, 0, 0.6) 0%, rgba(255, 111, 0, 0.6) 100%);
  filter: blur(10px);
}

</style>