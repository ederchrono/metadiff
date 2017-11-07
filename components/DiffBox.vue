<template>
  <div v-if="lines.length" class="box" :class="colorClass">

    <div
      v-if="copyButton"
      class="button is-small copy-button"
      v-clipboard:copy="diffToCopy"
      v-clipboard:error="() => copySuccess(false)"
      v-clipboard:success="() => copySuccess(true)">
      {{copyButtonText}}
    </div>

    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{instructions}}</strong>
          </p>
          <div
            v-for="(line, index) in lines"
            :key="index">
            {{diffToString(line, index)}}
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data () {
    return {
      copyButtonText: 'Copy'
    }
  },

  props: {
    lines: {
      type: Array,
      required: true
    },
    operation: {
      type: String,
      default: ''
    },
    instructions: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'HTML'
    },
    copyButton: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    colorClass () {
      return `${this.operation}-box`
    },
    diffToCopy () {
      let result = ''
      this.lines.forEach((line, index) => {
        result += this.diffToString(line, index) + '\n'
      })
      return result
    }
  },

  methods: {
    diffToString (line, index) {
      if (this.format === 'HTML') {
        return this.toHtmlString(line, index)
      }
      return this.toJsonString(line, index)
    },
    toHtmlString (line, index) {
      if (typeof line !== 'string') {
        return ''
      }
      const lineObject = JSON.parse(line)
      let attributes = ''
      for (var key in lineObject) {
        attributes += ` ${key}="${lineObject[key]}"`
      }
      return `<meta${attributes} />`
    },
    toJsonString (line, index) {
      if (typeof line !== 'string') {
        return ''
      }

      const jsonLine = line
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\'')
        .replace(/,/g, '\', ')
        .replace(/':/g, '\': ')

      if (index < this.lines.length - 1) {
        return jsonLine + ','
      }

      return jsonLine
    },
    copySuccess (success) {
      if (!success) {
        this.copyButtonText = 'Error'
      }
      this.copyButtonText = 'Copied'

      // return copy button to normal
      setTimeout(() => {
        this.copyButtonText = 'Copy'
      }, 1500)
    }
  }
}
</script>

<style>
.box {
  overflow-x: scroll;
}

.copy-button {
  position: absolute;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
}
.copy-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
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
