<template>
    <div>
        <!-- <a-result v-if="blnAdmin === false" status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <center> <a-button type="primary" icon="arrow-left" @click="$router.push('/fileleaveofabsence')"> Go back to Main Page </a-button> </center>  
        </template>
        </a-result> -->
        <v-row>
            <v-col>
                <v-card-text class="disable-select" style="padding-top:50px;">
                    <div style="padding-left:50px; padding-right:50px; padding-bottom:30px;">
                        <v-layout>
                            <span style="padding-top:5px; font-family:arial; font-size:45px; font-weight:bold;"> ENCODER ACCOUNTS</span>
                            <v-spacer></v-spacer>
                            <a-input v-model="strEncoderAccountSearch" style="width:45%; border:1px black solid; border-radius:4px;" :placeholder="`Search encoder here...`" allowClear>
                                <template #suffix> <v-icon style="color:black;"> mdi-magnify </v-icon> </template>
                            </a-input>
                        </v-layout>
                    </div>
<!-- ============================================================================================== -->
<!-- ===================================== Encoder Accounts Table ================================= -->
<!-- ============================================================================================== -->      
                    <div style="padding-left:50px; padding-right:50px;">
                        <div style="border:1px black solid; border-radius: 5px 5px 0px 0px; height:40px;">
                            <v-row style="font-size:14px; font-family:arial; font-weight:bold;">
                                <v-col cols="2"></v-col>
                                <v-col cols="2.5" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> EMPLOYEE CODE </v-col>
                                <v-col cols="2.5" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> EMPLOYEE NAME </v-col>
                                <v-col cols="2.5" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> DEPARTMENT NAME </v-col>
                                <v-col cols="2" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> OPTIONS </v-col>
                            </v-row>
                        </div>
                    </div>
                    
                    <div style="padding-left:50px; padding-right:50px; padding-bottom:15px;">
                        <a-list :data-source="compSystemEncoderAccounts" size="small" item-layout="horizontal" class="EncoderAccountsList" style="border: 1px black solid; border-radius:0px 0px 5px 5px;" bordered>
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
                                    <v-col cols="2.5" class="disable-select" style="padding-left:10px;"> {{item.EmployeeCode}} </v-col>
                                    <v-col cols="2.5" class="disable-select" style="padding-left:20px;"> {{item.EmployeeName}} </v-col>
                                    <v-col cols="2.5" class="disable-select" style="padding-left:15px;"> {{item.DepartmentName}} </v-col>
                                    <v-col cols="2" class="disable-select" style="padding-left:15px;">
                                    <span>
                                        <a-popconfirm title="Remove this encoder as an encoder user?" ok-text="Yes" cancel-text="No" @confirm="ClickDeleteEncoderAccount(item)" placement="topRight">
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
<!-- ================================= Add New Encoder per Department ============================= -->
<!-- ============================================================================================== -->
                    <div style="padding-left:50px; padding-right:50px;">
                        <a-collapse style="border: 1px black solid;">
                            <a-collapse-panel key="1" header="Click here to add new encoder" :showArrow="false">
                                <v-row>
                                    <v-col cols="2" style="text-align:center; padding-top:10px;">
                                        <span>
                                        <a-popover placement="right">
                                            <a-avatar style="border:1px black solid;" :src="strAddEncoderAccountAvatar" :size="60" shape="square"> ? </a-avatar>
                                            <template #content>
                                            <a-avatar style="border:1px black solid;" :src="strAddEncoderAccountAvatar" :size="130" shape="square"> ? </a-avatar>
                                            </template>
                                        </a-popover>
                                        </span>
                                    </v-col>

                                    <v-col cols="3" style="color:black;">
                                        <span :style="`padding-top:5px; font-family:arial; font-weight:bold; color:${intAddEncoderAccountEmployeeCodeError === 0 ? 'black' : 'red'};`"> Employee Code: </span>
                                        <v-spacer></v-spacer>
                                        <a-input v-model="strEmployeeCode" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g,'$1');" :style="`height:34px; width:100%; text-align:center; color:black; border: 1px solid; border-radius:4px; border-color:${intAddEncoderAccountEmployeeCodeError === 0 ? 'black' : 'red'};`" placeholder="Type here..." allowClear @change="GetEmployeeInformation()" @keypress.enter="ClickAddNewEncoderAccount()"></a-input>

                                        <v-layout style="color:red; font-size:15px;">
                                        <v-spacer></v-spacer>
                                        <span v-if="intAddEncoderAccountEmployeeCodeError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
                                        <span v-if="intAddEncoderAccountEmployeeCodeError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Employee code does not exist. </span>
                                        <span v-if="intAddEncoderAccountEmployeeCodeError === 3"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Employee already registered as encoder. </span>
                                        <!-- <span v-if="intAddEncoderAccountEmployeeCodeError === 4"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Denied! Employee you registered is admin. </span>
                                        <span v-if="intAddEncoderAccountEmployeeCodeError === 5"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Denied! The department already added. </span> -->
                                        </v-layout>
                                    </v-col>

                                    <v-col cols="3" style="color:black;">
                                        <span style="padding-top:5px; font-family:arial; font-weight:bold; color:black;"> Employee Name: </span>
                                        <v-spacer></v-spacer>
                                        <a-input v-model="strEmployeeName" style="height:34px; width:100%; border:1px black solid; border-radius:4px;" disabled></a-input>
                                    </v-col>

                                    <v-col cols="3" style="color:black;">
                                        <span :style="`padding-top:5px; font-family:arial; font-weight:bold; color:black ${intAddEncoderAccountDepartmentCodeError === 0 ? 'black' : 'red'}; `"> Department Name: </span>
                                        <v-spacer></v-spacer>
                                        <a-input v-model="strDepartmentName" style="height:34px; width:100%; border:1px black solid; border-radius:4px;" disabled></a-input>
                                        <v-layout style="color:red; font-size:15px;">
                                        <v-spacer></v-spacer>
                                        <span v-if="intAddEncoderAccountDepartmentCodeError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> The department already added. </span>
                                        </v-layout>
                                    </v-col>

                                    <v-col cols="1" align="center" justify="center">
                                        <div style="padding-top:20px;">
                                        <a-tooltip title="Save" placement="top">
                                            <a-button key="submit" icon="save" type="primary" shape="circle" @click="ClickAddNewEncoderAccount()" style="border: 1px black solid;"></a-button>
                                        </a-tooltip>
                                        </div>
                                    </v-col>
                                </v-row>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
<!-- ============================================================================================== -->
<!-- =================================Edit Encoder Accounts Dialog ================================ -->
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
    import axios from 'axios'
    import moment from "moment"
    import _ from "lodash"

export default {
// ********************************************************************************** //
// ====================================== Data ====================================== //
// ********************************************************************************** //
      data(){
        return{
            strEncoderAccountSearch: undefined,
            strAddEncoderAccountAvatar: undefined,
            strEmployeeCode: undefined,
            strCompanyDepartment: undefined,
            strDepartmentName:undefined,
            strEmployeeName: undefined,

            
            intAddEncoderAccountEmployeeCodeError: 0,
            intAddEncoderAccountDepartmentCodeError: 0,
            
            objUserInformation: {},
            blnAdmin:false,

            objEmployeeData: {},

            arrSystemEncoderAccounts:[],
            arrEncoderAccounts: [],
        }
      },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //    
    created(){
        // this.CheckIfEncoder()
        // this.CheckIfAdmin()
        this.GetUserInformations()
        this.GetSystemEncoderAccounts()
    },
 // *********************************************************************************** //
// ===================================== Computed ==================================== //
// *********************************************************************************** //
    computed:{
        compSystemEncoderAccounts(){
            // console.log('tskk', this.arrSystemEncoderAccounts)
            let data = this.arrSystemEncoderAccounts
            if(this.strEncoderAccountSearch !== undefined && this.strEncoderAccountSearch !== null && this.strEncoderAccountSearch !== ""){
            data = data.filter(rec => {
                return rec.EmployeeCode.toUpperCase().includes(this.strEncoderAccountSearch.toUpperCase()) || 
                    rec.EmployeeName.toUpperCase().includes(this.strEncoderAccountSearch.toUpperCase()) ||
                    rec.DepartmentName.toUpperCase().includes(this.strEncoderAccountSearch.toUpperCase())
                })
            }
            return data
        }
    },
// ********************************************************************************** //
// ====================================== Watch ===================================== //
// ********************************************************************************** //
    watch:{
    }, 
// ********************************************************************************** //
// ===================================== Methods ==================================== //
// ********************************************************************************** //
    methods:{
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
        GetUserInformations(){
            let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(this.$store.state.loa_user)}`
            axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
                this.objUserInformation = res.data[0]
                // this.CheckIfEncoder() // dagdag ko
                // this.CheckIfAdmin()
            })
        },
        GetSystemEncoderAccounts(){ 
            let arrEncoderAccounts = []
            let EmployeeCounter = 0

            this.GetSystemEncoderAccountsURL = `${this.api}GetSystemEncoderAccounts`
            axios.get(this.GetSystemEncoderAccountsURL).then(EncoderAccounts => {
                EncoderAccounts.data.forEach(EncoderAccount => {
                    let BasicInfoAPI = `${this.basicInfo_API}${EncoderAccount.EmployeeCode}`
                    axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(BasicInfo => {
                        EncoderAccount.EmployeeAvatar = `${this.avatar_API}${EncoderAccount.EmployeeCode}.jpg`
                        EncoderAccount.EmployeeName = BasicInfo.data[0].EmployeeName
                        EncoderAccount.DepartmentName = BasicInfo.data[0].DepartmentName
                        arrEncoderAccounts.push(EncoderAccount)
                        EmployeeCounter++
                        if(EmployeeCounter === arrEncoderAccounts.length){
                            this.arrSystemEncoderAccounts = _.orderBy( arrEncoderAccounts, 'EmployeeCode', 'ASC')
                        }
                    })
                })
            })
        },
        GetEmployeeInformation(){
            if(this.strEmployeeCode !== undefined && this.strEmployeeCode !== null && this.strEmployeeCode !== ""){
            let BasicInfoAPI = `${this.basicInfo_API}${this.strEmployeeCode}`
            axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
                this.objEmployeeData = res.data[0]
                if((this.objEmployeeData !== undefined && this.objEmployeeData !== null && this.objEmployeeData !== {}) && 
                    (this.objEmployeeData.ContractStatus.toUpperCase() !== "S") && 
                    (this.objEmployeeData.EmployeeStatus.toUpperCase() !== "SEPARATED") && 
                    (this.objEmployeeData.SeparationDate === undefined || this.objEmployeeData.SeparationDate === null || this.objEmployeeData.SeparationDate === "" || moment().format("YYYY/MM/DD") <= moment(this.objEmployeeData.SeparationDate).format("YYYY/MM/DD"))){
                    this.strAddEncoderAccountAvatar = `${this.avatar_API}${this.objEmployeeData.EmployeeCode}.jpg`
                    this.strEmployeeName = this.objEmployeeData.EmployeeName
                    this.strDepartmentName = this.objEmployeeData.DepartmentName
                    
                }
                else{
                    this.strAddEncoderAccountAvatar = ""
                    this.strEmployeeName = ""
                    this.strDepartmentName = ""
                    this.objEmployeeData = undefined
                }
            })
            }
            else{
                this.strAddEncoderAccountAvatar = ""
                this.strEmployeeName = ""
                this.strDepartmentName = ""
                this.objEmployeeData = undefined
            }
        },
        // CheckIfAdmin(){
        //     let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        //     this.blnAdmin =  Data.isAdmin
        // },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
        ClickAddNewEncoderAccount(){
            this.intAddEncoderAccountEmployeeCodeError = 0

            if(this.strEmployeeCode === undefined || this.strEmployeeCode === null || this.strEmployeeCode.trim() === ""){
                this.intAddEncoderAccountEmployeeCodeError = 1
            }
            else if((this.objEmployeeData === undefined || this.objEmployeeData === null || this.objEmployeeData === {})){
                this.intAddEncoderAccountEmployeeCodeError = 2
            }
            else {
                let EncoderAccounts = []
                let EncoderAccount = ""

                this.arrSystemEncoderAccounts.forEach(SystemEncoderAccounts => {
                if(EncoderAccount === undefined || EncoderAccount === null || EncoderAccount.trim() === ""){
                    EncoderAccount = SystemEncoderAccounts.EmployeeCode.toUpperCase()
                    }
                    else{
                    EncoderAccount = EncoderAccount + ',' + SystemEncoderAccounts.EmployeeCode.toUpperCase()
                }
            })
            EncoderAccounts = EncoderAccount.split(',')
            if(EncoderAccounts.includes(this.strEmployeeCode.trim().toUpperCase()) === true){
                this.intAddEncoderAccountEmployeeCodeError = 3
            }
            else if(EncoderAccounts.includes(this.strEmployeeCode.trim().toUpperCase()) === false){
                if(this.intAddEncoderAccountEmployeeCodeError === 0){
                let Query = `INSERT INTO dbo.EncoderAccounts
                                ( EmployeeCode, CreatedDate, UpdatedDate, UpdatedBy )
                                VALUES 
                                ( '${this.strEmployeeCode}', GETDATE(), GETDATE(), '${this.objUserInformation.EmployeeCode}' )`

                let Data = {Query: Query}
                let AddNewEncoderAccountURL = `${this.api}AddEncoderAccount`
                axios.post(AddNewEncoderAccountURL, Data).then(() => {
                    this.$notification.success({
                    style: "background-color:#7FDBFF;",
                    icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
                    message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
                    description: <div class="disable-select NotificationDescription"> New Encoder account registered successfully. </div>,
                    })
                    this.strAddEncoderAccountAvatar = ""
                    this.strEmployeeCode = ""
                    this.strEmployeeName = ""
                    this.strDepartmentName = ""
                    this.intAddEncoderAccountEmployeeCodeError = 0
                    this.objEmployeeData = undefined
                    this.GetSystemEncoderAccounts()
                })
                }
            }
            }
        },
        ClickDeleteEncoderAccount(EncoderAccount){
            let Query = `UPDATE dbo.EncoderAccounts
                        SET     DeletedDate = GETDATE(),
                                UpdatedDate = GETDATE(),
                                UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                        WHERE   EmployeeCode = '${EncoderAccount.EmployeeCode}'`
            let Data = {Query: Query}
            let DeleteEncoderAccountURL = `${this.api}DeleteEncoderAccount`
            axios.post(DeleteEncoderAccountURL, Data).then(() => {
                this.$notification.success({
                    style: "background-color:#7FDBFF;",
                    icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
                    message: <b class="disable-select" style="color:black;"> Employees' Leave of Absence </b>,
                    description: <div class="disable-select NotificationDescription"> Enocder account successfully marked as deleted. </div>,
                })
                this.GetSystemEncoderAccounts()
            })
        },
    },

}
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .EncoderAccountsList{
    max-height: calc(100vh - 380px) !important;
    min-height: calc(100vh - 380px) !important;
    overflow-y: auto !important;
    overflow-x: auto !important;
  }

  .EncoderAccountsList .ant-list-item:hover{
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