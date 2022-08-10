<template>
  <div class="container form">
    <div class="row h-100 justify-content-center">
      <div class="col-6 mt-5">
        <h2 class="text-center">Edit Message</h2>
        <form @submit.prevent="updateMessage" role="form" action="" accept-charset="UTF-8" method="post">
          <div class="form-group">
            <label class="text-muted" for="message_text">Text</label>
            <input class="form-control" type="text" v-model="text" id="message_text">
          </div>
          <div class="text-center">
            <input type="submit" name="commit" value="Update Text" class="btn btn-secondary" data-disable-with="Update Text">
          </div>
        </form>
        <div class="text-center my-3 fixed-bottom">
          <a class="btn btn-info mx-3" href="">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path>
              <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
            </svg>
            Back to Project
          </a>
          <a data-confirm="Are you sure you want to delete this message?" class="btn btn-danger" rel="nofollow" data-method="delete" href="/projects/69/topics/106/messages/136?path=edit_message">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
            </svg>
            Delete Message
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageEdit',
  data: () => ({
    message: {},
    text: ''
  }),
  async mounted() {
    this.getMessage()
  },
  methods: {
    async getMessage() {
      await this.$store.dispatch('getMessage', {
        id: this.$route.params.id,
        discussion_id: this.$route.params.discussion_id,
        message_id: this.$route.params.message_id
      })
      this.message = this.$store.state.message
      this.text = this.message.message
    },
    async updateMessage() {
      await this.$store.dispatch('updateMessage', {
        id: this.$route.params.id,
        discussion_id: this.$route.params.discussion_id,
        message_id: this.$route.params.message_id,
        message: this.text
      })
      this.$router.push(`/projects/${this.$route.params.id}`)
    }
  }
}
</script>