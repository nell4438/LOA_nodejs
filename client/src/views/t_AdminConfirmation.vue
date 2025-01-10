<template>
  <div>
<!-- ******************************************************************************************** -->
<!-- =========================================== Blank ========================================== -->
<!-- ******************************************************************************************** -->
    <a-result v-if="intAdmin === 0" sub-title="Loading. Please wait....">
      <template #icon>
        <a-avatar src="Leave of Absence Icon.png" :size="150" alt="Leave of Absence"></a-avatar>
      </template>
    </a-result>
<!-- ******************************************************************************************** -->
<!-- ====================================== 403 Not Allowed ===================================== -->
<!-- ******************************************************************************************** -->
    <a-result v-else-if="intAdmin === 1" status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <center><a-button type="primary" icon="arrow-left" @click="$router.push('/fileleaveofabsence')"> Go back to Main Page </a-button> </center>  
      </template>
    </a-result>
<!-- ============================================================================================== -->
<!-- =========================================== ADMIN ============================================ -->
<!-- ============================================================================================== -->
    <div v-else no-gutters>
      <div class="disable-select" style="padding-top:30px; padding-left:50px; padding-right:50px; padding-bottom:30px; " >
        <v-row>
          <v-col cols="6">
            <span style="font-family:arial; font-size:45px; font-weight:bold;"> ADMIN CONFIRMATION </span>
          </v-col>

          <v-col cols="3" style="margin-top:17px;">
            <v-layout>
              <span style="padding-right:10px;">
                <span class="LabelFilter"> Date Filed From: </span>
                <a-date-picker v-model="strFiledDateFrom" format="YYYY/MM/DD" placeholder="Select date..." style="width:100%; border:1px black solid; border-radius:4px;" @change="ChangeFiledDateFrom()" :allowClear="false"> </a-date-picker>
              </span>
              
              <span>
                <span class="LabelFilter"> Date Filed To: </span>
                <a-date-picker v-model="strFiledDateTo" format="YYYY/MM/DD" placeholder="Select date..." style="width:100%; border:1px black solid; border-radius:4px;" @change="ChangeFiledDateTo()" :allowClear="false"> </a-date-picker>
              </span>
            </v-layout>
          </v-col>

          <v-col cols="3" style="margin-top:17px;">
            <span class="LabelFilter"> Department: </span>
            <a-input v-model="strDepartment" placeholder="Type here..." style="width:100%; border:1px black solid; border-radius:4px;" allowClear>
              <template #suffix> <v-icon style="color:black;"> mdi-magnify </v-icon> </template>
            </a-input>
          </v-col>
        </v-row>
      </div>

      
      <div style="padding-left:50px; padding-right:50px;">
        <div style="height:40px; border:1px black solid; border-radius: 5px 5px 0px 0px;">
          <v-row class="disable-select" style="padding-left:50px; font-family:arial; font-size:12.4px; font-weight:bold;">
          
            <v-col cols="3" style="padding-top:20px;">DEPARTMENT </v-col>

            <v-col cols="2" style="padding-top:20px;">
              <a-badge size="small" :count="intTotalFiled"> </a-badge> TOTAL FILED
            </v-col>
            
            <v-col cols="2" style="padding-top:20px;">
              <a-badge size="small" :count="intTotalForApproval"> </a-badge> FOR APPROVAL
            </v-col>

            <v-col cols="2" style="padding-top:20px;">
              <a-badge size="small" :count="intTotalApproved"> </a-badge> TOTAL APPROVED
            </v-col>

            <v-col cols="2" style="padding-top:20px;">
              <a-badge size="small" :count="intTotalDisapproved"> </a-badge> TOTAL DISAPPROVED
            </v-col>
          </v-row>
        </div>
      </div>
      
      <div style="padding-left:50px; padding-right:50px; padding-bottom:15px; overflow-y: auto" :height="$vuetify.breakpoint.height - 570">
        <div v-if="blnDataLoad === true" class="List" style="text-align:center; border:1px black solid; border-radius:0px 0px 5px 5px;">
          <a-spin style="padding-top:100px;" size="large"></a-spin>
        </div>

        <a-list v-else :data-source="compDepartments" size="small" item-layout="horizontal" class="List" style="border: 1px black solid; border-radius:0px 0px 5px 5px;" bordered>
          <a-list-item slot="renderItem" slot-scope="item" :id="item.DepartmentCode">
            <a-list-item-meta>
              <span slot="title" style="color:black; font-family:arial; font-size:14px;">
                <v-row class="disable-select" align="center" justify="center">
                  <v-col cols="3" style="padding-left:40px;"> <span style="padding-left:20px;"> {{item.DepartmentName}} </span> </v-col>
                  <v-col cols="2" style="padding-left:40px;"> <span :style="`padding-left:25px; ${item.TotalFiled !== 0 ? 'color:blue; font-size:22px; font-weight:bold;' : ''}`"> {{item.TotalFiled}} </span> </v-col>
                  <v-col cols="2" style="padding-left:40px;"> <span :style="`padding-left:30px; ${item.ForApproval !== 0 ? 'color:blue; font-size:22px; font-weight:bold;' : ''}`"> {{item.ForApproval}} </span> </v-col>
                  <v-col cols="2" style="padding-left:40px;"> <span :style="`padding-left:35px; ${item.TotalApproved !== 0 ? 'color:blue; font-size:22px; font-weight:bold;' : ''}`"> {{item.TotalApproved}} </span> </v-col>
                  <v-col cols="2" style="padding-left:40px;"> <span :style="`padding-left:40px; ${item.TotalDisapproved !== 0 ? 'color:blue; font-size:22px; font-weight:bold;' : ''}`"> {{item.TotalDisapproved}} </span> </v-col>
                  <v-col cols="1" style="padding-left:40px;">
                    <a-tooltip title="View" placement="right">
                      <a-button v-if="item.TotalFiled !== 0" type="primary" shape="circle" icon="eye" style="border:1px black solid;" @click="ClickViewTable(item)"></a-button>
                    </a-tooltip>
                  </v-col>
                </v-row>
              </span>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>

    </div>
    <admin-table
      :blnTable="blnTable"
      :objComponentData="objData"
      @ClickCloseTable="ClickCloseTable"
    />
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>

  import axios from "axios"
  import moment from "moment"
  // import _ from "lodash"
  import AdminTable from '@/components/AdminTable.vue'

  export default{
// ************************************************************************************* //
// ===================================== Components ==================================== //
// ************************************************************************************* //
    components:{
      'admin-table': AdminTable
    },
// ********************************************************************************** //
// ====================================== Data ====================================== //
// ********************************************************************************** //
    data(){
      return{
        // strFiledDateFrom: moment(new Date()),
        strFiledDateFrom: '2023/08/16',
        strFiledDateTo: moment(new Date()),
        strDepartment: undefined,

        intAdmin: 0,
        intTotalFiled: 0,
        intTotalForApproval: 0,
        intTotalApproved: 0,
        intTotalDisapproved: 0,

        blnDataLoad: false,
        blnTable: false,

        objUserInformation: {},
        objData: {},

        arrDepartments: [],
      }
    },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
    created(){
      this.GetUserInformation()
      
    },
// ********************************************************************************** //
// ===================================== Computed =================================== //
// ********************************************************************************** //
    computed:{
      compDepartments(){
        let data = this.arrDepartments
        // console.table({
        //   strDepartment:this.strDepartment,
        //   arrDepartments:this.arrDepartments
        // })
        if(this.strDepartment !== undefined && this.strDepartment !== null && this.strDepartment !== ""){
          data = data.filter(rec => {
            return rec.DepartmentName.toUpperCase().includes(this.strDepartment.toUpperCase())
          })
        }

        this.GetTotalCount(data)
        return data
        
      },
      
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

      // initialize(){
      //   let data = this.arrDepartments
        
      //   if(this.strDepartment !== undefined && this.strDepartment !== null && this.strDepartment !== ""){
      //     data = data.filter(rec => {
      //       return rec.DepartmentName.toUpperCase().includes(this.strDepartment.toUpperCase())
      //     })
      //   }

      //   this.GetTotalCount(data)
      // },
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
      RunSocketIO(){
        this.$socket.on('GetAdminListCount', () => {
          this.GetPerDepartmentCount()
        })
      },
      GetUserInformation(){
        let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(this.$store.state.loa_user)}`
        axios.get(BasicInfoAPI, {headers:{'master-api' : this.header_API}}).then(res => {
          this.objUserInformation = res.data[0]
          this.blnDataLoad = true
          this.CheckIfAdmin()
          
        })
      },
      CheckIfAdmin(){
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        if(Data.isAdmin === false){
           this.intAdmin = 1
        }
        else if(Data.isAdmin === true){
          this.intAdmin = 2
          this.GetPerDepartmentCount()
          this.RunSocketIO()
          this.$socket.emit('RequestAdminListCount')
        }
      },
      GetPerDepartmentCount(){
        let FiledDateFrom = moment(this.strFiledDateFrom).format("YYYY/MM/DD")
        let FiledDateTo = moment(this.strFiledDateTo).format("YYYY/MM/DD")

        let DepartmentCounter = 0

        let DepartmentsAPI = `${this.departments_API}${this.objUserInformation.CompanyCode}`
        axios.get(DepartmentsAPI, {headers:{'master-api' : this.header_API}}).then(Departments => {
          this.blnDataLoad = true
          let DepartmentsList = Departments.data.filter(Department => { return Department.DeletedDate === undefined || Department.DeletedDate === null || Department.DeletedDate === "" })

          DepartmentsList.forEach(Department => {
            let PerDepartmentCountAPI = `${this.api}GetAdminListCount?CompanyCode=${Department.CompanyCode}&DepartmentCode=${Department.DepartmentCode}&FiledDateFrom=${FiledDateFrom}&FiledDateTo=${FiledDateTo}`
            axios.get(PerDepartmentCountAPI).then(DepartmentData => {
              DepartmentCounter++
              let Data = DepartmentData.data[0]
              
              Department.TotalFiled = Data.TotalFiled
              Department.ForApproval = Data.ForApproval
              Department.TotalApproved = Data.TotalApproved
              Department.TotalDisapproved = Data.TotalDisapproved

              if(DepartmentCounter === DepartmentsList.length){
                this.arrDepartments = DepartmentsList
                this.blnDataLoad = false
              }
              
            })
          })
        })
        
      },
      GetTotalCount(data){
        this.intTotalFiled = 0
        this.intTotalForApproval = 0
        this.intTotalApproved = 0
        this.intTotalDisapproved = 0

        data.forEach(Data => {
          this.intTotalFiled += Data.TotalFiled
          this.intTotalForApproval += Data.ForApproval
          this.intTotalApproved += Data.TotalApproved
          this.intTotalDisapproved += Data.TotalDisapproved
          console.log('===',Data);
        })

      },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ChangeFiledDateFrom(){
        if(this.strFiledDateFrom === undefined || this.strFiledDateFrom === null || this.strFiledDateFrom === ""){
          this.strFiledDateFrom = moment(new Date())
        }
        if(this.strFiledDateFrom !== undefined && this.strFiledDateFrom !== null && this.strFiledDateFrom !== ""){
          this.$socket.emit('RequestAdminListCount')
        }
        this.GetPerDepartmentCount()
      },
      ChangeFiledDateTo(){
        if(this.strFiledDateTo === undefined || this.strFiledDateTo === null || this.strFiledDateTo === ""){
          this.strFiledDateTo = moment(new Date())
        }

        if(this.strFiledDateTo !== undefined && this.strFiledDateTo !== null && this.strFiledDateTo !== ""){
          this.$socket.emit('RequestAdminListCount')
        }
        this.GetPerDepartmentCount()
      },
      ClickViewTable(item){
        let {
          CompanyCode,
          DepartmentCode,
          DepartmentName,
          ShortName,
        } = item


        this.objData = {
          "CompanyCode": CompanyCode,
          "ShortName": ShortName,
          "DepartmentCode": DepartmentCode,
          "DepartmentName": DepartmentName,
          "FiledDateFrom": moment(new Date(this.strFiledDateFrom)).format("YYYY/MM/DD"),
          "FiledDateTo": moment(new Date(this.strFiledDateTo)).format("YYYY/MM/DD"),
        }

        this.blnTable = true
      },
      ClickCloseTable(value){ // dagdag  ito para d na need mag refresh
        
        this.blnTable = value
        setTimeout(() => {
          this.GetPerDepartmentCount()

          // this.initialize();
          
      }, "500")

       
        // location.reload(); 
      },
// ============================================================= //
// ======================= Other Events ======================== //
// ============================================================= //
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .List{
    max-height: calc(100vh - 240px);
    min-height: calc(100vh - 240px);
    overflow-y: auto;
    overflow-x: auto;
  }

  .List .ant-list-item:hover{
    background-color: #999999;
  }
</style>