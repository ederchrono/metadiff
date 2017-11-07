<template>
  <div class="meta-fetcher">
    <form action="" @submit.prevent="fetchMetadata">

      <label class="label">{{label}}</label>
      <div class="field is-grouped">
        <div class="control has-icons-right url-input">
          <input class="input"
            :class="{'is-success': metadataGot, 'is-danger': metadataFail}"
            type="text"
            placeholder="URL to fetch metatags"
            v-model="urlToCheck">
          <span v-if="metadataGot" class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
          <span v-if="metadataFail" class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <div class="control">
          <button
            class="button is-link"
            :class="{'is-loading': isLoading, 'disabled': isLoading}">
            Fetch
          </button>
        </div>
      </div>

    </form>

    <p v-if="metadataGot" class="help is-success">
      {{metatagsFound}} head meta-tags found
    </p>

    <p v-if="metadataFail" class="help is-danger">
      Invalid URL or no metatags found.
    </p>

  </div>
</template>

<script>
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

export default {
  data () {
    return {
      urlToCheck: 'http://www.foxnews.com/about/company/',
      metadata: '',
      isLoading: false
    }
  },

  props: {
    label: {
      type: String,
      default: 'URL'
    }
  },

  methods: {
    async fetchMetadata () {
      this.isLoading = true
      const { data } = await axios.get('/api/metadata/', {
        params: {
          url: this.urlToCheck
        }
      })
      this.metadata = data
      this.$emit('metadataFetch', data)
      this.isLoading = false
    }
  },

  computed: {
    metadataGot () {
      return !isEmpty(this.metadata)
    },
    metadataFail () {
      return this.metadata !== '' && isEmpty(this.metadata)
    },
    metatagsFound () {
      if (this.metadataFail) {
        return 0
      }

      return this.metadata.count
    }
  }
}
</script>

<style scoped>
.url-input {
  width: calc(100% - 120px);
}
.meta-text {
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.help {
  position: absolute;
}

.meta-fetcher {
  margin-bottom: 50px;
}
</style>
