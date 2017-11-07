<template>
  <section class="meta-results">
    <div v-if="diff">
      <div class="tags has-addons">
        <span
          class="tag"
          :class="diffClass">
          {{differencesCount}}
        </span>
        <span class="tag">differences found.</span>
      </div>
      <progress class="progress"
        :class="diffClass"
        :value="diffPercentage"
        max="100">
        {{diffPercentage}}%
      </progress>

      <div v-if="diff.length" class="tabs format-menu is-right">
        <ul>
          <li :class="{'is-active': format==='HTML'}">
            <a @click.prevent="format='HTML'">HTML</a>
          </li>
          <li :class="{'is-active': format==='JSON'}">
            <a @click.prevent="format='JSON'">JSON</a>
          </li>
        </ul>
      </div>

      <message-box
        v-if="meta1Count !== meta2Count && differencesCount === 0"
        instructions="Caution: You may have duplicated metatags"
        operation="delete"/>

      <diff-box
        :format="format"
        instructions="Remove these tags:"
        :lines="addedLines.map(line => line.rhs)"
        operation="delete"/>

      <diff-box
        :format="format"
        instructions="Add these tags:"
        :lines="removedLines.map(line => line.lhs)"
        :copyButton="true"
        operation="add"/>

      <diff-box
        :format="format"
        instructions="These tags have different attributes, overwrite them:"
        :lines="editedLines.map(line => line.lhs)"
        :copyButton="true"
        operation="modify"/>

    </div>
    <div v-else>
      Fetch both sites metadata to start analysis.
    </div>
  </section>
</template>

<script>
import MessageBox from './MessageBox'
import DiffBox from './DiffBox'
export default {
  components: {
    MessageBox,
    DiffBox
  },

  data () {
    return {
      format: 'HTML'
    }
  },

  props: {
    diff: {
      type: Array,
      default: null
    },
    meta1: {
      type: Object,
      required: true
    },
    meta2: {
      type: Object,
      required: true
    },
    meta1Count: {
      type: Number,
      required: true
    },
    meta2Count: {
      type: Number,
      required: true
    }
  },

  computed: {
    differencesCount () {
      return this.diff.length
    },
    diffClass () {
      return {
        'is-success': this.differencesCount === 0,
        'is-warning': this.differencesCount >= 1 && this.differencesCount <= 10,
        'is-danger': this.differencesCount > 10
      }
    },
    diffPercentage () {
      return 100 - (this.differencesCount / this.meta1Count * 100)
    },

    addedLines () {
      return this.diff.filter(item => item.kind === 'N')
    },
    removedLines () {
      return this.diff.filter(item => item.kind === 'D')
    },
    editedLines () {
      return this.diff.filter(item => item.kind === 'E')
    },
    arrayChange () {
      return this.diff.filter(item => item.kind === 'A')
    }
  }
}
</script>

<style>
.meta-results {
  margin-bottom: 30px;
}
.progress {
  max-width: 155px;
  margin-top: -20px;
}

.format-menu {
  margin-top: -40px;
}
</style>
