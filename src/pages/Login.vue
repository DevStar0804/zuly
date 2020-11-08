<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <div class="col-md-4 offset-md-4">
      <h1 class="text-center">Accedi al back-office di Zuly</h1>
      <h3 class="text-center text-muted">(riservato ai negozi)</h3>
      <form>
        <div class="mb-3">
          <label for="inputEmail" class="form-label">Indirizzo email</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="tua.email@esempio.it" v-model="email">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword" v-model="password">
        </div>
        <div class="alert-danger my-3" v-show="errorMessage">{{ errorMessage }}</div>
        <button :disabled="email === '' || password === ''" type="button" class="btn btn-primary" v-on:click="login()">Accedi</button>
      </form>
      <p class="mt-4">Hai dimenticato la password ? <router-link to="/reset_password">Ri-impostala</router-link>.</p>
      <p>Il tuo negozio è in Zuly ma non hai ancora un account? fatti invitare dal tuo gestore.</p>
      <p>Il tuo negozio non è ancora in Zuly? <a href="https://join.zuly.it/inizia/" target="_blank">Aderisci ora</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async performLogin () {
      let payload = {
        email: this.email,
        password: this.password
      }
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      )
      return response
    },
    login () {
      if (this.email !== '' && this.password !== '') {
        this.performLogin().then(response => {
          if (response.ok) {
            this.$emit('authenticated', true)
          } else {
            this.errorMessage = 'Accesso non riuscito'
            console.log('The email and / or password is incorrect')
          }
        })
      } else {
        this.errorMessage = 'Inserisci email e password.'
        console.log('A email and password must be present')
      }
    }
  }
}
</script>
