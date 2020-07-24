<template>
  <div class="contents">
    <table class="mb20">
      <tr>
        <th>日時</th>
        <th>体重</th>
        <th>コメント</th>
      <tr>
      <tr v-for="(item, Idx) in items" :key="Idx">
        <td>{{ item.createdAt.toDate().toLocaleString() }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.comment }}</td>
      </tr>
    </table>
    <vs-alert v-if="isAlert" title="Lorem ipsum dolor sit amet" color="rgb(231, 154, 23)" class="mb20">
      体重は必須です
    </vs-alert>
    <div class="flex">
      <vs-input label="体重" v-model="weight"/>
        <vs-input label="コメント" v-model="comment"/>
    </div>
    <vs-button
      square
      icon
      @click="submit();"
    >
      登録
    </vs-button>
  </div>
</template>

<script>
  import { db } from '@/plugins/firebase'
  import { mapGetters } from 'vuex'
  export default {
    data:() => ({
      weight: null,
      comment: null,
      isAlert: false
    }),
    created: function () {
      let dbHealth = db.collection('health').orderBy('createdAt')
      this.$store.dispatch('setHealthRef', dbHealth)
    },
    computed: {
      ...mapGetters({ items: 'getHealth' })
    },
    methods: {
      submit() {
        if (this.weight === null) {
          this.isAlert = true
        } else {
          const now = new Date()
          let dbHealth = db.collection('health')
          dbHealth
            .add({
              weight: this.weight,
              comment: this.comment,
              createdAt: now
            })
            .then(ref => {
              this.isAlert = false
              console.log('Add ', ref)
            })
        }
      }
    }
  }
</script>


<style lang="scss">
.contents {
  padding: 30px;
}
.flex {
  display: flex;
}
.center {
  text-align: center;
}
.mb20 {
  margin-bottom: 20px;
}
.vs-button {
  display: inline-block;
}
table {
  border-collapse: collapse;
  margin: 1rem 0
}

tr {
  border-top: 1px solid #dfe2e5
}

tr:nth-child(2n) {
  background-color: #f6f8fa
}

td, th {
  border: 1px solid #dfe2e5;
  padding: .6em 1em
}
</style>
