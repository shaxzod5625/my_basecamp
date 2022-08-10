<template>
  <div class="container form">
    <div class="row h-100 justify-content-center">
      <div class="col-9 mt-5">
        <h2 class="text-center">Edit Topic</h2>
        <form @submit.prevent="upodateDiscussion" action="" method="post">
          <div class="row">
            <div class="col-8">
              <div class="form-group">
                <label class="text-muted required" for="topic_title">Title</label>
                <input class="form-control" type="text" v-model="discussion_title">
              </div>
            </div>
            <div class="col-4 align-self-end update_btn">
              <input type="submit" name="commit" value="Update Title" class="btn btn-secondary" data-disable-with="Update Title">
            </div>
          </div>
        </form>
        <h3 v-if="discussion.messages.length" class="text-center mt-3">Messages</h3>
        <div v-if="discussion.messages.length" class="admin_edit_messages overflow-auto">
          <div class="row message" v-for="message in discussion.messages" :key="message._id">
            <div class="col-1">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                <path fill-rule="evenodd" d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"></path>
              </svg>
            </div>
            <div class="col">
              <p class="font-weight-bold text-secondary">Shaxzod</p>
              <p>sdfasdf</p>
            </div>
            <div class="col-auto align-self-center">
              <a data-confirm="Are you sure you want to delete this message?" class="btn btn-danger" rel="nofollow" data-method="delete" href="/projects/69/topics/106/messages/136">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar  navbar-light px-4 fixed-bottom justify-content-center">
      <ul class="nav align-items-center">
        <li class="nav-item">
          <a class="btn btn-info mx-3" href="">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path>
              <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
            </svg>
            Back to Project
          </a>
        </li>
        <li class="nav-item ml-3">
          <a data-confirm="Are you sure you want to delete this topic?" class="text-muted mx-3" rel="nofollow" data-method="delete" href="/projects/69/topics/106">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
            </svg>
            Delete Topic
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Edit',
  data: () => ({
    user: {},
    project: {},
    discussion: {},
    discussion_title: ''
  }),
  async mounted() {
    this.getUser()
    this.getProject()
    this.getDiscussion()
  },
  methods: {
    async getUser() {
      if (!this.$store.state.user) {
        await this.$store.dispatch('getUser', localStorage.getItem('userId'));
        this.user = this.$store.state.user;
      }
    },
    async getProject() {
      if (!this.$store.state.project) {
        await this.$store.dispatch('getProject', this.$route.params.id);
        this.project = this.$store.state.project;
      }
    },
    async getDiscussion() {
      if (!this.$store.state.discussion) {
        await this.$store.dispatch('getDiscussion', {
          id: this.$route.params.id,
          discussion_id: this.$route.params.discussion_id
        });
        this.discussion = this.$store.state.discussion;
        this.discussion_title = this.discussion.title;
      }
    },
    async upodateDiscussion() {
      await this.$store.dispatch('updataDiscussion', {
        id: this.$route.params.id,
        discussion_id: this.$route.params.discussion_id,
        title: this.discussion_title,
        messages: this.discussion.messages
      })
      this.$router.push(`/projects/${this.$route.params.id}`)
    }
  }
}
</script>