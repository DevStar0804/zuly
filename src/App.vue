<template>
  <div id="app" class="bg-light">
    <small style="position: absolute;right: 10px;z-index: 100;" class="text-light">{{ $options.__file }}</small>
    <nav class="navbar navbar-light bg-primary shadow-sm">
      <router-link to="/" class="navbar-brand ml-3">
        <img :src="publicPath + 'logo.svg'" width="100" height="50" alt="zuly logo">
      </router-link>
      <span class="navbar-text h1 font-weight-bold">{{ title }}</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav text-center">
          <router-link class="nav-item nav-link" to="/">Home</router-link>
          <router-link class="nav-item nav-link" to="/about">About</router-link>
          <router-link class="nav-item nav-link" v-show="authenticated" to="/login" v-on:click.native="logout()" replace>Esci</router-link>
        </div>
      </div>
    </nav>
    <router-link v-if="live_streaming" tag="button" class="btn btn-danger btn-sm mt-3 mb-3" :to="live_streaming" role="button" style="position: fixed;right: 20px;">
      <img src="~bootstrap-icons/icons/camera-reels.svg" alt="phone icon" width="30" height="30"> on air
    </router-link>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<style lang="scss">
$primary: #008e7d;
$secondary: #75ac56;

nav {
  a {
    &.router-link-exact-active {
      color: blue!important;
    }
  }
}
video {
  max-width: 100%;
  width: 720px;
  border-style: dashed;
  display: block;
}
@import 'bootstrap';

body {
  font-family : 'Varela', sans-serif !important;
}
h1, h2, h3 {
  font-family: 'Varela Round', sans-serif;
}
</style>

<script>
import 'fontsource-varela/latin.css'
import 'fontsource-varela-round/latin.css'

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      requestedRoute: '',
      authenticated: false,
      title: 'Zuly',
      live_streaming: '',
      isChannelReady: false,
      isStarted: false,
      localStream: null,
      peerConnection: null,
      socket: null
    }
  },
  mounted () {
    this.requestedRoute = window.location.pathname
    console.log('requestedRoute = ', this.requestedRoute)
    if (this.requestedRoute === '/reset_password' || this.requestedRoute.substring(0, 13) === '/set_password') {
      // unsecured routes
      return
    }
    this.getSession().then(data => {
      let id = data ? data.id : ''
      console.log('user_id = ', id)
      if (id) {
        this.setAuthenticated()
      } else {
        this.authenticated = false
        if (this.requestedRoute === '/login') {
          this.requestedRoute = ''
        } else {
          this.$router.replace('/login')
        }
      }
    })
  },
  methods: {
    async getSession () {
      // returns logged user id if logged, else undefined
      const response = await fetch('/api/session', {
        mode: 'no-cors',
        headers: {
          'accept': 'application/json'
        }
      })
      return response.json()
    },
    async performLogout () {
      const response = await fetch('/api/session', { method: 'DELETE' })
      return response.ok
    },
    logout () {
      this.performLogout().then(ok => { this.authenticated = false })
    },
    setAuthenticated () {
      console.log('authenticated!')
      this.authenticated = true
      let newRoute = this.requestedRoute || '/'
      if (newRoute !== window.location.pathname) {
        console.log('moving to ', newRoute)
        this.$router.replace(newRoute)
      }
    }
  }
}
</script>
