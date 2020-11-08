<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <h1 class="text-primary font-weight-bold">
      <router-link :to="'/contact/' + contact_id"><img src="~bootstrap-icons/icons/caret-left-fill.svg" alt="caret icon" width="30" height="30"></router-link>
      Live-streaming con {{ name }}
    </h1>
    <p>Invia questo link a {{ name }}: <a target="_blank" :href="'https://zuly.it/store/' + store_id + '/live/' + contact_id">https://zuly.it/store/{{ store_id }}/live/{{ contact_id }}</a></p>
    <div class="btn-group" role="group" aria-label="Invia live-streaming link">
      <a class="btn btn-secondary" href="#" role="button"><img src="~bootstrap-icons/icons/telephone-outbound.svg" alt="phone icon" width="30" height="30"> Invia con un SMS</a>
      <a class="btn btn-secondary" href="#" role="button"><img :src="publicPath + 'WhatsApp.svg'" alt="whatsapp icon" width="30" height="30"> Invia con WhatsApp</a>
      <a class="btn btn-secondary" href="#" role="button"><img src="~bootstrap-icons/icons/envelope.svg" alt="email icon" width="30" height="30"> Invia tramite E-mail</a>
    </div>
    <hr>
    <video id="localVideo" autoplay muted playsinline class="mx-auto"></video>
    <button type="button" class="btn btn-secondary btn-lg w-100 mt-3 mb-3" v-on:click="hangup" :disabled="!$parent.live_streaming">Termina il live-streaming</button>
    <button type="button" class="btn btn-secondary btn-lg w-100 mt-3 mb-3">Proposta di acquisto</button>
  </div>
</template>

<script>
import 'webrtc-adapter'
import io from 'socket.io-client'

var pcConfig = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  },
  {
    'urls': 'turn:zuly.it:3478',
    'credential': 'test1',
    'username': 'test1'
  }]
}

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      store_id: null,
      contact_id: '',
      name: 'Paolo Greppi'
    }
  },
  methods: {
    sendMessage: function (message) {
      console.log('Client sending message: ', message)
      this.$parent.socket.emit('message', message)
    },
    gotStream: function (stream) {
      console.log('Adding local stream.')
      this.$parent.localStream = stream
      var localVideo = document.querySelector('#localVideo')
      localVideo.srcObject = stream
      this.$parent.live_streaming = window.location.pathname
    },
    maybeStart: function () {
      console.log('>>>>>>> maybeStart() ', this.$parent.isStarted, this.$parent.localStream, this.$parent.isChannelReady)
      if (typeof this.$parent.localStream !== 'undefined' && this.$parent.isChannelReady) {
        console.log('>>>>>> creating peer connection')
        this.createPeerConnection()
        this.$parent.peerConnection.addStream(this.$parent.localStream)
        this.$parent.isStarted = true
        this.doCall()
      }
    },
    createPeerConnection: function () {
      try {
        this.$parent.peerConnection = new RTCPeerConnection(pcConfig)
        this.$parent.peerConnection.onicecandidate = this.handleIceCandidate
        this.$parent.peerConnection.onremovestream = this.handleRemoteStreamRemoved
        console.log('Created RTCPeerConnnection')
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message)
        alert('Cannot create RTCPeerConnection object.')
      }
    },
    handleIceCandidate: function (event) {
      console.log('icecandidate event: ', event)
      if (event.candidate) {
        this.sendMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        })
      } else {
        console.log('End of candidates.')
      }
    },
    handleCreateOfferError: function (event) {
      console.log('createOffer() error: ', event)
    },
    doCall: function () {
      console.log('Sending offer to peer')
      this.$parent.peerConnection.createOffer(this.setLocalAndSendMessage, this.handleCreateOfferError)
    },
    setLocalAndSendMessage: function (sessionDescription) {
      this.$parent.peerConnection.setLocalDescription(sessionDescription)
      console.log('setLocalAndSendMessage sending message', sessionDescription)
      this.sendMessage(sessionDescription)
    },
    handleRemoteStreamRemoved: function (event) {
      console.log('Remote stream removed. Event: ', event)
    },
    hangup: function () {
      console.log('Hanging up.')
      this.stop()
      if ('getTracks' in this.$parent.localStream) {
        this.$parent.localStream.getTracks().forEach(function (track) {
          if (track.readyState === 'live') {
            track.stop()
          }
        })
      }
      this.$parent.socket.emit('close', this.contact_id)
    },
    handleRemoteHangup: function () {
      console.log('Session terminated.')
      this.stop()
    },
    stop: function () {
      this.$parent.live_streaming = ''
      this.$parent.isStarted = false
      if (this.$parent.peerConnection) {
        this.$parent.peerConnection.close()
        this.$parent.peerConnection = null
      }
    }
  },
  created: function () {
    console.log('Live created')
  },
  mounted: function () {
    console.log('Live mounted')

    this.store_id = this.$route.params.id
    this.contact_id = this.$route.params.contact_id

    this.$parent.socket = io.connect()

    this.$parent.socket.on('opened', (room) => {
      console.log('Opened room ' + room)
    })

    this.$parent.socket.on('full', (room) => {
      console.log('Room ' + room + ' is full')
    })

    this.$parent.socket.on('join', (room) => {
      console.log('Another peer made a request to join room ' + room)
      console.log('This peer is the initiator of room ' + room + '!')
      this.$parent.isChannelReady = true
    })

    this.$parent.socket.on('joined', (room) => {
      console.log('joined: ' + room)
      this.$parent.isChannelReady = true
    })

    this.$parent.socket.on('log', (array) => {
      console.log.apply(console, array)
    })

    // This client receives a message
    this.$parent.socket.on('message', (message) => {
      console.log('Client received message:', message)
      if (message === 'got user media') {
        this.maybeStart()
      } else if (message.type === 'answer' && this.$parent.isStarted) {
        this.$parent.peerConnection.setRemoteDescription(new RTCSessionDescription(message))
      } else if (message.type === 'candidate' && this.$parent.isStarted) {
        var candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        })
        this.$parent.peerConnection.addIceCandidate(candidate)
      } else if (message === 'bye' && this.$parent.isStarted) {
        this.handleRemoteHangup()
      }
    })

    window.onbeforeunload = () => {
      this.sendMessage('bye')
      return null
    }

    if (this.$parent.live_streaming) {
      var localVideo = document.querySelector('#localVideo')
      localVideo.srcObject = this.$parent.localStream
    } else {
      if (this.contact_id !== '') {
        this.$parent.socket.emit('open', this.contact_id)
        console.log('Attempted to open room: ', this.contact_id)
      }
      // window.navigator.mediaDevices.getUserMedia({
      //   audio: false,
      //   video: true
      // })
      //   .then(this.gotStream)
      //   .catch(function (e) {
      //     alert('getUserMedia() error: ' + e.name)
      //   })
    }
  }
}

</script>
