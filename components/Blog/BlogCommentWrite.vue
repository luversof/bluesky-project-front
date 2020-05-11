<template>
  <div>
    <b-input-group>
      <b-form-textarea v-model="value.comment" />
      <b-input-group-append>
        <b-button variant="outline-primary" @click="click" v-text="$t(text)" />
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: ["value", "text", "click"],
};
</script>

<style></style>
