<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <router-link to="/contacts" class="text-decoration-none">
      <Card title="Contatti" :caption="caption" :icon="publicPath + 'icons/people.svg'"/>
    </router-link>
    <Card title="Eventi" caption="Hai 2 eventi in programma, 1 nei prossimi 30 giorni" :icon="publicPath + 'icons/calendar-event.svg'"/>
    <Card title="Statistiche" caption="Hai ricevuto +15% di contatti nell'ultima settimana" :icon="publicPath + 'icons/graph-up.svg'"/>
    <router-link v-for="s in stores" :to="'/store/' + s.id" :key="s.id" class="text-decoration-none">
      <Card :title="'Vetrina digitale di ' + s.id" caption="Dati dei negozio, foto, links" :icon="publicPath + 'icons/gear.svg'"/>
    </router-link>
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
      contacts: 0
    }
  },
  computed: {
    caption: function () {
      if (this.contacts === 0) { return 'Non ci sono contatti da leggere' } else if (this.contacts === 1) { return 'Hai un contatto da leggere' } else { return 'Hai ' + this.contacts + ' contatti da leggere' }
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
    }
  },
  mounted () {
    this.fetchStores().then(data => {
      this.stores = data.stores
      this.contacts = data.contacts
    }
    )
  }
}
</script>
