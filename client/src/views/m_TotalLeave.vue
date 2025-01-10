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
        <v-card-text class="disable-select" style="padding-top:50px; font-family:arial; font-weight:bold;">
          <div style="padding-left:50px; padding-right:50px; padding-bottom:35px;">
            <v-layout>
            <span style="padding-top:5px; font-size:45px;"> TOTAL LEAVE </span>
            </v-layout>
          </div>
<!-- ============================================================================================== -->
<!-- ===================================== Leave Types Table ====================================== -->
<!-- ============================================================================================== -->
          <div style="padding-left:50px; padding-right:50px;">
            <div style="border:1px black solid; border-radius: 5px 5px 0px 0px; height:40px;">
              <v-row style="padding-left:50px; font-size:14px; font-family:arial; font-weight:bold;">
                  <v-col cols="3" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> TOTAL LEAVE ID </v-col>
                  <v-col cols="3" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> YEAR(S) OF SERVICE </v-col>
                  <v-col cols="3" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> TOTAL VACATION LEAVE </v-col>
                  <v-col cols="3" class="disable-select" style="padding-top:20px; font-family:arial; font-weight:bold;"> TOTAL SICK LEAVE </v-col>
              </v-row>
            </div>
          </div>

          <div style="padding-left:50px; padding-right:50px; padding-bottom:15px;">
            <a-list :data-source="compTotalLeave" item-layout="horizontal" class="TotalLeaveList" style="border: 1px black solid; border-radius:0px 0px 5px 5px;" bordered>
              <a-list-item slot="renderItem" slot-scope="item" :id="item.TotalLeaveID" :style="`background-color:${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : '#fd7675'};`">
                <a-tooltip :title="`${item.DeletedDate === undefined || item.DeletedDate === null || item.DeletedDate === '' ? '' : 'Deleted'}`">
                  <a-list-item-meta>
                    <span slot="title" style="font-size:14px; color:black; font-family:arial;">
                      <v-row style="padding-top:5px;" align="center" justify="center">
                        <v-col cols="3" class="disable-select" style="padding-left:40px;"> {{item.TotalLeaveID}} </v-col>
                        <v-col cols="3" class="disable-select" style="padding-left:40px;"> {{item.YearOfService}} </v-col>
                        <v-col cols="3" class="disable-select" style="padding-left:40px;"> {{item.TotalVL}} </v-col>
                        <v-col cols="3" class="disable-select" style="padding-left:40px;"> {{item.TotalSL}} </v-col>
                      </v-row>
                    </span>
                  </a-list-item-meta>
                </a-tooltip>
              </a-list-item>
            </a-list>
          </div>
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
  
  export default{
// ********************************************************************************** //
// ====================================== Data ====================================== //
// ********************************************************************************** //
    data(){
      return{
        blnAdmin: false,

        arrTotalLeave: [],
      }
    },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
    created(){
      this.CheckIfAdmin()
      this.GetUserInformation()
      this.GetTotalLeave()
    },
  // *********************************************************************************** //
  // ===================================== Computed ==================================== //
  // *********************************************************************************** //
    computed:{
      compTotalLeave(){
        let data = this.arrTotalLeave
        return data
      },
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
      GetTotalLeave(){
        let GetTotalLeaveURL = `${this.api}GetTotalLeave`
        axios.get(GetTotalLeaveURL).then(res => {
          this.arrTotalLeave = res.data
        })
      },
      CheckIfAdmin(){
        let Data = JSON.parse(this.DecryptText(this.$store.state.loa_user_rights))
        this.blnAdmin =  Data.isAdmin
      },
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .TotalLeaveList{
    max-height: calc(100vh - 343px);
    min-height: calc(100vh - 343px);
    overflow-y: auto;
    overflow-x: auto;
  }

  .TotalLeaveList .ant-list-item:hover{
    background-color: #999999;
  }
  
  .ant-input[disabled]{
    color: black !important;
    background-color: #f5f5f5 !important;
    cursor: default !important;
  }
</style>