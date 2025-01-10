import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import CryptoJS from 'crypto-js'

import LogIn from '../views/_LogInForm.vue'
import NotFound from '../views/_NotFound.vue'
import LeaveTypes from '../views/m_LeaveTypes.vue'
import SystemAdminAccounts from '../views/m_SystemAdminAccounts.vue'
// import TotalLeave from '../views/m_TotalLeave.vue'
import FileLeaveOfAbsence from '../views/t_FileLeaveOfAbsence.vue'
import LeadersConfirmation from '../views/t_LeaderConfirmation.vue'
import AdminConfirmation from '../views/t_AdminConfirmation.vue'
import SystemEncoderAccounts from '../views/m_SystemEncoderAccounts.vue'
import MembersInformation from '../views/t_MemberInformation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/leavetypes",
    name: "Leave Types",
    component: LeaveTypes
  },
  // {
  //   path: "/totalleave",
  //   name: "Total Leave",
  //   component: TotalLeave
  // },
  {
    path: "/systemadminaccounts",
    name: "System Admin Accounts",
    component: SystemAdminAccounts
  },
  {
    path: "/fileleaveofabsence",
    name: "File Leave of Absence",
    component: FileLeaveOfAbsence
  },
  {
    path: "/leadersconfirmation",
    name: "Leader's Confirmation",
    component: LeadersConfirmation
  },
  {
    path: "/adminconfirmation",
    name: "Admin Confirmation",
    component: AdminConfirmation
  },
  {
    path: "/systemencoderaccounts",
    name: "System Encoder Accounts",
    component: SystemEncoderAccounts
  },
  {
    path: "/membersinformation",
    name: "Member's Information",
    component: MembersInformation
  },
  {
    path: "*",
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let DecryptText = (text) => {
  var bytes  = CryptoJS.AES.decrypt(text, process.env.VUE_APP_SECRETKEY)
  var originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

router.beforeEach((to, from, next) => {
  if(DecryptText(store.state.loa_log_in) !== "true" && to.path !== "/login"){       // Go to Log In Page}
    next("/login")
  }
  else if(DecryptText(store.state.loa_log_in) === "true" && to.path === "/login"){  // Go to Main Page
    next("/fileleaveofabsence")
  }
  else if(DecryptText(store.state.loa_log_in) === "true" && to.path === "/"){       // Go to Main Page
    next("/fileleaveofabsence")
  }
  else{                                                                             // Go to Next Page
    next()
  }
})

export default router