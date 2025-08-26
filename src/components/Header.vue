<script setup>
import { ref, computed, onMounted } from 'vue';

const modalVisible = ref(false);

const currentCity = ref('Новосибирск');
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
      </div>
    </div>
  </header>

</template>

<style scoped>
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
</style>