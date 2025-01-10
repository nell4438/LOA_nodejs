<template>
  <div>
    <a-drawer placement="bottom" :visible="blnTable" :closable="false" height="95%">
      <!-- ============================================ Header ================================================== -->
      <div
        :style="{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '100%',
          borderBottom: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-tooltip title="Close" placement="top">
          <a-button type="danger" icon="close" @click="ClickCloseTable()"></a-button>
        </a-tooltip>
      </div>
      <!-- ====================================================================================================== -->
      <div style="padding-top: 50px">
        <div style="width: 100%">
          <v-layout
            style="
              padding-left: 20px;
              padding-right: 20px;
              font-family: arial;
              font-size: 20px;
              font-weight: bold;
            "
          >
            {{ strDepartmentName }} Department <v-spacer></v-spacer> ({{
              strFiledDateFrom
            }}
            - {{ strFiledDateTo }})
          </v-layout>
        </div>
        <!-- ============================================================================================== -->
        <!-- ========================================== Filters =========================================== -->
        <!-- ============================================================================================== -->
        <div style="padding-left: 10px; padding-right: 10px; padding-top: 15px">
          <v-layout
            style="
              padding-left: 20px;
              padding-right: 20px;
              color: black;
              font-family: arial;
              font-size: 8px;
            "
          >
            <v-row>
              <v-col cols="2">
                <span class="LabelFilter"> Section: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strSectionCode"
                  placeholder="Type here..."
                  size="small"
                  class="SelectFilter"
                  @change="ChangeSectionFilter()"
                  showSearch
                  allowClear
                >
                  <a-select-option
                    v-for="item in arrSections"
                    :key="item.SectionCode"
                    :value="item.SectionCode"
                    style="font-family: arial"
                  >
                    {{ item.SectionName }}
                  </a-select-option>
                </a-select>
              </v-col>

              <v-col cols="2">
                <span class="LabelFilter"> Team: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strTeamCode"
                  placeholder="Type here..."
                  size="small"
                  class="SelectFilter"
                  showSearch
                  allowClear
                >
                  <a-select-option
                    v-for="item in compFilteredTeams"
                    :key="item.TeamCode"
                    :value="item.TeamCode"
                    style="font-family: arial"
                  >
                    {{ item.TeamName }}
                  </a-select-option>
                </a-select>
              </v-col>

              <v-col cols="2">
                <span class="LabelFilter"> Leave Type: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strLeaveType"
                  placeholder="Type here..."
                  size="small"
                  class="SelectFilter"
                  showSearch
                  allowClear
                >
                  <a-select-option
                    v-for="item in arrLeaveTypes"
                    :key="item.LeaveTypeCode"
                    :value="item.LeaveTypeCode"
                    style="font-family: arial"
                  >
                    {{ item.LeaveTypeDesc }}
                  </a-select-option>
                </a-select>
              </v-col>

              <v-col cols="1">
                <span class="LabelFilter"> Filed: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strFiled"
                  class="SelectFilter"
                  size="small"
                >
                  <a-select-option
                    v-for="item in arrFilterOptions"
                    :key="item.Filter"
                    :value="item.Filter"
                  >
                    {{ item.Filter }}
                  </a-select-option>
                </a-select>
              </v-col>

              <v-col cols="1">
                <span class="LabelFilter"> WithPay: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strWithPay"
                  class="SelectFilter"
                  size="small"
                >
                  <a-select-option
                    v-for="item in arrFilterOptions"
                    :key="item.Filter"
                    :value="item.Filter"
                  >
                    {{ item.Filter }}
                  </a-select-option>
                </a-select>
              </v-col>

              <v-col cols="3">
                <span class="LabelFilter"> Search: </span>
                <a-input
                  v-model="strSearch"
                  placeholder="Type here..."
                  class="InputFilter"
                  size="small"
                  allowClear
                >
                  <template #suffix>
                    <v-icon style="color: black"> mdi-magnify </v-icon>
                  </template>
                </a-input>
              </v-col>

              <v-col cols="1">
                <span class="LabelFilter"> Status: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strStatus"
                  class="SelectFilter"
                  size="small"
                >
                  <a-select-option
                    v-for="item in arrStatusOptions"
                    :key="item.Filter"
                    :value="item.Filter"
                  >
                    {{ item.Filter }}
                  </a-select-option>
                </a-select>
              </v-col>
            </v-row>
          </v-layout>
        </div>
        <!-- ============================================================================================== -->
        <!-- ========================================== Legends =========================================== -->
        <!-- ============================================================================================== -->
        <div style="padding-left: 20px; padding-right: 20px; padding-top: 15px">
          <div
            class="disable-select"
            style="
              padding-top: 11px;
              padding-left: 10px;
              height: 40px;
              font-family: arial;
              font-size: 11px;
              font-weight: bold;
              color: white;
              background-color: black;
              border: 1px red solid;
              border-radius: 5px;
            "
          >
            <v-layout>
              <div style="padding-right: 30px">LEGENDS:</div>
              <div
                style="
                  padding-left: 15px;
                  background-color: #a3f3a8;
                  border: 1px white solid;
                "
              ></div>
              <div style="padding-left: 5px; padding-right: 30px">- Approved</div>
              <div
                style="
                  padding-left: 15px;
                  background-color: #f2a79d;
                  border: 1px white solid;
                "
              ></div>
              <div style="padding-left: 5px; padding-right: 30px">- Disapproved</div>
              <v-spacer></v-spacer>
              <div style="padding-right: 10px">
                <v-icon style="color: white" small> mdi-information-outline </v-icon>
                <span> DOUBLE CLICK ROW ON TABLE TO VIEW LEAVE </span>
              </div>
            </v-layout>
          </div>
        </div>
        <!-- ============================================================================================== -->
        <!-- ============================================ List ============================================ -->
        <!-- ============================================================================================== -->
        <v-row no-gutters>
          <v-col style="padding-left: 20px; padding-right: 20px; padding-top: 10px">
            <div
              style="
                border: 1px black solid;
                border-radius: 5px 5px 0px 0px;
                height: 45px;
              "
            >
              <v-row
                class="disable-select"
                style="
                  padding-top: 4px;
                  padding-left: 20px;
                  padding-right: 20px;
                  font-size: 11px;
                  font-family: arial;
                  font-weight: bold;
                "
              >
                <v-col style="padding-top: 11px"> <div>EMPLOYEE</div> </v-col>
                <v-col style="padding-top: 11px">
                  <div>
                    DATE <br />
                    FILED
                  </div>
                </v-col>
                <v-col style="padding-top: 11px">
                  <div>
                    LEAVE <br />
                    FROM
                  </div>
                </v-col>
                <v-col style="padding-top: 11px">
                  <div>
                    LEAVE <br />
                    TO
                  </div>
                </v-col>
                <v-col style="padding-top: 11px">
                  <div>
                    LEAVE <br />
                    TYPE
                  </div>
                </v-col>
                <v-col style="padding-top: 11px">
                  <div>
                    NO. OF <br />
                    WORKING DAYS
                  </div>
                </v-col>
                <v-col style="padding-top: 11px" cols="3">
                  <div>REASON</div>
                </v-col>
                <v-col style="padding-top: 11px"> <div>FILED</div> </v-col>
                <v-col style="padding-top: 11px"> <div>W/ PAY</div> </v-col>
                <v-col style="padding-top: 11px"> <div>OPTIONS</div> </v-col>
              </v-row>
            </div>

            <div
              v-if="blnDataLoad === true"
              size="small"
              item-layout="horizontal"
              class="LeaveList"
              style="
                text-align: center;
                border: 1px black solid;
                border-radius: 0px 0px 5px 5px;
              "
              bordered
            >
              <a-spin style="padding-top: 100px" size="large"></a-spin>
            </div>

            <a-list
              v-else
              :data-source="compFilteredLeaves"
              size="small"
              item-layout="horizontal"
              class="LeaveList"
              style="border: 1px black solid; border-radius: 0px 0px 5px 5px"
              bordered
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                :id="item.TotalLeaveID"
                :style="`background-color:${
                  item.isAdminApproved === 2
                    ? '#f2a79d'
                    : item.isAdminApproved === 1
                    ? '#a3f3a8'
                    : ''
                }`"
              >
                <a-list-item-meta @dblclick="ClickFiledLeave(item)">
                  <span
                    slot="title"
                    style="font-size: 10px; color: black; font-family: arial"
                  >
                    <v-row class="disable-select" align="center" justify="center">
                      <v-col>
                        <div>
                          <div>
                            <div style="padding-top: 5px" align="center" justify="center">
                              <a-popover placement="top">
                                <a-avatar
                                  style="border: 1px black solid"
                                  :src="item.EmployeeAvatar"
                                  :size="25"
                                  shape="square"
                                >
                                  ?
                                </a-avatar>
                                <template #content>
                                  <a-avatar
                                    style="border: 1px black solid"
                                    :src="item.EmployeeAvatar"
                                    :size="145"
                                    shape="square"
                                  >
                                    ?
                                  </a-avatar>
                                </template>
                              </a-popover>
                            </div>
                          </div>

                          <div>
                            <div align="center" justify="center">
                              <a-input
                                v-model="item.EmployeeName"
                                class="TextDisplay"
                                style="text-align: center"
                                type="textarea"
                                readOnly
                                autoSize
                              >
                              </a-input>
                            </div>
                          </div>
                        </div>
                      </v-col>

                      <v-col> {{ item.FiledDate }} </v-col>
                      <v-col> {{ item.LeaveFrom }} </v-col>
                      <v-col> {{ item.LeaveTo }} </v-col>
                      <v-col>
                        {{ GetLeaveTypeName(item.LeaveTypeCode) }}
                      </v-col>
                      <v-col>
                        <span style="padding-left: 10px">
                          {{ item.NoOfWorkingDays }}
                        </span>
                      </v-col>
                      <v-col cols="3">
                        <a-input
                          v-model="item.ReasonForLeave"
                          class="TextDisplay"
                          type="textarea"
                          readOnly
                          autoSize
                        >
                        </a-input>
                      </v-col>
                      <v-col style="font-size: 16px">
                        <span style="padding-left: 5px">
                          {{ item.isFiled === 0 ? "❌" : "✔️" }}
                        </span>
                      </v-col>
                      <v-col style="font-size: 16px">
                        <span style="padding-left: 10px">
                          {{ item.WithPay === 0 ? "❌" : "✔️" }}
                        </span>
                      </v-col>
                      <!-- ============ Options ============ -->
                      <v-col v-if="item.isAdminApproved === 0">
                        <v-layout>
                          <v-spacer></v-spacer>
                          <div style="padding-top: 3px">
                            <a-tooltip title="Approve" placement="top">
                              <a-button
                                type="primary"
                                icon="check-circle"
                                shape="circle"
                                style="border: 1px black solid"
                                @click="ClickOptions(item, 'Approve', undefined)"
                              >
                              </a-button>
                            </a-tooltip>
                          </div>

                          <div style="padding-top: 3px; padding-left: 5px">
                            <a-popover
                              placement="topRight"
                              trigger="click"
                              :visible="item.DisapprovePopOverVisible"
                            >
                              <a-tooltip title="Disapprove" placement="top">
                                <a-button
                                  type="danger"
                                  icon="stop"
                                  shape="circle"
                                  style="border: 1px black solid"
                                  @click="ClickDisapprove(item)"
                                >
                                </a-button>
                              </a-tooltip>

                              <template #content>
                                <v-row style="width: 500px">
                                  <v-col cols="10" style="color: black">
                                    <span
                                      :style="`padding-top:5px; padding-left:10px; font-family:arial; font-size:12px; font-weight:bold; color:${
                                        intDisapproveError === 0 ? 'black' : 'red'
                                      };`"
                                    >
                                      Disapproval Reason:
                                    </span>
                                    <v-spacer></v-spacer>
                                    <a-input
                                      v-model="strDisapprovalReason"
                                      type="textarea"
                                      placeholder="Type here..."
                                      :style="`height:34px; width:100%; color:black; border:1px solid; border-radius:4px; border-color:${
                                        intDisapproveError === 0 ? 'black' : 'red'
                                      };`"
                                      @change="ChangeDisapproveReason()"
                                      autoSize
                                      allowClear
                                    ></a-input>

                                    <v-layout style="color: red; font-size: 10px">
                                      <v-spacer></v-spacer>
                                      <span v-if="intDisapproveError === 1">
                                        <v-icon small style="color: red">
                                          mdi-alert-circle-outline
                                        </v-icon>
                                        Field required.
                                      </span>
                                    </v-layout>
                                  </v-col>

                                  <v-col cols="2" align="center" justify="center">
                                    <div style="padding-top: 20px">
                                      <a-tooltip title="Save" placement="top">
                                        <a-button
                                          key="submit"
                                          icon="save"
                                          type="primary"
                                          shape="circle"
                                          style="border: 1px black solid"
                                          @click="
                                            ClickOptions(
                                              item,
                                              'Disapprove',
                                              strDisapprovalReason
                                            )
                                          "
                                        ></a-button>
                                      </a-tooltip>

                                      <a-tooltip title="Close" placement="top">
                                        <a-button
                                          icon="close-circle"
                                          shape="circle"
                                          style="
                                            margin-left: 5px;
                                            border: 1px black solid;
                                          "
                                          @click="ClickCloseDisapprove(item)"
                                        >
                                        </a-button>
                                      </a-tooltip>
                                    </div>
                                  </v-col>
                                </v-row>
                              </template>
                            </a-popover>
                          </div>
                          <v-spacer></v-spacer>
                        </v-layout>
                      </v-col>

                      <v-col v-else></v-col>
                      <!-- ================================= -->
                    </v-row>
                  </span>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </v-col>
        </v-row>
      </div>
    </a-drawer>
    <!-- ============================================================================================== -->
    <!-- ======================================= View Filed Leave ===================================== -->
    <!-- ============================================================================================== -->
    <a-drawer
      title="View Leave Details"
      placement="right"
      :visible="blnViewFiledLeave"
      :closable="false"
      width="640px"
    >
      <div class="FiledLeaveDrawer">
        <a-descriptions
          v-if="
            strEmployeeCode === undefined ||
            strEmployeeCode === null ||
            strEmployeeCode === ''
          "
          :column="1"
          size="small"
          layout="vertical"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item :span="1">
            <v-row style="padding: 5px">
              <v-col cols="2">
                <a-popover placement="left">
                  <a-avatar
                    style="border: 1px black solid"
                    :src="strEmployeeAvatar"
                    :size="45"
                    shape="square"
                  >
                    ?
                  </a-avatar>
                  <template #content>
                    <a-avatar
                      style="border: 1px black solid"
                      :src="strEmployeeAvatar"
                      :size="145"
                      shape="square"
                    >
                      ?
                    </a-avatar>
                  </template>
                </a-popover>
              </v-col>
              <v-col col="10">
                <div style="padding-top: 5px; font-size: 25px; font-weight: bold">
                  {{ strEmployeeName }}
                </div>
              </v-col>
            </v-row>
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions
          :column="3"
          size="small"
          layout="vertical"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Department" :span="1">
            {{ GetDepartmentName(objEditFiledLeaveDefault.DepartmentCode) }}
          </a-descriptions-item>
          <a-descriptions-item label="Section" :span="1">
            {{ GetSectionName(objEditFiledLeaveDefault.SectionCode) }}
          </a-descriptions-item>
          <a-descriptions-item label="Team" :span="1">
            {{ GetTeamName(objEditFiledLeaveDefault.TeamCode) }}
          </a-descriptions-item>
          <a-descriptions-item label="Leave Renewal Date" :span="1">
            {{ objEditFiledLeaveDefault.DateRenewal }}
          </a-descriptions-item>
          <a-descriptions-item label="Total Vacation Leave" :span="1">
            {{ objEditFiledLeaveDefault.TotalVacLeave }}
          </a-descriptions-item>
          <a-descriptions-item label="Total Sick Leave" :span="1">
            {{ objEditFiledLeaveDefault.TotalSickLeave }}
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions
          :column="3"
          size="small"
          layout="vertical"
          :class="blnIsEdit === true ? 'EditDescription' : ''"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Filed" :span="1">
            <!-- <a-checkbox v-model="objEditFiledLeave.isFiled" style="margin-right:10px;" disabled></a-checkbox> -->
            <a-checkbox
              v-model="objEditFiledLeave.isFiled"
              style="margin-right: 10px"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
            ></a-checkbox>
            <span v-if="objEditFiledLeave.isFiled === true"> YES </span>
            <span v-else-if="objEditFiledLeave.isFiled === false"> NO </span>
          </a-descriptions-item>

          <a-descriptions-item label="With Pay" :span="1">
            <!-- <a-checkbox v-model="objEditFiledLeave.isWithPay" style="margin-right:10px;" disabled></a-checkbox> -->
            <a-checkbox
              v-model="objEditFiledLeave.isWithPay"
              style="margin-right: 10px"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
            ></a-checkbox>
            <span v-if="objEditFiledLeave.isWithPay === true"> YES </span>
            <span v-else-if="objEditFiledLeave.isWithPay === false"> NO </span>
          </a-descriptions-item>

          <a-descriptions-item label="AWOL" :span="1">
            <a-checkbox
              v-model="objEditFiledLeave.isAWOL"
              style="margin-right: 10px"
              disabled
            ></a-checkbox>
            <!-- <a-checkbox v-model="objEditFiledLeave.isAWOL" style="margin-right:10px;" :disabled="blnIsEdit === false || blnEditLoadingSave === true"></a-checkbox> -->
            <span v-if="objEditFiledLeave.isAWOL === true"> YES </span>
            <span v-else-if="objEditFiledLeave.isAWOL === false"> NO </span>
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions
          :column="2"
          size="small"
          :class="blnIsEdit === true ? 'EditDescription' : ''"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Leave Type" :span="2">
            <a-select
              :filter-option="FilterOption"
              v-model="objEditFiledLeave.LeaveTypeCode"
              placeholder="Type here..."
              size="small"
              :style="`width:100%; font-family:arial; font-size: 12px; color:black; border:1px solid; border-color:${
                intEditLeaveTypeError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeEditLeaveType()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              showSearch
              allowClear
            >
              <a-select-option
                v-for="item in arrLeaveTypes"
                :key="item.LeaveTypeCode"
                :value="item.LeaveTypeCode"
                style="font-family: arial"
              >
                {{ item.LeaveTypeDesc }}
              </a-select-option>
            </a-select>
            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intEditLeaveTypeError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Leave From" :span="1">
            <a-date-picker
              v-model="objEditFiledLeave.LeaveFrom"
              format="YYYY/MM/DD"
              placeholder="Select date..."
              size="small"
              :style="`width:170px; border:1px solid; border-color:${
                intEditLeaveFromError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeEditLeaveFrom()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              allowClear
            ></a-date-picker>
            <v-layout style="color: red; font-size: 9px">
              <v-spacer></v-spacer>
              <span v-if="intEditLeaveFromError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
              <span v-else-if="intEditLeaveFromError === 2">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Invalid Date Range.
              </span>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Leave To" :span="1">
            <a-date-picker
              v-model="objEditFiledLeave.LeaveTo"
              format="YYYY/MM/DD"
              placeholder="Select date..."
              size="small"
              :style="`width:100%; border:1px solid; border-color:${
                intEditLeaveToError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeEditLeaveTo()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              allowClear
            ></a-date-picker>
            <v-layout style="color: red; font-size: 9px">
              <v-spacer></v-spacer>
              <span v-if="intEditLeaveToError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
              <span v-else-if="intEditLeaveToError === 2">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Invalid Date Range.
              </span>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Filed Date" :span="1">
            <a-date-picker
              v-model="objEditFiledLeave.FiledDate"
              format="YYYY/MM/DD"
              placeholder="Select date..."
              size="small"
              :style="`width:100%; border:1px solid; border-color:${
                intEditFiledDateError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeEditFiledDate()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              allowClear
            ></a-date-picker>
            <v-layout style="color: red; font-size: 9px">
              <v-spacer></v-spacer>
              <span v-if="intEditFiledDateError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="No. of Working Days" :span="1">
            <a-input
              v-model="objEditFiledLeave.NoOfWorkingDays"
              class="NoOfWorkingDays"
              :style="`width:56%; border:1px solid; border-color:${
                intEditNoOfWorkingDaysError === 0 ? 'black' : 'red'
              };`"
              @change="ChangeEditNoOfWorkingDays()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              allowClear
            ></a-input>
            <a-button
              key="submit"
              type="primary"
              class="HalfDay"
              style="
                margin-left: 5px;
                width: 40%;
                font-family: arial;
                font-size: 10px;
                font-weight: bold;
              "
              @click="ClickFiledLeaveEditHalfDay(), ChangeEditNoOfWorkingDays()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
            >
              + Half Day
            </a-button>
            <v-layout style="color: red; font-size: 9px">
              <span v-if="intEditNoOfWorkingDaysError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
              <span v-else-if="intEditNoOfWorkingDaysError === 2">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Invalid value.
              </span>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Reason" :span="2">
            <a-input
              v-model="objEditFiledLeave.Reason"
              placeholder="Type here..."
              type="textarea"
              class="TextArea"
              :style="`width:100%; color:black; border:1px solid; border-color:${
                intEditReasonError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeEditReason()"
              :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              autoSize
              allowClear
            ></a-input>
            <v-layout style="color: red; font-size: 9px">
              <v-spacer></v-spacer>
              <span v-if="intEditReasonError === 1">
                <v-icon small style="color: red"> mdi-alert-circle-outline </v-icon>
                Field required.
              </span>
            </v-layout>
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions
          :column="1"
          size="small"
          layout="vertical"
          :class="blnIsEdit === true ? 'EditDescription' : ''"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Cancel Leave" :span="1">
            <v-layout>
              <a-checkbox
                v-model="objEditFiledLeave.isCanceled"
                style="padding-top: 7px; padding-right: 20px"
                @change="
                  ClickFiledLeaveEditCancel(objEditFiledLeave.isCanceled),
                    ChangeEditCancel()
                "
                :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              ></a-checkbox>
              <a-input
                :rows="1"
                v-model="objEditFiledLeave.CancelReason"
                placeholder="Type here..."
                type="textarea"
                :style="`width:100%; color:black; border:1px solid black; border-radius:4px;`"
                @change="ChangeEditCancelReason()"
                :disabled="blnIsCanceled === false || blnEditLoadingSave === true"
                autoSize
                allowClear
              ></a-input>
            </v-layout>
          </a-descriptions-item>
        </a-descriptions>

        <!-- ========== Attachments ========== -->
        <a-descriptions
          :class="blnIsEdit === true ? 'EditDescription' : ''"
          :column="1"
          size="small"
          layout="vertical"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Attachment(s)" :span="1">
            <div style="padding: 0px 0px 10px 0px">
              <input
                type="file"
                ref="filedleavefile"
                style="display: none"
                @change="FiledLeaveFileUpload()"
                multiple
              />
              <!-- Hidden button for file selection -->
              <a-button
                icon="file-add"
                :style="`width;:100%; border:1px black solid; background-color:${
                  blnIsEdit === false || blnEditLoadingSave === true ? 'gray' : '#e8950b'
                }; color:white;`"
                @click="ClickFiledLeaveAttachFile()"
                :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              >
                Upload File(s)
              </a-button>

              <span v-if="blnEditLoadingSave === true" style="text-align: center">
                <a-spin style="padding: 0px 0px 0px 150px"></a-spin>
              </span>
            </div>

            <a-list
              :data-source="arrAttachmentsView"
              size="small"
              item-layout="horizontal"
              class="AttachmentList2"
              style="
                text-align: center;
                border: 1px black solid;
                border-radius: 5px;
                background-color: white;
              "
              bordered
            >
              <a-list-item slot="renderItem" slot-scope="item" :id="item.fileName">
                <a-list-item-meta>
                  <span
                    slot="title"
                    style="font-size: 12px; color: black; font-family: arial"
                  >
                    <v-layout>
                      <v-icon :style="`color:${FileIconColor(item.fileName)};`">
                        {{ FileIcon(item.fileName) }}
                      </v-icon>
                      <div
                        style="padding: 5px 0px 0px 10px; font-weight: bold"
                        align="center"
                        justify="center"
                      >
                        {{ item.fileName }}
                      </div>
                      <v-spacer></v-spacer>

                      <a-tooltip title="Download File" placement="top">
                        <v-icon
                          v-if="item.Status === 'View'"
                          style="margin-right: 10px; color: #158f9e; cursor: pointer"
                          @click="
                            ClickFiledLeaveDownloadFile(
                              objEditFiledLeaveDefault.LeaveOfAbsenceID,
                              item
                            )
                          "
                          :disabled="blnEditLoadingSave === true"
                        >
                          mdi-file-download
                        </v-icon>
                      </a-tooltip>

                      <a-tooltip title="Remove File" placement="top">
                        <v-icon
                          v-if="blnIsEdit === true"
                          style="color: red; cursor: pointer"
                          @click="ClickFiledLeaveRemoveFile(item)"
                          :disabled="blnEditLoadingSave === true"
                        >
                          mdi-delete-circle-outline
                        </v-icon>
                      </a-tooltip>
                    </v-layout>
                  </span>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-descriptions-item>
        </a-descriptions>
        <!-- ================================= -->

        <!-- ===== Recommending Approval ===== -->
        <a-descriptions
          :column="3"
          size="small"
          layout="vertical"
          style="margin-right: 10px; margin-bottom: 10px"
          bordered
        >
          <a-descriptions-item label="Recommending Approval" :span="1">
            {{
              objEditFiledLeaveDefault.isRecommendingApproved === 1 ||
              objEditFiledLeaveDefault.isRecommendingApproved === 2
                ? objEditFiledLeaveDefault.RecommendingEmployeeName
                : ""
            }}
          </a-descriptions-item>

          <a-descriptions-item label="Status" :span="1">
            <v-layout>
              {{
                ViewRecommendingApproved(
                  objEditFiledLeaveDefault.isRecommendingApproved,
                  objEditFiledLeaveDefault.isApproverApproved,
                  objEditFiledLeaveDefault.isAdminApproved,
                  objEditFiledLeaveDefault.isAWOL
                )
              }}
              <v-spacer></v-spacer>
              <a-tooltip
                :title="`${objEditFiledLeaveDefault.RecommendingDisApprovalReason}`"
              >
                <v-icon
                  v-if="objEditFiledLeaveDefault.isRecommendingApproved === 2"
                  style="color: black; cursor: pointer"
                >
                  mdi-chat-question-outline
                </v-icon>
              </a-tooltip>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Date" :span="1">
            {{
              objEditFiledLeaveDefault.isRecommendingApproved === 1 ||
              objEditFiledLeaveDefault.isRecommendingApproved === 2
                ? objEditFiledLeaveDefault.RecommendingAssessedDate
                : ""
            }}
          </a-descriptions-item>
          <!-- ================================= -->

          <!-- ========== Approved By ========== -->
          <a-descriptions-item label="Approved By" :span="1">
            {{
              objEditFiledLeaveDefault.isApproverApproved === 1 ||
              objEditFiledLeaveDefault.isApproverApproved === 2
                ? objEditFiledLeaveDefault.ApproverEmployeeName
                : ""
            }}
          </a-descriptions-item>

          <a-descriptions-item label="Status" :span="1">
            <v-layout>
              {{
                ViewApproverApproved(
                  objEditFiledLeaveDefault.isRecommendingApproved,
                  objEditFiledLeaveDefault.isApproverApproved,
                  objEditFiledLeaveDefault.isAdminApproved,
                  objEditFiledLeaveDefault.isAWOL
                )
              }}
              <v-spacer></v-spacer>
              <a-tooltip :title="`${objEditFiledLeaveDefault.ApproverDisApprovalReason}`">
                <v-icon
                  v-if="objEditFiledLeaveDefault.isApproverApproved === 2"
                  style="color: black; cursor: pointer"
                >
                  mdi-chat-question-outline
                </v-icon>
              </a-tooltip>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Date" :span="1">
            {{
              objEditFiledLeaveDefault.isApproverApproved === 1 ||
              objEditFiledLeaveDefault.isApproverApproved === 2
                ? objEditFiledLeaveDefault.ApproverAssessedDate
                : ""
            }}
          </a-descriptions-item>
          <!-- ================================= -->

          <!-- ============= Admin ============= -->
          <a-descriptions-item label="Admin" :span="1">
            {{
              objEditFiledLeaveDefault.isAdminApproved === 1 ||
              objEditFiledLeaveDefault.isAdminApproved === 2
                ? objEditFiledLeaveDefault.AdminEmployeeName
                : ""
            }}
          </a-descriptions-item>

          <a-descriptions-item label="Status" :span="1">
            <v-layout>
              {{
                ViewAdminApproved(
                  objEditFiledLeaveDefault.isRecommendingApproved,
                  objEditFiledLeaveDefault.isApproverApproved,
                  objEditFiledLeaveDefault.isAdminApproved,
                  objEditFiledLeaveDefault.isAWOL
                )
              }}
              <v-spacer></v-spacer>
              <a-tooltip :title="`${objEditFiledLeaveDefault.AdminDisApprovalReason}`">
                <v-icon
                  v-if="objEditFiledLeaveDefault.isAdminApproved === 2"
                  style="color: black; cursor: pointer"
                >
                  mdi-chat-question-outline
                </v-icon>
              </a-tooltip>
            </v-layout>
          </a-descriptions-item>

          <a-descriptions-item label="Date" :span="1">
            {{
              objEditFiledLeaveDefault.isAdminApproved === 1 ||
              objEditFiledLeaveDefault.isAdminApproved === 2
                ? objEditFiledLeaveDefault.AdminAssessedDate
                : ""
            }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <!-- ================ EDIT================= -->
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <v-layout>
          <!-- <div v-if="CheckEditDisable() === true && blnViewFiledLeave === true" style="padding-top:4px;">
            <span style="padding-right:5px; font-size:10px; font-family:arial;"> Edit </span>
            <a-tooltip :title="objEditFiledLeaveDefault.isAWOL === 1 ? `AWOL can't be edited.` : `Leave already checked.`" placement="topRight">
              <a-switch v-model="blnIsEdit" size="small" disabled></a-switch>
            </a-tooltip>
          </div> -->

          <div style="padding-top: 4px">
            <span style="padding-right: 5px; font-size: 10px; font-family: arial">
              Edit
            </span>
            <a-tooltip
              :title="blnIsEdit === false ? `Click to edit leave.` : `Cancel editing.`"
              placement="topRight"
            >
              <a-switch
                v-model="blnIsEdit"
                size="small"
                :disabled="blnEditLoadingSave === true"
                @change="ClickFiledLeaveEdit()"
              ></a-switch>
            </a-tooltip>
          </div>

          <v-spacer></v-spacer>
          <div
            v-if="blnIsNotModified === true"
            style="
              padding-top: 10px;
              color: red;
              font-size: 15px;
              font-weight: bold;
              font-family: Century Gothic;
            "
          >
            * Nothing to save *
          </div>
          <v-spacer></v-spacer>

          <div v-if="blnIsEdit === false">
            <a-button
              icon="close-circle"
              class="ModalButtons"
              style="border: 1px black solid; color: black"
              @click="ClickFiledLeaveClose()"
              :disabled="blnEditLoadingSave === true"
            >
              Close
            </a-button>
          </div>

          <div v-else-if="blnIsEdit === true">
            <v-layout>
              <div style="padding-right: 10px">
                <a-button
                  icon="close-circle"
                  class="ModalButtons"
                  style="border: 1px black solid; color: black"
                  @click="ClickFiledLeaveClose()"
                  :disabled="blnEditLoadingSave === true"
                >
                  Close
                </a-button>
              </div>

              <div>
                <a-popconfirm
                  :visible="blnIsVisiblePopConfirm === true"
                  title="This filed leave is about to be cancelled. Continue?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="FiledLeaveEditSave()"
                  @cancel="blnIsVisiblePopConfirm = false"
                  placement="topRight"
                >
                  <a-button
                    icon="save"
                    :type="blnIsCanceled === true ? 'danger' : 'primary'"
                    class="ModalButtons"
                    :style="`border:1px black solid; color:${
                      blnEditLoadingSave === true ? 'black' : 'white'
                    };`"
                    @click="ClickFiledLeaveEditSave()"
                    :disabled="blnEditLoadingSave === true"
                  >
                    Save
                  </a-button>
                </a-popconfirm>
              </div>
            </v-layout>
          </div>
        </v-layout>
      </div>
    </a-drawer>
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>
import axios from "axios";
// import moment from "moment";
import moment from "moment-timezone";
import _ from "lodash";
// import {mapState} from "vuex";

export default {
  // ********************************************************************************** //
  // ====================================== Props ===================================== //
  // ********************************************************************************** //
  props: {
    blnTable: {
      type: Boolean,
      required: true,
    },
    objComponentData: {
      type: Object,
    },
  },
  // ********************************************************************************** //
  // ====================================== Data ====================================== //
  // ********************************************************************************** //
  data() {
    return {
      hris_data_headers: {
        headers: {
          "hris-key": process.env.VUE_APP_HRIS_API_MASTER_KEY,
        },
      },
      isAdmin: false,
      user: {},
      strSelectedLeaveID: undefined, //dagdag ko
      strEmployeeCode: undefined, // dagdag ko
      strEmployeeName: undefined, // dagdag ko
      strEmployeeAvatar: undefined, // dagdag ko
      strCompanyCode: undefined,
      strShortName: undefined,
      strDepartmentCode: undefined,
      strDepartmentName: undefined,
      strSectionCode: undefined,
      strTeamCode: undefined,
      strLeaveType: undefined,
      strLeaveTypeCode: undefined, // dagdag ko
      strFiled: "ALL",
      strWithPay: "ALL",
      strSearch: undefined,
      strStatus: "ALL",
      strFiledDateFrom: undefined,
      strFiledDateTo: undefined,
      strDisapprovalReason: undefined,

      intDisapproveError: 0,
      intEditLeaveTypeError: 0, // dagdag ko
      intEditLeaveFromError: 0, // dagdag ko
      intEditLeaveToError: 0, // dagdag ko
      intEditFiledDateError: 0, // dagdag ko
      intEditNoOfWorkingDaysError: 0, // dagdag ko
      intEditReasonError: 0, // dagdag ko

      blnDataLoad: false,
      blnViewFiledLeave: false,
      blnIsEdit: false, // dagdag ko
      blnIsCanceled: false, //dagdag ko
      blnEditLoadingSave: false, // dagdag ko
      blnIsNotModified: false, // dagdag ko
      blnIsVisiblePopConfirm: false, // dagdag ko

      objUserInformation: {}, // dagdag ko
      objEmployeeInformation: {}, // dagdag ko feb 2
      objEditFiledLeaveDefault: {}, // dagdag ko pababa
      objFileLeave: {
        LeaveOfAbsenceID: undefined,
        LeaveTypeCode: undefined,
        LeaveFrom: undefined,
        LeaveTo: undefined,
        FiledDate: moment(new Date()),
        NoOfWorkingDays: undefined,
        isFiled: true,
        isWithPay: false,
        Reason: undefined,
      },
      objEditFiledLeave: {
        LeaveOfAbsenceID: undefined,
        LeaveTypeCode: undefined,
        LeaveID: undefined, // dagdag ko
        LeaveFrom: undefined,
        LeaveTo: undefined,
        FiledDate: undefined,
        NoOfWorkingDays: undefined,
        isFiled: false,
        isWithPay: false,
        isAWOL: false,
        Reason: undefined,
      },
      leaveDetails: null, // RONN
      // arrMembers: [], //dagdag ko
      arrAttachmentsViewDefault: [], //dagdag ko
      arrAttachmentsView: [], // dagdag ko
      arrLeaveTypesFILTERED: [], // dagdag ko
      arrDepartments: [], // dagdag ko
      arrSections: [],
      arrTeams: [],
      arrLeaveTypes: [],
      arrLeaves: [],
      arrActiveHeader: ["1"], // dagdag ko
      arrFilterOptions: [{ Filter: "ALL" }, { Filter: "✔️" }, { Filter: "❌" }],
      arrStatusOptions: [
        { Filter: "ALL" },
        { Filter: "Approved" },
        { Filter: "Disapproved" },
      ],
    };
  },
  // ********************************************************************************** //
  // ===================================== Created ==================================== //
  // ********************************************************************************** //
  created() {
    let BasicInfoAPI = `${this.api}GetSystemAdminAccounts`;
    axios
      .get(BasicInfoAPI, { headers: { "master-api": this.header_API } })
      .then((res) => {
        let adminFindIndex = res.data.findIndex(
          (emp) => emp.EmployeeCode == this.DecryptText(this.$store.state.loa_user)
        );
        this.user = res.data[adminFindIndex];
        console.log(adminFindIndex > -1, "IS ADMIN");
        this.isAdmin = adminFindIndex > -1;
      });

    this.blnDataLoad = true; // dagdag ko nagyon 31
    this.GetUserInformation(); // dagdag ko nagyon 31

    let holidayPath = `${this.holiday_API}`;
    axios.get(holidayPath).then((res) => {
      this.arrHoliday = res.data;
    });

    let restdayPath = `${this.restday_API}${this.DecryptText(
      this.$store.state.loa_user
    )}`;
    axios.get(restdayPath).then((res) => {
      this.arrRestDay = res.data.map((rec) => rec.RestDay);
    });
  },
  // ********************************************************************************** //
  // ===================================== Computed =================================== //
  // ********************************************************************************** //
  computed: {
    editWorkingDays() {
      // for edit

      let totalDays = 0;
      let StartDate = moment(this.objEditFiledLeave.LeaveFrom).format("YYYY-MM-DD");
      let maxLoopCnt =
        moment(moment(this.objEditFiledLeave.LeaveTo).format("YYYY-MM-DD")).diff(
          moment(this.objEditFiledLeave.LeaveFrom).format("YYYY-MM-DD"),
          "days"
        ) + 1;

      if (
        this.objEditFiledLeave.LeaveFrom !== undefined &&
        this.objEditFiledLeave.LeaveTo !== undefined
      ) {
        for (let x = 0; x < maxLoopCnt; x++) {
          let runDate = moment(StartDate).add(x, "days").format("YYYY-MM-DD");
          let isSunday = moment(runDate).format("ddd").toLowerCase().trim() == "sun";
          let Total = this.arrHoliday.indexOf(runDate.trim());
          let Total2 = this.arrRestDay.indexOf(runDate.trim());
          if (Total == -1 && !isSunday && Total2 == -1) {
            totalDays += 1;
          }
        }
      }
      return totalDays;
    },

    compFilteredTeams() {
      let data = [];

      if (
        this.strSectionCode !== undefined &&
        this.strSectionCode !== null &&
        this.strSectionCode !== ""
      ) {
        data = this.arrTeams.filter((Team) => {
          return (
            (Team.DeletedDate === undefined ||
              Team.DeletedDate === null ||
              Team.DeletedDate === "") &&
            (Team.SectionCode === this.strSectionCode || Team.SectionCode === "NONE")
          );
        });
      }

      return data;
    },
    compFilteredLeaves() {
      let data = this.arrLeaves;

      // dagdag ko kahapon ito lang
      if (
        this.strDepartmentCode !== undefined &&
        this.strDepartmentCode !== null &&
        this.strDepartmentCode !== ""
      ) {
        data = data.filter((rec) => {
          return (
            rec.DepartmentCode.toUpperCase() === this.strDepartmentCode.toUpperCase()
          );
        });
      }

      if (
        this.strSectionCode !== undefined &&
        this.strSectionCode !== null &&
        this.strSectionCode !== ""
      ) {
        data = data.filter((rec) => {
          return rec.SectionCode.toUpperCase() === this.strSectionCode.toUpperCase();
        });
      }

      if (
        this.strTeamCode !== undefined &&
        this.strTeamCode !== null &&
        this.strTeamCode !== ""
      ) {
        data = data.filter((rec) => {
          return rec.TeamCode.toUpperCase() === this.strTeamCode.toUpperCase();
        });
      }

      if (
        this.strLeaveType !== undefined &&
        this.strLeaveType !== null &&
        this.strLeaveType !== ""
      ) {
        data = data.filter((rec) => {
          return rec.LeaveTypeCode.toUpperCase() === this.strLeaveType.toUpperCase();
        });
      }

      if (
        this.strFiled !== undefined &&
        this.strFiled !== null &&
        this.strFiled !== "" &&
        this.strFiled !== "ALL"
      ) {
        if (this.strFiled === "✔️") {
          data = data.filter((rec) => {
            return rec.isFiled === 1;
          });
        }

        if (this.strFiled === "❌") {
          data = data.filter((rec) => {
            return rec.isFiled === 0;
          });
        }
      }

      if (
        this.strWithPay !== undefined &&
        this.strWithPay !== null &&
        this.strWithPay !== "" &&
        this.strWithPay !== "ALL"
      ) {
        if (this.strWithPay === "✔️") {
          data = data.filter((rec) => {
            return rec.WithPay === 1;
          });
        }

        if (this.strWithPay === "❌") {
          data = data.filter((rec) => {
            return rec.WithPay === 0;
          });
        }
      }

      if (
        this.strReason !== undefined &&
        this.strReason !== null &&
        this.strReason !== ""
      ) {
        data = data.filter((rec) => {
          return rec.ReasonForLeave.toUpperCase().includes(this.strReason.toUpperCase());
        });
      }

      if (
        this.strSearch !== undefined &&
        this.strSearch !== null &&
        this.strSearch !== ""
      ) {
        data = data.filter((rec) => {
          return (
            rec.EmployeeCode.toUpperCase().includes(this.strSearch.toUpperCase()) ||
            rec.EmployeeName.toUpperCase().includes(this.strSearch.toUpperCase()) ||
            rec.ReasonForLeave.toUpperCase().includes(this.strSearch.toUpperCase())
          );
        });
      }

      if (
        this.strStatus !== undefined &&
        this.strStatus !== null &&
        this.strStatus !== "" &&
        this.strStatus !== "ALL"
      ) {
        if (this.strStatus === "Approved") {
          data = data.filter((rec) => {
            return rec.isAdminApproved === 1;
          });
        }

        if (this.strStatus === "Disapproved") {
          data = data.filter((rec) => {
            return rec.isAdminApproved === 2;
          });
        }
      }
      // console.log("strTeamCode", this.strStatus);
      // console.log("data", this.arrLeaves[0]);
      // data = data.filter((rec) => {
      //   return rec.ApproverEmployeeCode !== null;
      // });
      // /* --------------------------------- MEMBER --------------------------------- */
      // if (data.PositionCode == null) {
      //   data.filter((rec) => {
      //     return rec.ApproverEmployeeCode;
      //   });
      // }
      // /* ------------------------------- END MEMBER ------------------------------- */
      // if (['004','005','006','007','020','022','023'].includes(data.PositionCode)) {
      //   data.filter((rec) => {
      //     return rec.ApproverEmployeeCode;
      //   });
      // }
      // console.log("new _ data", data);
console.log('disss',data)
      return data;
    },
  },
  // ********************************************************************************** //
  // ====================================== Watch ===================================== //
  // ********************************************************************************** //
  watch: {
    blnTable(value) {
      if (value === true) {
        let {
          CompanyCode,
          ShortName,
          DepartmentCode,
          DepartmentName,
          FiledDateFrom,
          FiledDateTo,
        } = this.objComponentData;

        this.strCompanyCode = CompanyCode;
        this.strShortName = ShortName;
        this.strDepartmentCode = DepartmentCode;
        this.strDepartmentName = DepartmentName;
        this.strFiledDateFrom = FiledDateFrom;
        this.strFiledDateTo = FiledDateTo;

        // this.GetSectionsTeams() // uncommit ko kase pwede naman GetDepartmentsSectionsTeams nalang
        this.GetDepartmentsSectionsTeams(); // dagdag ko
        this.GetLeaveTypes();
        this.RunSocketIO();
        this.$socket.emit("RequestAdminListTable");
      } else if (value === false) {
        this.ClearVariables();
      }
    },
  },
  // ********************************************************************************** //
  // ===================================== Methods ==================================== //
  // ********************************************************************************** //
  methods: {
    // ============================================================= //
    // ===================== Data Load Events ====================== //
    // ============================================================= //
    RunSocketIO() {
      this.$socket.on("GetAdminListTable", () => {
        this.GetLeaves();
      });
    },
    GetUserInformation() {
      // dagdag ko
      let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(
        this.$store.state.loa_user
      )}`;
      axios
        .get(BasicInfoAPI, { headers: { "master-api": this.header_API } })
        .then((res) => {
          this.objUserInformation = res.data[0];
          this.GetDepartmentsSectionsTeams();
          // this.GetPosition()
        });
    },
    // GetSectionsTeams(){ // uncommit ko  muna kase nagdouble
    //   let SectionsAPI = `${this.sections_API}${this.strCompanyCode}`
    //   axios.get(SectionsAPI, {headers:{'master-api' : this.header_API}}).then(Sections => {
    //     let arrSectionNone = [{
    //       "SectionCode": "NONE",
    //       "SectionName": "NONE",
    //     }]

    //     let arrSectionsALL = Sections.data.filter(Section => {
    //       return (Section.DeletedDate === undefined || Section.DeletedDate === null || Section.DeletedDate === "") && (Section.DepartmentCode === this.strDepartmentCode)
    //     })

    //     this.arrSections = [...arrSectionNone, ...arrSectionsALL]

    //     let TeamsAPI = `${this.teams_API}${this.strCompanyCode}`
    //     axios.get(TeamsAPI, {headers:{'master-api' : this.header_API}}).then(Teams => {
    //       let arrTeamNone = [{
    //         "SectionCode": "NONE",
    //         "SectionName": "NONE",
    //         "TeamCode": "NONE",
    //         "TeamName": "NONE",
    //       }]

    //       let arrTeamsALL = Teams.data.filter(Team => {
    //         return (Team.DeletedDate === undefined || Team.DeletedDate === null || Team.DeletedDate === "") && (Team.DepartmentCode === this.strDepartmentCode)
    //       })

    //       this.arrTeams = [...arrTeamNone, ...arrTeamsALL]
    //     })
    //   })
    // },
    GetLeaveTypes() {
      let GetLeaveTypesURL = `${this.api}GetLeaveTypesALL`;
      axios.get(GetLeaveTypesURL).then((res) => {
        this.arrLeaveTypes = res.data;
      });
    },
    GetLeaveTypesALL() {
      // dagdag ko
      let GetLeaveTypesURL = `${this.api}GetLeaveTypesALL`;
      axios.get(GetLeaveTypesURL).then((res) => {
        this.arrLeaveTypesALL = res.data;
      });
    },

    GetLeaveTypeName(LeaveTypeCode) {
      let data = this.arrLeaveTypes.find((rec) => {
        return rec.LeaveTypeCode == LeaveTypeCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        return data.LeaveTypeDesc;
      } else {
        return "NONE";
      }
    },
    GetLeaves() {
      this.blnDataLoad = true;
      let LeaveCounter = 0;
      let EmployeesLeaves = [];

      let LeavesURL = `${this.api}/GetAdminListTable?CompanyCode=${this.strCompanyCode}&DepartmentCode=${this.strDepartmentCode}&FiledDateFrom=${this.strFiledDateFrom}&FiledDateTo=${this.strFiledDateTo}`;
      axios.get(LeavesURL).then((Leaves) => {
        let LeaveData = Leaves.data;
        // console.log('Leave', LeaveData)

        if (LeaveData.length === 0) {
          this.arrLeaves = [];
        }

        LeaveData.forEach((Data) => {
          // console.log('GETLIV', Data)
          let EmployeeBasicInfoAPI = `${this.basicInfo_API}${Data.EmployeeCode}`;
          axios
            .get(EmployeeBasicInfoAPI, {
              headers: { "master-api": this.header_API },
            })
            .then((Employee) => {
              let EmployeeData = Employee.data[0];
              let RecommendingData = undefined;

              let RecommendingBasicInfoAPI = `${this.basicInfo_API}${Data.RecommendingEmployeeCode}`;
              axios
                .get(RecommendingBasicInfoAPI, {
                  headers: { "master-api": this.header_API },
                })
                .then((Recommending) => {
                  RecommendingData = Recommending.data[0];
                  let ApproverData = undefined;

                  let ApprovedBasicInfoAPI = `${this.basicInfo_API}${Data.ApproverEmployeeCode}`;
                  axios
                    .get(ApprovedBasicInfoAPI, {
                      headers: { "master-api": this.header_API },
                    })
                    .then((Approver) => {
                      ApproverData = Approver.data[0];
                      let AdminData = undefined;

                      let AdminBasicInfoAPI = `${this.basicInfo_API}${Data.AdminEmployeeCode}`;
                      axios
                        .get(AdminBasicInfoAPI, {
                          headers: { "master-api": this.header_API },
                        })
                        .then((Admin) => {
                          AdminData = Admin.data[0];
                          LeaveCounter++;

                          EmployeesLeaves.push({
                            LeaveOfAbsenceID: Data.LeaveOfAbsenceID,
                            CompanyCode: Data.CompanyCode,
                            DepartmentCode: Data.DepartmentCode,
                            SectionCode: Data.SectionCode,
                            TeamCode: Data.TeamCode,
                            PositionCode: EmployeeData.PositionCode,
                            EmployeeCode: Data.EmployeeCode,
                            EmployeeAvatar: `${this.avatar_API}${Data.EmployeeCode}.jpg`,
                            EmployeeName: EmployeeData.EmployeeName,
                            EmployeeFirstName: EmployeeData.FirstName,
                            EmployeeLastName: EmployeeData.LastName,
                            LeaveID: Data.LeaveID,
                            UpdatedDate: moment(new Date(Data.UpdatedDate)).format(
                              "YYYY/MM/DD"
                            ),
                            DateRenewal: moment(new Date(Data.DateRenewal)).format(
                              "YYYY/MM/DD"
                            ),
                            TotalVacLeave: Data.TotalVacLeave,
                            TotalSickLeave: Data.TotalSickLeave,
                            LeaveTypeCode: Data.LeaveTypeCode,
                            LeaveFrom: moment(new Date(Data.LeaveFrom)).format(
                              "YYYY/MM/DD"
                            ),
                            LeaveTo: moment(new Date(Data.LeaveTo)).format("YYYY/MM/DD"),
                            FiledDate: moment(new Date(Data.FiledDate)).format(
                              "YYYY/MM/DD"
                            ),
                            NoOfWorkingDays: Data.NoOfWorkingDays,
                            isFiled: Data.isFiled,
                            WithPay: Data.WithPay,
                            isAWOL: Data.isAWOL,
                            ReasonForLeave: Data.ReasonForLeave,
                            isCanceled: Data.isCanceled,
                            CancelReason: Data.CancelReason,

                            RecommendingEmployeeCode: Data.RecommendingEmployeeCode,
                            RecommendingEmployeeAvatar: `${this.avatar_API}${Data.RecommendingEmployeeCode}.jpg`,
                            RecommendingEmployeeFirstName:
                              RecommendingData === undefined ||
                              RecommendingData === null ||
                              RecommendingData === {}
                                ? null
                                : RecommendingData.FirstName,
                            RecommendingEmployeeLastName:
                              RecommendingData === undefined ||
                              RecommendingData === null ||
                              RecommendingData === {}
                                ? null
                                : RecommendingData.LastName,
                            RecommendingEmployeeName:
                              RecommendingData === undefined ||
                              RecommendingData === null ||
                              RecommendingData === {}
                                ? null
                                : RecommendingData.EmployeeName,
                            isRecommendingApproved: Data.isRecommendingApproved,
                            RecommendingAssessedDate: moment(
                              new Date(Data.RecommendingAssessedDate)
                            ).format("YYYY/MM/DD"),
                            RecommendingDisApprovalReason:
                              Data.RecommendingDisApprovalReason,

                            ApproverEmployeeCode: Data.ApproverEmployeeCode,
                            ApproverEmployeeAvatar: `${this.avatar_API}${Data.ApproverEmployeeCode}.jpg`,
                            ApproverEmployeeFirstName:
                              ApproverData === undefined ||
                              ApproverData === null ||
                              ApproverData === {}
                                ? null
                                : ApproverData.FirstName,
                            ApproverEmployeeLastName:
                              ApproverData === undefined ||
                              ApproverData === null ||
                              ApproverData === {}
                                ? null
                                : ApproverData.LastName,
                            ApproverEmployeeName:
                              ApproverData === undefined ||
                              ApproverData === null ||
                              ApproverData === {}
                                ? null
                                : ApproverData.EmployeeName,
                            isApproverApproved: Data.isApproverApproved,
                            ApproverAssessedDate: moment(
                              new Date(Data.ApproverAssessedDate)
                            ).format("YYYY/MM/DD"),
                            ApproverDisApprovalReason: Data.ApproverDisApprovalReason,

                            AdminEmployeeCode: Data.AdminEmployeeCode,
                            AdminEmployeeAvatar: `${this.avatar_API}${Data.AdminEmployeeCode}.jpg`,
                            AdminEmployeeFirstName:
                              AdminData === undefined ||
                              AdminData === null ||
                              AdminData === {}
                                ? null
                                : AdminData.FirstName,
                            AdminEmployeeLastName:
                              AdminData === undefined ||
                              AdminData === null ||
                              AdminData === {}
                                ? null
                                : AdminData.LastName,
                            AdminEmployeeName:
                              AdminData === undefined ||
                              AdminData === null ||
                              AdminData === {}
                                ? null
                                : AdminData.EmployeeName,
                            isAdminApproved: Data.isAdminApproved,
                            AdminAssessedDate: moment(
                              new Date(Data.AdminAssessedDate)
                            ).format("YYYY/MM/DD"),
                            AdminDisApprovalReason: Data.AdminDisApprovalReason,

                            DisapprovePopOverVisible: false,
                          });
                          if (LeaveCounter === LeaveData.length) {
                            this.arrLeaves = _.orderBy(
                              EmployeesLeaves,
                              ["FiledDate", "EmployeeCode", "LeaveOfAbsenceID"],
                              ["asc", "asc", "asc"]
                            );
                            this.blnDataLoad = false;
                          }
                        });
                    });
                });
            });
        });
        if (LeaveData.length === 0) {
          this.blnDataLoad = false;
        }
      });
    }, // dagdag ko pababa
    GetAttachments(ID) {
      // dagdag ko
      // console.log(ID)
      axios.get(`${this.api}GetAttachments?ID=${ID}`).then((res) => {
        // console.log(res.data)
        this.arrAttachmentsViewDefault = res.data;
        let DefaultData = this.arrAttachmentsViewDefault.map((Data) => {
          return Data;
        });
        this.arrAttachmentsView = DefaultData;
      });
    },
    GetDepartmentsSectionsTeams() {
      // dagdag ko ngayon 31
      let DepartmentsAPI = `${this.departments_API}${this.objUserInformation.CompanyCode}`;
      axios
        .get(DepartmentsAPI, { headers: { "master-api": this.header_API } })
        .then((Departments) => {
          this.arrDepartments = Departments.data;
        });

      let SectionsAPI = `${this.sections_API}${this.objUserInformation.CompanyCode}`;
      axios
        .get(SectionsAPI, { headers: { "master-api": this.header_API } })
        .then((Sections) => {
          this.arrSections = Sections.data;
        });

      let TeamsAPI = `${this.teams_API}${this.objUserInformation.CompanyCode}`;
      axios
        .get(TeamsAPI, { headers: { "master-api": this.header_API } })
        .then((Teams) => {
          this.arrTeams = Teams.data;
        });
    },

    GetDepartmentName(DepartmentCode) {
      let data = this.arrDepartments.find((rec) => {
        return rec.DepartmentCode == DepartmentCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        return data.DepartmentName;
      } else {
        return "NONE";
      }
    },
    GetSectionName(SectionCode) {
      let data = this.arrSections.find((rec) => {
        return rec.SectionCode == SectionCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        return data.SectionName;
      } else {
        return "NONE";
      }
    },
    GetTeamName(TeamCode) {
      let data = this.arrTeams.find((rec) => {
        return rec.TeamCode == TeamCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        return data.TeamName;
      } else {
        return "NONE";
      }
    },
    GetLeaveTypesFILTERED() {
      let GetLeaveTypesURL = `${this.api}GetLeaveTypesFILTERED`;
      axios.get(GetLeaveTypesURL).then((res) => {
        this.arrLeaveTypesFILTERED = res.data;
      });
    },
    // ============================================================= //
    // ===================== User Action Events ==================== //
    // ============================================================= //
    ChangeEditFiledDate() {
      this.intEditFiledDateError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditReason() {
      // dagdag
      this.intEditReasonError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditNoOfWorkingDays() {
      this.intEditNoOfWorkingDaysError = 0;
      this.blnIsNotModified = false;
    },
    ChangeSectionFilter() {
      this.strTeamCode = undefined;
    },
    ChangeDisapproveReason() {
      this.intDisapproveError = 0;
    },
    ClickFiledLeave(Data) {
      // console.log("datas", Data);
      this.strSelectedLeaveID = JSON.parse(JSON.stringify(Data.LeaveOfAbsenceID));
      this.strEmployeeName = Data.EmployeeName; // dagdag ko
      this.strEmployeeAvatar = `${this.avatar_API}${Data.EmployeeCode}.jpg`; // dagdag ko
      this.intEditLeaveTypeError = 0;
      this.intEditLeaveFromError = 0;
      this.intEditLeaveToError = 0;
      this.intEditFiledDateError = 0;
      this.intEditNoOfWorkingDaysError = 0;
      this.intEditReasonError = 0;
      this.blnIsCanceled = false;
      this.blnIsVisiblePopConfirm = false;
      this.blnIsNotModified = false;
      this.objEditFiledLeaveDefault = JSON.parse(JSON.stringify(Data));
      this.objEditFiledLeave = {
        LeaveOfAbsenceID: this.objEditFiledLeaveDefault.LeaveOfAbsenceID,
        LeaveTypeCode: this.objEditFiledLeaveDefault.LeaveTypeCode,
        LeaveFrom: moment(
          new Date(this.objEditFiledLeaveDefault.LeaveFrom),
          "YYYY/MM/DD"
        ),
        LeaveTo: moment(new Date(this.objEditFiledLeaveDefault.LeaveTo), "YYYY/MM/DD"),
        FiledDate: moment(
          new Date(this.objEditFiledLeaveDefault.FiledDate),
          "YYYY/MM/DD"
        ),
        NoOfWorkingDays: this.objEditFiledLeaveDefault.NoOfWorkingDays,
        isFiled: this.objEditFiledLeaveDefault.isFiled === 1 ? true : false,
        isWithPay: this.objEditFiledLeaveDefault.WithPay === 1 ? true : false,
        isAWOL: this.objEditFiledLeaveDefault.isAWOL === 1 ? true : false,
        Reason: this.objEditFiledLeaveDefault.ReasonForLeave,
        isCanceled: this.objEditFiledLeaveDefault.isCanceled === 1 ? true : false,
        CancelReason: this.objEditFiledLeaveDefault.CancelReason,
      };
      this.arrAttachmentsViewDefault = [];
      this.arrAttachmentsView = [];
      this.arrAttachmentsToDelete = [];
      this.arrAttachmentsToSave = [];
      this.GetAttachments(this.objEditFiledLeaveDefault.LeaveOfAbsenceID);

      this.blnViewFiledLeave = true; // dagdag ko
    },
    ClickFiledLeaveEdit() {
      // dagdag
      this.intEditLeaveTypeError = 0;
      this.intEditLeaveFromError = 0;
      this.intEditLeaveToError = 0;
      this.intEditFiledDateError = 0;
      this.intEditNoOfWorkingDaysError = 0;
      this.intEditReasonError = 0;
      this.blnIsCanceled = false;
      this.blnIsVisiblePopConfirm = false;
      this.blnIsNotModified = false;
      this.objEditFiledLeave = {
        LeaveOfAbsenceID: this.objEditFiledLeaveDefault.LeaveOfAbsenceID,
        LeaveTypeCode: this.objEditFiledLeaveDefault.LeaveTypeCode,
        LeaveID: this.objEditFiledLeave.LeaveID, // dagdag ko
        LeaveFrom: moment(
          new Date(this.objEditFiledLeaveDefault.LeaveFrom),
          "YYYY/MM/DD"
        ),
        LeaveTo: moment(new Date(this.objEditFiledLeaveDefault.LeaveTo), "YYYY/MM/DD"),
        FiledDate: moment(
          new Date(this.objEditFiledLeaveDefault.FiledDate),
          "YYYY/MM/DD"
        ),
        NoOfWorkingDays: this.objEditFiledLeaveDefault.NoOfWorkingDays,
        isFiled: this.objEditFiledLeaveDefault.isFiled === 1 ? true : false,
        isWithPay: this.objEditFiledLeaveDefault.WithPay === 1 ? true : false,
        isAWOL: this.objEditFiledLeaveDefault.isAWOL === 1 ? true : false,
        Reason: this.objEditFiledLeaveDefault.ReasonForLeave,
        isCanceled: this.objEditFiledLeaveDefault.isCanceled === 1 ? true : false,
        CancelReason: this.objEditFiledLeaveDefault.CancelReason,
      };
      let DefaultData = this.arrAttachmentsViewDefault.map((Data) => {
        return Data;
      });
      this.arrAttachmentsView = DefaultData;
      this.arrAttachmentsToDelete = [];
      this.arrAttachmentsToSave = [];
    },
    ClickFiledLeaveEditSave() {
      this.FiledLeaveEditCheck();
      if (
        this.intEditLeaveTypeError === 0 &&
        this.intEditLeaveFromError === 0 &&
        this.intEditLeaveToError === 0 &&
        this.intEditFiledDateError === 0 &&
        this.intEditNoOfWorkingDaysError === 0 &&
        this.intEditReasonError === 0
      ) {
        if (this.FiledLeaveEditFieldCheck() === true) {
          this.blnIsNotModified = true;
        } else {
          if (this.blnIsCanceled === false) {
            this.FiledLeaveEditSave();
          } else {
            this.blnIsVisiblePopConfirm = true;
          }
        }
      }
    },
    ClickFiledLeaveEditHalfDay() {
      let Value = 0;
      if (
        this.objEditFiledLeave.NoOfWorkingDays !== undefined &&
        this.objEditFiledLeave.NoOfWorkingDays !== null &&
        this.objEditFiledLeave.NoOfWorkingDays !== ""
      ) {
        Value = this.objEditFiledLeave.NoOfWorkingDays;
      }
      this.intEditNoOfWorkingDaysError = 0;
      this.objEditFiledLeave.NoOfWorkingDays = parseFloat(Value) + 0.5;
    },
    ClickFiledLeaveEditCancel(isCanceled) {
      this.blnIsCanceled = isCanceled;
      if (isCanceled === false) {
        this.objEditFiledLeave.CancelReason = null;
      }
    },
    FiledLeaveEditCheck() {
      this.intEditLeaveTypeError = 0;
      this.intEditLeaveFromError = 0;
      this.intEditLeaveToError = 0;
      this.intEditFiledDateError = 0;
      this.intEditNoOfWorkingDaysError = 0;
      this.intEditReasonError = 0;
      this.blnIsVisiblePopConfirm = false;
      this.blnIsNotModified = false;

      // LEAVE TYPE CHECKING              // 1 - Blank Leave Type Field
      if (
        this.objEditFiledLeave.LeaveTypeCode === undefined ||
        this.objEditFiledLeave.LeaveTypeCode === null ||
        this.objEditFiledLeave.LeaveTypeCode.trim() === ""
      ) {
        this.intEditLeaveTypeError = 1;
      }

      // LEAVE FROM CHECKING              // 1 - Blank Leave From Field
      if (
        this.objEditFiledLeave.LeaveFrom === undefined ||
        this.objEditFiledLeave.LeaveFrom === null ||
        this.objEditFiledLeave.LeaveFrom === ""
      ) {
        this.intEditLeaveFromError = 1;
      } else if (
        this.objEditFiledLeave.LeaveFrom !== undefined &&
        this.objEditFiledLeave.LeaveFrom !== null &&
        this.objEditFiledLeave.LeaveFrom !== "" &&
        this.objEditFiledLeave.LeaveTo !== undefined &&
        this.objEditFiledLeave.LeaveTo !== null &&
        this.objEditFiledLeave.LeaveTo !== ""
      ) {
        if (
          moment(new Date(this.objEditFiledLeave.LeaveFrom)).format("YYYY/MM/DD") >
          moment(new Date(this.objEditFiledLeave.LeaveTo)).format("YYYY/MM/DD")
        ) {
          this.intEditLeaveFromError = 2;
        }
      }

      // LEAVE TO CHECKING                // 1 - Blank Leave To Field                 // 2 - Leave From Greater Than Leave To
      if (
        this.objEditFiledLeave.LeaveTo === undefined ||
        this.objEditFiledLeave.LeaveTo === null ||
        this.objEditFiledLeave.LeaveTo === ""
      ) {
        this.intEditLeaveToError = 1;
      } else if (
        this.objEditFiledLeave.LeaveFrom !== undefined &&
        this.objEditFiledLeave.LeaveFrom !== null &&
        this.objEditFiledLeave.LeaveFrom !== "" &&
        this.objEditFiledLeave.LeaveTo !== undefined &&
        this.objEditFiledLeave.LeaveTo !== null &&
        this.objEditFiledLeave.LeaveTo !== ""
      ) {
        if (
          moment(new Date(this.objEditFiledLeave.LeaveFrom)).format("YYYY/MM/DD") >
          moment(new Date(this.objEditFiledLeave.LeaveTo)).format("YYYY/MM/DD")
        ) {
          this.intEditLeaveToError = 2;
        }
      }

      // FILED DATE CHECKING              // 1 - Blank Filed Date Field
      if (
        this.objEditFiledLeave.FiledDate === undefined ||
        this.objEditFiledLeave.FiledDate === null ||
        this.objEditFiledLeave.FiledDate === ""
      ) {
        this.intEditFiledDateError = 1;
      }

      // NO OF WORKING DAYS CHECKING      // 1 - Blank No Of Working Days Field       // 2 - Invalid No Of Working Days Value
      if (
        this.objEditFiledLeave.NoOfWorkingDays === undefined ||
        this.objEditFiledLeave.NoOfWorkingDays === null ||
        this.objEditFiledLeave.NoOfWorkingDays === ""
      ) {
        this.intEditNoOfWorkingDaysError = 1;
      } else if (this.objEditFiledLeave.NoOfWorkingDays <= 0) {
        this.intEditNoOfWorkingDaysError = 2;
      }

      // REASON CHECKING                  // 1 - Blank Reason Field
      if (
        this.objEditFiledLeave.Reason === undefined ||
        this.objEditFiledLeave.Reason === null ||
        this.objEditFiledLeave.Reason.trim() === ""
      ) {
        this.intEditReasonError = 1;
      }
    },

    FiledLeaveEditFieldCheck() {
      let DefaultLeaveTypeCode = this.objEditFiledLeaveDefault.LeaveTypeCode;
      let DefaultLeaveFrom = moment(
        new Date(this.objEditFiledLeaveDefault.LeaveFrom),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let DefaultLeaveTo = moment(
        new Date(this.objEditFiledLeaveDefault.LeaveTo),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let DefaultFiledDate = moment(
        new Date(this.objEditFiledLeaveDefault.FiledDate),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let DefaultIsFiled = this.objEditFiledLeaveDefault.isFiled;
      let DefaultWithPay = this.objEditFiledLeaveDefault.WithPay;
      let DefaultIsAWOL = this.objEditFiledLeaveDefault.isAWOL;
      let DefaultNoOfWorkingDays = this.objEditFiledLeaveDefault.NoOfWorkingDays;
      let DefaultReasonForLeave = this.objEditFiledLeaveDefault.ReasonForLeave;
      let DefaultIsCanceled = this.objEditFiledLeaveDefault.isCanceled === true ? 1 : 0;
      let DefaultCancelReason =
        this.objEditFiledLeaveDefault.CancelReason === undefined ||
        this.objEditFiledLeaveDefault.CancelReason === null ||
        this.objEditFiledLeaveDefault.CancelReason === ""
          ? ""
          : this.objEditFiledLeaveDefault.CancelReason;

      let EditLeaveTypeCode = this.objEditFiledLeave.LeaveTypeCode;
      let EditLeaveFrom = moment(
        new Date(this.objEditFiledLeave.LeaveFrom),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let EditLeaveTo = moment(
        new Date(this.objEditFiledLeave.LeaveTo),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let EditFiledDate = moment(
        new Date(this.objEditFiledLeave.FiledDate),
        "YYYY/MM/DD"
      ).format("YYYY/MM/DD");
      let EditIsFiled = this.objEditFiledLeave.isFiled === true ? 1 : 0;
      let EditWithPay = this.objEditFiledLeave.isWithPay === true ? 1 : 0;
      let EditIsAWOL = this.objEditFiledLeave.isAWOL === true ? 1 : 0;
      let EditNoOfWorkingDays = this.objEditFiledLeave.NoOfWorkingDays;
      let EditReasonForLeave = this.objEditFiledLeave.Reason;
      let EditIsCanceled = this.objEditFiledLeave.isCanceled === true ? 1 : 0;
      let EditCancelReason =
        this.objEditFiledLeave.CancelReason === undefined ||
        this.objEditFiledLeave.CancelReason === null ||
        this.objEditFiledLeave.CancelReason === ""
          ? ""
          : this.objEditFiledLeave.CancelReason;

      if (
        DefaultLeaveTypeCode === EditLeaveTypeCode &&
        DefaultLeaveFrom === EditLeaveFrom &&
        DefaultLeaveTo === EditLeaveTo &&
        DefaultFiledDate === EditFiledDate &&
        DefaultIsFiled === EditIsFiled &&
        DefaultWithPay === EditWithPay &&
        DefaultIsAWOL === EditIsAWOL &&
        DefaultNoOfWorkingDays === EditNoOfWorkingDays &&
        DefaultReasonForLeave === EditReasonForLeave &&
        DefaultIsCanceled === EditIsCanceled &&
        DefaultCancelReason === EditCancelReason &&
        this.arrAttachmentsToDelete.length === 0 &&
        this.arrAttachmentsToSave.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    },

    FiledLeaveEditSave() {
      // console.log("dito", this.objEditFiledLeave);
      // this.blnEditLoadingSave = true;
      this.FiledLeaveRemoveFiles();
    },
    FiledLeaveRemoveFiles() {
      if (this.arrAttachmentsToDelete.length > 0) {
        let FileDeleteURL = `${this.api}FileDelete?ID=${this.objEditFiledLeaveDefault.LeaveOfAbsenceID}`;
        // let FileDeleteURL = `${this.api}FileDeleteTest?ID=${this.objEditFiledLeaveDefault.LeaveOfAbsenceID}`
        axios
          .post(FileDeleteURL, this.arrAttachmentsToDelete, {
            headers: { "master-api": this.header_API },
          })
          .then((res) => {
            if (res.data) {
              // console.log(res.data);
              this.FiledLeaveSaveAttachments();
            }
          });
        // let FileDeleteURL = `${this.api}FileDeleteTest?ID=${this.objEditFiledLeaveDefault.LeaveOfAbsenceID}`
        // axios.get(FileDeleteURL, {headers:{'master-api' : this.header_API}}).then(res => {
        //   console.log(res.data);
        // })
      } else {
        // console.log('res.data');
        this.FiledLeaveSaveAttachments();
      }
    },
    FiledLeaveSaveAttachments() {
      if (this.arrAttachmentsToSave.length > 0) {
        let FileList = new FormData();
        let UploadingURL = `${this.api}UploadAttachment`;
        for (
          let fileCounter = 0;
          fileCounter < this.arrAttachmentsToSave.length;
          fileCounter++
        ) {
          let File = this.arrAttachmentsToSave[fileCounter];
          FileList.append("files[]", File);
        }
        axios
          .post(UploadingURL, FileList, {
            headers: {
              "Content-Type": "multipart/form-data",
              dataType: "json",
              directoryno: this.objEditFiledLeaveDefault.LeaveOfAbsenceID,
            },
          })
          .then(() => {
            this.FiledLeaveUpdateData();
          });
      } else {
        this.FiledLeaveUpdateData();
      }
    },
    async FiledLeaveUpdateData() {
      let isHoliday = [];
      let isRestDay = [];
      await axios.get(`http://10.168.71.106:4900/sharedApi/getHoliday`).then((res) => {
        isHoliday = res.data;
      });
      await axios
        .get(
          `http://hrdapps72:5554/Employees/SharedApi/${this.objEditFiledLeaveDefault.EmployeeCode}`
        )
        .then((res) => {
          res.data.filter((data) => {
            isRestDay.push(data.RestDay);
          });
        });
      let tDays = this.objEditFiledLeave.NoOfWorkingDays;
      const Dnow = moment(this.objEditFiledLeave.LeaveTo).diff(
        moment(this.objEditFiledLeave.LeaveFrom),
        "days"
      );
      let NDays = [moment(this.objEditFiledLeave.LeaveFrom).format("YYYY-MM-DD")];

      for (let i = 0; i < Dnow; i++) {
        NDays.push(moment(NDays[i]).clone().add(1, "days").format("YYYY-MM-DD"));
      }
      for (let i = 0; i < NDays.length; i++) {
        let isSunday = moment(NDays[i]).format("ddd").toLowerCase().trim() == "sun";
        if (isSunday || isHoliday.includes(NDays[i]) || isRestDay.includes(NDays[i])) {
          // console.log(NDays[i], "--isSunday", isSunday);
          // console.log(NDays[i], "--isHoliday", isHoliday.includes(NDays[i]));
          // console.log(NDays[i], "--isRestDay", isRestDay.includes(NDays[i]));
        } else {
          /* -------------------------------------------------------------------------- */
          /*                               CHECK LOG TIME                               */
          /* -------------------------------------------------------------------------- */
          try {
            let table = `T01${moment(NDays[i]).format("MMDDYY")}`;
            console.table({
              table: table,
              emp: this.objEditFiledLeaveDefault.EmployeeCode,
            });
            let logTime = {
              SQL: `SELECT * FROM ${table} WHERE EMPLCODE	 = '${this.objEditFiledLeaveDefault.EmployeeCode}'`,
            };
            await axios
              .post(
                `http://hrd-adminweb:1500/api/hris/hrdtest`,
                { data: JSON.stringify(logTime) },
                this.hris_data_headers
              )
              .then((res) => {
                console.log("===========", res.data);
              });
          } catch (error) {
            console.error("Error:", error.message);
            console.error("Error response:", error.response.data);
          }
          /* -------------------------------------------------------------------------- */
          /*                             END CHECK LOG TIME                             */
          /* -------------------------------------------------------------------------- */

          /* -------------------------------------------------------------------------- */
          /*                                CHECK History                               */
          /* -------------------------------------------------------------------------- */
          /* -------------------------------- get data -------------------------------- */

          // console.table({
          //   EMPLCODE: this.objEditFiledLeaveDefault.EmployeeCode,
          //   STARTDATE: NDays[i],
          // });
          var resultToUpdate = null;
          let toGET = {
            SQL: `SELECT *
              FROM (
                SELECT *
                FROM HRIS.LEAVEFILE
                WHERE EMPLCODE = '${this.objEditFiledLeaveDefault.EmployeeCode}' AND STARTDATE = TO_DATE('${NDays[i]}', 'YYYY-MM-DD')
                ORDER BY SERIALNO DESC
              )
              WHERE ROWNUM = 1`,
          };
          await axios
            .post(
              `http://hrd-adminweb:1500/api/hris/hrdtest`,
              { data: JSON.stringify(toGET) },
              this.hris_data_headers
            )
            .then((res) => {
              resultToUpdate = res.data[0];
              console.log(resultToUpdate);
            });
          var delFlag = null;
          // var newLeaveID = null;
          let checkHistory = {
            SQL: `Select Max(Endpay) as dteLastPay From Payroll.HistoryPayFile Where Transfer = 1`,
          };
          await axios
            .post(
              `http://hrd-adminweb:1500/api/hris/hrdtest`,
              { data: JSON.stringify(checkHistory) },
              this.hris_data_headers
            )
            .then(async (rec) => {
              let ENDPAY = moment(rec.data[0].DTELASTPAY).format("YYYY-MM-DD");
              if (
                this.objEditFiledLeaveDefault.FiledDate > NDays[i] &&
                moment(this.objEditFiledLeaveDefault.FiledDate).format("YYYY-MM-DD") <
                  ENDPAY
              ) {
                /* ------------------------------ LATE FILLING ------------------------------ */
                delFlag = 2;
                let reason = this.objEditFiledLeaveDefault.ReasonForLeave.toLowerCase().startsWith(
                  "lf - "
                )
                  ? this.objEditFiledLeaveDefault.ReasonForLeave
                  : `LF - ${this.objEditFiledLeaveDefault.ReasonForLeave}`;

                let UpdateQuery = `UPDATE dbo.LeaveOfAbsences
                                  SET
                                  ReasonForLeave = '${reason}'
                                  WHERE LeaveOfAbsenceID = ${this.objEditFiledLeaveDefault.LeaveOfAbsenceID} `;
                let UpdateData = { Query: UpdateQuery };
                let UpdateLeaveOfAbsenceURL = `${this.api}UpdateLeaveOfAbsence`;
                await axios.post(UpdateLeaveOfAbsenceURL, UpdateData).then(() => {});
              } else {
                /* -------------------- WITHOUT HISTORY OR NOT LATE FILE -------------------- */
                delFlag = 0;
              }
            });

          /* -------------------------------------------------------------------------- */
          /*                              CHECK History END                             */
          /* -------------------------------------------------------------------------- */
          console.log("delflag", this.objEditFiledLeave);
          let toUpdate = {
            SQL: `
                  UPDATE HRIS.LEAVEFILE
                  SET DELFLAG = :DELFLAG, USERACCT = :USERACCT, USERTIME = SYSDATE, STARTDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD'), ENDDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD')
                  WHERE EMPLCODE = :EMPLCODE AND
                  STARTDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD')
                `,
            bind: [
              {
                EMPLCODE: this.objEditFiledLeaveDefault.EmployeeCode,
                DELFLAG: this.objEditFiledLeave.isCanceled === true ? 1 : delFlag,
                USERACCT: this.DecryptText(this.$store.state.loa_user),
                STARTDATE: NDays[i],
              },
            ],
          };

          let api = `http://hrd-adminweb:1500/api/hris/hrdtest/execute`;
          axios
            .post(`${api}`, { data: JSON.stringify(toUpdate) }, this.hris_data_headers)
            .then((res) => {
              console.log("res", res.data);
              console.log("toUpdate", toUpdate);
            });

          /* ---------------------------------- ADDED --------------------------------- */
          console.table({
            ShortName: this.ref.ShortName,
            EmployeeCode: this.objEditFiledLeaveDefault.EmployeeCode.toString(),
          });
          await axios
            .get(
              `http://10.169.142.40:6001/api/GetLeaveData${
                this.ref.ShortName
              }/${this.objEditFiledLeaveDefault.EmployeeCode.toString()}`
            )
            .then((record) => {
              /* -------------------------- leave details result -------------------------- */
              this.leaveDetails = record.data[0];
              console.log("record.data", record.data);
            });
          /* ------------------------ getting leave detals end ------------------------ */

          /* -- checking if the vacation leave start is equal to vacation leave USED -- */
          let sickArray = [2, 23, 14];
          if (sickArray.includes(resultToUpdate.CODELEAVE)) {
            /* ----------------------------- SICK LEAVE ----------------------------- */
            let itemData = {
              DeductedSickLeave:
                this.leaveDetails.SickLeaveUsed - (tDays > 0.5 ? 1 : 0.5),
              EmployeeCode: this.objEditFiledLeaveDefault.EmployeeCode.toString(),
            };
            await axios
              .post(
                `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                itemData
              )
              .then((retu) => {
                console.log("retu", retu.data);
              });
          } else {
            /* ----------------------------- VACATION LEAVE ----------------------------- */
            //NOTE - WITH VACATION BALANCE OF LEAVE
            let itemData = {
              DeductedVacUsed: this.leaveDetails.VacUsed - (tDays > 0.5 ? 1 : 0.5),
              EmployeeCode: this.objEditFiledLeaveDefault.EmployeeCode.toString(),
            };
            await axios
              .post(
                `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                itemData
              )
              .then((retu) => {
                console.log("retu", retu.data);
                // console.log("if------------", result.data);
              });
          }
          /* -- checking if the vacation leave start is equal to vacation leave USED END -- */
          /* -------------------------------- ADDED END ------------------------------- */

          tDays = tDays - 1;
        }
      } //end loop

      let objToSave = {
        LeaveTypeCode: this.objEditFiledLeave.LeaveTypeCode.trim(),
        LeaveFrom: moment(new Date(this.objEditFiledLeave.LeaveFrom)).format(
          "YYYY/MM/DD"
        ),
        LeaveTo: moment(new Date(this.objEditFiledLeave.LeaveTo)).format("YYYY/MM/DD"),
        FiledDate: moment(new Date(this.objEditFiledLeave.FiledDate)).format(
          "YYYY/MM/DD"
        ),
        NoOfWorkingDays: this.objEditFiledLeave.NoOfWorkingDays,
        isFiled: this.objEditFiledLeave.isFiled === true ? 1 : 0,
        isWithPay: this.objEditFiledLeave.isWithPay === true ? 1 : 0,
        isAWOL: this.objEditFiledLeave.isAWOL === true ? 1 : 0,
        Reason: this.objEditFiledLeave.Reason.trim(),
        isCanceled: this.objEditFiledLeave.isCanceled === true ? 1 : 0,
        CancelReason:
          this.objEditFiledLeave.CancelReason === undefined ||
          this.objEditFiledLeave.CancelReason === null ||
          this.objEditFiledLeave.CancelReason === ""
            ? null
            : this.objEditFiledLeave.CancelReason.trim(),
      };
      console.log("ds", objToSave);
      let holdID = await checkLeaveID(objToSave.LeaveTypeCode.trim());
      let UpdateQuery = `UPDATE dbo.LeaveOfAbsences
                                  SET LeaveTypeCode = '${objToSave.LeaveTypeCode.trim()}',
                                  LeaveFrom = '${objToSave.LeaveFrom}',
                                  LeaveID = '${holdID}',
                                  LeaveTo = '${objToSave.LeaveTo}',
                                  FiledDate = '${objToSave.FiledDate}',
                                  NoOfWorkingDays = ${objToSave.NoOfWorkingDays},
                                  isFiled = ${objToSave.isFiled},
                                  WithPay = ${objToSave.isWithPay},
                                  isAWOL = ${objToSave.isAWOL},
                                  ReasonForLeave = '${objToSave.Reason.trim()}',
                                  isCanceled = ${objToSave.isCanceled},
                                  ${
                                    objToSave.CancelReason === undefined ||
                                    objToSave.CancelReason === null ||
                                    objToSave.CancelReason === ""
                                      ? "CancelReason = NULL"
                                      : `CancelReason = '${objToSave.CancelReason.trim()}'`
                                  },
                                  UpdatedDate = GETDATE(),
                                  UpdatedBy = '${this.objUserInformation.EmployeeCode}'
                            WHERE LeaveOfAbsenceID = ${
                              this.objEditFiledLeave.LeaveOfAbsenceID
                            }`;
      let UpdateData = { Query: UpdateQuery };
      // console.log("ds", UpdateData);
      let UpdateLeaveOfAbsenceURL = `${this.api}UpdateLeaveOfAbsence`;
      axios.post(UpdateLeaveOfAbsenceURL, UpdateData).then(() => {
        this.$notification.success({
          style: "background-color:#7FDBFF;",
          icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
          message: (
            <b class="disable-select" style="color:black;">
              {" "}
              Employees' Leave of Absence{" "}
            </b>
          ),
          description: (
            <div class="disable-select NotificationDescription">
              {" "}
              Leave has been updated.{" "}
            </div>
          ),
        });
        this.strSelectedLeaveID = "";
        this.intEditLeaveTypeError = 0;
        this.intEditLeaveFromError = 0;
        this.intEditLeaveToError = 0;
        this.intEditFiledDateError = 0;
        this.intEditNoOfWorkingDaysError = 0;
        this.intEditReasonError = 0;
        this.blnIsEdit = false;
        this.blnIsCanceled = false;
        this.blnIsVisiblePopConfirm = false;
        this.blnIsNotModified = false;
        this.blnEditLoadingSave = false;
        this.blnViewFiledLeave = false;
        this.objEditFiledLeaveDefault = {};
        this.objEditFiledLeave = {};

        this.$socket.emit("RequestUsersLeaveTable");
        this.$socket.emit("RequestForApprovalCount");
        this.$socket.emit("RequestAdminListCount");
        this.$socket.emit("RequestAdminListTable");
        this.$socket.emit("RequestLeadersForApprovalTable");
        this.$socket.emit("RequestLeadersForApprovalEmployeeTable");
      });
    },
    ClickDisapprove(Data) {
      let opened = this.arrLeaves.find((rec) => {
        return rec.DisapprovePopOverVisible === true;
      });
      let openedIndex = this.arrLeaves.indexOf(opened);
      if (openedIndex !== -1)
        this.arrLeaves[openedIndex].DisapprovePopOverVisible = false;

      let close = this.arrLeaves.find((rec) => {
        return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
      });
      let closeIndex = this.arrLeaves.indexOf(close);
      this.arrLeaves[closeIndex].DisapprovePopOverVisible = true;

      this.strDisapprovalReason = "";
      this.intDisapproveError = 0;
    },
    ClickCloseDisapprove(Data) {
      let opened = this.arrLeaves.find((rec) => {
        return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
      });
      let openedIndex = this.arrLeaves.indexOf(opened);
      this.arrLeaves[openedIndex].DisapprovePopOverVisible = false;

      this.strDisapprovalReason = "";
      this.intDisapproveError = 0;
    },
    ClickOptions(item, Action, DisapprovalReason) {
      this.intDisapproveError = 0;
      if (!this.isAdmin) alert("User is not ADMIN!");
      else {
        if (Action === "Approve") {
          this.OptionApprove(item);
        } else if (Action === "Disapprove") {
          this.OptionDisapprove(item.LeaveOfAbsenceID, DisapprovalReason);
        }
      }
    },
    OptionApprove(item) {
      // naka connect sa ORACLE, MS ACCESS AT PAYROL HISTORY , at LOGTIME UPDATE i think

      this.updateLeaveFileInHRIS(item);
      // this.UpdateQueryInMyDatabaseLOA(item);

      // this.ForUpdatingLeave(item);

      // this.checkHistory(item)
      // this.checkHistoryfile(item)
    },
    async updateLeaveFileInHRIS(item) {
      // GOODS
      // console.log("oracle", item);

      let toGET = {
        SQL: `
          SELECT max(SERIALNO) AS MAXLEAVE FROM HRIS.LEAVEFILE
          `,
      };
      let max = 0;
      await axios
        .post(
          `http://hrd-adminweb:1500/api/hris/hrdtest`,
          { data: JSON.stringify(toGET) },
          this.hris_data_headers
        )
        .then((res) => {
          max = res.data[0].MAXLEAVE + 1;
        });
      let isHoliday = [];
      let isRestDay = [];
      await axios.get(`http://10.168.71.106:4900/sharedApi/getHoliday`).then((res) => {
        isHoliday = res.data;
      });
      await axios
        .get(`http://hrdapps72:5554/Employees/SharedApi/${item.EmployeeCode}`)
        .then((res) => {
          res.data.filter((data) => {
            isRestDay.push(data.RestDay);
          });
        });
      let tDays = item.NoOfWorkingDays;
      const Dnow = moment(item.LeaveTo).diff(moment(item.LeaveFrom), "days");
      let NDays = [moment(item.LeaveFrom).format("YYYY-MM-DD")];

      for (let i = 0; i < Dnow; i++) {
        NDays.push(moment(NDays[i]).clone().add(1, "days").format("YYYY-MM-DD"));
      }
      for (let i = 0; i < NDays.length; i++) {
        let isSunday = moment(NDays[i]).format("ddd").toLowerCase().trim() == "sun";
        if (isSunday || isHoliday.includes(NDays[i]) || isRestDay.includes(NDays[i])) {
          // console.log(NDays[i], isSunday);
          // console.log(NDays[i], isHoliday.includes(NDays[i]));
          // console.log(NDays[i], isRestDay.includes(NDays[i]));
        } else {
          /* -------------------------------------------------------------------------- */
          /*                               CHECK LOG TIME                               */
          /* -------------------------------------------------------------------------- */
          // let testing = true;
          // if (testing) {
          let checker = null;
          let table = `T01${moment(NDays[i]).format("MMDDYY")}`;
          let checkExistingTable = {
            SQL: `SELECT COUNT(*) as CN FROM all_tables WHERE table_name = '${table}'`,
          };
          await axios
            .post(
              `http://hrd-adminweb:1500/api/hris/hrdtest`,
              { data: JSON.stringify(checkExistingTable) },
              this.hris_data_headers
            )
            .then((res) => {
              checker = res.data[0].CN;
            });
          if (checker > 0) {
            console.log("ITEM", item);

            // let toUpdate = {
            //   SQL: `
            //       UPDATE HRIS.LEAVEFILE
            //       SET DELFLAG = :DELFLAG, USERACCT = :USERACCT, USERTIME = SYSDATE, STARTDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD'), ENDDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD')
            //       WHERE EMPLCODE = :EMPLCODE AND
            //       STARTDATE = TO_DATE(:STARTDATE,'YYYY-MM-DD')
            //     `,
            //   bind: [
            //     {
            //       EMPLCODE: this.objEditFiledLeaveDefault.EmployeeCode,
            //       DELFLAG: this.objEditFiledLeave.isCanceled === true ? 1 : delFlag,
            //       USERACCT: this.DecryptText(this.$store.state.loa_user),
            //       STARTDATE: NDays[i],
            //     },
            //   ],
            // };

            // let api = `http://hrd-adminweb:1500/api/hris/hrdtest/execute`;
            // axios
            //   .post(`${api}`, { data: JSON.stringify(toUpdate) }, this.hris_data_headers)
            //   .then((res) => {
            //     console.log("res", res.data);
            //     console.log("toUpdate", toUpdate);
            //   });
            // let test = true;
            // if (test) {
            let logTime = {
              // SQL: `SELECT * FROM LOGTIME.${table} WHERE EMPLCODE = '${item.EmployeeCode}'`,
              // SQL: `UPDATE LOGTIME.${table} SET LEAVE = '${item.LeaveID.toString()}' WHERE EMPLCODE = '${item.EmployeeCode}';`,
              SQL: `
                  UPDATE LOGTIME.T01080323
                  SET LEAVE = :LEAVE
                  WHERE EMPLCODE = :EMPLCODE
                `,
              bind: [
                {
                  EMPLCODE: item.EmployeeCode,
                  LEAVE: item.LeaveID.toString(),
                },
              ],
            };
            await axios
              .post(
                `http://hrd-adminweb:1500/api/hris/hrdtest/execute`,
                { data: JSON.stringify(logTime) },
                this.hris_data_headers
              )
              .then((res) => {
                console.log("query", logTime);
                console.log("===========", res.data);
              });
            // }

            // return 0;
          }
          /* -------------------------------------------------------------------------- */
          /*                             END CHECK LOG TIME                             */
          /* -------------------------------------------------------------------------- */

          // try {
          /* -------------------------------------------------------------------------- */
          /*                                CHECK History                               */
          /* -------------------------------------------------------------------------- */
          // while (start.isSameOrBefore(end, "day")) {
          //   range.push(start.format("YYYY-MM-DD"));
          //   start.add(1, "day");
          // }
          var delFlag = null;
          var newLeaveID = null;
          let checkHistory = {
            // SQL: `SELECT * FROM Payroll.HISTORYPAYFILE WHERE TRANSFER = 0`,
            //   SQL: `
            //       SELECT *
            //       FROM (
            //         SELECT *
            //         FROM Payroll.HistoryPayFile
            //         WHERE
            //         ORDER BY STARTPAY DESC
            //       )
            //       WHERE ROWNUM = 1`,
            // };
            SQL: `Select Max(Endpay) as dteLastPay From Payroll.HistoryPayFile Where Transfer = 1`,
          };
          await axios
            .post(
              `http://hrd-adminweb:1500/api/hris/hrdtest`,
              { data: JSON.stringify(checkHistory) },
              this.hris_data_headers
            )
            .then(async (rec) => {
              let ENDPAY = moment(rec.data[0].DTELASTPAY).format("YYYY-MM-DD");
              // console.table({
              //   first: item.FiledDate > NDays[i],
              //   second: moment(item.FiledDate).format("YYYY-MM-DD") > ENDPAY,
              //   endpay: ENDPAY,
              //   filledDate: moment(item.FiledDate).format("YYYY-MM-DD"),
              // });
              if (
                item.FiledDate > NDays[i] &&
                moment(item.FiledDate).format("YYYY-MM-DD") < ENDPAY
              ) {
                console.log("DITO,IF", item);

                /* ------------------------------ LATE FILLING ------------------------------ */
                delFlag = 2;
                let reason = item.ReasonForLeave.toLowerCase().startsWith("lf - ")
                  ? item.ReasonForLeave
                  : `LF - ${item.ReasonForLeave}`;
                let UpdateQuery = `UPDATE dbo.LeaveOfAbsences
                                  SET
                                  ReasonForLeave = '${reason}'
                                  WHERE LeaveOfAbsenceID = ${item.LeaveOfAbsenceID} `;
                let UpdateData = { Query: UpdateQuery };
                let UpdateLeaveOfAbsenceURL = `${this.api}UpdateLeaveOfAbsence`;
                await axios.post(UpdateLeaveOfAbsenceURL, UpdateData).then(() => {});
              } else {
                /* -------------------- WITHOUT HISTORY OR NOT LATE FILE -------------------- */
                delFlag = 0;
              }
              // console.log("rec", moment(rec.data[0].ENDPAY).format("YYYY-MM-DD"));
              // let STARTPAY = moment(rec.data[0].STARTPAY).format("YYYY-MM-DD");
              // let ENDPAY = moment(rec.data[0].ENDPAY).format("YYYY-MM-DD");

              // let endDay = moment(ENDPAY).diff(moment(STARTPAY), "days");

              // let cutOffArr = [STARTPAY];

              // for (let i = 0; i < endDay; i++) {
              //   cutOffArr.push(
              //     moment(cutOffArr[i]).clone().add(1, "days").format("YYYY-MM-DD")
              //   );
              // }

              // if (cutOffArr.includes(NDays[i])) {
              //   // merong history
              // }
              // console.log("cut-----", cutOffArr);
            });

          /* -------------------------------------------------------------------------- */
          /*                              CHECK History END                             */
          /* -------------------------------------------------------------------------- */

          /* -------------------------- getting leave detals -------------------------- */
          await axios
            .get(
              `http://10.169.142.40:6001/api/GetLeaveData${
                this.ref.ShortName
              }/${item.EmployeeCode.toString()}`
            )
            .then((record) => {
              /* -------------------------- leave details result -------------------------- */
              this.leaveDetails = record.data[0];

              // console.log("rec", record.data[0]);
            });
          /* ------------------------ getting leave detals end ------------------------ */

          /* -- checking if the vacation leave start is equal to vacation leave USED -- */
          // console.table({
          //   leave: this.leaveDetails.VacUsed,
          //   first: this.leaveDetails.VacBegin > this.leaveDetails.VacUsed,
          //   // second: this.leaveDetails.VacBegin > this.leaveDetails.VacUsed,
          // });
          // console.log(this.leaveDetails.VacBegin === this.leaveDetails.VacUsed);
          // console.log(this.leaveDetails.VacBegin > this.leaveDetails.VacUsed);
          // var a = this.leaveDetails.VacUsed + 1;
          let sickArray = [2, 23, 14];
          if (sickArray.includes(item.LeaveID)) {
            /* ----------------------------- SICK LEAVE ----------------------------- */
            if (this.leaveDetails.SickLeaveBeg > this.leaveDetails.SickLeaveUsed) {
              newLeaveID = +item.LeaveID;
              let itemData = {
                DeductedSickLeave:
                  this.leaveDetails.SickLeaveUsed + (tDays > 0.5 ? 1 : 0.5),
                EmployeeCode: item.EmployeeCode.toString(),
              };
              await axios
                .post(
                  `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                  itemData
                )
                .then(() => {});
            } else {
              if (this.leaveDetails.VacBegin > this.leaveDetails.VacUsed) {
                newLeaveID = 1;
                let itemData = {
                  DeductedVacUsed: this.leaveDetails.VacUsed + (tDays > 0.5 ? 1 : 0.5),
                  EmployeeCode: item.EmployeeCode.toString(),
                };
                await axios
                  .post(
                    `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                    itemData
                  )
                  .then(() => {});
              }
            }
          } else {
            /* ----------------------------- VACATION LEAVE ----------------------------- */
            if (this.leaveDetails.VacBegin > this.leaveDetails.VacUsed) {
              newLeaveID = +item.LeaveID;
              //NOTE - WITH VACATION BALANCE OF LEAVE
              let itemData = {
                DeductedVacUsed: this.leaveDetails.VacUsed + (tDays > 0.5 ? 1 : 0.5),
                EmployeeCode: item.EmployeeCode.toString(),
              };
              // console.log("type", itemData);
              // console.log("ref", this.ref.ShortName);
              await axios
                .post(
                  `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                  itemData
                )
                .then(() => {
                  // console.log("if------------", result.data);
                });
            } else {
              if (this.leaveDetails.SickLeaveBeg > this.leaveDetails.SickLeaveUsed) {
                newLeaveID = 2;
                let itemData = {
                  DeductedSickLeave:
                    this.leaveDetails.SickLeaveUsed + (tDays > 0.5 ? 1 : 0.5),
                  EmployeeCode: item.EmployeeCode.toString(),
                };
                await axios
                  .post(
                    `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                    itemData
                  )
                  .then(() => {
                    // console.log("else------------", result);
                  });
              }
            }
          }
          /* -- checking if the vacation leave start is equal to vacation leave USED END -- */

          let toInsert = {
            SQL: `
                INSERT INTO HRIS.LEAVEFILE (SERIALNO, EMPLCODE, CODELEAVE, STARTDATE, ENDDATE, NODAYS, REMARKS, FLAG, DELFLAG, USERACCT, USERTIME, HALFDAY)
                VALUES (:SERIALNO, :EMPLCODE, :CODELEAVE, TO_DATE(:STARTDATE,'YYYY-MM-DD'), TO_DATE(:STARTDATE,'YYYY-MM-DD'), :NODAYS, :REMARKS, :FLAG, :DELFLAG, :USERACCT, SYSDATE, :HALFDAY)
                `,
            bind: [
              {
                SERIALNO: max,
                EMPLCODE: item.EmployeeCode.toString(),
                // CODELEAVE: +item.LeaveID,
                CODELEAVE:
                  this.leaveDetails.SickLeaveBeg > this.leaveDetails.SickLeaveUsed ||
                  this.leaveDetails.VacBegin > this.leaveDetails.VacUsed
                    ? newLeaveID
                    : 9,
                STARTDATE: NDays[i],
                NODAYS: +tDays > 0.5 ? 1 : 0,
                REMARKS: item.ReasonForLeave,
                FLAG: 0,
                DELFLAG: delFlag,
                USERACCT: this.DecryptText(this.$store.state.loa_user),
                HALFDAY: +tDays == 0.5 ? 0.5 : 1,
              },
            ],
          };

          let api = `http://hrd-adminweb:1500/api/hris/hrdtest/execute`;
          axios
            .post(`${api}`, { data: JSON.stringify(toInsert) }, this.hris_data_headers)
            .then(() => {
              toInsert.bind[0];
            });
          // console.log("asdffs", toInsert);
          // console.log('yun', checkHistory)
          max = max + 1;
          tDays = tDays - 1;
        }
      } //end loop
    },
    UpdateQueryInMyDatabaseLOA(item) {
      // GOODS
      console.log("database", item);
      let UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                    SET AdminEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                        isAdminApproved = 1,
                        AdminAssessedDate = GETDATE(),
                        UpdatedDate = GETDATE(),
                        UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                  WHERE LeaveOfAbsenceID = ${item.LeaveOfAbsenceID}`;
      let UpdateData = { Query: UpdateQuery };
      let ApproveDisapproveLeaveOfAbsenceURL = `${this.api}ApproveDisapproveLeaveOfAbsence`;
      axios.post(ApproveDisapproveLeaveOfAbsenceURL, UpdateData).then(() => {
        this.$notification.success({
          style: "background-color:#7FDBFF;",
          icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
          message: (
            <b class="disable-select" style="color:black;">
              {" "}
              Employees' Leave of Absence{" "}
            </b>
          ),
          description: (
            <div class="disable-select NotificationDescription">
              {" "}
              Leave has been approved.{" "}
            </div>
          ),
          duration: 10,
        });

        this.$socket.emit("RequestUsersLeaveTable");
        this.$socket.emit("RequestForApprovalCount");
        this.$socket.emit("RequestAdminListCount");
        this.$socket.emit("RequestAdminListTable");
        this.$socket.emit("RequestLeadersForApprovalTable");
        this.$socket.emit("RequestLeadersForApprovalEmployeeTable");
      });
    },
    ForUpdatingLeave(item) {
      // NOT YET OKAY
      console.log("leavew/opay", item);
      // axios.get(`http://10.169.142.40:6001/api/GetLeaveData${this.ref.ShortName}/${item.EmployeeCode.toString()}`).then((res)=>{
      //   let leavedata = res.data[0]
      //   console.log('leavedata',leavedata)
      //   let DeductedVacUsed = leavedata.VacUsed + item.NoOfWorkingDays
      //   console.log('deducted',DeductedVacUsed)
      //   let itemData = {
      //     VacationBegin : leavedata.VacBegin,
      //     VacationUsed : leavedata.VacUsed,
      //     DeductedVacUsed : DeductedVacUsed.toString(),
      //     EmployeeCode :  item.EmployeeCode
      //   }
      //   console.log('toUpdate', itemData)
      //   axios.post(`http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,itemData).then(res=>{
      //     console.log(res)
      //   })
      //   let DeductedSickLeaveUsed = item.NoOfWorkingDays + leavedata.SickLeaveUsed
      //   console.log('deduct',DeductedSickLeaveUsed)
      //   let IData = {
      //     SickLeaveBeg : leavedata.SickLeaveBeg,
      //     SickLeaveUsed : leavedata.SickLeaveUsed,
      //     DeductedSickLeaveUsed : DeductedSickLeaveUsed.toString(),
      //     EmployeeCode : item.EmployeeCode.toString(),
      //   }
      //   console.log('gena', IData)
      //   axios.post(`http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,IData).then(res=>{
      //     console.log(res)
      //   })
      // })

      axios
        .get(
          `http://10.169.142.40:6001/api/GetLeaveData${
            this.ref.ShortName
          }/${item.EmployeeCode.toString()}`
        )
        .then((res) => {
          // console.log('pangkalahatan',item)
          // console.log(`response`,res.data)
          console.log("------------------", res.data);

          let leavedata = res.data[0];

          if (leavedata.VacBegin !== 0) {
            //may credit leave
            if (leavedata.VacBegin !== leavedata.VacUsed) {
              /* --------------------------- HINDI PA NAGAGAMIT --------------------------- */

              //may laman pa ang credit leave
              let itemData = {
                DeductedVacUsed: leavedata.VacUsed + item.NoOfWorkingDays,
                EmployeeCode: item.EmployeeCode.toString(),
              };
              console.log("final?", itemData);
              axios
                .post(
                  `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                  itemData
                )
                .then((result) => {
                  console.log("laman", result);
                });
              console.log("tomany", leavedata);
            } else {
              //ubos na ang laman ng vacation leave
              if (item.NoOfWorkingDays <= res.data[0].VacBegin) {
                let itemData = {
                  SickLeaveUsed: leavedata.SickLeaveUsed + item.NoOfWorkingDays,
                  EmployeeCode: item.EmployeeCode.toString(),
                };
                // console.log('deduct', DeductedSickLeave)
                console.log("else", itemData);
                axios
                  .post(
                    `http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`,
                    itemData
                  )
                  .then((rec) => {
                    console.log("output", rec);
                  });
              }

              // console.log('leavedata',leavedata)
              // console.log('Leave is exceed by ' + (leavedata.SickLeaveUsed + item.NoOfWorkingDays)  + 'days');
              // item.NoOfWorkingDays + leavedata.SickLeaveUsed - leavedata.VacUsed
              // // let itemData = {
              //   SickLeaveBeg : leavedata.SickLeaveBeg,
              //   SickLeaveUsed : leavedata.SickLeaveUsed,
              //   DeductedSickLeave : DeductedSickLeave.toString(),
              //   EmployeeCode :  item.EmployeeCode.toString()
              // }
              // console.log('deduct', DeductedSickLeave)
              // console.log('else', itemData)
              // axios.post(`http://10.169.142.40:6001/api/UpdateLeaveData${this.ref.ShortName}`, itemData).then(res => {
              //   console.log('output',res);
              // });
            }
          }
          //--------------------------
          // else { // walang credit leave
          //   res.data[0].VacBegin == 0
          //   console.log('No balance credits')
          //   axios.post(`http://10.169.142.40:6001/api/UpdateWithoutPayLeave${this.ref.ShortName}`, ).then((res) => {
          //         console.log('output',res);
          //   })
          // }
        });
    },
    async checkHistoryfile(item) {
      // NOT YET OKAY
      console.log("record", item);

      // const Dfrom = moment(new Date()); // Assuming the current date is today
      // const cutOffDate = new Date(YYYY, MM, DD); // Replace YYYY, MM, and DD with the cut off date

      // let tDays = item.NoOfWorkingDays;
      // const Dnow = moment(item.LeaveTo).diff(moment(item.LeaveFrom), "days");
      // let NDays = [moment(item.LeaveFrom).format("YYYY-MM-DD")];
      // let cutoff = []
      // let checkHistory = {
      //   SQL: `
      //   Select Max(Endpay) as dteLastPay From Payroll.HistoryPayFile " & _
      //         "Where Transfer = 1`,
      // };
      // await axios.post(`http://hrd-adminweb:1500/api/hris/hrdtest`,{data: JSON.stringify(checkHistory)},
      //     this.hris_data_headers)
      //   .then((res) => {
      //   console.log('tamaba?', res)
      // });
      // console.log('record2', checkHistory)
    },
    OptionDisapprove(ID, DisapprovalReason) {
      if (
        DisapprovalReason === undefined ||
        DisapprovalReason === null ||
        DisapprovalReason === ""
      ) {
        this.intDisapproveError = 1;
      } else {
        let UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                            SET AdminEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                                isAdminApproved = 2,
                                AdminAssessedDate = GETDATE(),
                                AdminDisApprovalReason = '${DisapprovalReason}',
                                UpdatedDate = GETDATE(),
                                UpdatedUserID ='${this.objUserInformation.EmployeeCode}'
                          WHERE LeaveOfAbsenceID = ${ID}`;
        let UpdateData = { Query: UpdateQuery };
        let ApproveDisapproveLeaveOfAbsenceURL = `${this.api}ApproveDisapproveLeaveOfAbsence`;
        axios.post(ApproveDisapproveLeaveOfAbsenceURL, UpdateData).then(() => {
          // console.log(res)
          this.$notification.success({
            style: "background-color:#7FDBFF;",
            icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
            message: (
              <b class="disable-select" style="color:black;">
                {" "}
                Employees' Leave of Absence{" "}
              </b>
            ),
            description: (
              <div class="disable-select NotificationDescription">
                {" "}
                Leave has been disapproved.{" "}
              </div>
            ),
            duration: 10,
          });
          this.$socket.emit("RequestUsersLeaveTable");
          this.$socket.emit("RequestForApprovalCount");
          this.$socket.emit("RequestAdminListCount");
          this.$socket.emit("RequestAdminListTable");
          this.$socket.emit("RequestLeadersForApprovalTable");
          this.$socket.emit("RequestLeadersForApprovalEmployeeTable");
        });
      }
    },

    ClickCloseTable() {
      this.$emit("ClickCloseTable", false);
    },
    ClickFiledLeaveClose() {
      // dagdag ko
      this.strSelectedLeaveID = "";
      this.intEditLeaveTypeError = 0;
      this.intEditLeaveFromError = 0;
      this.intEditLeaveToError = 0;
      this.intEditFiledDateError = 0;
      this.intEditNoOfWorkingDaysError = 0;
      this.intEditReasonError = 0;
      this.blnIsEdit = false;
      this.blnIsCanceled = false;
      this.blnIsVisiblePopConfirm = false;
      this.blnIsNotModified = false;
      this.objEditFiledLeaveDefault = {};
      this.objEditFiledLeave = {};
      this.blnViewFiledLeave = false;
    },
    FiledLeaveFileUpload() {
      let Attachments = this.$refs.filedleavefile.files;

      Attachments.forEach((File) => {
        let isExist = false;

        this.arrAttachmentsView.forEach((ViewFile) => {
          if (File.name.toUpperCase() === ViewFile.fileName.toUpperCase()) {
            isExist = true;
          }
        });

        if (isExist === false) {
          this.blnIsNotModified = false;
          this.arrAttachmentsToSave.push(File);
          this.arrAttachmentsView.push({ Status: "New", fileName: File.name });
        } else {
          this.$notification.success({
            style: "background-color:#7FDBFF;",
            icon: <a-avatar src="Leave of Absence Icon.png"></a-avatar>,
            message: (
              <b class="disable-select" style="color:black;">
                {" "}
                Employees' Leave of Absence{" "}
              </b>
            ),
            description: (
              <div class="disable-select NotificationDescription">
                {" "}
                A file with the name <div style="font-size:16px;"> {File.name} </div> is
                already in the list for uploading.{" "}
              </div>
            ),
            duration: 10,
          });
        }
      });
    },
    ClickFiledLeaveDownloadFile(ID, file) {
      // dagdag ko
      // let path = `http://hv12-hrd41:3001/ftp/FileServer/LOAAttachments/LOA_${ID}/${file.fileName}`
      let path = `LOA_ATTACHMENTS/LOA_${ID}/${file.fileName}`;
      let fileName = file.fileName;
      const link = document.createElement("a");
      link.href = path;
      link.setAttribute("download", `${fileName}`);
      document.body.appendChild(link);
      link.click();

      // let fileName = file.fileName

      // const response = axios.get(path, { responseType: "blob" })
      // const blob = new Blob([response.data], { type: "application/pdf" })
      // const link = document.createElement("a")
      // link.href = URL.createObjectURL(blob)
      // link.download = fileName
      // link.click()
      // URL.revokeObjectURL(link.href)
    },
    ClickFiledLeaveRemoveFile(file) {
      this.blnIsNotModified = false;
      if (file.Status === "New") {
        let indexView = this.arrAttachmentsView.indexOf(file);
        this.arrAttachmentsView.splice(indexView, 1);

        let fileNames = this.arrAttachmentsToSave.map((File) => {
          return File.name;
        });
        let indexToSave = fileNames.indexOf(file.fileName);
        this.arrAttachmentsToSave.splice(indexToSave, 1);
      } else if (file.Status === "View") {
        let index = this.arrAttachmentsView.indexOf(file);
        this.arrAttachmentsView.splice(index, 1);
        this.arrAttachmentsToDelete.push(file);
      }
    },
    ClickFiledLeaveAttachFile() {
      // dagdag ko
      this.$refs.filedleavefile.value = null;
      this.$refs.filedleavefile.click();
    },
    ChangeEditLeaveType() {
      this.intEditLeaveTypeError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditCancel() {
      this.blnIsNotModified = false;
    },
    ChangeEditCancelReason() {
      this.blnIsNotModified = false;
    },
    ChangeEditLeaveFrom() {
      this.objEditFiledLeave.NoOfWorkingDays =
        this.editWorkingDays == 0 ? this.editWorkingDays + 1 : this.editWorkingDays;
      this.intEditLeaveFromError = 0;
      if (this.intEditLeaveToError === 2) {
        this.intEditLeaveToError = 0;
      }
      this.blnIsNotModified = false;
    },
    ChangeEditLeaveTo() {
      this.objEditFiledLeave.NoOfWorkingDays =
        this.editWorkingDays == 0 ? this.editWorkingDays + 1 : this.editWorkingDays;
      if (this.intEditLeaveFromError === 2) {
        this.intEditLeaveFromError = 0;
      }
      this.intEditLeaveToError = 0;
      this.blnIsNotModified = false;
    },
    // ============================================================= //
    // ======================= Other Events ======================== //
    // ============================================================= //
    ClearVariables() {
      // this.strDepartmentCode = undefined // dagdag ko
      this.strSectionCode = undefined;
      this.strTeamCode = undefined;
      this.strLeaveType = undefined;
      this.strFiled = "ALL";
      this.strWithPay = "ALL";
      this.strSearch = undefined;
    }, // dagdag ko pababa
    TableRecommendingApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL,
      isEmployeeFiltered
    ) {
      let backgroundColor =
        isApproverApproved !== 0
          ? ""
          : isAdminApproved !== 0
          ? ""
          : isRecommendingApproved === 2
          ? "#130df2"
          : isRecommendingApproved === 0
          ? "#0eac43"
          : "";
      backgroundColor = isAWOL === 1 ? "" : backgroundColor;
      backgroundColor =
        isEmployeeFiltered === 1 &&
        isRecommendingApproved === 0 &&
        this.strPosition === "TH"
          ? ""
          : backgroundColor;
      return backgroundColor;
    },
    TableApproverApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL,
      isEmployeeFiltered
    ) {
      let backgroundColor =
        isAdminApproved !== 0
          ? ""
          : isRecommendingApproved === 2
          ? ""
          : isApproverApproved === 2
          ? "#130df2"
          : isApproverApproved === 0
          ? "#0eac43"
          : "";
      backgroundColor = isAWOL === 1 ? "" : backgroundColor;
      backgroundColor =
        isEmployeeFiltered === 1 &&
        isApproverApproved === 0 &&
        (this.strPosition === "SH" ||
          (this.strPosition === "DH" && this.objEmployeeInformation.Position === "SH"))
          ? ""
          : backgroundColor;
      return backgroundColor;
    },
    TableAdminApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL
    ) {
      let backgroundColor =
        isRecommendingApproved === 2
          ? ""
          : isApproverApproved === 2
          ? ""
          : isAdminApproved === 2
          ? "#130df2"
          : isAdminApproved === 0
          ? "#0eac43"
          : "";
      backgroundColor = isAWOL === 1 ? "" : backgroundColor;
      return backgroundColor;
    },
    // ====================================== VIEW
    ViewRecommendingApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL
    ) {
      let status =
        isRecommendingApproved === 0 && isApproverApproved !== 0
          ? ""
          : isRecommendingApproved === 0 && isAdminApproved !== 0
          ? ""
          : isRecommendingApproved === 2
          ? "DISAPPROVED"
          : isRecommendingApproved === 1
          ? "APPROVED"
          : "FOR APPROVAL";
      status = isAWOL === 1 ? "" : status;
      return status;
    },
    ViewApproverApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL
    ) {
      let status =
        isApproverApproved === 0 && isAdminApproved !== 0
          ? ""
          : isRecommendingApproved === 2
          ? ""
          : isApproverApproved === 2
          ? "DISAPPROVED"
          : isApproverApproved === 1
          ? "APPROVED"
          : "FOR APPROVAL";
      status = isAWOL === 1 ? "" : status;
      return status;
    },
    ViewAdminApproved(
      isRecommendingApproved,
      isApproverApproved,
      isAdminApproved,
      isAWOL
    ) {
      let status =
        isRecommendingApproved === 2
          ? ""
          : isApproverApproved === 2
          ? ""
          : isAdminApproved === 2
          ? "DISAPPROVED"
          : isAdminApproved === 1
          ? "APPROVED"
          : "FOR APPROVAL";
      status = isAWOL === 1 ? "" : status;
      return status;
    },
    FileIcon(FileName) {
      let filename = FileName.toLowerCase().split(".");
      let fileExtensionObjectCount = 0;
      for (let x = 0; x < filename.length; x++) {
        fileExtensionObjectCount = x;
      }

      if (
        filename[fileExtensionObjectCount] === "7z" ||
        filename[fileExtensionObjectCount] === "arj" ||
        filename[fileExtensionObjectCount] === "deb" ||
        filename[fileExtensionObjectCount] === "pkg" ||
        filename[fileExtensionObjectCount] === "rar" ||
        filename[fileExtensionObjectCount] === "rpm" ||
        filename[fileExtensionObjectCount] === "tar" ||
        filename[fileExtensionObjectCount] === "z" ||
        filename[fileExtensionObjectCount] === "zip"
      ) {
        return "mdi-folder-zip";
      } else if (
        filename[fileExtensionObjectCount] === "email" ||
        filename[fileExtensionObjectCount] === "eml" ||
        filename[fileExtensionObjectCount] === "emlx" ||
        filename[fileExtensionObjectCount] === "msg" ||
        filename[fileExtensionObjectCount] === "oft" ||
        filename[fileExtensionObjectCount] === "ost" ||
        filename[fileExtensionObjectCount] === "pst" ||
        filename[fileExtensionObjectCount] === "vcf"
      ) {
        return "mdi-email";
      } else if (
        filename[fileExtensionObjectCount] === "ai" ||
        filename[fileExtensionObjectCount] === "bmp" ||
        filename[fileExtensionObjectCount] === "gif" ||
        filename[fileExtensionObjectCount] === "ico" ||
        filename[fileExtensionObjectCount] === "jpeg" ||
        filename[fileExtensionObjectCount] === "jpg" ||
        filename[fileExtensionObjectCount] === "png" ||
        filename[fileExtensionObjectCount] === "ps" ||
        filename[fileExtensionObjectCount] === "psd" ||
        filename[fileExtensionObjectCount] === "svg" ||
        filename[fileExtensionObjectCount] === "tif" ||
        filename[fileExtensionObjectCount] === "tiff"
      ) {
        return "mdi-image";
      } else if (
        filename[fileExtensionObjectCount] === "ods" ||
        filename[fileExtensionObjectCount] === "xls" ||
        filename[fileExtensionObjectCount] === "xlsm" ||
        filename[fileExtensionObjectCount] === "xlsx"
      ) {
        return "mdi-file-excel";
      } else if (
        filename[fileExtensionObjectCount] === "doc" ||
        filename[fileExtensionObjectCount] === "docx" ||
        filename[fileExtensionObjectCount] === "odt" ||
        filename[fileExtensionObjectCount] === "rtf" ||
        filename[fileExtensionObjectCount] === "tex" ||
        filename[fileExtensionObjectCount] === "txt" ||
        filename[fileExtensionObjectCount] === "wpd"
      ) {
        return "mdi-file-document";
      } else if (filename[fileExtensionObjectCount] === "pdf") {
        return "mdi-file-pdf-box";
      } else {
        return "mdi-file";
      }
    },
    FileIconColor(FileName) {
      let filename = FileName.toLowerCase().split(".");
      let fileExtensionObjectCount = 0;
      for (let x = 0; x < filename.length; x++) {
        fileExtensionObjectCount = x;
      }

      if (
        filename[fileExtensionObjectCount] === "7z" ||
        filename[fileExtensionObjectCount] === "arj" ||
        filename[fileExtensionObjectCount] === "deb" ||
        filename[fileExtensionObjectCount] === "pkg" ||
        filename[fileExtensionObjectCount] === "rar" ||
        filename[fileExtensionObjectCount] === "rpm" ||
        filename[fileExtensionObjectCount] === "tar" ||
        filename[fileExtensionObjectCount] === "z" ||
        filename[fileExtensionObjectCount] === "zip"
      ) {
        return "purple";
      } else if (
        filename[fileExtensionObjectCount] === "email" ||
        filename[fileExtensionObjectCount] === "eml" ||
        filename[fileExtensionObjectCount] === "emlx" ||
        filename[fileExtensionObjectCount] === "msg" ||
        filename[fileExtensionObjectCount] === "oft" ||
        filename[fileExtensionObjectCount] === "ost" ||
        filename[fileExtensionObjectCount] === "pst" ||
        filename[fileExtensionObjectCount] === "vcf"
      ) {
        return "grey";
      } else if (
        filename[fileExtensionObjectCount] === "ai" ||
        filename[fileExtensionObjectCount] === "bmp" ||
        filename[fileExtensionObjectCount] === "gif" ||
        filename[fileExtensionObjectCount] === "ico" ||
        filename[fileExtensionObjectCount] === "jpeg" ||
        filename[fileExtensionObjectCount] === "jpg" ||
        filename[fileExtensionObjectCount] === "png" ||
        filename[fileExtensionObjectCount] === "ps" ||
        filename[fileExtensionObjectCount] === "psd" ||
        filename[fileExtensionObjectCount] === "svg" ||
        filename[fileExtensionObjectCount] === "tif" ||
        filename[fileExtensionObjectCount] === "tiff"
      ) {
        return "orange";
      } else if (
        filename[fileExtensionObjectCount] === "ods" ||
        filename[fileExtensionObjectCount] === "xls" ||
        filename[fileExtensionObjectCount] === "xlsm" ||
        filename[fileExtensionObjectCount] === "xlsx"
      ) {
        return "green";
      } else if (
        filename[fileExtensionObjectCount] === "doc" ||
        filename[fileExtensionObjectCount] === "docx" ||
        filename[fileExtensionObjectCount] === "odt" ||
        filename[fileExtensionObjectCount] === "rtf" ||
        filename[fileExtensionObjectCount] === "tex" ||
        filename[fileExtensionObjectCount] === "txt" ||
        filename[fileExtensionObjectCount] === "wpd"
      ) {
        return "blue";
      } else if (filename[fileExtensionObjectCount] === "pdf") {
        return "red";
      } else {
        return "black";
      }
    },
    CheckEditDisable() {
      let result = false;
      if (
        this.objEditFiledLeaveDefault.isAWOL === 1 ||
        this.objEditFiledLeaveDefault.isRecommendingApproved !== 0 ||
        this.objEditFiledLeaveDefault.isApproverApproved !== 0 ||
        this.objEditFiledLeaveDefault.isAdminApproved !== 0
      ) {
        result = true;
      }
      return result;
    },
  },
};
async function checkLeaveID(code) {
  // let app = window.location.origin
  // console.log('zzz',app)
  let apps = process.env.VUE_APP_URL;
  // console.log(process.env.VUE_APP_URL)
  let toReturn = "";
  await axios.post(apps + `/getLeaveID/${code}`).then((res) => {
    //  await axios.post(app+`/api/getLeaveID/${code}`).then((res) => {
    console.log("asa", res.data[0].LeaveID);
    toReturn = res.data[0].LeaveID;
  });
  return toReturn;
}
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
.LeaveList {
  min-height: calc(100vh - 310px) !important;
  max-height: calc(100vh - 310px) !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

.LeaveList .ant-list-item:hover {
  background-color: #b9b8b5 !important;
  cursor: pointer !important;
}
.LeaveList2 {
  min-height: calc(100vh - 264px) !important;
  max-height: calc(100vh - 264px) !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}
.LeaveList2 .ant-list-item:hover {
  background-color: #b9b8b5 !important;
  cursor: pointer !important;
}

.AttachmentList1 {
  min-height: 210px !important;
  max-height: 210px !important;
  overflow-y: auto !important;
  overflow-x: auto !important;
}

.AttachmentList1 .ant-list-item:hover {
  background-color: #b9b8b5 !important;
}

.AttachmentList2 {
  min-height: 170px !important;
  max-height: 170px !important;
  overflow-y: auto !important;
  overflow-x: auto !important;
}

.AttachmentList2 .ant-list-item:hover {
  background-color: #b9b8b5 !important;
}
.FiledLeaveDrawer {
  max-height: calc(100vh - 100px) !important;
  min-height: calc(100vh - 100px) !important;
  overflow-y: auto !important;
  overflow-x: auto !important;
}
.NoOfWorkingDays {
  font-family: arial !important;
  color: black !important;
  border-radius: 4px !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
}

.HalfDay {
  border: 1px black solid !important;
  padding: 0px !important;
}

.EditDescription {
  font-size: 12px !important;
  color: black !important;
  background-color: #bec9f7 !important;
  line-height: 1.5 !important;
}

.TextDisplay {
  font-family: arial !important;
  font-weight: normal !important;
  font-size: 10px !important;
  border: 1px transparent solid !important;
  color: black !important;
  background-color: transparent !important;
  outline: none !important;
  resize: none !important;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  cursor: pointer !important;
  line-height: 2 !important;
}

.col {
  width: 100%;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
}

.col .align-center {
  align-items: center !important;
}

.col .justify-center {
  justify-content: center !important;
}
</style>
