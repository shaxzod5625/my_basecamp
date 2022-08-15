import Vue from "vue";
import Vuex from "vuex";
import Api from '@/services/api';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    authErrorMessage: null,
    errorMessage: null,
    token: null,
    projects: [],
    project: null,
    tasks: [],
    task: null,
    currentPass: null,
    discussions: [],
    discussion: null,
    message: null,
    attachments: [],
  },
  getters: {},
  mutations: {
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.clear()
    },
    SET_USER(state, user) {
      state.user = user;
      state.token = user.token;
      if (user.token) {
        state.token = user.token;
        localStorage.setItem("token", user.token);
      }
      if (user.userId) {
        localStorage.setItem("userId", user.userId);
      }
    },
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_PROJECT(state, project) {
      state.project = project;
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_TASK(state, task) {
      state.task = task;
    },
    SET_AUTH_ERROR_MESSAGE(state, message) {
      state.authErrorMessage = message;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    EDIT_USER(state, user) {
      state.user = user;
    },
    SET_PASS(state, pass) {
      state.currentPass = pass;
    },
    DELETE_USER(state) {
      state.projects = null
      state.token = null
      state.user = null
      state.currentPass = null
      localStorage.clear()
    },
    SET_DISCUSSIONS(state, discussions) {
      state.discussions = discussions;
    },
    SET_DISCUSSION(state, discussion) {
      state.discussion = discussion;
    },
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    SET_ATTACHMENTS(state, attachments) {
      state.attachments = attachments;
    }
  },
  actions: {
    // auth
    async login({ commit }, user) {
      try {
        const res = await Api().post(`/login`, user)
        commit("SET_USER", res.data);
      } catch (e) {
        commit("SET_AUTH_ERROR_MESSAGE", e.response.data.message);
        throw e
      }
    },
    async register({ commit }, user) {
      try {
        const res = await Api().post(`/register`, user)
        commit("SET_USER", res.data);
      } catch (e) {
        commit("SET_AUTH_ERROR_MESSAGE", e.response.data.message);
        throw e
      }
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    // projects
    async newProject({ commit }, project) {
      try {
        await Api().post(`/projects/create`, project);
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async deleteProject({ commit }, id) {
      try {
        await Api().delete(`/projects/delete/${id}`);
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    async getProjects({ commit }) {
      try {
        const data = await Api().get(`/projects/all`);
        commit("SET_PROJECTS", data.data);
      } catch (e) {
        if (e.response.status === 401) {
          commit("LOGOUT");
        }
        console.log(e);
        throw e
      }
    },
    async getProject({ commit }, id) {
      try {
        const res = await Api().get(`/projects/${id}`)
        commit('SET_PROJECT', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updateProject({ commit }, project) {
      try {
        const res = await Api().put(`/projects/update/${project.id}`, project)
        commit('SET_PROJECT', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // task
    async getTasks({ commit }, id) {
      try {
        const res = await Api().get(`/projects/${id}/tasks`)
        commit('SET_TASKS', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async getTask({ commit }, data) {
      try {
        const res = await Api().get(`/projects/${data.id}/tasks/${data.task_id}`)
        commit('SET_TASK', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async newTask({ commit }, data) {
      try {
        console.log(data);
        const res = await Api().post(`/projects/${data.id}/tasks/create`, {
          title: data.title,
          project_id: data.id,
        })
        commit('SET_TASKS', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteTask({ commit }, data) {
      try {
        await Api().delete(`/projects/${data.id}/tasks/delete/${data.task_id}`)
        commit('SET_TASKS', null)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updateTask({ commit }, data) {
      try {
        const res = await Api().put(`/projects/${data.id}/tasks/update/${data.task_id}`, {
          title: data.title,
          compleated: data.compleated,
        })
        commit('SET_TASKS', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // user
    async getUser({ commit }, id) {
      try {
        const res = await Api().get(`/user/${id}`);
        commit("SET_USER", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async checkPass({ commit }, password) {
      try {
        const res = await Api().post(`/user/${localStorage.getItem('userId')}/checkpass`, password);
        commit("SET_PASS", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async editUser({ commit }, user) {
      try {
        const res = await Api().put(`/user/edit/${user.id}`, user)
        commit('EDIT_USER', res.data)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteUser({ commit }, id) {
      try {
        await Api().delete(`/user/delete/${id}`)
        commit('DELETE_USER')
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // permissions
    async addMember({ commit }, member) {
      try {
        await Api().post(`/projects/addUser/${member.projectId}`, {
          user: {
            role: member.role,
            email: member.email,
          }
        })
      } catch (e) {
        commit("SET_ERROR_MESSAGE", e.response.data.message);
        throw e
      }
    },
    async deleteMember({ commit }, data) {
      try {
        await Api().put(`/projects/removeUser/${data.projectId}`, {
          user: data.member
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updatePermission({ commit }, data) {
      try {
        await Api().put(`/projects/addPermission/${data.projectId}`, {
          user: {
            role: data.member.role,
            email: data.member.email,
            permissions: data.permissions,
            user_id: data.member.user_id
          }
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async makeAdmin({ commit }, data) {
      try {
        await Api().put(`/projects/addPermission/${data.projectId}`, {
          user: {
            role: 'admin',
            email: data.member.email,
            permissions: data.member.permissions,
            user_id: data.member.user_id
          }
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async removeAdmin({ commit }, data) {
      try {
        await Api().put(`/projects/addPermission/${data.projectId}`, {
          user: {
            role: 'member',
            email: data.member.email,
            permissions: data.member.permissions,
            user_id: data.member.user_id
          }
        })
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    // discussions
    async getDiscussions({ commit }, id) {
      try {
        const res = await Api().get(`/projects/${id}/discussion`);
        commit("SET_DISCUSSIONS", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async getDiscussion({ commit }, data) {
      try {
        const res = await Api().get(`/projects/${data.id}/discussion/${data.discussion_id}`);
        commit("SET_DISCUSSION", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async newDiscussion({ commit }, data) {
      try {
        const res = await Api().post(`/projects/${data.id}/discussion/create`, {
          title: data.title,
          owner: data.user_id,
        });
        commit("SET_DISCUSSION", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updataDiscussion({ commit }, data) {
      try {
        const res = await Api().put(`/projects/${data.id}/discussion/${data.discussion_id}/update`, {
          title: data.title,
          messages: data.messages,
        });
        commit("SET_DISCUSSION", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteDiscussion({ commit }, data) {
      try {
        await Api().delete(`/projects/${data.id}/discussion/${data.discussion_id}/delete`);
        commit("SET_DISCUSSION", null);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // messages
    async getMessage({ commit }, data) {
      try {
        const res = await Api().get(`/projects/${data.id}/discussion/${data.discussion_id}/${data.message_id}`);
        commit("SET_MESSAGE", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async newMessage({ commit }, data) {
      try {
        const res = await Api().post(`/projects/${data.id}/discussion/${data.discussion_id}/addMessage`, {
          message: data.message,
          user_id: data.user_id,
        });
        commit("SET_MESSAGE", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async updateMessage({ commit }, data) {
      try {
        const res = await Api().put(`/projects/${data.id}/discussion/${data.discussion_id}/updateMessage/${data.message_id}`, {
          messagetext: data.message,
          user_id: data.user_id,
        })
        commit("SET_MESSAGE", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteMessage({ commit }, data) {
      try {
        await Api().delete(`/discussion/${data.id}/deleteMessage`, {
          message_id: data.message_id,
        })
        commit("SET_MESSAGE", null);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    // attachments
    async getAttachments({ commit }, id) {
      try {
        const res = await Api().get(`/projects/${id}/attachments`);
        commit("SET_ATTACHMENTS", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    newAttachments({ commit }, data) {
      try {
        const res = Api().post(`/projects/${data.id}/attachments`, {
          file: data.file,
          name: data.name,
        });
        commit("SET_ATTACHMENTS", res.data);
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async deleteAttachment({ commit }, data) {
      try {
        await Api().delete(`/projects/${data.id}/attachments/${data.attachment_id}`);
        commit("SET_ATTACHMENTS", null);
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  modules: {},
});
