<template>
  <div class="container form">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ alertMessage }}
    </b-alert>
    <div class="row h-100 justify-content-center">
      <div class="col-10 mt-5">
        <h2 class="text-center">
          Edit Project
        </h2>
        <p class="text-muted text-center">
          <small>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z"></path>
              <path fill-rule="evenodd" d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z"></path>
              <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z"></path>
            </svg>
            Created by: {{ user.name }}
          </small>
        </p>
        <form action="">
          <div class="row">
            <div class="col-8">
              <div class="form-group">
                <label for="" class="text-muted required">Name</label>
                <input type="text" class="form-control" v-model="title">
              </div>
            </div>
            <div class="col-4 d-flex align-items-center">
              <input type="button" class="btn btn-secondary"  value="Update Name"  @click.prevent="updateProject(project._id)">
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="form-group">
                <label for="" class="text-muted required">Description</label>
                <textarea type="text" class="form-control" v-model="description"></textarea>
              </div>
            </div>
            <div class="col-4 d-flex align-items-center">
              <input type="submit" class="btn btn-secondary" value="Update Description" @click.prevent="updateProject(project._id)">
            </div> 
          </div>
        </form>
        <p class="my-0 text-muted">Members:</p>
        <div class="row mb-3" v-for="member in project.users" :key="member._id">
          <div class="col-1 p-0  text-right">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-emoji-smile" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path fill-rule="evenodd" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"></path></svg>
          </div>
          <div class="col-3 text-truncate">
            <small>{{ member.email }}</small>
          </div>
          <div class="col-6 text-right d-flex">
            <a class="btn btn-outline-dark btn-sm" @click.prevent="makeAdmin(member, $event)" rel="nofollow" data-method="put" href="/">{{ member.role != 'admin' ? 'Add Admin Role' : 'Remove admin role' }}</a>
            <div class="permission-form">
              <div class="dropdown update_btn">
                <button class="btn btn-outline-dark btn-sm dropdown-toggle ml-3 mr-3" @click="active = !active" :class="{ show: active }" type="button">
                  Change Permissions
                </button>
                <div class="dropdown-menu" :style="active ? 'display: block' : 'display: none'">
                  <form role="form" class="edit_member" id="edit_member_49" action="" @submit.prevent="updatePermission($event, member)" accept-charset="UTF-8" method="post">
                    <div class="form-check">
                      <input id="id-104" v-model="member.permissions.create" class="form-check-input" type="checkbox" value="1" name="member[can_write]">
                      <label class="form-check-label" for="id-104">Can write tasks</label>
                    </div>
                    <div class="form-check">
                      <input id="id-94" v-model="member.permissions.update" class="form-check-input" type="checkbox" value="1" name="member[can_update]">
                      <label class="form-check-label" for="id-94">Can update tasks</label>
                    </div>
                    <div class="form-check">
                      <input id="id-68" v-model="member.permissions.delete" class="form-check-input" type="checkbox" value="1" name="member[can_delete]">
                      <label class="form-check-label" for="id-68">Can delete tasks</label>
                    </div>
                    <div class="form-check">
                      <input id="id-106" v-model="member.permissions.read" class="form-check-input" type="checkbox" value="1" name="member[can_read]">
                      <label class="form-check-label" for="id-106">Can read tasks</label>
                    </div>
                    <div class="update_btn bottom">
                      <button name="button" type="submit" class="btn btn-warning">Update permission</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <a class="btn btn-danger btn-sm" @click.prevent="deleteMember(member)" rel="nofollow" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
            </a>
          </div>
        </div>
        <form action="" @submit.prevent="addMember">
          <div class="row mt-4">
            <div class="col-6">
              <div class="form-group">
                <label for="" class="text-muted required">Add Member (email)</label>
                <input type="email" class="form-control" v-model="addMemberEmail">
              </div>
            </div>
            <div class="col-2 align-self-end">
              <div class="custom-control custom-switch">
                <input class="custom-control-input" type="checkbox" id="member_is_admin" v-model="role">
                <label class="custom-control-label" for="member_is_admin">Admin</label>
              </div>
            </div>
            <div class="col-2 align-self-end">
              <button class="btn btn-warning">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                  <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col">
        <div class="position-fixed justify-content-start mt-4">
          <div>
            <router-link class="btn btn-info mb-3" :to="`/projects/${this.$route.params.id}`">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path>
                <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
              Project Overview
            </router-link>
          </div>
          <div>
            <a href="" class="text-muted" @click.prevent="deleteProject(project._id)">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
              </svg>
              Delete Project
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name : 'ProjectEdit',
  data: () => ({
    user: {},
    project: {},
    title: '',
    description: '',
    addMemberEmail: '',
    role: false,
    active: false,
    showDismissibleAlert: false,
    alertMessage: '',
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  }),
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('getUser', localStorage.getItem('userId'));
      this.user = this.$store.state.user;
    }
    this.user = this.$store.state.user;
    await this.$store.dispatch('getProject', this.$route.params.id);
    this.project = this.$store.state.project;
    this.title = this.project.title;
    this.description = this.project.description;
  },
  methods: {
    async deleteProject(id) {
      await this.$store.dispatch('deleteProject', id)
      this.$router.push('/projects')
    },
    async updateProject(id) {
      await this.$store.dispatch('updateProject', {
        id: id,
        title: this.title,
        description: this.description,
      })
    },
    async addMember() {
      await this.$store.dispatch('addMember', {
        projectId: this.$route.params.id,
        email: this.addMemberEmail,
        role: this.role ? 'admin' : 'member'
      }).catch(err => {
        this.showDismissibleAlert = true;
        this.alertMessage = err.response.data.message;
      })
      await this.$store.dispatch('getProject', this.$route.params.id);
      this.project = this.$store.state.project;
      this.addMemberEmail = '';
    },
    async deleteMember(member) {
      await this.$store.dispatch('deleteMember', {member, projectId: this.$route.params.id})
      await this.$store.dispatch('getProject', this.$route.params.id);
      this.project = this.$store.state.project;
    },
    async updatePermission(e, member) {
      this.permissions = {
        create: e.path[0][0].checked,
        read: e.path[0][1].checked,
        update: e.path[0][2].checked,
        delete: e.path[0][3].checked
      }
      await this.$store.dispatch('updatePermission', {
        member,
        projectId: this.$route.params.id,
        permissions: this.permissions
      })
      await this.$store.dispatch('getProject', this.$route.params.id);
      this.project = this.$store.state.project;
    },
    async makeAdmin(member, e) {
      let admin = 'Remove admin role'
      if (e.target.innerHTML != admin) {
        await this.$store.dispatch('makeAdmin', {
          member, projectId: this.$route.params.id
        })
        await this.$store.dispatch('getProject', this.$route.params.id);
        this.project = this.$store.state.project;
      } else {
        await this.$store.dispatch('removeAdmin', {
          member, projectId: this.$route.params.id
        })
        await this.$store.dispatch('getProject', this.$route.params.id);
        this.project = this.$store.state.project;
      }
    }
  }
}
</script>