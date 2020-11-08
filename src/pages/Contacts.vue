<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <h1 class="text-primary font-weight-bold">
      <router-link to="/"><img src="~bootstrap-icons/icons/caret-left-fill.svg" alt="caret icon" width="30" height="30"></router-link>
      <span>Contatti</span>
      <div class="form-check float-right h5">
        <input class="form-check-input" type="checkbox" v-model="dismissed" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          Mostra contatti già letti
        </label>
      </div>
    </h1>
    <router-link :to="'/contact/' + c.id" v-for="c in filtered_contacts" :key="c.id" class="text-decoration-none">
      <Card :card_class="c.dismissed ? 'bg-dark' : 'bg-primary'" :title="c.title" :caption="c.mtime" :icon="publicPath + 'icons/person.svg'"/>
    </router-link>
    <div class="alert-secondary p-2 mt-5" v-show="count == 0">Non ci sono contatti</div>
    <button type="button" class="btn btn-primary btn-lg float-right m-5" disabled>Aggiungi contatto (TODO)</button>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  components: {
    Card
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      stores: [],
      contacts: [],
      count: 0,
      dismissed: false
    }
  },
  methods: {
    async fetchStores () {
      const response = await fetch('/api/stores', {
        mode: 'no-cors',
        headers: {
          'accept': 'application/json'
        }
      }
      )
      return response.json()
    },
    async fetchContacts () {
      const response = await fetch('/api/contacts', {
        mode: 'no-cors',
        headers: {
          'accept': 'application/json'
        }
      }
      )
      return response.json()
    }
  },
  computed: {
    filtered_contacts () {
      if (this.dismissed) {
        return this.contacts
      } else {
        return this.contacts.filter(c => { return !c.dismissed })
      }
    }
  },
  mounted () {
    let self = this
    this.fetchStores().then(data => {
      self.stores = data.stores
      self.fetchContacts().then(data => {
        data.contacts.forEach(c => {
          if (self.stores.length > 1) { c.title = c.store_id + ' - ' + (c.name || c.request || c.telephone_number) } else { c.title = c.name || c.request || c.telephone_number }
        }
        )
        self.contacts = data.contacts
        self.count = data.contacts.length
      }
      )
    }
    )
  }
}
</script>
