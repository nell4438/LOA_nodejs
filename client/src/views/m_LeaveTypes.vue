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
              <span style="padding-top:5px; font-family:arial; font-size:45px; font-weight:bold;"> LEAVE TYPES </span>
              <v-spacer></v-spacer>
              <a-input v-model="strLeaveTypeSearch" style="width:45%; border:1px black solid; border-radius:4px;" placeholder="Search leave type here..." allowClear>
                <template #suffix> <v-icon style="color:black;"> mdi-magnify </v-icon> </template>
              </a-input>
            </v-layout>
          </div>
<!-- ============================================================================================== -->
<!-- ===================================== Leave Types Table ====================================== -->
<!-- ============================================================================================== -->
          <div style="padding-left:50px; padding-right:50px;">
            <div style="border:1px black solid; border-radius: 5px 5px 0px 0px; height:40px;">
              <v-row style="padding-left:50px; font-size:14px; font-family:arial; font-weight:bold;">
                <v-col cols="3" class="disable-select" style="padding-top:20px;"> LEAVE TYPE CODE </v-col>
                <v-col cols="7" class="disable-select" style="padding-top:20px;"> LEAVE TYPE NAME </v-col>
                <v-col cols="2" class="disable-select" style="padding-top:20px;"> OPTIONS </v-col>
              </v-row>
            </div>
          </div>

          <div style="padding-left:50px; padding-right:50px; padding-bottom:15px;">
            <a-list :data-source="compLeaveTypes" size="small" item-layout="horizontal" class="LeaveTypesList" style="border: 1px black solid; border-radius:0px 0px 5px 5px;" bordered>
              <a-list-item slot="renderItem" slot-scope="item" :id="item.LeaveTypeCode" :style="`background-color:${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : '#fd7675'};`">
                <a-tooltip :title="`${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : 'Deleted'}`">
                  <a-list-item-meta>
                    <span slot="title" style="font-size:14px; color:black; font-family:arial;">
                      <v-row align="center" justify="center">
                        <v-col cols="3" class="disable-select" style="padding-left:50px;"> {{item.LeaveTypeCode}} </v-col>
                        <v-col cols="7" class="disable-select" style="padding-left:50px;"> {{item.LeaveTypeDesc}} </v-col>
                        <v-col cols="2" class="disable-select" style="padding-top:10px; padding-left:40px;">
                          <span style="padding-right:10px;">
                            <a-tooltip title="Edit" placement="left">
                              <a-button v-if="item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === ''" type="primary" shape="circle" icon="edit" @click="ClickModifyLeaveType(item)" style="border: 1px black solid;"></a-button>
                            </a-tooltip>
                          </span>

                          <span>
                            <a-popconfirm title="Are you sure you want to delete this leave type?" ok-text="Yes" cancel-text="No" @confirm="ClickDeleteLeaveType(item)" placement="topRight">
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
<!-- ===================================== Add New Leave Type ===================================== -->
<!-- ============================================================================================== -->
          <div style="padding-left:50px; padding-right:50px;">
            <a-collapse>
              <a-collapse-panel key="1" header="Click here to add new type of leave" :showArrow="false">
                <v-row>
                  <v-col cols="3" style="color:black;">
                    <span :style="`padding-top:5px; padding-left:10px; font-weight:bold; color:${intAddLeaveTypeCodeError === 0 ? 'black' : 'red'};`"> Leave Type Code: </span>
                    <v-spacer></v-spacer>
                    <a-input v-model="strAddLeaveTypeCode" @change="ChangeAddLeaveTypeCode()" :style="`height:34px; width:100%; font-family:arial; font-size:12px; text-align:center; color:black; border-radius:4px; border:1px solid ${intAddLeaveTypeCodeError === 0 ? 'black' : 'red'};`" placeholder="Type here..." allowClear @keypress.enter="ClickAddNewLeaveType()"></a-input>

                    <v-layout style="color:red; font-size:15px;">
                      <v-spacer></v-spacer>
                      <span v-if="intAddLeaveTypeCodeError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
                      <span v-if="intAddLeaveTypeCodeError === 2"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Code already taken. </span>
                    </v-layout>
                  </v-col>

                  <v-col cols="8" style="color:black;">
                    <span :style="`padding-top:5px; padding-left:10px; font-weight:bold; color:${intAddLeaveTypeNameError === 0 ? 'black' : 'red'};`"> Leave Type Name: </span>
                    <v-spacer></v-spacer>
                    <a-input v-model="strAddLeaveTypeName" @change="ChangeAddLeaveTypeName()" :style="`height:34px; width:100%; border-radius:4px; border:1px solid ${intAddLeaveTypeNameError === 0 ? 'black' : 'red'};`" placeholder="Type here..." @keypress.enter="ClickAddNewLeaveType()" allowClear></a-input>

                    <v-layout style="color:red; font-size:15px;">
                      <v-spacer></v-spacer>
                      <span v-if="intAddLeaveTypeNameError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
                    </v-layout>
                  </v-col>

                  <v-col cols="1" align="center" justify="center">
                    <div style="padding-top:20px;">
                      <a-tooltip title="Save" placement="top">
                        <a-button key="submit" icon="save" type="primary" shape="circle" @click="ClickAddNewLeaveType()" style="border:1px black solid;"></a-button>
                      </a-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
<!-- ============================================================================================== -->
<!-- =================================== Edit Leave Type Dialog =================================== -->
<!-- ============================================================================================== -->
    <a-modal class="disable-select" style="font-family:arial;" width="600px" v-model="blnVisibleEditPopOver" title="EDIT" :maskClosable="false" :closable="false">
      <template slot="footer">
        <v-layout>
          <v-spacer></v-spacer>

          <a-button key="back" icon="close-circle" class="ModalButtons" style="border:1px black solid;" @click="ClickCancelModifyLeaveType()"> Cancel </a-button>

          <div style="padding-left:5px;">
            <a-button key="submit" icon="save" type="primary" class="ModalButtons" style="border:1px black solid;" @click="ClickSaveModifyLeaveType()"> Save </a-button>
          </div>
        </v-layout>
      </template>

      <div>
        <v-row>
          <v-col cols="4">
            <span style="padding-top:5px;">
              <span style="color:black; font-family:arial; font-weight:bold;"> Leave Type Code: </span>
              <a-input v-model="strEditLeaveTypeCode" style="height:34px; width:100%; border:1px black solid; border-radius:4px; text-align:center;" disabled></a-input>
            </span>
          </v-col>

          <v-col cols="8">
            <span style="padding-top:5px;">
              <span :style="`font-weight:bold; color:${intEditLeaveTypeNameError === 0 ? 'black' : 'red'};`"> Leave Type Name: </span>
              <a-input v-model="strEditLeaveTypeName" @change="ChangeModifyLeaveTypeName()" :style="`height:34px; width:100%; border-radius:4px; border:1px solid ${intEditLeaveTypeNameError === 0 ? 'black' : 'red'};`" @keypress.enter="ClickSaveModifyLeaveType()" allowClear></a-input>
            </span>

            <v-layout style="padding-bottom:5px; color:red; font-size:13px;">
              <v-spacer></v-spacer>
              <span v-if="intEditLeaveTypeNameError === 1"> <v-icon small style="color:red;"> mdi-alert-circle-outline </v-icon> Field required. </span>
            </v-layout>
          </v-col>
        </v-row>
      </div>
    </a-modal>
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>
  import axios from "axios"
  
  export default{
// ********************************************************************************** //
// ====================================== Data ====================================== //
// ********************************************************************************** //
    data(){
      return{
        strLeaveTypeSearch: undefined,
        strAddLeaveTypeCode: undefined,
        strAddLeaveTypeName: undefined,
        strEditLeaveTypeCode: undefined,
        strEditLeaveTypeName: undefined,

        intAddLeaveTypeCodeError: 0,
        intAddLeaveTypeNameError: 0,
        intEditLeaveTypeNameError: 0,

        blnVisibleEditPopOver: false,
        blnAdmin: false,

        objUserInformation: {},
        objLeaveTypeToModify: {},

        arrLeaveTypes: [],
      }
    },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
    created(){
      this.CheckIfAdmin()
      this.GetUserInformation()
      this.GetLeaveTypes()
    },
// *********************************************************************************** //
// ===================================== Computed ==================================== //
// *********************************************************************************** //
    computed:{
      compLeaveTypes(){
        let data = this.arrLeaveTypes
        if(this.strLeaveTypeSearch !== undefined && this.strLeaveTypeSearch !== null && this.strLeaveTypeSearch !== ""){
          data = data.filter(rec => {
            return rec.LeaveTypeDesc.toUpperCase().includes(this.strLeaveTypeSearch.toUpperCase()) ||
                   rec.LeaveTypeCode.toUpperCase().includes(this.strLeaveTypeSearch.toUpperCase())
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
      GetLeaveTypes(){
        let GetLeaveTypesURL = `${this.api}GetLeaveTypesALL`
        axios.get(GetLeaveTypesURL).then(res => {
          this.arrLeaveTypes = res.data
        })
      },
      CheckIfAdmin(){
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        this.blnAdmin =  Data.isAdmin
      },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ChangeAddLeaveTypeCode(){
        this.intAddLeaveTypeCodeError = 0
        this.strAddLeaveTypeCode = this.strAddLeaveTypeCode !== undefined && this.strAddLeaveTypeCode !== null && this.strAddLeaveTypeCode !== "" ? this.strAddLeaveTypeCode.toUpperCase() : undefined
      },
      ChangeAddLeaveTypeName(){
        this.intAddLeaveTypeNameError = 0
      },
      ChangeModifyLeaveTypeName(){
        this.intEditLeaveTypeNameError = 0
      },
      ClickAddNewLeaveType(){
        console.log('code',this.strAddLeaveTypeCode)
        this.strAddLeaveTypeCode = this.strAddLeaveTypeCode !== undefined && this.strAddLeaveTypeCode !== null && this.strAddLeaveTypeCode !== "" ? this.strAddLeaveTypeCode.toUpperCase() : undefined
        this.intAddLeaveTypeCodeError = 0
        this.intAddLeaveTypeNameError = 0

// LEAVE TYPE NAME CHECKING
// 1 - Blank Leave Type Name Field
        console.log('name',this.strAddLeaveTypeName)
        if(this.strAddLeaveTypeName === undefined || this.strAddLeaveTypeName === null || this.strAddLeaveTypeName.trim() === ""){
          this.intAddLeaveTypeNameError = 1
        }

// LEAVE TYPE CODE CHECKING (Pag INSERT)
// 1 - Blank Leave Type Code Field
// 2 - Leave Type Code Already Taken
        console.log('pagADD', this.arrLeaveTypes)
        if(this.strAddLeaveTypeCode === undefined || this.strAddLeaveTypeCode === null || this.strAddLeaveTypeCode.trim() === ""){
          this.intAddLeaveTypeCodeError = 1
        }
        else if(this.strAddLeaveTypeCode !== undefined && this.strAddLeaveTypeCode !== null && this.strAddLeaveTypeCode.trim() !== ""){
          let LeaveTypeCodes = []
          let LeaveTypeCode = ""

          this.arrLeaveTypes.forEach(LeaveType => {
            if(LeaveTypeCode === undefined || LeaveTypeCode === null || LeaveTypeCode.trim() === ""){
              LeaveTypeCode = LeaveType.LeaveTypeCode.toUpperCase()
            }
            else{
              LeaveTypeCode = LeaveTypeCode + ',' + LeaveType.LeaveTypeCode.toUpperCase()
            }
          })
          LeaveTypeCodes = LeaveTypeCode.split(',')
          if(LeaveTypeCodes.includes(this.strAddLeaveTypeCode.trim().toUpperCase()) === true){
            this.intAddLeaveTypeCodeError = 2
          }
          else if(LeaveTypeCodes.includes(this.strAddLeaveTypeCode.trim().toUpperCase()) === false){
            if(this.intAddLeaveTypeNameError === 0 && this.intAddLeaveTypeCodeError === 0){
              let Query = `INSERT INTO dbo.LeaveTypes
                            (LeaveTypeCode, LeaveTypeDesc, CreatedDate, UpdatedDate, UpdatedBy)
                            VALUES 
                            ('${this.strAddLeaveTypeCode}', '${this.strAddLeaveTypeName}', GETDATE(), GETDATE(), '${this.objUserInformation.EmployeeCode}' )`

              let Data = {Query: Query}
              let AddNewLeaveTypeURL = `${this.api}AddLeaveType`
              axios.post(AddNewLeaveTypeURL, Data).then(() => {
                this.$notification.success({
                  style: "background-color:#7FDBFF;",
                  icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
                  message: <b class="disable-select" style="color:black;">Employees' Leave of Absence</b>,
                  description: <div class="disable-select NotificationDescription">New leave type added successfully.</div>,
                })
                this.strAddLeaveTypeCode = ""
                this.strAddLeaveTypeName = ""
                this.intAddLeaveTypeCodeError = 0
                this.intAddLeaveTypeNameError = 0
                this.GetLeaveTypes()
              })
            }
          }
        }
      },
      ClickModifyLeaveType(LeaveType){
        this.objLeaveTypeToModify = LeaveType
        this.strEditLeaveTypeID = LeaveType.LeaveID // add ko
        this.strEditLeaveTypeCode = LeaveType.LeaveTypeCode
        this.strEditLeaveTypeName = LeaveType.LeaveTypeDesc
        this.intEditLeaveTypeNameError = 0
        this.blnVisibleEditPopOver = true
      },
      ClickCancelModifyLeaveType(){
        this.blnVisibleEditPopOver = false
      },
      ClickSaveModifyLeaveType(){
        this.intEditLeaveTypeNameError = 0

// LEAVE TYPE NAME CHECKING (Pag Update)
// 1 - Blank Leave Type Name Field
        // console.log('geena',this.objLeaveTypeToModify)
        if(this.strEditLeaveTypeName === undefined || this.strEditLeaveTypeName === null || this.strEditLeaveTypeName.trim() === ""){
          this.intEditLeaveTypeNameError = 1
        }
        else if(this.objLeaveTypeToModify.LeaveTypeDesc !== this.strEditLeaveTypeName){
          let Query = `UPDATE	dbo.LeaveTypes
                        SET		LeaveTypeDesc = '${this.strEditLeaveTypeName}',
                              UpdatedDate = GETDATE(),
                              UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                        WHERE	LeaveTypeCode = '${this.strEditLeaveTypeCode}'`

          let Data = {Query: Query}
          let EditLeaveTypeURL = `${this.api}EditLeaveType`
          axios.post(EditLeaveTypeURL, Data).then(() => {
            this.$notification.success({
              style: "background-color:#7FDBFF;",
              icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
              message: <b class="disable-select" style="color:black;">Employees' Leave of Absence</b>,
              description: <div class="disable-select NotificationDescription">Leave type successfully modified.</div>,
            })
            this.blnVisibleEditPopOver = false
            this.GetLeaveTypes()
          })
        }
      },
      ClickDeleteLeaveType(LeaveType){
        let Query = `UPDATE	dbo.LeaveTypes
                      SET   DeletedDate = GETDATE(),
                            UpdatedDate = GETDATE(),
                            UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                      WHERE	LeaveTypeCode = '${LeaveType.LeaveTypeCode}'`

        let Data = {Query: Query}
        let DeleteLeaveTypeURL = `${this.api}DeleteLeaveType`
        axios.post(DeleteLeaveTypeURL, Data).then(() => {
          this.$notification.success({
            style: "background-color:#7FDBFF;",
            icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
            message: <b class="disable-select" style="color:black;">Employees' Leave of Absence</b>,
            description: <div class="disable-select NotificationDescription">Leave type successfully marked as deleted.</div>,
          })
          this.GetLeaveTypes()
        })
      },
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .LeaveTypesList{
    max-height: calc(100vh - 380px) !important;
    min-height: calc(100vh - 380px) !important;
    overflow-y: auto !important;
    overflow-x: auto !important;
  }

  .LeaveTypesList .ant-list-item:hover{
    background-color: #999999 !important;
  }

  .Button{
    font-family: arial !important;
    font-size: 12px !important;
    border: 1px black solid !important;
  }
  
  .ant-input[disabled]{
    font-family: arial !important;
    font-size: 14px !important;
    color: black !important;
    background-color: #f5f5f5 !important;
    cursor: default !important;
  }
</style>