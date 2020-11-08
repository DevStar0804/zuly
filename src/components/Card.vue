<template>
  <div :class="'card text-white mt-3 mb-3 ' + card_class">
    <small style="float:right" class="text-muted">{{ $options.__file }}</small>
    <div class="row g-0">
      <div class="col-1 d-flex justify-content-center align-content-center">
        <div class="align-self-top mt-3">
          <img :src="icon" :alt="title.toLowerCase() + ' icon'" width="30" height="30">
        </div>
      </div>
      <div class="col-10">
        <div class="card-body">
          <h2 class="card-title font-weight-bold">{{ title }}</h2>
          <p class="card-text">{{ caption }}</p>
          <slot></slot>
        </div>
      </div>
      <div class="col-1 d-flex justify-content-center align-content-center">
        <div class="align-self-center">
          <img src="~bootstrap-icons/icons/caret-right-fill.svg" alt="caret icon" width="30" height="30">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card_class: {
      default: 'bg-primary',
      type: String
    },
    icon: String,
    title: String,
    caption: String
  },
  data () { return { } }
}
</script>
