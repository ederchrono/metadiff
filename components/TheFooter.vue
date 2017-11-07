<template>
  <footer class="page-footer">
    <a class="footer-link" target="_blank" href="http://ederdiaz.com">
      EderDiaz
    </a>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
$bgColor:   #1B3B6F;
$textColor: #FFFFFF;

.page-footer {
  background-color: $bgColor;
  color: $textColor;
  padding: 10px;
  text-align: left;
}

.footer-text {
  display: inline-block;
}

.footer-link {
  float: right;
  color: $textColor;
}
</style>
