<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <div class="row m-3">
      <div class="col-md-4 offset-md-4">
        <h1 class="text-center">Ri-imposta la tua password su Zuly</h1>
        <h3 class="text-center text-muted">(riservato ai negozi)</h3>
        <form>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Indirizzo email</label>
            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="tua.email@esempio.it" v-model="email">
            <div class="alert-danger my-3" v-show="errorMessage">{{ errorMessage }}</div>
            <p id="emailHelp" class="text-muted my-3">{{ successMessage }}</p>
          </div>
          <button :disabled="disabled || email === ''" type="button" class="btn btn-primary" v-on:click="requestPassword()">Invia la richiesta</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      successMessage: 'Manderemo un\'email a questo indizzo.',
      errorMessage: '',
      disabled: false
    }
  },
  methods: {
    async postRequest () {
      let payload = {
        email: this.email
      }
      const response = await fetch('/api/passwd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      )
      return response
    },
    requestPassword: function () {
      this.errorMessage = ''
      var emailFilter = /^([a-zA-Z0-9_.-]+\+?[a-zA-Z0-9_.-]+)@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
      if (!emailFilter.test(this.email)) {
        this.errorMessage = 'Inserisci un indirizzo email valido.'
        return false
      } else {
        this.postRequest().then(response => {
          if (response.ok) {
            this.successMessage = 'Abbiamo mandato un\'email all\'indirizzo indicato, con le istruzioni per ri-impostare la tua password su Zuly.'
            this.disabled = true
          } else {
            this.errorMessage = 'C\'è stato un problema. Riprova più tardi.'
          }
        })
      }
    }
  }
}
</script>
