<template>
  <div>
<!-- ******************************************************************************************** -->
<!-- ====================================== 403 Not Allowed ===================================== -->
<!-- ******************************************************************************************** -->
    <a-result v-if="blnAdmin === false" status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <center> <a-button type="primary" icon="arrow-left" @click="$router.push('/fileleaveofabsence')"> Go back to Main Page </a-button> </center>  
      </template>
    </a-result>
<!-- ============================================================================================== -->
<!-- =========================================== Header =========================================== -->
<!-- ============================================================================================== -->
    <v-row v-else no-gutters>
      <v-col>
        <v-card-text class="disable-select" style="padding-top:50px;">
          <div style="padding-left:50px; padding-right:50px; padding-bottom:30px;">
            <v-layout>
              <span style="padding-top:5px; font-family:arial; font-size:45px; font-weight:bold;"> ADMIN ACCOUNTS </span>
              <v-spacer></v-spacer>
              <a-input v-model="strAdminAccountSearch" style="width:45%; border:1px black solid; border-radius:4px;" :placeholder="`Search admin here...`" allowClear>
                <template #suffix> <v-icon style="color:black;"> mdi-magnify </v-icon> </template>
              </a-input>
            </v-layout>
          </div>
<!-- ============================================================================================== -->
<!-- ===================================== Admin Accounts Table =================================== -->
<!-- ============================================================================================== -->
          <div style="padding-left:50px; padding-right:50px;">
            <div style="border:1px black solid; border-radius: 5px 5px 0px 0px; height:40px;">
              <v-row style="font-size:14px; font-family:arial; font-weight:bold;">
                <v-col cols="2"></v-col>
                <v-col cols="3" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> EMPLOYEE CODE </v-col>
                <v-col cols="5" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> EMPLOYEE NAME </v-col>
                <v-col cols="2" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> OPTIONS </v-col>
              </v-row>
            </div>
          </div>

          <div style="padding-left:50px; padding-right:50px; padding-bottom:15px;">
            <a-list :data-source="compSystemAdminAccounts" size="small" item-layout="horizontal" class="AdminAccountsList" style="border: 1px black solid; border-radius:0px 0px 5px 5px;" bordered>
              <a-list-item slot="renderItem" slot-scope="item" :id="item.EmployeeCode" :style="`background-color:${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : '#fd7675'};`">
                <a-tooltip :title="`${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : 'Deleted'}`">
                  <a-list-item-meta>
                    <span slot="title" style="font-size:14px; color:black; font-family:arial;">
                      <v-row align="center" justify="center">
                        <v-col cols="2" style="padding-top:10px;">
                          <span style="padding-left:50px;">
                            <a-popover placement="right">
                              <a-avatar style="border:1px black solid;" :src="item.EmployeeAvatar" :size="60" shape="square"> ? </a-avatar>
                              <template #content>
                                <a-avatar style="border:1px black solid;" :src="item.EmployeeAvatar" :size="130" shape="square"> ? </a-avatar>
                              </template>
                            </a-popover>
                          </span>
                        </v-col>
                        <v-col cols="3" class="disable-select" style="padding-left:10px;"> {{item.EmployeeCode}} </v-col>
                        <v-col cols="5" class="disable-select" style="padding-left:20px;"> {{item.EmployeeName}} </v-col>
                        <v-col cols="2" class="disable-select" style="padding-left:15px;">
                          <span>
                            <a-popconfirm title="Remove this account as an admin user?" ok-text="Yes" cancel-text="No" @confirm="ClickDeleteAdminAccount(item)" placement="topRight">
                              <a-tooltip title="Delete" placement="right">
                                <a-button v-if="item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === ''" type="danger" shape="circle" icon="delete" style="border: 1px black solid;"></a-button>
                              </a-tooltip>
                            </a-popconfirm>
                          </span>
                        </v-col>
                      </v-row>
                    </span>
                  </a-list-item-meta>
                </a-tooltip>
              </a-list-item>
            </a-list>
          </div>
<!-- ============================================================================================== -->
<!-- ===================================== Add New Admin Account ================================== -->
<!-- ============================================================================================== -->
          <div style="padding-left:50px; padding-right:50px;">
            <a-collapse style="border: 1px black solid;">
              <a-collapse-panel key="1" header="Click here to add new admin account" :showArrow="false">
                <v-row>
                  <v-col cols="2" style="text-align:center; padding-top:10px;">
                    <span>
                      <a-popover placement="right">
                        <a-avatar style="border:1px black solid;" :src="strAddAdminAccountAvatar" :size="60" shape="square"> ? </a-avatar>
                        <template #content>
                          <a-avatar style="border:1px black solid;" :src="strAddAdminAccountAvatar" :size="130" shape="square"> ? </a-avatar>
                        </template>
                      </a-popover>
                    </span>
                  </v-col>

                  <v-col cols="3" style="color:black;">
                    <span :style="`padding-top:5px; font-family:arial; font-weight:bold; color:${intAddAdminAccountEmployeeCodeError === 0 ? 'black' : 'red'};`"> Employee Code: </span>
                    <v-spacer></v-spacer>
                    <a-input v-model="strAddAdminAccountEmployeeCode" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g,'$1');" :style="`height:34px; width:100%; text-align:center; color:black; border: 1px solid; border-radius:4px; border-color:${intAddAdminAccountEmployeeCodeError === 0 ? 'black' : 'red'};`" placeholder="Type here..." allowClear @change="GetEmployeeInformation(), ChangeAddAdminAccountEmployeeCode()" @keypress.enter="ClickAddNewAdminAccount()"></a-input>

                    <v-layout style="color:red; font-size:15px;">
                      <v-spacer></v-spacer>
                      <span v-if="intAddAdminAccountEmployeeCodeError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
                      <span v-if="intAddAdminAccountEmployeeCodeError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Employee code does not exist. </span>
                      <span v-if="intAddAdminAccountEmployeeCodeError === 3"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Employee already registered as admin. </span>
                    </v-layout>
                  </v-col>

                  <v-col cols="6" style="color:black;">
                    <span style="padding-top:5px; font-family:arial; font-weight:bold; color:black;"> Employee Name: </span>
                    <v-spacer></v-spacer>
                    <a-input v-model="strAddAdminAccountEmployeeName" style="height:34px; width:100%; border:1px black solid; border-radius:4px;" disabled></a-input>
                  </v-col>

                  <v-col cols="1" align="center" justify="center">
                    <div style="padding-top:20px;">
                      <a-tooltip title="Save" placement="top">
                        <a-button key="submit" icon="save" type="primary" shape="circle" @click="ClickAddNewAdminAccount()" style="border: 1px black solid;"></a-button>
                      </a-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </a-collapse-panel>
            </a-collapse>
          </div>
<!-- ============================================================================================== -->
<!-- =================================== Edit Leave Type Dialog =================================== -->
<!-- ============================================================================================== -->
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>
  import axios from "axios"
  import moment from "moment"
  import _ from "lodash"
  
  export default{
  // ********************************************************************************** //
  // ====================================== Data ====================================== //
  // ********************************************************************************** //
    data(){
      return{
        strAdminAccountSearch: undefined,
        strAddAdminAccountAvatar: undefined,
        strAddAdminAccountEmployeeCode: undefined,
        strAddAdminAccountEmployeeName: undefined,

        intAddAdminAccountEmployeeCodeError: 0,

        objUserInformation: {},
        objEmployeeInformationToAdd: {},
        blnAdmin: false,

        arrSystemAdminAccounts: [],
      }
    },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
    created(){
      this.CheckIfAdmin()
      this.GetUserInformation()
      this.GetSystemAdminAccounts()
    },
  // *********************************************************************************** //
  // ===================================== Computed ==================================== //
  // *********************************************************************************** //
    computed:{
      compSystemAdminAccounts(){
        // console.log('info', this.arrSystemAdminAccounts)
        let data = this.arrSystemAdminAccounts
        if(this.strAdminAccountSearch !== undefined && this.strAdminAccountSearch !== null && this.strAdminAccountSearch !== ""){
          data = data.filter(rec => {
            return rec.EmployeeCode.toUpperCase().includes(this.strAdminAccountSearch.toUpperCase()) || 
                   rec.EmployeeName.toUpperCase().includes(this.strAdminAccountSearch.toUpperCase())
          })
        }
        return data
      }
    },
// ********************************************************************************** //
// ===================================== Methods ==================================== //
// ********************************************************************************** //
    methods:{
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
      GetUserInformation(){
        let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(this.$store.state.loa_user)}`
        axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
          this.objUserInformation = res.data[0]
        })
      },
      GetSystemAdminAccounts(){
        let arrAdminAccounts = []
        let EmployeeCounter = 0

        let GetSystemAdminAccountsURL = `${this.api}GetSystemAdminAccounts`
        axios.get(GetSystemAdminAccountsURL).then(AdminAccounts => {
          AdminAccounts.data.forEach(AdminAccount => {
            let BasicInfoAPI = `${this.basicInfo_API}${AdminAccount.EmployeeCode}`
            axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(BasicInfo => {
              AdminAccount.EmployeeAvatar = `${this.avatar_API}${AdminAccount.EmployeeCode}.jpg`
              AdminAccount.EmployeeName =  BasicInfo.data[0].EmployeeName
              arrAdminAccounts.push(AdminAccount)
              EmployeeCounter++
              if(EmployeeCounter === arrAdminAccounts.length){
                this.arrSystemAdminAccounts = _.orderBy( arrAdminAccounts, 'EmployeeCode', 'ASC')
              }
            })
          })
        })
      },
      GetEmployeeInformation(){
        if(this.strAddAdminAccountEmployeeCode !== undefined && this.strAddAdminAccountEmployeeCode !== null && this.strAddAdminAccountEmployeeCode !== ""){
          let BasicInfoAPI = `${this.basicInfo_API}${this.strAddAdminAccountEmployeeCode}`
          axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
            this.objEmployeeInformationToAdd = res.data[0]
            if((this.objEmployeeInformationToAdd !== undefined && this.objEmployeeInformationToAdd !== null && this.objEmployeeInformationToAdd !== {}) &&
               (this.objEmployeeInformationToAdd.ContractStatus.toUpperCase() !== "S") && 
               (this.objEmployeeInformationToAdd.EmployeeStatus.toUpperCase() !== "SEPARATED") && 
               (this.objEmployeeInformationToAdd.SeparationDate === undefined || this.objEmployeeInformationToAdd.SeparationDate === null || this.objEmployeeInformationToAdd.SeparationDate === "" || moment().format("YYYY/MM/DD") <= moment(this.objEmployeeInformationToAdd.SeparationDate).format("YYYY/MM/DD"))){
              this.strAddAdminAccountAvatar = `${this.avatar_API}${this.objEmployeeInformationToAdd.EmployeeCode}.jpg`
              this.strAddAdminAccountEmployeeName = this.objEmployeeInformationToAdd.EmployeeName
            }
            else{
              this.strAddAdminAccountAvatar = ""
              this.strAddAdminAccountEmployeeName = ""
              this.objEmployeeInformationToAdd = undefined
            }
          })
        }
        else{
          this.strAddAdminAccountAvatar = ""
          this.strAddAdminAccountEmployeeName = ""
          this.objEmployeeInformationToAdd = undefined
        }
      },
      CheckIfAdmin(){
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        this.blnAdmin =  Data.isAdmin
      },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ChangeAddAdminAccountEmployeeCode(){
        this.intAddAdminAccountEmployeeCodeError = 0
      },
      ClickAddNewAdminAccount(){
        this.intAddAdminAccountEmployeeCodeError = 0

// EMPLOYEE CODe CHECKING
// 1 - Blank Employee Code Field
// 2 - Check Employee Code Existence
// 3 - Check Employee Code Availability
        if(this.strAddAdminAccountEmployeeCode === undefined || this.strAddAdminAccountEmployeeCode === null || this.strAddAdminAccountEmployeeCode.trim() === ""){
          this.intAddAdminAccountEmployeeCodeError = 1
        }
        else if((this.objEmployeeInformationToAdd === undefined || this.objEmployeeInformationToAdd === null || this.objEmployeeInformationToAdd === {})){
          this.intAddAdminAccountEmployeeCodeError = 2
        }
        else{
          let AdminAccounts = []
          let AdminAccount = ""

          this.arrSystemAdminAccounts.forEach(SystemAdminAccounts => {
            if(AdminAccount === undefined || AdminAccount === null || AdminAccount.trim() === ""){
              AdminAccount = SystemAdminAccounts.EmployeeCode.toUpperCase()
            }
            else{
              AdminAccount = AdminAccount + ',' + SystemAdminAccounts.EmployeeCode.toUpperCase()
            }
          })
          AdminAccounts = AdminAccount.split(',')
          if(AdminAccounts.includes(this.strAddAdminAccountEmployeeCode.trim().toUpperCase()) === true){
            this.intAddAdminAccountEmployeeCodeError = 3
          }
          else if(AdminAccounts.includes(this.strAddAdminAccountEmployeeCode.trim().toUpperCase()) === false){
            if(this.intAddAdminAccountEmployeeCodeError === 0){
              let Query = `INSERT INTO dbo.AdminAccounts
                            ( EmployeeCode, CreatedDate, UpdatedDate, UpdatedBy )
                            VALUES 
                            ( '${this.strAddAdminAccountEmployeeCode}', GETDATE(), GETDATE(), '${this.objUserInformation.EmployeeCode}' )`

              let Data = {Query: Query}
              let AddNewAdminAccountURL = `${this.api}AddAdminAccount`
              axios.post(AddNewAdminAccountURL, Data).then(() => {
                this.$notification.success({
                  style: "background-color:#7FDBFF;",
                  icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
                  message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
                  description: <div class="disable-select NotificationDescription"> New admin account registered successfully. </div>,
                })
                this.strAddAdminAccountAvatar = ""
                this.strAddAdminAccountEmployeeCode = ""
                this.strAddAdminAccountEmployeeName = ""
                this.intAddAdminAccountEmployeeCodeError = 0
                this.objEmployeeInformationToAdd = undefined
                this.GetSystemAdminAccounts()
              })
            }
          }
        }
      },
      ClickDeleteAdminAccount(AdminAccount){
        let Query = `UPDATE	dbo.AdminAccounts
                      SET   DeletedDate = GETDATE(),
                            UpdatedDate = GETDATE(),
                            UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                      WHERE	EmployeeCode = '${AdminAccount.EmployeeCode}'`

        let Data = {Query: Query}
        let DeleteAdminAccountURL = `${this.api}DeleteAdminAccount`
        axios.post(DeleteAdminAccountURL, Data).then(() => {
          this.$notification.success({
            style: "background-color:#7FDBFF;",
            icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
            message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
            description: <div class="disable-select NotificationDescription"> Admin account successfully marked as deleted. </div>,
          })
          this.GetSystemAdminAccounts()
        })
      }
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .AdminAccountsList{
    max-height: calc(100vh - 380px) !important;
    min-height: calc(100vh - 380px) !important;
    overflow-y: auto !important;
    overflow-x: auto !important;
  }

  .AdminAccountsList .ant-list-item:hover{
    background-color: #999999 !important;
  }
  
  .ant-input[disabled]{
    font-family: arial !important;
    font-size: 14px !important;
    color: black !important;
    background-color: #bebebe !important;
    cursor: default !important;
  }
</style>