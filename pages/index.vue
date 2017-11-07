<template>
  <section class="container">

    <div class="midScreen">
        <meta-fetcher
          label="Production site URL"
          @metadataFetch="updateMeta1"/>
    </div>

    <div class="midScreen">
        <meta-fetcher
          label="Dev site URL"
          @metadataFetch="updateMeta2"/>
    </div>

    <meta-results
      :diff="diff"
      :meta1="meta1"
      :meta2="meta2"
      :meta1Count="meta1Count"
      :meta2Count="meta2Count"
      />

  </section>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import MetaFetcher from '~/components/MetaFetcher'
import MetaResults from '~/components/MetaResults'
import diff from 'deep-diff/releases/deep-diff-0.3.8.min.js'

export default {
  components: {
    MetaFetcher,
    MetaResults
  },

  data () {
    return {
      meta1: {},
      meta2: {},
      meta1Count: 0,
      meta2Count: 0
    }
  },

  methods: {
    updateMeta1 (data) {
      this.meta1 = {namedData: data.namedData, unnamedData: data.unnamedData}
      this.meta1Count = data.count
    },
    updateMeta2 (data) {
      this.meta2 = {namedData: data.namedData, unnamedData: data.unnamedData}
      this.meta2Count = data.count
    }
  },

  computed: {
    diff () {
      if (!isEmpty(this.meta1) && !isEmpty(this.meta2)) {
        return diff(this.meta1, this.meta2) || []
      }

      return null
    }
  },

  head () {
    return {
      title: 'Metadiff'
    }
  }
}
</script>

<style scoped>
.midScreen {
  display: inline-block;
  width: 50%;
}
</style>
