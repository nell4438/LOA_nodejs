<template>
  <div>
<!-- ============================================================================================== -->
<!-- ========================================== App Bar =========================================== -->
<!-- ============================================================================================== -->
    <v-app-bar dense clipped-left app color="#7FDBFF" style="border-width:0px 0px 2px 0px; border-color:black; border-style:solid;">
      <v-app-bar-nav-icon>
        <a-avatar src="Leave of Absence Icon.png" :size="50" alt="Leave of Absence" @click="ClickSystemIcon()"></a-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img height="28px" width="406px" src="Leave of Absence Logo.png" alt="Leave of Absence"></v-img>
      </v-toolbar-title>

      <span class="disable-select" style="margin-left:10px; margin-top:15px; font-family:arial; font-size:17px; font-weight:bold;"> {{strVersion}} </span>

      <a-tooltip :title="`Help?`" placement="right">
        <span style="margin-left:30px;"> <a-button key="back" shape="circle" icon="question" style="border:1px black solid;" @click="ClickManual()"></a-button> </span>
      </a-tooltip>
      
      <v-spacer></v-spacer>

      <a-popover class="disable-select" title="PERSONAL INFORMATION" placement="leftTop" trigger="click">
        <a-tooltip placement="left">
          <span>
              <a-avatar style="border:1px black solid;" :src="strAvatar" :size="40" shape="square"> Loading... </a-avatar>
          </span>
          <!-- <a-button icon="meh" style="border:1px black dashed;"></a-button> -->
        </a-tooltip>

        <template #content>
          <v-layout>
            <span class="Avatar" style="padding-top:7px;">
              <a-avatar style="border:1px black solid;" :src="strAvatar" :size="45" shape="square"> Loading... </a-avatar>
            </span>
          
            <span class="disable-select" style="padding-left:10px; padding-top:5px; color:black; font-family:arial; font-size:12px; font-weight:bold;">
              <div> {{objUserInformation.EmployeeCode}} </div>
              <div> {{objUserInformation.EmployeeName}} </div>
              <div> {{objUserInformation.ShortName}} - {{objUserInformation.DepartmentName}} </div>
            </span>
          
            <span class="disable-select" style="padding-left:20px; color:black; font-family:arial; font-size:12px; font-weight:bold;">
              <div>
                <a-tooltip :title="`Change Password`" placement="left">
                  <a-button type="primary" shape="circle" icon="lock" style="border:1px black solid;" @click="ClickOpenChangePassword()"></a-button>
                </a-tooltip>
              </div>

              <div style="padding-top:5px;">
                <a-tooltip :title="`Log Out`" placement="left">
                  <a-button type="danger" shape="circle" icon="poweroff" style="border:1px black solid;" @click="LogOut()"></a-button>
                </a-tooltip>
              </div>
            </span>
          </v-layout>
        </template>
      </a-popover>
    </v-app-bar>
<!-- ============================================================================================== -->
<!-- ===================================== Navigation Drawer ====================================== -->
<!-- ============================================================================================== -->
    <v-navigation-drawer clipped app expand-on-hover permanent :mini-variant="blnDrawer" style="border-width:0px 2px 0px 0px; border-color:black; border-style:solid;">
      <v-list shaped dense nav>
        <v-list-item v-for="item in PageList" :key="item.title" @click="ChangePage(item.router)">
          <v-list-item-icon>
            <a-badge v-if="item.title === `Leader's Confirmation`" size="small" :count="intLeaderForApproval">
              <v-icon style="color:black;"> {{item.icon}} </v-icon>
            </a-badge>

            <a-badge v-else-if="item.title === `Admin Confirmation`" size="small" :count="intAdminForApproval">
              <v-icon style="color:black;"> {{item.icon}} </v-icon>
            </a-badge>
            
            <v-icon v-else style="color:black;"> {{item.icon}} </v-icon>
          </v-list-item-icon>
          
          <v-list-item-content>
            <v-list-item-title style="font-size:11px; font-family:arial; color:black; font-weight:bold;"> {{item.title}} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-for="item in DropDownPageList" :key="item.title" v-model="item.active" no-action>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon style="color:black;"> {{item.icon}} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-size:11px; font-family:arial; color:black; font-weight:bold;">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          
          <v-list-item v-for="child in item.items" :key="child.title" @click="ChangePage(child.router)">
            <v-list-item-icon>
                <v-icon style="color:black;"> {{child.icon}} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title  style="font-size:11px; font-family:arial; color:black; font-weight:bold;">{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
<!-- ============================================================================================== -->
<!-- =================================== Change Password Dialog =================================== -->
<!-- ============================================================================================== -->
    <a-modal class="disable-select" style="font-family:arial;" width="550px" v-model="blnChangePasswordDialog" title="CHANGE PASSWORD" :maskClosable="false" :closable="false">
      <template slot="footer">
        <v-layout>
          <v-spacer></v-spacer>

          <a-button key="back" icon="close-circle" class="Button" @click="ClickCancelChangePassword()"> Cancel </a-button>

          <div style="padding-left:5px;">
            <a-button key="submit" icon="save" type="primary" class="Button" @click="ClickSaveChangePassword()"> Save </a-button>
          </div>
          
        </v-layout>
      </template>

      
      <div style="color:black;">
        <v-layout>
          <span :style="`font-weight:bold; padding-top:5px; color:${intOldPasswordError === 0 ? 'black' : 'red'};`"> Enter Old Password: </span>
          <v-spacer></v-spacer>
          <a-input-password v-model="strOldPassword" @change="OldPasswordChange()" :style="`width:300px; border-radius:4px; border:1px solid ${intOldPasswordError === 0 ? 'black' : 'red'};`" @keypress.enter="ClickSaveChangePassword()"></a-input-password>
        </v-layout>

        <v-layout style="padding-bottom:5px; color:red; font-size:9px;">
          <v-spacer></v-spacer>
          <span v-if="intOldPasswordError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
          <span v-else-if="intOldPasswordError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Incorrect old password. </span>
        </v-layout>

        <v-layout>
          <span :style="`font-weight:bold; padding-top:5px; color:${intNewPasswordError === 0 ? 'black' : 'red'};`"> Enter New Password: </span>
          <v-spacer></v-spacer>
          <a-input-password v-model="strNewPassword" @change="NewPasswordChange()" :style="`width:300px; border-radius:4px; border:1px solid ${intNewPasswordError === 0 ? 'black' : 'red'};`" @keypress.enter="ClickSaveChangePassword()"></a-input-password>
        </v-layout>

        <v-layout style="padding-bottom:5px; color:red; font-size:9px;">
          <v-spacer></v-spacer>
          <span v-if="intNewPasswordError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
        </v-layout>

        <v-layout>
          <span :style="`font-weight:bold; padding-top:5px; color:${intConfirmNewPasswordError === 0 ? 'black' : 'red'};`"> Confirm New Password: </span>
          <v-spacer></v-spacer>
          <a-input-password v-model="strConfirmNewPassword" @change="ConfirmNewPasswordChange()" :style="`width:300px; border-radius:4px; border:1px solid ${intConfirmNewPasswordError === 0 ? 'black' : 'red'};`" @keypress.enter="ClickSaveChangePassword()"></a-input-password>
        </v-layout>
        
        <v-layout style="color:red; font-size:9px;">
          <v-spacer></v-spacer>
          <span v-if="intConfirmNewPasswordError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
          <span v-else-if="intConfirmNewPasswordError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> New Password and Confirm New Password do not match. Please try again. </span>
        </v-layout>
      </div>
    </a-modal>
    
    <manual
      :blnManual="blnManual"
      @ClickCloseManual="ClickCloseManual"
    />
  </div>
</template>
<!-- ============================================================================================== -->
<!-- ========================================== Scripts =========================================== -->
<!-- ============================================================================================== -->
<script>

  import axios from "axios"
  import Manual from '@/components/Manual.vue'

  export default{
// ************************************************************************************* //
// ===================================== Components ==================================== //
// ************************************************************************************* //
    components:{
      'manual': Manual
    },
// *********************************************************************************** //
// ======================================= Data ====================================== //
// *********************************************************************************** //
    data(){
      return{
        strAvatar: undefined,
        strOldPassword: undefined,
        strNewPassword: undefined,
        strConfirmNewPassword: undefined,
        strPosition: undefined,

        intLeaderForApproval: 0,
        intAdminForApproval: 0,
        intOldPasswordError: 0,
        intNewPasswordError: 0,
        intConfirmNewPasswordError: 0,

        blnManual: false,
        blnDrawer: true,
        blnChangePasswordDialog: false,
        blnLeader: false,
        blnAdmin: false,
        blnEncoder: false, // dagdag

        objUserInformation: {},
        objEmployeeInformation: {}, // dagdag ko
        // objEmployeeData : {},
      }
    },
// *********************************************************************************** //
// ===================================== Created ===================================== //
// *********************************************************************************** //
    created(){
      this.GetUserInformation()
    },
// *********************************************************************************** //
// ===================================== Computed ==================================== //
// *********************************************************************************** //
    computed:{
      PageList(){
        let data = [
          {
            title: "File Leave of Absence",
            icon: "mdi-file-compare",
            router: "/fileleaveofabsence",
            show: true,
          },
          {
            title: "Leader's Confirmation",
            icon: "mdi-account-multiple-check",
            router: "/leadersconfirmation",
            show: this.blnLeader
          },
          {
            title: "Admin Confirmation",
            icon: "mdi-account-tie",
            router: "/adminconfirmation",
            show: this.blnAdmin,
          },
          {
            title: "Member's Information",
            icon: "mdi-account-details",
            router: "/membersinformation",
            show: this.blnEncoder,
          },
          {
            title: "Page 3",
            icon: "mdi-pause-octagon-outline",
            router: "/Page 3",
            show: false,
          },
        ]
        data = data.filter(rec => {
          return rec.show == true
          
        })
        return data
      },

      DropDownPageList(){
        let data = [
          {
            title: 'Maintenance',
            icon: 'mdi-cog-outline',
            show: this.blnAdmin,
            items: [
              {
                title: "Leave Types",
                icon: "mdi-format-list-bulleted-type",
                router: "/leavetypes",
              },
              // {
              //   title: "Total Leave",
              //   icon: "mdi-counter",
              //   router: "/totalleave",
              // },
              {
                title: "Admin Accounts",
                icon: "mdi-card-account-details-star",
                router: "/systemadminaccounts",
              },
              {
                title: "Encoder Per Department",
                icon: "mdi-account-plus",
                router: "/systemencoderaccounts",
              },
            ],
          },           
        ]

        data = data.filter(rec => {
            return rec.show === true
        })

        return data
      },
    },
// *********************************************************************************** //
// ====================================== Methods ==================================== //
// *********************************************************************************** //
    methods:{
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
      RunSocketIO(){
        this.$socket.on('GetForApprovalCount', () => {
          if(this.blnLeader === true){
            this.GetForApprovalCountLeaders()
          }
          
          if(this.blnAdmin === true){
            this.GetForApprovalCountAdmin()
          }
        }) 
      },
      GetUserInformation(){
        let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(this.$store.state.loa_user)}`
        axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(async res => {
          this.strAvatar = `${this.avatar_API}${this.DecryptText(this.$store.state.loa_user)}.jpg`
          this.objUserInformation = res.data[0]

          let isAdmin = false , isEncoder = false, UserRights = {'isAdmin':null,'isEncoder':null}

          let GetSystemAdminAccountsURL = `${this.api}GetSystemAdminAccounts`
          await axios.get(GetSystemAdminAccountsURL).then(AdminAccounts => {
            let Data = AdminAccounts.data
            Data = Data.filter(rec => { return rec.DeletedDate === undefined || rec.DeletedDate === null || rec.DeletedDate === ""})
            let arrAdminAccounts = []
            Data.forEach(Employee => { arrAdminAccounts.push(Employee.EmployeeCode) })
            isAdmin = arrAdminAccounts.includes(this.objUserInformation.EmployeeCode)
            UserRights.isAdmin = isAdmin
            this.blnAdmin =  isAdmin
            let EncryptUserRights = this.$CryptoJS.AES.encrypt(JSON.stringify(UserRights), process.env.VUE_APP_SECRETKEY).toString()
            this.$store.commit("CHANGE_LOA_USERRIGHTS", EncryptUserRights)
          })
          this.GetPosition()

          let GetSystemEncoderAccountsURL = `${this.api}GetSystemEncoderAccounts`
          await axios.get(GetSystemEncoderAccountsURL).then(EncoderAccounts =>{
            let Data = EncoderAccounts.data
            Data = Data.filter(rec => { return rec.DeletedDate === undefined || rec.DeletedDate === null || rec.DeletedDate === ""})
            let arrEncoderArr = []
            Data.forEach(Employee => { arrEncoderArr.push(Employee.EmployeeCode) })
            isEncoder = arrEncoderArr.includes(this.objUserInformation.EmployeeCode)
            UserRights.isEncoder = isEncoder
            this.blnEncoder = isEncoder
            let EncryptUserRights = this.$CryptoJS.AES.encrypt(JSON.stringify(UserRights), process.env.VUE_APP_SECRETKEY).toString()
            this.$store.commit("CHANGE_LOA_USERRIGHTS", EncryptUserRights)
            // console.log('eee',isEncoder)
          })
          // console.log(UserRights)
          this.GetPosition()
        })
      },
      GetPosition(){
        let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${this.objUserInformation.CompanyCode}&PositionCode=${this.objUserInformation.PositionCode}`
        axios.get(CheckPositionURL).then(Position => {
          this.strPosition = Position.data[0].Position

          // this is just for test ======
          // this.strPosition = "TH"
          // ============================

          this.CheckIfAdmin()
          this.CheckIfLeader()
          this.CheckIfEncoder()
          this.RunSocketIO()
          this.$socket.emit('RequestForApprovalCount')
        })
      },
      GetForApprovalCountLeaders(){
        let CompanyCode = this.objUserInformation.CompanyCode
        let DepartmentCode = this.objUserInformation.DepartmentCode
        let SectionCode = this.objUserInformation.SectionCode
        let TeamCode = this.objUserInformation.TeamCode

        let LeaveApprovalCount = 0
        let LeaveCounter = 0

        let ForApprovalURL = `${this.api}GetForApprovalCountLeaders?CompanyCode=${CompanyCode}&DepartmentCode=${DepartmentCode}&SectionCode=${SectionCode}&TeamCode=${TeamCode}&Position=${this.strPosition}`
        axios.get(ForApprovalURL).then(ForApproval => {
          if(ForApproval.data.length !== 0){
            ForApproval.data.forEach(ForApprovalData => {
              let EmployeeBasicInfoAPI = `${this.basicInfo_API}${ForApprovalData.EmployeeCode}`
              axios.get(EmployeeBasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(Employee => {
                ForApprovalData.PositionCode = Employee.data[0].PositionCode
                
                let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${ForApprovalData.CompanyCode}&PositionCode=${ForApprovalData.PositionCode}`
                axios.get(CheckPositionURL).then(Position => {
                  LeaveCounter++
                  ForApprovalData.Position = Position.data[0].Position

                  if(this.strPosition === "DH"){
                    if(ForApprovalData.Position === "SH"){
                      LeaveApprovalCount++
                    }
                  }

                  if(this.strPosition === "SH"){
                    if(ForApprovalData.Position === "TH" || ForApprovalData.Position === "Member"){
                      LeaveApprovalCount++
                    }
                  }

                  if(this.strPosition === "TH"){
                    if(ForApprovalData.Position === "Member"){
                      LeaveApprovalCount++
                    }
                  }
                  if(LeaveCounter === ForApproval.data.length){
                  this.intLeaderForApproval = LeaveApprovalCount
                 }
                })
              })  
            })
          }else{
            this.intLeaderForApproval = ForApproval.data.length
          }
        })
      },
      GetForApprovalCountAdmin(){
        let CompanyCode = this.objUserInformation.CompanyCode

        let ForAdminApprovalURL = `${this.api}GetForApprovalCountAdmin?CompanyCode=${CompanyCode}`
        axios.get(ForAdminApprovalURL).then(ForAdminApproval => {
          this.intAdminForApproval = ForAdminApproval.data[0].ForAdminApprovalCount
        })
      },
      CheckIfLeader(){
        let UserRights = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))

        if(this.strPosition === "DH" || this.strPosition === "SH" || this.strPosition === "TH"){
          this.blnLeader = true
          UserRights.isLeader = true
        }
        else{
          this.blnLeader = false
          UserRights.isLeader = false
        }
        let EncryptUserRights = this.$CryptoJS.AES.encrypt(JSON.stringify(UserRights), process.env.VUE_APP_SECRETKEY).toString()
        this.$store.commit("CHANGE_LOA_USERRIGHTS", EncryptUserRights)
      },
      CheckIfAdmin(){
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        this.blnAdmin =  Data.isAdmin
      },
      CheckIfEncoder(){ // dagdag ko
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        this.blnEncoder = Data.isEncoder
      },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ClickSystemIcon(){
        alert()
      },
      ClickManual(){
        this.blnManual = true
      },
      ClickCloseManual(value){
        this.blnManual = value
      },
      OldPasswordChange(){
        this.intOldPasswordError = 0
      },
      NewPasswordChange(){
        this.intNewPasswordError = 0
      },
      ConfirmNewPasswordChange(){
        this.intConfirmNewPasswordError = 0
      },
      ClickOpenChangePassword(){
        this.strOldPassword = ""
        this.strNewPassword = ""
        this.strConfirmNewPassword = ""
        this.intOldPasswordError = 0
        this.intNewPasswordError = 0
        this.intConfirmNewPasswordError = 0
        this.blnChangePasswordDialog = true
      },
      ClickSaveChangePassword(){
        this.intOldPasswordError = 0
        this.intNewPasswordError = 0
        this.intConfirmNewPasswordError = 0

// NEW PASSWORD CHECKING
// 1 - Blank New Password Field
        if(this.strNewPassword === undefined || this.strNewPassword === null || this.strNewPassword.trim() === ""){
          this.intNewPasswordError = 1
        }

// CONFIRM NEW PASSWORD CHECKING
// 1 - Blank Confirm New Password Field
// 2 - New Password and Confirm New Password not the same
        if(this.strConfirmNewPassword === undefined || this.strConfirmNewPassword === null || this.strConfirmNewPassword.trim() === ""){
          this.intConfirmNewPasswordError = 1
        }
        else if((this.strNewPassword !== undefined && this.strNewPassword !== null && this.strNewPassword.trim() !== "") && (this.strNewPassword !== this.strConfirmNewPassword)){
          this.intConfirmNewPasswordError = 2
        }

// OLD PASSWORD CHECKING
// 1 - Blank Old Password Field
// 2 - Incorrect Old Password
        if(this.strOldPassword === undefined || this.strOldPassword === null || this.strOldPassword.trim() === ""){
          this.intOldPasswordError = 1
        }
        else if(this.strOldPassword !== undefined && this.strOldPassword !== null && this.strOldPassword.trim() !== ""){
          let SystemUserData = {}

          let UserURL = `${this.api}GetSystemUsers?EmployeeCode=${this.objUserInformation.EmployeeCode}`
          axios.get(UserURL).then(res => {
            SystemUserData = res.data[0]
            if(SystemUserData !== undefined && SystemUserData !== null && SystemUserData !== {}){
              if(SystemUserData.Password !== this.strOldPassword){
                this.intOldPasswordError = 2
              }
            }
            else{
              if(this.objUserInformation.EmployeeCode !== this.strOldPassword){
                this.intOldPasswordError = 2
              }
            }
            
            if(this.intOldPasswordError === 0 && this.intNewPasswordError === 0 && this.intConfirmNewPasswordError === 0){
              let me = this
              me.$confirm({
                title: "LEAVE OF ABSENCE",
                cancelText: "No",
                okText: "Yes",
                content: (<div style="color:black"> Are you sure you want to change your password? </div>),
                onOk(){ me.ConfirmChangePassword() },
                onCancel(){},
              })
            }
          })
        }
      },
      ClickCancelChangePassword(){
        this.blnChangePasswordDialog = false
      },
      ChangePage(data){
        if(this.$router.app._route.path != data){
          this.$router.push(data)
        }
      },
      LogOut(){
        let me = this
        me.$confirm({
          title: "Confirm log out?",
          cancelText:  (<div class="ModalButtons"> No </div>),
          okText: (<div class="ModalButtons"> Yes </div>),
          content: (<div style="color:black"> You will be redirected to Log In Page. </div>),
          onOk(){ me.ConfirmLogOut() },
          onCancel(){},
        })
      },
// ============================================================= //
// ======================= Other Events ======================== //
// ============================================================= //
      ConfirmChangePassword(){
        let Query = ``

        let UserURL = `${this.api}GetSystemUsers?EmployeeCode=${this.objUserInformation.EmployeeCode}`
        axios.get(UserURL).then(res => {
          let SystemUserData = res.data[0]
          if(SystemUserData !== undefined && SystemUserData !== null && SystemUserData !== {}){
            Query = `UPDATE	dbo.SystemUsers
                      SET		Password = '${this.strNewPassword}',
                            UpdatedDate = GETDATE(),
                            UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                      WHERE	EmployeeCode = '${SystemUserData.EmployeeCode}'`
          }
          else{
            Query = `INSERT INTO dbo.SystemUsers
                      ( EmployeeCode, Password, CreatedDate, UpdatedDate, UpdatedBy )
                      VALUES 
                      ( '${this.objUserInformation.EmployeeCode}', '${this.strNewPassword}', GETDATE(), GETDATE(), '${this.objUserInformation.EmployeeCode}' )`
          }

          let Data = {Query: Query}
          let SavingURL = `${this.api}SaveNewPassword`
          axios.post(SavingURL, Data).then(() => {
            this.$notification.success({
              style: "background-color:#7FDBFF;",
              icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
              message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
              description: <div class="disable-select NotificationDescription"> Password successfully changed. </div>,
            })
            this.blnChangePasswordDialog = false
          })
        })
      },
      ConfirmLogOut(){
        this.$store.commit("CHANGE_LOA_USER", "")
        this.$store.commit("CHANGE_LOA_LOGIN", "")
        this.$store.commit("CHANGE_LOA_USERRIGHTS", {})

        this.$notification.open({
          style: "background-color:#7FDBFF;",
          icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
          message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
          description: <div class="disable-select NotificationDescription"> Successfully logged out! Thank you. </div>,
        })
        
        this.$router.push('/login')
      },
    },
  }
</script>
<!-- ============================================================================================== -->
<!-- =========================================== Styles =========================================== -->
<!-- ============================================================================================== -->
<style scoped>
  .Avatar:hover{
    -ms-transform: scale(3) !important; /* IE 9 */
    -webkit-transform: scale(3) !important; /* Safari 3-8 */
    transform: scale(3) !important; 
    transition: 0.5s !important;
  }

  .Button{
    font-family: arial !important;
    font-size: 12px !important;
    border: 1px black solid !important;
  }
</style>