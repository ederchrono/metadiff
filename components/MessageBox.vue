<template>
  <div class="box" :class="colorClass">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{instructions}}</strong>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    operation: {
      type: String,
      default: ''
    },
    instructions: {
      type: String,
      default: ''
    }
  },

  computed: {
    colorClass () {
      return `${this.operation}-box`
    }
  }
}
</script>

<style>
.box {
  overflow-x: scroll;
}
.delete-box{
  background-color: rgba(255, 0, 0, 0.2);
}
.add-box {
  background-color: rgba(0, 255, 0, 0.2);
}
.modify-box {
  background-color: rgba(255, 255, 0, 0.2);
}
</style>
