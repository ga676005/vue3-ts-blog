<script setup lang="ts">
import { useModal } from './composables/modal'

const { show, hideModal } = useModal()
</script>

<template>
  <div
    class="modal"
    :class="{ 'is-active': show }"
  >
    <div class="modal-background" />
    <div class="modal-content">
      <div id="modal">
        <!-- content here -->
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="hideModal"
    />
  </div>

  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "highlight.js/styles/github.css";

ul{
  list-style: revert !important;
  list-style-position: inside !important;
}

h1,h2,h3,h4,h5,h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
