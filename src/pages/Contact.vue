<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <h1 class="text-primary font-weight-bold">
      <router-link to="/contacts"><img src="~bootstrap-icons/icons/caret-left-fill.svg" alt="caret icon" width="30" height="30"></router-link>
      Contatto {{ index + 1 }} di {{ total }} per {{ contact.store_id }}
      <router-link tag="button" :disabled="!previous" class="btn btn-secondary btn-sm mt-3 mb-3" :to="'/contact/' + previous" role="button">precedente</router-link>
      <router-link tag="button" :disabled="!next" class="btn btn-secondary btn-sm mt-3 mb-3" :to="'/contact/' + next" role="button">prossimo</router-link>
    </h1>
    <ul class="list-group">
      <li class="list-group-item list-group-item-dark">Nome</li>
      <li class="list-group-item list-group-item-light">
        <input name="fname" autocomplete="given-name" type="text" class="px-3 py-1 w-100 rounded mb-2" v-model.lazy="contact.name" />
      </li>
      <li class="list-group-item list-group-item-dark">Data</li>
      <li class="list-group-item list-group-item-light">{{ contact.mtime }}</li>
      <li class="list-group-item list-group-item-dark">Richiesta</li>
      <li class="list-group-item list-group-item-light">
        <textarea class="rounded px-3 py-2 mb-2 w-100" v-model.lazy="contact.request"></textarea>
      </li>
      <li class="list-group-item list-group-item-dark">Numero di telefono</li>
      <li class="list-group-item list-group-item-light">
        <input name="mobile" autocomplete="tel" type="number" class="px-3 py-1 w-100 rounded mb-2" v-model.lazy="contact.telephone_number" />
        <a class="btn btn-secondary rounded-circle" href="#" role="button" data-title="Chiama col telefono"><img src="~bootstrap-icons/icons/telephone-outbound.svg" alt="phone icon" width="30" height="30"></a>
        <a  data-title="Chiama con WhatsApp" class="" href="#" role="button"><img :src="publicPath + 'WhatsApp.svg'" alt="whatsapp icon" width="60" height="60"></a>
      </li>
      <li class="list-group-item list-group-item-dark">Email</li>
      <li class="list-group-item list-group-item-light">
        <input name="email" autocomplete="email" type="email" class="px-3 py-1 w-100 rounded mb-2" v-model.lazy="contact.email" />
      </li>
      <li class="list-group-item list-group-item-dark">Preferenze di contatto</li>
      <li class="list-group-item list-group-item-light">
        <input type="text" class="px-3 py-1 w-100 rounded mb-2" v-model.lazy="contact.preference" />
      </li>
    </ul>
    <div class="btn-group" role="group" aria-label="Comandi sui contatti">
      <router-link tag="button" class="btn btn-secondary btn-lg mt-3 mb-3" :to="'/store/' + contact.store_id + '/live/' + contact_id" role="button"><img src="~bootstrap-icons/icons/camera-reels.svg" alt="phone icon" width="30" height="30"> Avvia il live-streaming</router-link>
      <button type="button" class="btn btn-secondary btn-lg mt-3 mb-3" v-on:click="contact.dismissed = !contact.dismissed">
        <span v-if="contact.dismissed">
          Segna come da leggere
        </span>
        <span v-else>
          Segna come letto
        </span>
      </button>
      <button disabled type="button" class="btn btn-secondary btn-lg mt-3 mb-3">Proposta di acquisto</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-toast-notification/dist/theme-default.css'

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      contact_id: null,
      contact: { },
      contacts: [],
      index: '',
      total: '',
      freeze: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    this.freeze = true
    this.load(to, next)
  },
  watch: {
    contact: {
      handler (val) {
        if (!this.freeze) {
          this.freeze = true
          console.log('PUT = ', this.contact)
          this.putContact().then(data => {
            this.freeze = false
            Vue.$toast.open(
              {
                message: 'Richiesta aggiornata',
                type: 'success',
                position: 'top-left'
              }
            )
          }
          )
        }
      },
      deep: true
    }
  },
  computed: {
    previous: function () {
      if (this.index > 0) {
        return this.contacts[this.index - 1]
      } else {
        return null
      }
    },
    next: function () {
      if (this.index + 1 < this.total) {
        return this.contacts[this.index + 1]
      } else {
        return null
      }
    }
  },
  methods: {
    async fetchContact () {
      const response = await fetch('/api/contacts/' + this.contact_id, {
        mode: 'no-cors',
        headers: {
          'accept': 'application/json'
        }
      }
      )
      return response.json()
    },
    async putContact () {
      let payload = this.contact
      const response = await fetch('/api/stores/' + this.contact.store_id + '/contacts/' + this.contact_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }
      )
      return response.json()
    },
    load (to, callback) {
      this.contact_id = to.params.contact_id
      let self = this
      self.fetchContact().then(data => {
        self.contacts = data.contacts
        self.contact = data.contact
        self.total = data.contacts.length
        self.index = data.contacts.findIndex((c) => { return c === self.contact_id })
        Vue.nextTick(() => {
          self.freeze = false
        })
        if (callback) { callback() }
      })
    }
  },
  mounted: function () {
    this.load(this.$route)
  }
}
</script>
