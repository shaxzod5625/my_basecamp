<template>
  <div class="container form">
    <div class="row h-100 justify-content-center">
      <div class="col">
        <div class="row justify-content-center">
          <div class="col-9 mt-5">
            <h2 class="text-center">Edit Task</h2>
            <form @submit.prevent="update" role="form" action="" accept-charset="UTF-8" method="post">
              <div class="row">
                <div class="col-8">
                  <div class="form-group">
                    <label class="text-muted required" for="task_title">Title</label>
                    <input class="form-control" type="text" v-model="title" id="task_title">
                  </div>
                </div>
                <div class="col-4 align-self-end update_btn">
                  <input type="submit" name="commit" value="Update Title" class="btn btn-secondary" data-disable-with="Update Title">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar  navbar-light px-4 fixed-bottom justify-content-center">
      <ul class="nav align-items-center">
        <li class="nav-item">
          <router-link class="btn btn-info mx-3" tag="a" :to="`/projects/${$route.params.id}`">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path><path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path></svg>
            Back to Project
          </router-link>
        </li>
        <li class="nav-item ml-3">
          <a @click.prevent="deleteTask" data-confirm="Are you sure you want to delete this task?" class="text-muted mx-3" rel="nofollow" data-method="delete" href="/projects/112/tasks/147">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
            Delete Task
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
    title: '',
    task: {}
  }),
  async mounted() {
    this.getTask()
  },
  methods: {
    async getTask() {
      await this.$store.dispatch('getTask', {
        id: this.$route.params.id,
        task_id: this.$route.params.task_id
      })
      this.task = this.$store.state.task
      this.title = this.task.title
    },
    async update() {
      await this.$store.dispatch('updateTask', {
        id: this.$route.params.id,
        task_id: this.$route.params.task_id,
        title: this.title,
        compleated: false
      })
    },
    async deleteTask() {
      await this.$store.dispatch('deleteTask', {
        id: this.$route.params.id,
        task_id: this.$route.params.task_id
      })
      this.$router.push(`/projects/${this.$route.params.id}`)
    }
  }
}
</script>