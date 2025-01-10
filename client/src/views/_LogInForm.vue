<template>
  <div id="app">
<!-- ************************************************************************************************* -->
<!-- ============================================= Log In ============================================ -->
<!-- ************************************************************************************************* -->
    <v-app id="inspire">
      <v-app id="inspire" style="background-color:#dbdcda">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-card class="mx-auto elevation-12 pl-3 pr-2" style="border-radius:7px;" max-width="700px">
                  <v-row>
<!-- ============================================== -->
<!-- ===================== Icon =================== -->
<!-- ============================================== -->
                    <v-col cols="3" style="padding-top:20px; background-color:#7FDBFF; border-radius:7px 0px 0px 7px; border: 1px black solid;">
                      <v-row>
                        <v-col align="center" justify="center">
                             <v-img max-width="150px" src="Leave of Absence Icon.png" alt="Leave of Absence"></v-img>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col align="center" justify="center">
                          <span class="disable-select" style="font-family:arial; font-size:17px; font-weight:bold;"> {{strVersion}} </span>
                        </v-col>
                      </v-row>
                    </v-col>

<!-- ============================================== -->
<!-- ==================== Text ==================== -->
<!-- ============================================== -->
                    <v-col>
                      <v-row style="padding-top:20px;">
                        <v-col align="center" justify="center">
                          <v-img max-width="80%" src="Leave of Absence Logo.png" alt="Leave of Absence"></v-img>
                        </v-col>
                      </v-row>

                      <v-form style="margin-top:20px;" align="center" justify="center">

                        <v-layout style="padding-bottom:3px;">
                          <v-icon style="color:black;"> mdi-shield-account </v-icon>
                          <v-spacer></v-spacer> <a-input v-model="strEmployeeCode" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g,'$1');" class="InputLogIn" style="width:150px;" @click="JALogin()" @change="CheckLogIn()" @keypress.enter="ClickLogIn()" allowClear></a-input>
                          <v-spacer></v-spacer> <a-input class="disable-select" style="width:300px;" v-model="strEmployeeName" disabled></a-input>
                        </v-layout>

                        <v-layout style="padding-bottom:7px;">
                          <v-icon style="color:black;"> mdi-shield-key </v-icon>
                          <v-spacer></v-spacer> <a-input-password v-model="strPassword" class="InputLogIn" style="width:150px;" @keypress.enter="ClickLogIn()" allowClear></a-input-password>
                          <v-spacer></v-spacer> <a-input class="disable-select" style="width:300px;" v-model="strCompanyDepartment" disabled></a-input>
                        </v-layout>

                        <v-layout>
                          <v-spacer></v-spacer>
                          <a-tooltip :title="`Log in`" placement="left">
                            <a-button key="submit" type="primary" shape="circle" icon="login" :disabled="compCheckFields" @click="ClickLogIn()" style="border:1px black solid;"></a-button>
                          </a-tooltip>
                        </v-layout>

                        <p class="disable-select text-center pl-1 pt-4" style="font-family:arial; font-size:10px; color:black; margin:auto;">
                          Allows filing / monitoring of used and available leaves for HRD Group of Companies' employees. 2021
                        </p>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>    
      </v-app>
    </v-app>
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>
  import axios from "axios"
  import moment from "moment"
  
  export default{
// ================================================= //
// ===================== Data ====================== //
// ================================================= //
    data(){
      return{
        strEmployeeCode: undefined,
        strPassword: undefined,
        strFirstName: undefined,
        strEmployeeName: undefined,
        strCompanyDepartment: undefined,
        dataneeded  : {},

        blnActive: false,

        objEmployeeData: {},

        strid: undefined,
        strJAEmployeeName : undefined,
        strJAPassword: undefined,
        strJAAssignCompanies: undefined,
      }
    },
// ==================================================== //
// ===================== Computed ===================== //
// ==================================================== //
    computed:{
      compCheckFields(){
        let isDisabled = true

        if((this.strEmployeeCode !== undefined && this.strEmployeeCode !== null && this.strEmployeeCode !== "")){
          if(this.strPassword !== undefined && this.strPassword !== null && this.strPassword !== ""){
            if(this.blnActive === true){
              isDisabled = false
            }
          }
        }

        return isDisabled
      },
    },
// ==================================================== //
// ===================== Methods ====================== //
// ==================================================== //
    methods:{
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
      CheckLogIn(){
        if(this.strEmployeeCode !== undefined && this.strEmployeeCode !== null && this.strEmployeeCode !== ""){
          let BasicInfoAPI = `${this.basicInfo_API}${this.strEmployeeCode}`
          axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
            if(res.data[0]){
              this.objEmployeeData = res.data[0]
            // console.log(this.objEmployeeData)
            this.dataneeded.ShortName = this.objEmployeeData.ShortName 
            // this.dataneeded.EmplCode = this.objEmployeeData.EmployeeCode
            if((this.objEmployeeData !== undefined && this.objEmployeeData !== null && this.objEmployeeData !== {}) && 
               (this.objEmployeeData.ContractStatus.toUpperCase() !== "S") && 
               (this.objEmployeeData.EmployeeStatus.toUpperCase() !== "SEPARATED") && 
               (this.objEmployeeData.SeparationDate === undefined || this.objEmployeeData.SeparationDate === null || this.objEmployeeData.SeparationDate === "" || moment().format("YYYY/MM/DD") <= moment(this.objEmployeeData.SeparationDate).format("YYYY/MM/DD"))){
              this.strEmployeeName = this.objEmployeeData.EmployeeName
              this.strFirstName = this.objEmployeeData.FirstName
            this.strCompanyDepartment = this.objEmployeeData.ShortName + ' - ' + this.objEmployeeData.DepartmentName
            
              this.blnActive = true
            
            }
            else{
              this.strEmployeeName = ""
              this.strFirstName = ""
              this.strCompanyDepartment = ""
              this.blnActive = false
              this.objEmployeeData = undefined
            }
            }
          })
        }
        else{
          this.strEmployeeName = ""
          this.strFirstName = ""
          this.strCompanyDepartment = ""
          this.blnActive = false
          this.objEmployeeData = undefined
        }
       
      },
      JALogin(){
        if (this.strid !== undefined && this.strid !== null && this.strid !== ""){
        let jaInfoAPI = `${this.ja_Info_API}${this.strid}`
        axios.get(jaInfoAPI, {headers:{'x-api-key' : this.jaheader_API}}).then(res => {
          console.log(res)
        }
       )}
      },

// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ClickLogIn(){
        if(this.blnActive === true){
          let SystemUserData = {}

          let UserURL = `${this.api}GetSystemUsers?EmployeeCode=${this.strEmployeeCode}`
          axios.get(UserURL).then(res => {
            SystemUserData = res.data[0]
            if(SystemUserData !== undefined && SystemUserData !== null && SystemUserData !== {}){
              if(SystemUserData.Password === this.strPassword){
                this.SuccessLogin()
              }
              else{
                this.FailedLogin()
              }
            }
            else{
              if(this.strEmployeeCode === this.strPassword){
                this.SuccessLogin()
              }
              else{
                this.FailedLogin()
              }
            }
          })
        }
      },
      ClickJALogIn(){
        if(this.blnActive === true){
          let JapaneseUserData= {}

          let JaUserURL = `${this.api}GetJapaneseUsers?id=${this.id}`
          axios.get(JaUserURL).then(res => {
            JapaneseUserData = res.data[0]
            if(JapaneseUserData !== undefined && JapaneseUserData !== null && JapaneseUserData !== {}){
              if(JapaneseUserData.Password === this.strPassword){
                this.SuccessLogin()
              }
              else{
                this.FailedLogin()
              }
            }
            else{
              if(this.strid === this.strPassword){
                this.SuccessLogin()
              }
              else{
                this.FailedLogin()
              }
            }
          })
        }
      },
// ============================================================= //
// ======================= Other Events ======================== //
// ============================================================= //
      SuccessLogin(){
        var EncryptUserLogIn = this.$CryptoJS.AES.encrypt(this.strEmployeeCode, process.env.VUE_APP_SECRETKEY).toString()
        var EncryptLogIn = this.$CryptoJS.AES.encrypt('true', process.env.VUE_APP_SECRETKEY).toString()
        this.$store.commit("CHANGE_LOA_USER", EncryptUserLogIn)
        this.$store.commit("CHANGE_LOA_LOGIN", EncryptLogIn)
        this.$store.commit("CHANGE_REF", this.dataneeded)

        this.$notification.open({
          style: "background-color:#7FDBFF;",
          icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
          message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
          description: <div class="disable-select NotificationDescription"> Welcome {this.strFirstName}! </div>,
        })

        this.$router.push('/fileleaveofabsence')
      },
      FailedLogin(){
        this.$notification.open({
          style: "background-color:#7FDBFF;",
          icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
          message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
          description: <div class="disable-select NotificationDescription"> Log in failed! Please check username/password. </div>,
        })
      },
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  img{
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .spanLabel{
    padding-top: 5px !important;
    color: black !important;
  }

  .ant-input[disabled]{
    font-family: arial !important;
    font-size: 14px !important;
    font-weight: bold !important;
    color: black !important;
    border: 1px black solid !important;
    border-radius: 4px !important;
    background-color: #60bfe7 !important;
    cursor: default !important;
    opacity: 1 !important;
  }
</style>