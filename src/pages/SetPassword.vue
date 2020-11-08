<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <div class="row m-3">
      <div class="col-md-4 offset-md-4">
        <h1 class="text-center">Imposta la tua password su Zuly</h1>
        <h3 class="text-center text-muted">(riservato ai negozi)</h3>
        <form>
          <p>Imposta la nuova password.</p>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model="password">
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Conferma la password</label>
            <input type="password" class="form-control" id="inputPassword" v-model="password1">
          </div>
          <div class="alert-danger my-3" v-show="checkPassword || errorMessage">{{ checkPassword }}{{ errorMessage }}</div>
          <div v-show="success" class="text-muted my-3">
            <p>Il cambio della password del tuo account Zuly è andato a buon fine e abbiamo mandato un'email di conferma all'indirizzo indicato.</p>
            <p>Adesso puoi <router-link to="/login">effettuare il login</router-link>.</p>
          </div>
          <button :disabled="success" type="button" class="btn btn-primary" v-on:click="setPassword()">Imposta</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      password: '',
      password1: '',
      errorMessage: '',
      success: false
    }
  },
  computed: {
    checkPassword: function () {
      if (this.password && this.password !== this.password1) {
        return 'Le password non combaciano.'
      } else {
        return ''
      }
    }
  },
  mounted: function () {
    this.token = this.$route.params.token
  },
  methods: {
    async putRequest () {
      let payload = {
        token: this.token,
        password: this.password
      }
      const response = await fetch('/api/passwd', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      )
      return response
    },
    setPassword: function () {
      this.putRequest().then(response => {
        if (response.ok) {
          this.success = true
          this.$parent.requestedRoute = ''
        } else {
          if (response.status === 401) {
            this.errorMessage = 'Non puoi cambiare la password. Forse il link è scaduto?'
          } else {
            this.errorMessage = 'C\'è stato un problema. Riprova più tardi.'
          }
        }
      })
    }
  }
}
</script>
