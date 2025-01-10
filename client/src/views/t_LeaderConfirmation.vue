<template>
  <div>
    <!-- ******************************************************************************************** -->
    <!-- =========================================== Blank ========================================== -->
    <!-- ******************************************************************************************** -->
    <a-result v-if="intLeader === 0" sub-title="Loading. Please wait....">
      <template #icon>
        <a-avatar
          src="Leave of Absence Icon.png"
          :size="150"
          alt="Leave of Absence"
        ></a-avatar>
      </template>
    </a-result>
    <!-- ******************************************************************************************** -->
    <!-- ====================================== 403 Not Allowed ===================================== -->
    <!-- ******************************************************************************************** -->
    <a-result v-else-if="intLeader === 1" status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <center> <a-button type="primary" icon="arrow-left" @click="$router.push('/fileleaveofabsence')"> Go back to Main Page </a-button> </center>  
      </template>
    </a-result>
    <!-- ============================================================================================== -->
    <!-- =========================================== Filing =========================================== -->
    <!-- ============================================================================================== -->
    <div v-else no-gutters>
      <v-row no-gutters>
        <a-tooltip title="File Leave for Member" placement="left">
          <v-btn
            style="
              margin-bottom: 45px;
              border: 2px black solid;
              height: 50px;
              width: 50px;
              background-color: #1890ff;
            "
            @click="ClickFileLeaveOfAbsence()"
            dark
            absolute
            bottom
            right
            fab
            fixed
          >
            <v-icon size="30px"> mdi-file-account </v-icon>
          </v-btn>
        </a-tooltip>
        <!-- ============================================================================================== -->
        <!-- =========================================== Printing =========================================== -->
        <!-- ============================================================================================== -->
        <a-tooltip title="Print Employee's Leave Summary" placement="left">
          <v-btn
            v-if="compEmployeeLeaves.length > 0"
            style="
              margin-bottom: 100px;
              border: 2px black solid;
              height: 50px;
              width: 50px;
              background-color: #f31119;
            "
            @click="ClickPrintEmployeeSummaryToPDF()"
            dark
            absolute
            bottom
            right
            fab
            fixed
          >
            <v-icon size="30px"> mdi-file-pdf-box </v-icon>
          </v-btn>
        </a-tooltip>
        <!-- ============================================================================================== -->
        <!-- =================================== Member's Information =================================== -->
        <!-- ============================================================================================== -->
        <v-col style="padding-left: 5px; padding-right: 5px; padding-top: 6px">
          <a-collapse
            v-model="arrActiveHeader"
            class="disable-select elevation-12"
            expand-icon-position="right"
          >
            <a-collapse-panel key="1" header="Member's Information">
              <v-row>
                <v-col
                  cols="2"
                  align="center"
                  justify="center"
                  style="padding-top: 25px"
                >
                  <a-avatar
                    :src="objEmployeeInformation.Avatar"
                    :size="145"
                    shape="square"
                    style="border: 1px black solid"
                  >
                    ?
                  </a-avatar>
                </v-col>

                <v-col cols="4">
                  <!-- {{compEmployeeList}} -->
                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Name:
                  </span>
                  <a-select
                    :filter-option="FilterOption"
                    v-model="strEmployeeCode"
                    placeholder="Type here..."
                    size="small"
                    style="
                      width: 100%;
                      font-family: arial;
                      font-size: 14px;
                      color: black;
                      border: 1px black solid;
                      border-radius: 4px;
                    "
                    @change="ClickSelectEmployee()"
                    showSearch
                    allowClear
                  >
                    <a-select-option
                      v-for="item in compEmployeeList"
                      :key="item.EmployeeCode"
                      :value="item.EmployeeCode"
                      style="font-family: arial"
                    >
                      {{ item.EmployeeName }}
                    </a-select-option>
                  </a-select>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Department:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.DepartmentName"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Section:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.SectionName"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Team:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.TeamName"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>
                </v-col>

                <v-col cols="4">
                  <span
                    span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Status:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.EmployeeStatus"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Hired Date:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.FormattedDateHired"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Leave Renewal Date:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.FormattedDateRenew"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Length of Service:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.FormattedLengthOfService"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>
                </v-col>

                <v-col cols="2">
                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Total Leave Credites:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.TotalLeaveCredits"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Total Leave Used:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.TotalLeaveUsed"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Remaining Leave:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.RemainingLeave"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>

                  <span
                    style="
                      color: black;
                      font-style: arial;
                      font-size: 12px;
                      font-weight: bold;
                    "
                  >
                    Leave w/o Pay:
                  </span>
                  <a-input
                    v-model="objEmployeeInformation.LeaveWithoutPay"
                    size="small"
                    class="PersonalInformation"
                    disabled
                  ></a-input>
                </v-col>
              </v-row>
            </a-collapse-panel>
          </a-collapse>
        </v-col>
      </v-row>
      <!-- ============================================================================================== -->
      <!-- ========================================== Legends =========================================== -->
      <!-- ============================================================================================== -->
      <v-row no-gutters>
        <v-col style="padding: 5px">
          <div
            class="disable-select"
            style="
              padding-top: 11px;
              padding-left: 10px;
              font-family: arial;
              font-size: 11px;
              font-weight: bold;
              color: white;
              background-color: black;
              border: 1px red solid;
              border-radius: 5px;
              height: 40px;
            "
          >
            <v-layout>
              <div style="padding-right: 30px">LEGENDS:</div>
              <div
                style="
                  padding-left: 15px;
                  background-color: #0eac43;
                  border: 1px white solid;
                "
              ></div>
              <div style="padding-left: 5px; padding-right: 30px">
                - For Approval
              </div>
              <div
                style="
                  padding-left: 15px;
                  background-color: #130df2;
                  border: 1px white solid;
                "
              ></div>
              <div style="padding-left: 5px; padding-right: 30px">
                - Disapproved
              </div>
              <!-- <div
                style="
                  padding-left: 15px;
                  background-color: #f2726f;
                  border: 1px white solid;
                "
              ></div>
              <div style="padding-left: 5px; padding-right: 30px">- AWOL</div> -->
              <v-spacer></v-spacer>
              <div style="padding-right: 10px">
                <v-icon style="color: white" small>
                  mdi-information-outline
                </v-icon>
                <span> DOUBLE CLICK ROW ON TABLE TO VIEW FILED LEAVE </span>
              </div>
            </v-layout>
          </div>
        </v-col>
      </v-row>
      <!-- ============================================================================================== -->
      <!-- ========================================== Filters =========================================== -->
      <!-- ============================================================================================== -->
      <v-row no-gutters>
        <v-col style="padding-left: 5px; padding-right: 5px">
          <div
            class="disable-select"
            style="
              width: 100%;
              height: 55px;
              background-color: #9fa2a0;
              border: 1px black solid;
              border-radius: 5px;
            "
          >
            <v-layout>
              <v-col>
                <span class="LabelFilter" style="color: #ac0c09">
                  Date Filed From:
                </span>
                <a-date-picker
                  v-model="strDateFiledFrom"
                  format="YYYY/MM/DD"
                  placeholder="Select date..."
                  style="border: 1px black solid; border-radius: 4px"
                  size="small"
                  allowClear
                ></a-date-picker>
              </v-col>

              <v-col>
                <span class="LabelFilter" style="color: #ac0c09">
                  Date Filed To:
                </span>
                <a-date-picker
                  v-model="strDateFiledTo"
                  format="YYYY/MM/DD"
                  placeholder="Select date..."
                  style="border: 1px black solid; border-radius: 4px"
                  size="small"
                  allowClear
                ></a-date-picker>
              </v-col>

              <v-col>
                <span class="LabelFilter" style="color: #0a12b1">
                  Leave From:
                </span>
                <a-date-picker
                  v-model="strLeaveFrom"
                  format="YYYY/MM/DD"
                  placeholder="Select date..."
                  style="border: 1px black solid; border-radius: 4px"
                  size="small"
                  allowClear
                ></a-date-picker>
              </v-col>

              <v-col>
                <span class="LabelFilter" style="color: #0a12b1">
                  Leave To:
                </span>
                <a-date-picker
                  v-model="strLeaveTo"
                  format="YYYY/MM/DD"
                  placeholder="Select date..."
                  style="border: 1px black solid; border-radius: 4px"
                  size="small"
                  allowClear
                ></a-date-picker>
              </v-col>

              <v-col cols="2">
                <span class="LabelFilter"> Leave Type: </span>
                <a-select
                  :filter-option="FilterOption"
                  v-model="strLeaveTypeCode"
                  placeholder="Type here..."
                  class="SelectFilter"
                  size="small"
                  showSearch
                  allowClear
                >
                  <a-select-option
                    v-for="item in arrLeaveTypesALL"
                    :key="item.LeaveTypeCode"
                    :value="item.LeaveTypeCode"
                    >{{ item.LeaveTypeDesc }}</a-select-option
                  >
                </a-select>
              </v-col>

              <v-col>
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

              <v-col>
                <span class="LabelFilter"> W/ Pay: </span>
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

              <v-col cols="4">
                <span class="LabelFilter"> Reason: </span>
                <a-input
                  v-model="strReason"
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
            </v-layout>
          </div>
        </v-col>
      </v-row>
      <!-- ============================================================================================== -->
      <!-- ===================================== For Approval (ALL) ===================================== -->
      <!-- ============================================================================================== -->
      <v-row
        v-if="
          strEmployeeCode === undefined ||
          strEmployeeCode === null ||
          strEmployeeCode === ''
        "
        no-gutters
      >
        <v-col style="padding-left: 5px; padding-right: 5px; padding-top: 5px">
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
              <v-col
                style="padding-top: 11px"
                :cols="strPosition === 'SH' || strPosition === 'DH' ? 2 : 3"
              >
                <div>REASON</div>
              </v-col>
              <v-col style="padding-top: 11px"> <div>FILED</div> </v-col>
              <v-col style="padding-top: 11px"> <div>W/ PAY</div> </v-col>
              <v-col
                v-if="strPosition === 'SH' || strPosition === 'DH'"
                style="padding-top: 11px"
              >
                <div>
                  RECOMMENDING <br />
                  APPROVAL
                </div>
              </v-col>
              <v-col style="padding-top: 11px"> <div>OPTIONS</div> </v-col>
            </v-row>
          </div>

          <div
            v-if="blnDataLoad === true"
            size="small"
            item-layout="horizontal"
            class="LeaveList1"
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
            :data-source="compForApprovalLeaves"
            size="small"
            item-layout="horizontal"
            :class="`${
              blnCollapseVisible === true ? 'LeaveList1' : 'LeaveList2'
            }`"
            style="border: 1px black solid; border-radius: 0px 0px 5px 5px"
            bordered
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :id="item.TotalLeaveID"
              :style="`background-color:${
                item.isAWOL === 1
                  ? '#f2726f'
                  : item.LeaveOfAbsenceID === strSelectedLeaveID
                  ? '#c397c5'
                  : ''
              };`"
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
                          <div
                            style="padding-top: 5px"
                            align="center"
                            justify="center"
                          >
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
                    <v-col> {{ GetLeaveTypeName(item.LeaveTypeCode) }} </v-col>
                    <v-col>
                      <span style="padding-left: 10px">
                        {{ item.NoOfWorkingDays }}
                      </span>
                    </v-col>
                    <v-col
                      :cols="
                        strPosition === 'SH' || strPosition === 'DH' ? 2 : 3
                      "
                    >
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

                    <!-- ===== Recommending Approval ===== -->
                    <v-col
                      v-if="
                        item.isRecommendingApproved === 1 &&
                        (strPosition === 'SH' || strPosition === 'DH')
                      "
                    >
                      <div>
                        <div>
                          <div
                            style="padding-top: 5px"
                            align="center"
                            justify="center"
                          >
                            <a-popover placement="top">
                              <a-avatar
                                :src="item.RecommendingEmployeeAvatar"
                                :size="25"
                                shape="square"
                                style="border: 1px black solid"
                              >
                                ?
                              </a-avatar>
                              <template #content>
                                <a-avatar
                                  :src="item.RecommendingEmployeeAvatar"
                                  :size="145"
                                  shape="square"
                                  style="border: 1px black solid"
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
                              type="textarea"
                              v-model="item.RecommendingEmployeeName"
                              class="TextDisplay"
                              style="text-align: center"
                              readOnly
                              autoSize
                            >
                            </a-input>
                          </div>
                        </div>
                      </div>
                    </v-col>

                    <v-col
                      v-else-if="
                        item.isRecommendingApproved === 0 &&
                        (strPosition === 'SH' || strPosition === 'DH')
                      "
                      :style="`padding-top:10px;`"
                    >
                      <div
                        :style="`background-color:${TableRecommendingApproved(
                          item.isRecommendingApproved,
                          item.isApproverApproved,
                          item.isAdminApproved,
                          item.isAWOL,
                          0
                        )};`"
                      >
                        <div
                          style="
                            padding-top: 15px;
                            padding-bottom: 15px;
                            height: 40px;
                          "
                        ></div>
                      </div>
                    </v-col>
                    <!-- ================================= -->

                    <!-- ============ Options ============ -->
                    <v-col>
                      <v-layout>
                        <v-spacer></v-spacer>
                        <div style="padding-top: 3px">
                          <a-tooltip title="Approve" placement="top">
                            <a-button
                              type="primary"
                              icon="check-circle"
                              shape="circle"
                              style="border: 1px black solid"
                              @click="
                                ClickOptions(
                                  item.LeaveOfAbsenceID,
                                  strPosition,
                                  'Approve',
                                  undefined
                                )
                              "
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

                                  <v-layout style="color: red; font-size: 9px">
                                    <v-spacer></v-spacer>
                                    <span v-if="intDisapproveError === 1">
                                      <v-icon style="color: red" small>
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
                                            item.LeaveOfAbsenceID,
                                            strPosition,
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
                    <!-- ================================= -->
                  </v-row>
                </span>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </v-col>
      </v-row>
      <!-- ============================================================================================== -->
      <!-- =================================== For Approval (EMPLOYEE) ADMIN ================================== -->
      <!-- ============================================================================================== -->
      <v-row
        v-if="
          strEmployeeCode !== undefined &&
          strEmployeeCode !== null &&
          strEmployeeCode !== ''
        "
        no-gutters
      >
        <v-col style="padding-left: 5px; padding-right: 5px; padding-top: 5px">
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
              <v-col style="padding-top: 11px" cols="2">
                <div>REASON</div>
              </v-col>
              <v-col style="padding-top: 11px"> <div>FILED</div> </v-col>
              <v-col style="padding-top: 11px"> <div>W/ PAY</div> </v-col>
              <v-col style="padding-top: 11px">
                <div>
                  RECOMMENDING <br />
                  APPROVAL
                </div>
              </v-col>
              <v-col style="padding-top: 11px">
                <div>
                  APPROVED <br />
                  BY
                </div>
              </v-col>
              <v-col style="padding-top: 11px; padding-right: 15px">
                <div>ADMIN</div>
              </v-col>
            </v-row>
          </div>

          <!-- {{compEmployeeLeaves}} -->
          <div
            v-if="blnDataLoad === true"
            size="small"
            item-layout="horizontal"
            class="LeaveList1"
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
            :data-source="compEmployeeLeaves"
            size="small"
            item-layout="horizontal"
            :class="`${
              blnCollapseVisible === true ? 'LeaveList1' : 'LeaveList2'
            }`"
            style="border: 1px black solid; border-radius: 0px 0px 5px 5px"
            bordered
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :id="item.TotalLeaveID"
              :style="`background-color:${
                item.isAWOL === 1
                  ? '#f2726f'
                  : item.LeaveOfAbsenceID === strSelectedLeaveID
                  ? '#c397c5'
                  : ''
              };`"
            >
              <a-list-item-meta @dblclick="ClickFiledLeave(item)">
                <span
                  slot="title"
                  style="font-size: 10px; color: black; font-family: arial"
                >
                  <v-row class="disable-select" align="center" justify="center">
                    <v-col> {{ item.FiledDate }}</v-col>
                    <v-col> {{ item.LeaveFrom }} </v-col>
                    <v-col> {{ item.LeaveTo }} </v-col>
                    <v-col> {{ GetLeaveTypeName(item.LeaveTypeCode) }} </v-col>
                    <v-col>
                      <span style="padding-left: 10px">
                        {{ item.NoOfWorkingDays }}
                      </span>
                    </v-col>
                    <v-col cols="2">
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

                    <!-- ===== Recommending Approval ===== -->
                    <v-col v-if="item.isRecommendingApproved === 1">
                      <div>
                        <div>
                          <div
                            style="padding-top: 5px"
                            align="center"
                            justify="center"
                          >
                            <a-popover placement="top">
                              <a-avatar
                                :src="item.RecommendingEmployeeAvatar"
                                :size="25"
                                shape="square"
                                style="border: 1px black solid"
                              >
                                ?
                              </a-avatar>
                              <template #content>
                                <a-avatar
                                  :src="item.RecommendingEmployeeAvatar"
                                  :size="145"
                                  shape="square"
                                  style="border: 1px black solid"
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
                              type="textarea"
                              v-model="item.RecommendingEmployeeName"
                              class="TextDisplay"
                              style="text-align: center"
                              readOnly
                              autoSize
                            >
                            </a-input>
                          </div>
                        </div>
                      </div>
                    </v-col>

                    <v-col
                      v-else-if="
                        item.isRecommendingApproved === 0 &&
                        item.isApproverApproved === 0 &&
                        item.isAdminApproved === 0 &&
                        item.isAWOL === 0 &&
                        strPosition === 'TH'
                      "
                      :style="`padding-top:10px;`"
                    >
                      <v-layout>
                        <v-spacer></v-spacer>
                        <div style="padding-top: 3px">
                          <a-tooltip title="Approve" placement="top">
                            <a-button
                              type="primary"
                              icon="check-circle"
                              shape="circle"
                              style="border: 1px black solid"
                              @click="
                                ClickOptions(
                                  item.LeaveOfAbsenceID,
                                  strPosition,
                                  'Approve',
                                  undefined
                                )
                              "
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

                                  <v-layout style="color: red; font-size: 9px">
                                    <v-spacer></v-spacer>
                                    <span v-if="intDisapproveError === 1">
                                      <v-icon style="color: red" small>
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
                                            item.LeaveOfAbsenceID,
                                            strPosition,
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

                    <v-col v-else :style="`padding-top:10px;`">
                      <div
                        :style="`background-color:${TableRecommendingApproved(
                          item.isRecommendingApproved,
                          item.isApproverApproved,
                          item.isAdminApproved,
                          item.isAWOL,
                          1
                        )};`"
                      >
                        <div
                          style="
                            padding-top: 15px;
                            padding-bottom: 15px;
                            height: 40px;
                          "
                        ></div>
                      </div>
                    </v-col>
                    <!-- ================================= -->

                    <!-- ========== Approved By ========== -->
                    <v-col v-if="item.isApproverApproved === 1">
                      <div>
                        <div>
                          <div
                            style="padding-top: 5px"
                            align="center"
                            justify="center"
                          >
                            <a-popover placement="top">
                              <a-avatar
                                :src="item.ApproverEmployeeAvatar"
                                :size="25"
                                shape="square"
                                style="border: 1px black solid"
                              >
                                ?
                              </a-avatar>
                              <template #content>
                                <a-avatar
                                  :src="item.ApproverEmployeeAvatar"
                                  :size="145"
                                  shape="square"
                                  style="border: 1px black solid"
                                >
                                  ?
                                </a-avatar>
                              </template>
                            </a-popover>
                          </div>
                        </div>
                        <!-- {{ item }} -->
                        <!-- dito  yung text-->
                        <div>
                          <div align="center" justify="center">
                            <a-input
                              type="textarea"
                              v-model="item.ApproverEmployeeName"
                              class="TextDisplay"
                              style="text-align: center"
                              readOnly
                              autoSize
                            >
                            </a-input>
                          </div>
                        </div>
                      </div>
                    </v-col>

                    <v-col
                      v-else-if="
                        item.isApproverApproved === 0 &&
                        item.isAdminApproved === 0 &&
                        item.isRecommendingApproved !== 2 &&
                        item.isAWOL === 0 &&
                        (strPosition === 'SH' ||
                          (strPosition === 'DH' &&
                            objEmployeeInformation.Position === 'SH'))
                      "
                      :style="`padding-top:10px;`"
                    >
                      <v-layout>
                        <v-spacer></v-spacer>
                        <div style="padding-top: 3px">
                          <a-tooltip title="Approve" placement="top">
                            <a-button
                              type="primary"
                              icon="check-circle"
                              shape="circle"
                              style="border: 1px black solid"
                              @click="
                                ClickOptions(
                                  item.LeaveOfAbsenceID,
                                  strPosition,
                                  'Approve',
                                  undefined
                                )
                              "
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

                                  <v-layout style="color: red; font-size: 9px">
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
                                            item.LeaveOfAbsenceID,
                                            strPosition,
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

                    <v-col v-else :style="`padding-top:10px;`">
                      <div
                        :style="`background-color:${TableApproverApproved(
                          item.isRecommendingApproved,
                          item.isApproverApproved,
                          item.isAdminApproved,
                          item.isAWOL,
                          1
                        )};`"
                      >
                        <div
                          style="
                            padding-top: 15px;
                            padding-bottom: 15px;
                            height: 40px;
                          "
                        ></div>
                      </div>
                    </v-col>
                    <!-- ================================= -->

                    <!-- ============= Admin ============= -->
                    <v-col v-if="item.isAdminApproved === 1">
                      <div>
                        <div>
                          <div
                            style="padding-top: 5px"
                            align="center"
                            justify="center"
                          >
                            <a-popover placement="top">
                              <a-avatar
                                :src="item.AdminEmployeeAvatar"
                                :size="25"
                                shape="square"
                                style="border: 1px black solid"
                              >
                                ?
                              </a-avatar>
                              <template #content>
                                <a-avatar
                                  :src="item.AdminEmployeeAvatar"
                                  :size="145"
                                  shape="square"
                                  style="border: 1px black solid"
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
                              v-model="item.AdminEmployeeName"
                              type="textarea"
                              class="TextDisplay"
                              style="text-align: center"
                              readOnly
                              autoSize
                            >
                            </a-input>
                          </div>
                        </div>
                      </div>
                    </v-col>

                    <v-col v-else :style="`padding-top:10px;`">
                      <div
                        :style="`background-color:${TableAdminApproved(
                          item.isRecommendingApproved,
                          item.isApproverApproved,
                          item.isAdminApproved,
                          item.isAWOL
                        )};`"
                      >
                        <div
                          style="
                            padding-top: 15px;
                            padding-bottom: 15px;
                            height: 40px;
                          "
                        ></div>
                      </div>
                    </v-col>
                    <!-- ================================= -->
                  </v-row>
                </span>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </v-col>
      </v-row>
      <!-- ============================================================================================== -->
      <!-- =========================== File Leave sa Leader Confirmation ================================ -->
      <!-- ============================================================================================== -->
      <a-modal
        class="disable-select"
        style="font-family: arial"
        width="1200px"
        v-model="blnFileLeaveOfAbsenceDialog"
        title="FILE LEAVE"
        :maskClosable="false"
        :closable="false"
      >
        <template slot="footer">
          <v-layout>
            <v-spacer></v-spacer>
            <a-button
              key="back"
              icon="close-circle"
              class="ModalButtons"
              style="border: 1px black solid"
              @click="ClickFileLeaveOfAbsenceClose()"
              :disabled="blnFilingLoadingSave"
            >
              Cancel
            </a-button>
            <div style="padding-left: 5px">
              <a-button
                key="submit"
                icon="save"
                type="primary"
                class="ModalButtons"
                style="border: 1px black solid"
                @click="ClickFileLeaveOfAbsenceSave()"
                :disabled="blnFilingLoadingSave"
              >
                Save
              </a-button>
            </div>
          </v-layout>
        </template>

        <v-layout
          style="
            padding: 10px;
            margin-bottom: 20px;
            background-color: #bdbdbd;
            border: 1px black solid;
            border-radius: 4px;
          "
        >
          <div style="width: 600px; padding-right: 20px">
            <v-layout>
              <span
                :style="`margin-top:20px; width:15%; font-style:arial; font-size:14px; font-weight:bold; color:${
                  intEmployeeForFilingError === 0 ? 'black' : 'red'
                };`"
              >
                Employee:
              </span>

              <a-popover placement="left">
                <span
                  style="
                    margin-left: 10px;
                    margin-right: 10px;
                    margin-top: 15px;
                  "
                >
                  <a-avatar
                    :src="objEmployeeForFiling.Avatar"
                    :size="34"
                    shape="square"
                    :style="`border:1px solid; border-color:${
                      intEmployeeForFilingError === 0 ? 'black' : 'red'
                    };`"
                  >
                    ?
                  </a-avatar>
                </span>
                <template #content>
                  <a-avatar
                    style="border: 1px black solid"
                    :src="objEmployeeForFiling.Avatar"
                    :size="145"
                    shape="square"
                  >
                    ?
                  </a-avatar>
                </template>
              </a-popover>

              <a-select
                :filter-option="FilterOption"
                v-model="objEmployeeForFiling.EmployeeCode"
                placeholder="Type here..."
                class="Select"
                :style="`width:100%; margin-top:15px; border:1px solid; border-color:${
                  intEmployeeForFilingError === 0 ? 'black' : 'red'
                };`"
                @change="ChangeEmployeeForFiling()"
                :disabled="CheckEmployeeSelectDisable()"
                showSearch
                allowClear
              >
                <a-select-option
                  v-for="item in compEmployeeList"
                  :key="item.EmployeeCode"
                  :value="item.EmployeeCode"
                  style="font-family: arial"
                >
                  {{ item.EmployeeName }}
                </a-select-option>
              </a-select>
            </v-layout>

            <v-layout style="color: red; font-size: 9px">
              <v-spacer></v-spacer>
              <span v-if="intEmployeeForFilingError === 1">
                <v-icon style="color: red" small>
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
            </v-layout>
          </div>

          <div style="width: 200px; padding-right: 20px">
            <v-layout>
              <span
                style="
                  padding-right: 10px;
                  font-style: arial;
                  font-size: 14px;
                  font-weight: bold;
                  color: black;
                "
              >
                Remaining Vacation Leave:
              </span>
              <a-input
                v-model="objEmployeeForFiling.RemainingVacationLeave"
                style="
                  margin-top: 15px;
                  padding-left: 10px;
                  text-align: center;
                  color: black;
                  border: 1px black solid;
                "
                disabled
              ></a-input>
            </v-layout>
          </div>

          <div style="width: 200px; padding-right: 20px">
            <v-layout>
              <span
                style="
                  padding-right: 10px;
                  font-style: arial;
                  font-size: 14px;
                  font-weight: bold;
                  color: black;
                "
              >
                Remaining Sick Leave:
              </span>
              <a-input
                v-model="objEmployeeForFiling.RemainingSickLeave"
                style="
                  margin-top: 15px;
                  padding-left: 10px;
                  text-align: center;
                  color: black;
                  border: 1px black solid;
                "
                disabled
              ></a-input>
            </v-layout>
          </div>

          <div
            v-if="blnEmployeeSelectLoad === true"
            style="width: 100px; padding-top: 15px; text-align: center"
          >
            <a-spin size="large"></a-spin>
          </div>
        </v-layout>

        <v-layout>
          <div style="width: 400px; padding-right: 20px">
            <v-layout>
              <span
                :style="`padding-top:7px; padding-right:10px; width:50%; text-align:right; font-family:arial; font-size: 14px; font-weight:bold; color:${
                  intLeaveTypeError === 0 ? 'black' : 'red'
                };`"
              >
                Leave Type:
              </span>
              <a-select
                :filter-option="FilterOption"
                v-model="objFileLeave.LeaveTypeCode"
                placeholder="Type here..."
                class="Select"
                :style="`width:100%; font-family:arial; font-size: 14px; color:black; border:1px solid; border-color:${
                  intLeaveTypeError === 0 ? 'black' : 'red'
                }; border-radius:4px;`"
                @change="ChangeLeaveType()"
                :disabled="blnFilingLoadingSave"
                showSearch
                allowClear
              >
                <a-select-option
                  v-for="item in arrLeaveTypesFILTERED"
                  :key="item.LeaveTypeCode"
                  :value="item.LeaveTypeCode"
                  style="font-family: arial"
                >
                  {{ item.LeaveTypeDesc }}
                </a-select-option>
              </a-select>
            </v-layout>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intLeaveTypeError === 1">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
            </v-layout>
          </div>

          <div style="width: 450px; padding-right: 20px">
            <v-layout>
              <span
                :style="`padding-top:7px; padding-right:10px; width:50%; text-align:right; font-family:arial; font-size: 14px; font-weight:bold; color:${
                  intLeaveFromError === 0 ? 'black' : 'red'
                };`"
              >
                Leave From:
              </span>
              <a-date-picker
                v-model="objFileLeave.LeaveFrom"
                format="YYYY/MM/DD"
                placeholder="Select date..."
                :style="`width:100%; border:1px solid; border-color:${
                  intLeaveFromError === 0 ? 'black' : 'red'
                }; border-radius:4px;`"
                @change="ChangeLeaveFrom()"
                :disabled="blnFilingLoadingSave"
                allowClear
              ></a-date-picker>
            </v-layout>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intLeaveFromError === 1">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
              <span v-else-if="intLeaveFromError === 2">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Invalid Date Range.
              </span>
            </v-layout>
          </div>

          <div style="width: 350px; padding-right: 20px">
            <v-layout>
              <span
                :style="`padding-top:7px; padding-right:10px; width:50%; text-align:right; font-family:arial; font-size: 14px; font-weight:bold; color:${
                  intLeaveToError === 0 ? 'black' : 'red'
                };`"
              >
                Leave To:
              </span>
              <a-date-picker
                v-model="objFileLeave.LeaveTo"
                format="YYYY/MM/DD"
                placeholder="Select date..."
                :style="`width:100%; border:1px solid; border-color:${
                  intLeaveToError === 0 ? 'black' : 'red'
                }; border-radius:4px;`"
                @change="ChangeLeaveTo()"
                :disabled="blnFilingLoadingSave"
                allowClear
              ></a-date-picker>
            </v-layout>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intLeaveToError === 1">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
              <span v-else-if="intLeaveToError === 2">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Invalid Date Range.
              </span>
            </v-layout>
          </div>
        </v-layout>

        <v-layout style="padding-top: 5px">
          <div style="width: 400px; padding-right: 20px">
            <v-layout>
              <span
                :style="`padding-top:7px; padding-right:10px; width:50%; text-align:right; font-family:arial; font-size: 14px; font-weight:bold; color:${
                  intFiledDateError === 0 ? 'black' : 'red'
                };`"
              >
                Filed Date:
              </span>
              <a-date-picker
                v-model="objFileLeave.FiledDate"
                format="YYYY/MM/DD"
                placeholder="Select date..."
                :style="`width:100%; border:1px solid; border-color:${
                  intFiledDateError === 0 ? 'black' : 'red'
                }; border-radius:4px;`"
                @change="ChangeFiledDate()"
                :disabled="blnFilingLoadingSave"
                allowClear
              ></a-date-picker>
            </v-layout>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intFiledDateError === 1">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
            </v-layout>
          </div>

          <div style="width: 500px; padding-right: 40px">
            <v-layout>
              <span
                :style="`padding-top:7px; padding-right:10px; width:65%; font-family:arial; font-size:14px; font-weight:bold; color:${
                  intNoOfWorkingDaysError === 0 ? 'black' : 'red'
                };`"
              >
                No. of Working Days:
              </span>
              <a-input
                v-model="objFileLeave.NoOfWorkingDays"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g,'$1');"
                class="NoOfWorkingDays"
                :style="`width:70%; border-width:1px; border-style:solid; border-color:${
                  intNoOfWorkingDaysError === 0 ? 'black' : 'red'
                };`"
                @change="ChangeNoOfWorkingDays()"
                :disabled="blnFilingLoadingSave"
                allowClear
              ></a-input>
              <a-button
                key="submit"
                type="primary"
                class="HalfDay"
                style="
                  margin-right: 28px;
                  margin-left: 5px;
                  width: 30%;
                  height: 34px;
                  font-family: arial;
                  font-size: 10px;
                  font-weight: bold;
                "
                :disabled="blnFilingLoadingSave"
                @click="ClickFileLeaveOfAbsenceHalfDay()"
              >
                + Half Day
              </a-button>
            </v-layout>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span
                v-if="intNoOfWorkingDaysError === 1"
                style="padding-right: 77px"
              >
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
              <span
                v-else-if="intNoOfWorkingDaysError === 2"
                style="padding-right: 77px"
              >
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Invalid value.
              </span>
            </v-layout>
          </div>

          <div style="width: 300px">
            <v-layout>
              <span
                style="
                  padding-top: 7px;
                  padding-right: 10px;
                  width: 20%;
                  text-align: right;
                  color: black;
                  font-family: arial;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                Filed:
              </span>
              <a-checkbox
                v-model="objFileLeave.isFiled"
                style="margin-top: 7px"
                @change="ChangeIsFiled()"
                :disabled="blnFilingLoadingSave"
              ></a-checkbox>

              <span
                style="
                  padding-top: 7px;
                  padding-right: 10px;
                  width: 32%;
                  text-align: right;
                  color: black;
                  font-family: arial;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                With Pay:
              </span>
              <!-- <a-checkbox v-model="objFileLeave.isWithPay" disabled style="margin-top:7px;"></a-checkbox> -->
              <a-checkbox
                v-model="objFileLeave.isWithPay"
                style="margin-top: 7px"
                :disabled="blnFilingLoadingSave"
              ></a-checkbox>

              <span
                style="
                  padding-top: 7px;
                  padding-right: 10px;
                  width: 24%;
                  text-align: right;
                  color: black;
                  font-family: arial;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                AWOL:
              </span>
              <a-checkbox
                v-model="objFileLeave.isAWOL"
                style="margin-top: 7px"
                @change="ChangeIsAWOL()"
                :disabled="blnFilingLoadingSave"
              ></a-checkbox>
            </v-layout>
          </div>
        </v-layout>

        <v-layout style="padding-top: 5px">
          <div style="width: 1200px">
            <span
              :style="`padding-top:7px; width:50%; font-family:arial; font-size: 14px; font-weight:bold; color:${
                intReasonError === 0 ? 'black' : 'red'
              };`"
            >
              Reason:
            </span>
            <a-input
              :rows="3"
              v-model="objFileLeave.Reason"
              placeholder="Type here..."
              type="textarea"
              :style="`width:100%; font-size:12px; color:black; border:1px solid; border-color:${
                intReasonError === 0 ? 'black' : 'red'
              }; border-radius:4px;`"
              @change="ChangeReason()"
              :disabled="blnFilingLoadingSave"
              allowClear
            ></a-input>

            <v-layout style="color: red; font-size: 15px">
              <v-spacer></v-spacer>
              <span v-if="intReasonError === 1">
                <v-icon small style="color: red">
                  mdi-alert-circle-outline
                </v-icon>
                Field required.
              </span>
            </v-layout>
          </div>
        </v-layout>

        <v-layout style="padding-top: 5px">
          <div style="width: 1200px; margin-top: 5px">
            <v-row>
              <v-col cols="2" style="padding: 20px">
                <span
                  style="
                    padding: 7px 0px 20px 0px;
                    width: 50%;
                    color: black;
                    font-family: arial;
                    font-size: 14px;
                    font-weight: bold;
                  "
                >
                  Attachment(s):
                </span>

                <div>
                  <input
                    type="file"
                    ref="fileleaveofabsencefile"
                    style="display: none"
                    @change="FileLeaveOfAbsenceFileUpload()"
                    multiple
                  />
                  <!-- Hidden button for file selection -->
                  <a-button
                    icon="file-add"
                    :style="`border:1px black solid; background-color:${
                      blnFilingLoadingSave === true ? 'gray' : '#e8950b'
                    }; color:white;`"
                    @click="ClickFileLeaveOfAbsenceAttachFile()"
                    :disabled="blnFilingLoadingSave"
                  >
                    Upload File(s)
                  </a-button>
                </div>

                <div
                  v-if="blnFilingLoadingSave === true"
                  style="text-align: center"
                >
                  <a-spin
                    style="padding: 50px 0px 0px 0px"
                    size="large"
                  ></a-spin>
                </div>
              </v-col>

              <v-col cols="10">
                <a-list
                  :data-source="arrAttachmentsFile"
                  size="small"
                  item-layout="horizontal"
                  class="AttachmentList1"
                  style="
                    margin: 20px 20px 0px 10px;
                    text-align: center;
                    border: 1px black solid;
                    border-radius: 5px;
                  "
                  bordered
                >
                  <a-list-item
                    slot="renderItem"
                    slot-scope="item"
                    :id="item.name"
                  >
                    <a-list-item-meta>
                      <span
                        slot="title"
                        style="
                          font-family: arial;
                          font-size: 16px;
                          color: black;
                        "
                      >
                        <v-layout>
                          <v-icon :style="`color:${FileIconColor(item.name)};`">
                            {{ FileIcon(item.name) }}
                          </v-icon>
                          <div
                            style="padding: 5px 0px 0px 10px; font-weight: bold"
                            align="center"
                            justify="center"
                          >
                            {{ item.name }}
                          </div>
                          <v-spacer></v-spacer>
                          <a-tooltip title="Remove" placement="right">
                            <v-icon
                              style="color: red; cursor: pointer"
                              @click="ClickFileLeaveOfAbsenceRemoveFile(item)"
                              :disabled="blnFilingLoadingSave"
                            >
                              mdi-delete-circle-outline
                            </v-icon>
                          </a-tooltip>
                        </v-layout>
                      </span>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </v-col>
            </v-row>
          </div>
        </v-layout>
      </a-modal>
      <!-- ============================================================================================== -->
      <!-- ======================================= View Filed Leave ===================================== -->
      <!-- ============================================================================================== -->
      <a-drawer
        title="View Filed Leave"
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
                  <div
                    style="padding-top: 5px; font-size: 25px; font-weight: bold"
                  >
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
              <span v-else-if="objEditFiledLeave.isWithPay === false">
                NO
              </span>
            </a-descriptions-item>

            <a-descriptions-item label="AWOL" :span="1">
              <!-- <a-checkbox v-model="objEditFiledLeave.isAWOL" style="margin-right:10px;" disabled></a-checkbox> -->
              <a-checkbox
                v-model="objEditFiledLeave.isAWOL"
                style="margin-right: 10px"
                :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              ></a-checkbox>
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
                  v-for="item in arrLeaveTypesFILTERED"
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
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
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
              <v-layout style="color: red; font-size: 15px">
                <v-spacer></v-spacer>
                <span v-if="intEditLeaveFromError === 1">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
                  Field required.
                </span>
                <span v-else-if="intEditLeaveFromError === 2">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
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
              <v-layout style="color: red; font-size: 15px">
                <v-spacer></v-spacer>
                <span v-if="intEditLeaveToError === 1">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
                  Field required.
                </span>
                <span v-else-if="intEditLeaveToError === 2">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
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
              <v-layout style="color: red; font-size: 15px">
                <v-spacer></v-spacer>
                <span v-if="intEditFiledDateError === 1">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
                  Field required.
                </span>
              </v-layout>
            </a-descriptions-item>

            <a-descriptions-item label="No. of Working Days" :span="1">
              <a-input
                v-model="objEditFiledLeave.NoOfWorkingDays"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g,'$1');"
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
                @click="
                  ClickFiledLeaveEditHalfDay(), ChangeEditNoOfWorkingDays()
                "
                :disabled="blnIsEdit === false || blnEditLoadingSave === true"
              >
                + Half Day
              </a-button>
              <v-layout style="color: red; font-size: 15px">
                <span v-if="intEditNoOfWorkingDaysError === 1">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
                  Field required.
                </span>
                <span v-else-if="intEditNoOfWorkingDaysError === 2">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
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
                :disabled="blnIsEdit === false || blnEditLoadingSave === true"
                autoSize
                allowClear
              ></a-input>
              <v-layout style="color: red; font-size: 15px">
                <v-spacer></v-spacer>
                <span v-if="intEditReasonError === 1">
                  <v-icon small style="color: red">
                    mdi-alert-circle-outline
                  </v-icon>
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
                  :disabled="
                    blnIsCanceled === false || blnEditLoadingSave === true
                  "
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
                <!-- Dito may problem -->
                <a-button
                  icon="file-add"
                  :style="`width;:100%; border:1px black solid; background-color:${
                    blnIsEdit === false || blnEditLoadingSave === true
                      ? 'gray'
                      : '#e8950b'
                  }; color:white;`"
                  @click="ClickFiledLeaveAttachFile()"
                  :disabled="blnIsEdit === false || blnEditLoadingSave === true"
                >
                  Upload File(s)
                </a-button>

                <span
                  v-if="blnEditLoadingSave === true"
                  style="text-align: center"
                >
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
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  :id="item.fileName"
                >
                  <a-list-item-meta>
                    <span
                      slot="title"
                      style="font-size: 12px; color: black; font-family: arial"
                    >
                      <v-layout>
                        <v-icon
                          :style="`color:${FileIconColor(item.fileName)};`"
                        >
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
                            style="
                              margin-right: 10px;
                              color: #158f9e;
                              cursor: pointer;
                            "
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
              <v-layout
                v-if="
                  objEditFiledLeaveDefault.isRecommendingApproved === 0 &&
                  objEditFiledLeaveDefault.isApproverApproved === 0 &&
                  objEditFiledLeaveDefault.isAdminApproved === 0 &&
                  objEditFiledLeaveDefault.isAWOL === 0 &&
                  strPosition === 'TH'
                "
              >
                <v-spacer></v-spacer>
                <div style="padding-top: 3px">
                  <a-tooltip title="Approve" placement="top">
                    <a-button
                      type="primary"
                      icon="check-circle"
                      shape="circle"
                      style="border: 1px black solid"
                      @click="
                        ClickFiledOptions(
                          objEditFiledLeaveDefault.LeaveOfAbsenceID,
                          strPosition,
                          'Approve',
                          undefined
                        )
                      "
                    >
                    </a-button>
                  </a-tooltip>
                </div>

                <div style="padding-top: 3px; padding-left: 5px">
                  <a-popover placement="topRight" trigger="click">
                    <a-tooltip title="Disapprove" placement="top">
                      <a-button
                        type="danger"
                        icon="stop"
                        shape="circle"
                        style="border: 1px black solid"
                        @click="ClickFiledDisapprove()"
                      >
                      </a-button>
                    </a-tooltip>

                    <template #content>
                      <v-row style="width: 500px">
                        <v-col cols="10" style="color: black">
                          <span
                            :style="`padding-top:5px; padding-left:10px; font-family:arial; font-size:12px; font-weight:bold; color:${
                              intFiledDisapproveError === 0 ? 'black' : 'red'
                            };`"
                          >
                            Disapproval Reason:
                          </span>
                          <v-spacer></v-spacer>
                          <a-input
                            v-model="strFiledDisapprovalReason"
                            placeholder="Type here..."
                            type="textarea"
                            :style="`height:34px; width:100%; color:black; border:1px solid; border-radius:4px; border-color:${
                              intFiledDisapproveError === 0 ? 'black' : 'red'
                            };`"
                            @change="ChangeEditDisapproveReason()"
                            autoSize
                            allowClear
                          ></a-input>

                          <v-layout style="color: red; font-size: 15px">
                            <v-spacer></v-spacer>
                            <span v-if="intFiledDisapproveError === 1">
                              <v-icon style="color: red" small>
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
                                  ClickFiledOptions(
                                    objEditFiledLeaveDefault.LeaveOfAbsenceID,
                                    strPosition,
                                    'Disapprove',
                                    strFiledDisapprovalReason
                                  )
                                "
                              ></a-button>
                            </a-tooltip>
                          </div>
                        </v-col>
                      </v-row>
                    </template>
                  </a-popover>
                </div>
                <v-spacer></v-spacer>
              </v-layout>

              <v-layout v-else>
                <span style="padding-top: 4px">
                  {{
                    ViewRecommendingApproved(
                      objEditFiledLeaveDefault.isRecommendingApproved,
                      objEditFiledLeaveDefault.isApproverApproved,
                      objEditFiledLeaveDefault.isAdminApproved,
                      objEditFiledLeaveDefault.isAWOL
                    )
                  }}
                </span>
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
              <v-layout
                v-if="
                  objEditFiledLeaveDefault.isApproverApproved === 0 &&
                  objEditFiledLeaveDefault.isAdminApproved === 0 &&
                  objEditFiledLeaveDefault.isRecommendingApproved !== 2 &&
                  objEditFiledLeaveDefault.isAWOL === 0 &&
                  (strPosition === 'SH' ||
                    (strPosition === 'DH' &&
                      (strEmployeeCode === undefined ||
                        strEmployeeCode === null ||
                        strEmployeeCode === '' ||
                        (strEmployeeCode !== undefined &&
                          strEmployeeCode !== null &&
                          strEmployeeCode !== '' &&
                          objEmployeeInformation.Position === 'SH'))))
                "
              >
                <v-spacer></v-spacer>
                <div style="padding-top: 3px">
                  <a-tooltip title="Approve" placement="top">
                    <a-button
                      style="border: 1px black solid"
                      type="primary"
                      icon="check-circle"
                      shape="circle"
                      @click="
                        ClickFiledOptions(
                          objEditFiledLeaveDefault.LeaveOfAbsenceID,
                          strPosition,
                          'Approve',
                          undefined
                        )
                      "
                    >
                    </a-button>
                  </a-tooltip>
                </div>

                <div style="padding-top: 3px; padding-left: 5px">
                  <a-popover placement="topRight" trigger="click">
                    <a-tooltip title="Disapprove" placement="top">
                      <a-button
                        style="border: 1px black solid"
                        type="danger"
                        icon="stop"
                        shape="circle"
                        @click="ClickFiledDisapprove()"
                      >
                      </a-button>
                    </a-tooltip>

                    <template #content>
                      <v-row style="width: 500px">
                        <v-col cols="10" style="color: black">
                          <span
                            :style="`padding-top:5px; padding-left:10px; font-family:arial; font-size:12px; font-weight:bold; color:${
                              intFiledDisapproveError === 0 ? 'black' : 'red'
                            };`"
                          >
                            Disapproval Reason:
                          </span>
                          <v-spacer></v-spacer>
                          <a-input
                            v-model="strFiledDisapprovalReason"
                            placeholder="Type here..."
                            type="textarea"
                            :style="`height:34px; width:100%; color:black; border:1px solid; border-radius:4px; border-color:${
                              intFiledDisapproveError === 0 ? 'black' : 'red'
                            };`"
                            @change="ChangeEditDisapproveReason()"
                            autoSize
                            allowClear
                          ></a-input>

                          <v-layout style="color: red; font-size: 15px">
                            <v-spacer></v-spacer>
                            <span v-if="intFiledDisapproveError === 1">
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
                                  ClickFiledOptions(
                                    objEditFiledLeaveDefault.LeaveOfAbsenceID,
                                    strPosition,
                                    'Disapprove',
                                    strFiledDisapprovalReason
                                  )
                                "
                              ></a-button>
                            </a-tooltip>
                          </div>
                        </v-col>
                      </v-row>
                    </template>
                  </a-popover>
                </div>
                <v-spacer></v-spacer>
              </v-layout>

              <v-layout v-else>
                <span style="padding-top: 4px">
                  {{
                    ViewApproverApproved(
                      objEditFiledLeaveDefault.isRecommendingApproved,
                      objEditFiledLeaveDefault.isApproverApproved,
                      objEditFiledLeaveDefault.isAdminApproved,
                      objEditFiledLeaveDefault.isAWOL
                    )
                  }}
                </span>
                <v-spacer></v-spacer>
                <a-tooltip
                  :title="`${objEditFiledLeaveDefault.ApproverDisApprovalReason}`"
                >
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
                <span style="padding-top: 4px">
                  {{
                    ViewAdminApproved(
                      objEditFiledLeaveDefault.isRecommendingApproved,
                      objEditFiledLeaveDefault.isApproverApproved,
                      objEditFiledLeaveDefault.isAdminApproved,
                      objEditFiledLeaveDefault.isAWOL
                    )
                  }}
                </span>
                <v-spacer></v-spacer>
                <a-tooltip
                  :title="`${objEditFiledLeaveDefault.AdminDisApprovalReason}`"
                >
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
        <!-- ================ Edit ============ -->

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
            <div
              v-if="CheckEditDisable() === true && blnViewFiledLeave === true"
              style="padding-top: 4px"
            >
              <span
                style="padding-right: 5px; font-size: 10px; font-family: arial"
              >
                Edit
              </span>
              <a-tooltip
                :title="
                  objEditFiledLeaveDefault.isAWOL === 1
                    ? `AWOL can't be edited.`
                    : `Leave already checked.`
                "
                placement="topRight"
              >
                <a-switch v-model="blnIsEdit" size="small" disabled></a-switch>
              </a-tooltip>
            </div>

            <div v-else style="padding-top: 4px">
              <span
                style="padding-right: 5px; font-size: 10px; font-family: arial"
              >
                Edit
              </span>
              <a-tooltip
                :title="
                  blnIsEdit === false
                    ? `Click to edit leave.`
                    : `Cancel editing.`
                "
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
                    title="This filed leave is about to be canceled. Continue?"
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
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import reportEmployeeLeaveSummary from "@/reports/EmployeeLeaveSummary.js";

export default {
  // ********************************************************************************** //
  // ====================================== Data ====================================== //
  // ********************************************************************************** //
  data() {
    return {
      strPosition: undefined,
      strEmployeeCode: undefined,
      strEmployeeName: undefined,
      strEmployeeAvatar: undefined,
      strSelectedLeaveID: undefined,
      strDateFiledFrom: undefined,
      strDateFiledTo: undefined,
      strLeaveFrom: undefined,
      strLeaveTo: undefined,
      strLeaveTypeCode: undefined,
      strReason: undefined,
      strDisapprovalReason: undefined,
      strFiledDisapprovalReason: undefined,
      strFiled: "ALL",
      strWithPay: "ALL",

      intEmployeeForFilingError: 0,
      intLeaveTypeError: 0,
      intLeaveFromError: 0,
      intLeaveToError: 0,
      intFiledDateError: 0,
      intNoOfWorkingDaysError: 0,
      intReasonError: 0,

      intEditLeaveTypeError: 0,
      intEditLeaveFromError: 0,
      intEditLeaveToError: 0,
      intEditFiledDateError: 0,
      intEditNoOfWorkingDaysError: 0,
      intEditReasonError: 0,
      intDisapproveError: 0,
      intFiledDisapproveError: 0,

      intLeader: 0,

      blnDataLoad: false,
      blnEmployeeSelectLoad: false,
      blnFileLeaveOfAbsenceDialog: false,
      blnCollapseVisible: true,
      blnViewFiledLeave: false,
      blnIsEdit: false,
      blnIsCanceled: false,
      blnIsVisiblePopConfirm: false,
      blnIsNotModified: false,
      blnFilingLoadingSave: false,
      blnEditLoadingSave: false,

      objUserInformation: {},
      objEmployeeInformation: {},
      objEditFiledLeaveDefault: {},
      objEmployeeForFiling: { Avatar: "Default Avatar.jpg" },
      objFileLeave: {
        LeaveOfAbsenceID: undefined,
        LeaveTypeCode: undefined,
        LeaveFrom: undefined,
        LeaveTo: undefined,
        FiledDate: moment(new Date()),
        NoOfWorkingDays: undefined,
        isFiled: true,
        isWithPay: false,
        isAWOL: false,
        Reason: undefined,
      },
      objEditFiledLeave: {
        LeaveOfAbsenceID: undefined,
        LeaveTypeCode: undefined,
        LeaveFrom: undefined,
        LeaveTo: undefined,
        FiledDate: undefined,
        NoOfWorkingDays: undefined,
        isFiled: false,
        isWithPay: false,
        isAWOL: false,
        Reason: undefined,
      },

      arrMembers: [],
      arrDepartments: [],
      arrSections: [],
      arrTeams: [],
      arrLeaveTypesFILTERED: [],
      arrLeaveTypesALL: [],
      arrLeaveDetailsALL: [],
      arrLeaveDetailsEmployee: [],
      arrAttachmentsFile: [],
      arrAttachmentsViewDefault: [],
      arrAttachmentsView: [],
      arrAttachmentsToDelete: [],
      arrAttachmentsToSave: [],
      arrActiveHeader: ["1"],
      arrFilterOptions: [{ Filter: "ALL" }, { Filter: "✔️" }, { Filter: "❌" }],

      arrEmployeeSummary: [],
      arrRestDay: [],
      arrHoliday: [],
    };
  },
  // ********************************************************************************** //
  // ===================================== Created ==================================== //
  // ********************************************************************************** //
  created() {
    this.blnDataLoad = true;
    this.objEmployeeInformation.Avatar = "Default Avatar.jpg";
    this.GetUserInformation();
    this.GetSystemAdminAccounts();

    let holidayPath = `${this.holiday_API}`;
    axios.get(holidayPath).then((res) => {
      this.arrHoliday = res.data;
    });
  },
  // ********************************************************************************** //
  // ===================================== Computed =================================== //
  // ********************************************************************************** //
  computed: {
    WorkingDays() {
      let totalDays = 0;
      let StartDate = moment(this.objFileLeave.LeaveFrom).format("YYYY-MM-DD");
      let maxLoopCnt =
        moment(moment(this.objFileLeave.LeaveTo).format("YYYY-MM-DD")).diff(
          moment(this.objFileLeave.LeaveFrom).format("YYYY-MM-DD"),
          "days"
        ) + 1;

      if (
        this.objFileLeave.LeaveFrom !== undefined &&
        this.objFileLeave.LeaveTo !== undefined
      ) {
        for (let x = 0; x < maxLoopCnt; x++) {
          let runDate = moment(StartDate).add(x, "days").format("YYYY-MM-DD");
          let isSunday =
            moment(runDate).format("ddd").toLowerCase().trim() == "sun";
          let Total = this.arrHoliday.indexOf(runDate.trim());
          let Total2 = this.arrRestDay.indexOf(runDate.trim());
          if (Total == -1 && !isSunday && Total2 == -1) {
            totalDays += 1;
          }
        }
      }
      return totalDays;
    },

    editWorkingDays() {
      // for edit

      let totalDays = 0;
      let StartDate = moment(this.objEditFiledLeave.LeaveFrom).format(
        "YYYY-MM-DD"
      );
      let maxLoopCnt =
        moment(
          moment(this.objEditFiledLeave.LeaveTo).format("YYYY-MM-DD")
        ).diff(
          moment(this.objEditFiledLeave.LeaveFrom).format("YYYY-MM-DD"),
          "days"
        ) + 1;

      if (
        this.objEditFiledLeave.LeaveFrom !== undefined &&
        this.objEditFiledLeave.LeaveTo !== undefined
      ) {
        for (let x = 0; x < maxLoopCnt; x++) {
          let runDate = moment(StartDate).add(x, "days").format("YYYY-MM-DD");
          let isSunday =
            moment(runDate).format("ddd").toLowerCase().trim() == "sun";
          let Total = this.arrHoliday.indexOf(runDate.trim());
          let Total2 = this.arrRestDay.indexOf(runDate.trim());
          if (Total == -1 && !isSunday && Total2 == -1) {
            totalDays += 1;
          }
        }
      }
      return totalDays;
    },

    compForApprovalLeaves() {
      let data = this.arrLeaveDetailsALL;

      if (this.strPosition === "DH") {
        data = data.filter((rec) => {
          return rec.Position === "SH";
        });
      }

      if (this.strPosition === "SH") {
        data = data.filter((rec) => {
          return rec.Position === "TH" || rec.Position === "Member";
        });
      }

      if (this.strPosition === "TH") {
        data = data.filter((rec) => {
          return rec.Position === "Member";
        });
      }

      if (
        this.strDateFiledFrom !== undefined &&
        this.strDateFiledFrom !== null &&
        this.strDateFiledFrom !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.FiledDate), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) >= moment(new Date(this.strDateFiledFrom)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strDateFiledTo !== undefined &&
        this.strDateFiledTo !== null &&
        this.strDateFiledTo !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.FiledDate), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) <= moment(new Date(this.strDateFiledTo)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveFrom !== undefined &&
        this.strLeaveFrom !== null &&
        this.strLeaveFrom !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.LeaveFrom), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) >= moment(new Date(this.strLeaveFrom)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveTo !== undefined &&
        this.strLeaveTo !== null &&
        this.strLeaveTo !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.LeaveTo), "YYYY/MM/DD").format("YYYY/MM/DD") <=
            moment(new Date(this.strLeaveTo)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveTypeCode !== undefined &&
        this.strLeaveTypeCode !== null &&
        this.strLeaveTypeCode !== ""
      ) {
        data = data.filter((rec) => {
          return (
            rec.LeaveTypeCode.toUpperCase() ===
            this.strLeaveTypeCode.toUpperCase()
          );
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
          return rec.ReasonForLeave.toUpperCase().includes(
            this.strReason.toUpperCase()
          );
        });
      }

      return data;
    },
    compEmployeeList() {
      let data = this.arrMembers;
      // console.log('all',this.arrMembers)
      return data.filter((Employees) => {
       let pos = ['002','003', '004'] // '001', '002', '003'
        if (
          this.objUserInformation.UserLevelDescription == "Section Head" &&
          Employees.EmployeeCode !== this.objUserInformation.EmployeeCode
        ) {
          return Employees;
        } else {
          
            // console.log('EmployeeCode',Employees.EmployeeCode,this.objUserInformation.EmployeeCode)
            // console.log('--',Employees.EmployeeCode != this.objUserInformation.EmployeeCode)
            // console.log('teamName',this.objUserInformation.TeamName,Employees.EmployeeTeam)
            // console.log('ELSE',this.objUserInformation.TeamName == Employees.EmployeeTeam)
            // console.log('---------------------------------------------------------------')


          if(pos.includes(this.objUserInformation.PositionCode)){
            if(this.objUserInformation.EmployeeCode != Employees.EmployeeCode){
              return Employees;
            }
          }else{
            return (this.objUserInformation.TeamName == Employees.EmployeeTeam && Employees.EmployeeCode != this.objUserInformation.EmployeeCode)
          }
        }
      });
    
      // let data = this.arrMembers
      //   data = data.filter(Employees => { return Employees.EmployeeCode !== this.objUserInformation.EmployeeCode})
      //   return data
    },
    compEmployeeLeaves() {
      let data = this.arrLeaveDetailsEmployee;

      if (
        this.strDateFiledFrom !== undefined &&
        this.strDateFiledFrom !== null &&
        this.strDateFiledFrom !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.FiledDate), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) >= moment(new Date(this.strDateFiledFrom)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strDateFiledTo !== undefined &&
        this.strDateFiledTo !== null &&
        this.strDateFiledTo !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.FiledDate), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) <= moment(new Date(this.strDateFiledTo)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveFrom !== undefined &&
        this.strLeaveFrom !== null &&
        this.strLeaveFrom !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.LeaveFrom), "YYYY/MM/DD").format(
              "YYYY/MM/DD"
            ) >= moment(new Date(this.strLeaveFrom)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveTo !== undefined &&
        this.strLeaveTo !== null &&
        this.strLeaveTo !== ""
      ) {
        data = data.filter((rec) => {
          return (
            moment(new Date(rec.LeaveTo), "YYYY/MM/DD").format("YYYY/MM/DD") <=
            moment(new Date(this.strLeaveTo)).format("YYYY/MM/DD")
          );
        });
      }

      if (
        this.strLeaveTypeCode !== undefined &&
        this.strLeaveTypeCode !== null &&
        this.strLeaveTypeCode !== ""
      ) {
        data = data.filter((rec) => {
          return (
            rec.LeaveTypeCode.toUpperCase() ===
            this.strLeaveTypeCode.toUpperCase()
          );
        });
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
        this.strReason !== undefined &&
        this.strReason !== null &&
        this.strReason !== ""
      ) {
        data = data.filter((rec) => {
          return rec.ReasonForLeave.toUpperCase().includes(
            this.strReason.toUpperCase()
          );
        });
      }

      return data;
    },
  },
  // ********************************************************************************** //
  // ====================================== Watch ===================================== //
  // ********************************************************************************** //
  watch: {
    arrActiveHeader() {
      if (this.arrActiveHeader[0] === "1") {
        this.blnCollapseVisible = true;
      } else if (this.arrActiveHeader[0] !== "1") {
        this.blnCollapseVisible = false;
      }
    },
    // WorkingDays(val){ // viewing kung tugma sa pag count ng restday, sunday at holiday
    //   console.log(val)
    // },
    // editWorkingDays(val){
    //   console.log(val)
    // },
  },
  // ********************************************************************************** //
  // ===================================== Methods ==================================== //
  // ********************************************************************************** //
  methods: {
    // ============================================================= //
    // ===================== Data Load Events ====================== //
    // ============================================================= //
    RunSocketIO() {
      this.$socket.on("GetLeadersForApprovalTable", () => {
        this.GetForApprovalLeaves();
      });

      this.$socket.on("GetLeadersForApprovalEmployeeTable", () => {
        this.GetEmployeeLeaves();
      });
    },
    async GetUserInformation() {
      let BasicInfoAPI = `${this.basicInfo_API}${this.DecryptText(
        this.$store.state.loa_user
      )}`;
      await axios
        .get(BasicInfoAPI, { headers: { "master-api": this.header_API } })
        .then((res) => {
          this.objUserInformation = res.data[0];
          this.GetDepartmentsSectionsTeams();
          this.GetPosition();
        });
    },
    GetPosition() {
      setTimeout(() => {
        let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${this.objUserInformation.CompanyCode}&PositionCode=${this.objUserInformation.PositionCode}`;
        axios.get(CheckPositionURL).then((Position) => {
          this.strPosition = Position.data[0].Position;

          // this is just for test ======
          // this.strPosition = "TH"
          // ============================

          this.CheckIfLeader();
          this.GetMembersList();
          // this.GetTLMember() // added
          // console.log('leader',this.intLeader) // pag intLeader === 2 is leader talaga
          if (this.intLeader === 2) {
            this.RunSocketIO();
            // this.GetMembersList() // dito talaga naka declear

            this.GetLeaveTypesFILTERED();
            this.GetLeaveTypesALL();

            if (
              this.strEmployeeCode !== undefined &&
              this.strEmployeeCode !== null &&
              this.strEmployeeCode !== ""
            ) {
              this.GetEmployeeLeaves();
            }
          }
        });
      }, 1500);
    },
    GetMembersList() {
      // dito pla sa pag print
      let EmployeeURL = undefined;
      let EmployeeCounter = 0;
      let EmployeeList = [];
      let UserRights = JSON.parse(
        this.DecryptText(this.$store.state.loa_user_rights)
      );
      // console.log("00", this.strPosition);
      // console.log('userrights', UserRights)
      if (this.strPosition === "DH" || UserRights.isAdmin == true) {
        EmployeeURL = `${this.employees_API}${this.objUserInformation.CompanyCode}/${this.objUserInformation.DepartmentCode}`;
      } else if (this.strPosition === "SH" || UserRights.isLeader == true) {
        EmployeeURL = `${this.employees_API}${this.objUserInformation.CompanyCode}/${this.objUserInformation.DepartmentCode}/${this.objUserInformation.SectionCode}`;
      } else if (this.strPosition === "TH") {
        EmployeeURL = `${this.employees_API}${this.objUserInformation.CompanyCode}/${this.objUserInformation.DepartmentCode}/${this.objUserInformation.SectionCode}/${this.objUserInformation.TeamCode}`;
      }

      axios
        .get(EmployeeURL, { headers: { "master-api": this.header_API } })
        .then((Employees) => {
          let Data = Employees.data.filter((Employee) => {
            return (
              Employee.ContractStatus.toUpperCase() !== "S" &&
              Employee.EmployeeStatus.toUpperCase() !== "SEPARATED" &&
              (Employee.SeparationDate === undefined ||
                Employee.SeparationDate === null ||
                Employee.SeparationDate === "" ||
                moment().format("YYYY/MM/DD") <=
                  moment(Employee.SeparationDate).format("YYYY/MM/DD"))
            );
          });

          Data.forEach((Record) => {
            EmployeeCounter++;
            EmployeeList.push({
              EmployeeCode: Record.EmployeeCode,
              EmployeeName: Record.EmployeeName,
              EmployeeFirstName: Record.FirstName,
              EmployeeLastName: Record.LastName,
              EmployeeTeam: Record.TeamName,
            });
          });

          if (EmployeeCounter === EmployeeList.length) {
            this.arrMembers = _.orderBy(
              EmployeeList,
              ["EmployeeName"],
              ["asc"]
            );
            this.$socket.emit("RequestLeadersForApprovalTable");
          }
        });
    },
    GetForApprovalLeaves() {
      let LeaveCounter = 0;
      let EmployeesLeaves = [];

      let CompanyCode = this.objUserInformation.CompanyCode;
      let DepartmentCode = this.objUserInformation.DepartmentCode;
      let SectionCode = this.objUserInformation.SectionCode;
      let TeamCode = this.objUserInformation.TeamCode;

      let GetForApprovalLeaves = `${this.api}GetForApprovalTable?CompanyCode=${CompanyCode}&DepartmentCode=${DepartmentCode}&SectionCode=${SectionCode}&TeamCode=${TeamCode}&Position=${this.strPosition}`;
      axios.get(GetForApprovalLeaves).then((res) => {
        let LeaveData = res.data;

        if (LeaveData.length === 0) {
          this.arrLeaveDetailsALL = [];
        }

        LeaveData.forEach((Data) => {
          let EmployeeBasicInfoAPI = `${this.basicInfo_API}${Data.EmployeeCode}`;
          axios
            .get(EmployeeBasicInfoAPI, {
              headers: { "master-api": this.header_API },
            })
            .then((Employee) => {
              LeaveCounter++;
              let EmployeeData = Employee.data[0];
              let RecommendingData = undefined;

              let RecommendingBasicInfoAPI = `${this.basicInfo_API}${Data.RecommendingEmployeeCode}`;
              axios
                .get(RecommendingBasicInfoAPI, {
                  headers: { "master-api": this.header_API },
                })
                .then((Recommending) => {
                  RecommendingData = Recommending.data[0];
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

                    DateRenewal: moment(new Date(Data.DateRenewal)).format(
                      "YYYY/MM/DD"
                    ),
                    TotalVacLeave: Data.TotalVacLeave,
                    TotalSickLeave: Data.TotalSickLeave,
                    LeaveTypeCode: Data.LeaveTypeCode,
                    LeaveFrom: moment(new Date(Data.LeaveFrom)).format(
                      "YYYY/MM/DD"
                    ),
                    LeaveTo: moment(new Date(Data.LeaveTo)).format(
                      "YYYY/MM/DD"
                    ),
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

                    ApproverEmployeeCode: null,
                    ApproverEmployeeAvatar: null,
                    ApproverEmployeeFirstName: null,
                    ApproverEmployeeLastName: null,
                    isApproverApproved: 0,
                    ApproverAssessedDate: null,
                    ApproverDisApprovalReason: null,
                    
                    AdminEmployeeCode: null,
                    AdminEmployeeAvatar: null,
                    AdminEmployeeFirstName: null,
                    AdminEmployeeLastName: null,
                    isAdminApproved: 0,
                    AdminAssessedDate: null,
                    AdminDisApprovalReason: null,

                    DisapprovePopOverVisible: false,
                  });
                  if (LeaveCounter === EmployeesLeaves.length) {
                    this.GetEmployeePosition(EmployeesLeaves);
                  }
                });
            });
        });
        if (LeaveData.length === 0) {
          this.blnDataLoad = false;
        }
      });
    },
    GetEmployeeLeaves() {
      let LeaveCounter = 0;
      let EmployeesLeaves = [];

      let EmployeeCode = this.strEmployeeCode;

      let GetEmployeeLeaves = `${this.api}GetForApprovalTableEmployee?EmployeeCode=${EmployeeCode}`;
      axios.get(GetEmployeeLeaves).then((res) => {
        let LeaveData = res.data;

        if (LeaveData.length === 0) {
          this.arrLeaveDetailsEmployee = [];
        }

        this.objEmployeeInformation.LeaveWithoutPay = 0;

        LeaveData.forEach((Data) => {
          LeaveCounter++;
          let RecommendingData = undefined;

     
          if(Data.WithPay === 0 || Data.excess){
            // this.objEmployeeInformation.LeaveWithoutPay += Data.NoOfWorkingDays
              this.objEmployeeInformation.LeaveWithoutPay += Data.excess;
            }

          let RecommendingBasicInfoAPI = `${this.basicInfo_API}${Data.RecommendingEmployeeCode}`;
          axios
            .get(RecommendingBasicInfoAPI, {
              headers: { "master-api": this.header_API },
            })
            .then((Recommending) => {
              RecommendingData = Recommending.data[0];
              let ApproverData = undefined;

              let ApproverBasicInfoAPI = `${this.basicInfo_API}${Data.ApproverEmployeeCode}`;
              axios
                .get(ApproverBasicInfoAPI, {
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
                      EmployeesLeaves.push({
                        LeaveOfAbsenceID: Data.LeaveOfAbsenceID,
                        CompanyCode: Data.CompanyCode,
                        DepartmentCode: Data.DepartmentCode,
                        SectionCode: Data.SectionCode,
                        TeamCode: Data.TeamCode,
                        EmployeeCode: Data.EmployeeCode,
                        DateRenewal: moment(new Date(Data.DateRenewal)).format(
                          "YYYY/MM/DD"
                        ),
                        TotalVacLeave: Data.TotalVacLeave,
                        TotalSickLeave: Data.TotalSickLeave,
                        LeaveTypeCode: Data.LeaveTypeCode,
                        LeaveFrom: moment(new Date(Data.LeaveFrom)).format(
                          "YYYY/MM/DD"
                        ),
                        LeaveTo: moment(new Date(Data.LeaveTo)).format(
                          "YYYY/MM/DD"
                        ),
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
                        ApproverDisApprovalReason:
                          Data.ApproverDisApprovalReason,

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
                      if (LeaveCounter === EmployeesLeaves.length) {
                        this.arrLeaveDetailsEmployee = _.orderBy(
                          EmployeesLeaves,
                          ["FiledDate", "LeaveOfAbsenceID"],
                          ["desc", "desc"]
                        );
                        this.blnDataLoad = false;
                      }
                    });
                });
            });
        });
        if (LeaveData.length === 0) {
          this.blnDataLoad = false;
        }
      });
    },
    GetAttachments(ID) {
      axios.get(`${this.api}/GetAttachments?ID=${ID}`).then((res) => {
        this.arrAttachmentsViewDefault = res.data;
        let DefaultData = this.arrAttachmentsViewDefault.map((Data) => {
          return Data;
        });
        this.arrAttachmentsView = DefaultData;
      });
    },
    GetDepartmentsSectionsTeams() {
      let DepartmentsAPI = `${this.departments_API}${this.objUserInformation.CompanyCode}`
      axios.get(DepartmentsAPI, {headers:{'master-api' : this.header_API}}).then(Departments => {
        this.arrDepartments = Departments.data
      })

      let SectionsAPI = `${this.sections_API}${this.objUserInformation.CompanyCode}`
      axios.get(SectionsAPI, {headers:{'master-api' : this.header_API}}).then(Sections => {
        this.arrSections = Sections.data
      })

      let TeamsAPI = `${this.teams_API}${this.objUserInformation.CompanyCode}`;
      axios
        .get(TeamsAPI, { headers: { "master-api": this.header_API } })
        .then((Teams) => {
          this.arrTeams = Teams.data;
        });
    },
    GetLeaveTypesFILTERED() {
      let GetLeaveTypesURL = `${this.api}GetLeaveTypesFILTERED`;
      axios.get(GetLeaveTypesURL).then((res) => {
        this.arrLeaveTypesFILTERED = res.data;
      });
    },
    GetLeaveTypesALL() {
      let GetLeaveTypesURL = `${this.api}GetLeaveTypesALL`;
      axios.get(GetLeaveTypesURL).then((res) => {
        this.arrLeaveTypesALL = res.data;
      });
    },
    GetLeaveTypeName(LeaveTypeCode) {
      let data = this.arrLeaveTypesALL.find((rec) => {
        return rec.LeaveTypeCode == LeaveTypeCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        return data.LeaveTypeDesc;
      } else {
        return "NONE";
      }
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
    GetEmployeeName(EmployeeCode, isFullName, isFirstName, isLastName) {
      let data = this.arrMembers.find((rec) => {
        return rec.EmployeeCode === EmployeeCode;
      });
      if (data !== undefined && data !== null && data !== "") {
        if (isFullName === 1) {
          return data.EmployeeName; // dito nakukuha
        } else if (isFirstName === 1) {
          return data.EmployeeFirstName;
        } else if (isLastName === 1) {
          return data.EmployeeLastName;
        }
      } else {
        return "NULL";
      }
      console.log("pakita kana", data.EmployeeName);
    },

    GetAdminName(EmployeeCode) {
      // dagdag ni sir gads
      if (
        this.arrAdminNames !== undefined &&
        this.arrAdminNames !== null &&
        this.arrAdminNames !== ""
      ) {
        let data = this.arrAdminNames.find((rec) => {
          return rec.EmployeeCode === EmployeeCode;
        });
        return data === undefined ? "" : data.EmployeeName;
      }
    },

    GetSystemAdminAccounts() {
      // dagdag ni sir gads
      let GetAdminNamesURL = `${this.api}GetAdminNames`;
      axios.get(GetAdminNamesURL).then((AdminNames) => {
        this.arrAdminNames = AdminNames.data;
      });
    },

    GetEmployeePosition(EmployeesLeaves) {
      let LeaveCounter = 0;
      EmployeesLeaves.forEach((LeaveData) => {
        let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${LeaveData.CompanyCode}&PositionCode=${LeaveData.PositionCode}`;
        axios.get(CheckPositionURL).then((Position) => {
          LeaveCounter++;
          LeaveData.Position = Position.data[0].Position;

          if (LeaveCounter === EmployeesLeaves.length) {
            this.arrLeaveDetailsALL = _.orderBy(
              EmployeesLeaves,
              ["FiledDate", "LeaveOfAbsenceID"],
              ["desc", "desc"]
            );
            this.blnDataLoad = false;
          }
        });
      });
    },
    CheckEmployeeForFiling() {
      if (
        this.objEmployeeForFiling.EmployeeCode !== undefined &&
        this.objEmployeeForFiling.EmployeeCode !== null &&
        this.objEmployeeForFiling.EmployeeCode !== ""
      ) {

        let BasicInfoAPI = `${this.basicInfo_API}${this.objEmployeeForFiling.EmployeeCode}`;
        axios.get(BasicInfoAPI, {headers: {"master-api": this.header_API}}).then((res) => {
            let Data = res.data[0];
            axios.get(`http://10.169.142.40:6001/api/GetLeaveData${this.ref.ShortName}/${this.objEmployeeForFiling.EmployeeCode}`).then(res => {
                let LeaveCredits = res.data[0]
              this.objEmployeeForFiling = Data;
              this.objEmployeeForFiling.FormattedDateHired = moment(
                new Date(this.objEmployeeForFiling.DateHired)
              ).format("MMMM DD, YYYY");

              let DateToday = moment(new Date(), "YYYY/MM/DD");
              let DateHiredDefault = moment(
                new Date(this.objEmployeeForFiling.DateHired),
                "YYYY/MM/DD"
              );
              let DateHired = moment(DateHiredDefault.subtract(8, "h"));

              let Years = DateToday.diff(DateHired, "year");
              DateHired.add(Years, "years");

              let Months = DateToday.diff(DateHired, "months");
              DateHired.add(Months, "months");

              var Days = DateToday.diff(DateHired, "days");
              DateHired.add(Days, "days");

              this.objEmployeeForFiling.FormattedDateRenew = moment(
                new Date(this.objEmployeeForFiling.DateHired),
                "YYYY/MM/DD"
              )
                .add(Years, "years")
                .format("MMMM DD, YYYY");
              this.objEmployeeForFiling.FormattedLengthOfService =
                Years +
                " year(s), " +
                Months +
                " month(s), and " +
                Days +
                " day(s) ";

              this.objEmployeeForFiling.Avatar = `${this.avatar_API}${this.objEmployeeForFiling.EmployeeCode}.jpg`;
              this.objEmployeeForFiling.TotalVacationLeave = LeaveCredits.VacBegin;
              this.objEmployeeForFiling.TotalSickLeave = LeaveCredits.SickLeaveBeg;
              this.objEmployeeForFiling.RemainingVacationLeave = this.objEmployeeForFiling.TotalVacationLeave - LeaveCredits.VacUsed;
              this.objEmployeeForFiling.RemainingSickLeave = this.objEmployeeForFiling.TotalSickLeave - LeaveCredits.SickLeaveUsed;
              this.CheckCheckboxValues( this.objFileLeave.LeaveTypeCode, this.objFileLeave.isAWOL);
              this.blnEmployeeSelectLoad = false;
            });
          });
        let restdayDay = `${this.restday_API}${this.objEmployeeForFiling.EmployeeCode}`; // ito ung mga employee kung sino ung finag fifile nya ng leave
        axios.get(restdayDay).then((res) => {
          this.arrRestDay = res.data.map((rec) => rec.RestDay);
        });
      } else {
        this.objEmployeeForFiling = { Avatar: "Default Avatar.jpg" };
        this.blnEmployeeSelectLoad = false;
      }
    },
    
    CheckCheckboxValues(LeaveTypeCode, isAWOL) {
      if (isAWOL === true) {
        this.objFileLeave.isWithPay = false;
      } else if (
        LeaveTypeCode === undefined ||
        LeaveTypeCode === null ||
        LeaveTypeCode === ""
      ) {
        this.objFileLeave.isWithPay = false;
      } else if (
        LeaveTypeCode === "2" &&
        this.objEmployeeForFiling.RemainingSickLeave > 0
      ) {
        this.objFileLeave.isWithPay = true;
      } else if (
        LeaveTypeCode !== "2" &&
        this.objEmployeeForFiling.RemainingVacationLeave > 0
      ) {
        this.objFileLeave.isWithPay = true;
      } else if (LeaveTypeCode === "9") {
        this.objFileLeave.isWithPay = false;
      } else {
        this.objFileLeave.isWithPay = false;
      }
    },
    CheckIfLeader() {
      let UserRights = JSON.parse(
        this.DecryptText(this.$store.state.loa_user_rights)
      );

      if (UserRights.isLeader !== true) {
        this.intLeader = 1;
      } else {
        this.intLeader = 2;
      }
    },
    // ============================================================= //
    // ===================== User Action Events ==================== //
    // ============================================================= //
    ClickSelectEmployee() {
      // dito nakukuha
      this.strSelectedLeaveID = undefined;
      if (
        this.strEmployeeCode !== undefined &&
        this.strEmployeeCode !== null &&
        this.strEmployeeCode !== ""
      ) {
        this.blnDataLoad = true;

        let BasicInfoAPI = `${this.basicInfo_API}${this.strEmployeeCode}`;
        axios
          .get(BasicInfoAPI, { headers: { "master-api": this.header_API } })
          .then((res) => {
            this.objEmployeeInformation = res.data[0];
            this.objEmployeeInformation.Avatar = `${this.avatar_API}${this.strEmployeeCode}.jpg`;
            this.objEmployeeInformation.FormattedDateHired = moment(
              new Date(this.objEmployeeInformation.DateHired)
            ).format("MMMM DD, YYYY");

            let DateToday = moment(new Date(), "YYYY/MM/DD");
            let DateHiredDefault = moment(
              new Date(this.objEmployeeInformation.DateHired),
              "YYYY/MM/DD"
            );
            let DateHired = moment(DateHiredDefault.subtract(8, "h"));

            let Years = DateToday.diff(DateHired, "year");
            DateHired.add(Years, "years");

            let Months = DateToday.diff(DateHired, "months");
            DateHired.add(Months, "months");

            var Days = DateToday.diff(DateHired, "days");
            DateHired.add(Days, "days");

            this.objEmployeeInformation.FormattedDateRenew = moment(
              new Date(this.objEmployeeInformation.DateHired),
              "YYYY/MM/DD"
            )
              .add(Years, "years")
              .format("MMMM DD, YYYY");
            this.objEmployeeInformation.FormattedLengthOfService =
              Years +
              " year(s), " +
              Months +
              " month(s), and " +
              Days +
              " day(s) ";

            let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${this.objEmployeeInformation.CompanyCode}&PositionCode=${this.objEmployeeInformation.PositionCode}`;
            axios.get(CheckPositionURL).then((Position) => {
              this.objEmployeeInformation.Position = Position.data[0].Position;
              axios.get(`http://10.169.142.40:6001/api/GetLeaveData${this.ref.ShortName}/${this.strEmployeeCode}`).then(res => {
                let LeaveCredits = res.data[0]
                this.objEmployeeInformation.TotalVacationLeave = LeaveCredits.VacBegin;
                this.objEmployeeInformation.TotalVacationUsed = LeaveCredits.VacUsed;
                this.objEmployeeInformation.TotalSickLeave = LeaveCredits.SickLeaveBeg;
                this.objEmployeeInformation.TotalSickUsed = LeaveCredits.SickLeaveUsed;
                this.objEmployeeInformation.TotalLeaveCredits = `VL: ${LeaveCredits.VacBegin}       SL: ${LeaveCredits.SickLeaveBeg}`
                this.objEmployeeInformation.TotalLeaveUsed = `VL: ${LeaveCredits.VacUsed}         SL: ${LeaveCredits.SickLeaveUsed}`
                this.objEmployeeInformation.RemainingVacationLeave = this.objEmployeeInformation.TotalVacationLeave - LeaveCredits.VacUsed;
                this.objEmployeeInformation.RemainingSickLeave = this.objEmployeeInformation.TotalSickLeave - LeaveCredits.SickLeaveUsed;
                this.objEmployeeInformation.RemainingLeave = `VL: ${this.objEmployeeInformation.RemainingVacationLeave}       SL: ${this.objEmployeeInformation.RemainingSickLeave}`;

                
                this.$socket.emit("RequestLeadersForApprovalEmployeeTable");
              });
            });
          });
        let restdayDay = `${this.restday_API}${this.strEmployeeCode}`; // ito ung mga employee kung sino ung finag fifile nya ng leave
        axios.get(restdayDay).then((res) => {
          this.arrRestDay = res.data.map((rec) => rec.RestDay);
        });
      } else {
        this.objEmployeeInformation = { Avatar: "Default Avatar.jpg" };
      }
    },
    ChangeEmployeeForFiling() {
      this.intEmployeeForFilingError = 0;
      this.blnEmployeeSelectLoad = true;
      this.objEmployeeForFiling.Avatar = "Default Avatar.jpg";
      this.objEmployeeForFiling.RemainingVacationLeave = undefined;
      this.objEmployeeForFiling.RemainingSickLeave = undefined;
      this.CheckEmployeeForFiling();
    },
    ChangeLeaveType() {
      this.intLeaveTypeError = 0;
      this.CheckCheckboxValues(
        this.objFileLeave.LeaveTypeCode,
        this.objFileLeave.isAWOL
      );
    },
    ChangeLeaveFrom() {
      this.intLeaveFromError = 0;
      if (this.intLeaveToError === 2) {
        this.intLeaveToError = 0;
      }
      this.ChangeLeaveTo();
    },
    ChangeLeaveTo() {
      this.objFileLeave.NoOfWorkingDays =
        this.WorkingDays == 0 && this.objFileLeave.LeaveTo
          ? this.WorkingDays + 1
          : this.WorkingDays == 0
          ? ""
          : this.WorkingDays;
      if (this.intLeaveFromError === 2) {
        this.intLeaveFromError = 0;
      }
      this.intLeaveToError = 0;
    },
    ChangeFiledDate() {
      this.intFiledDateError = 0;
    },
    ChangeNoOfWorkingDays() {
      this.intNoOfWorkingDaysError = 0;
    },
    ChangeIsFiled() {
      // this.objFileLeave.isAWOL = false
    },
    ChangeIsAWOL() {
      // // this.objFileLeave.isFiled = false
      // this.CheckCheckboxValues(this.objFileLeave.LeaveTypeCode, this.objFileLeave.isAWOL)
    },
    ChangeReason() {
      this.intReasonError = 0;
    },
    ChangeEditLeaveType() {
      this.intEditLeaveTypeError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditLeaveFrom() {
      this.objEditFiledLeave.NoOfWorkingDays =
        this.editWorkingDays == 0
          ? this.editWorkingDays + 1
          : this.editWorkingDays;
      this.intEditLeaveFromError = 0;
      if (this.intEditLeaveToError === 2) {
        this.intEditLeaveToError = 0;
      }
      this.blnIsNotModified = false;
    },
    ChangeEditLeaveTo() {
      this.objEditFiledLeave.NoOfWorkingDays =
        this.editWorkingDays == 0
          ? this.editWorkingDays + 1
          : this.editWorkingDays;
      if (this.intEditLeaveFromError === 2) {
        this.intEditLeaveFromError = 0;
      }
      this.intEditLeaveToError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditFiledDate() {
      this.intEditFiledDateError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditNoOfWorkingDays() {
      this.intEditNoOfWorkingDaysError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditReason() {
      this.intEditReasonError = 0;
      this.blnIsNotModified = false;
    },
    ChangeEditCancel() {
      this.blnIsNotModified = false;
    },
    ChangeEditCancelReason() {
      this.blnIsNotModified = false;
    },
    ChangeDisapproveReason() {
      this.intDisapproveError = 0;
    },
    ChangeEditDisapproveReason() {
      this.intFiledDisapproveError = 0;
    },
    // ============================================== LEAVE TABLE OPTIONS
    ClickDisapprove(Data) {
      if (
        this.strEmployeeCode === undefined ||
        this.strEmployeeCode === null ||
        this.strEmployeeCode === ""
      ) {
        let opened = this.arrLeaveDetailsALL.find((rec) => {
          return rec.DisapprovePopOverVisible === true;
        });
        let openedIndex = this.arrLeaveDetailsALL.indexOf(opened);
        if (openedIndex !== -1)
          this.arrLeaveDetailsALL[openedIndex].DisapprovePopOverVisible = false;

        let close = this.arrLeaveDetailsALL.find((rec) => {
          return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
        });
        let closeIndex = this.arrLeaveDetailsALL.indexOf(close);
        this.arrLeaveDetailsALL[closeIndex].DisapprovePopOverVisible = true;
      } else {
        let opened = this.arrLeaveDetailsEmployee.find((rec) => {
          return rec.DisapprovePopOverVisible === true;
        });
        let openedIndex = this.arrLeaveDetailsEmployee.indexOf(opened);
        if (openedIndex !== -1)
          this.arrLeaveDetailsEmployee[
            openedIndex
          ].DisapprovePopOverVisible = false;

        let close = this.arrLeaveDetailsEmployee.find((rec) => {
          return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
        });
        let closeIndex = this.arrLeaveDetailsEmployee.indexOf(close);
        this.arrLeaveDetailsEmployee[
          closeIndex
        ].DisapprovePopOverVisible = true;
      }
      this.strDisapprovalReason = undefined;
      this.intDisapproveError = 0;
    },
    ClickCloseDisapprove(Data) {
      if (
        this.strEmployeeCode === undefined ||
        this.strEmployeeCode === null ||
        this.strEmployeeCode === ""
      ) {
        let opened = this.arrLeaveDetailsALL.find((rec) => {
          return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
        });
        let openedIndex = this.arrLeaveDetailsALL.indexOf(opened);
        this.arrLeaveDetailsALL[openedIndex].DisapprovePopOverVisible = false;
      } else {
        let opened = this.arrLeaveDetailsEmployee.find((rec) => {
          return rec.LeaveOfAbsenceID === Data.LeaveOfAbsenceID;
        });
        let openedIndex = this.arrLeaveDetailsEmployee.indexOf(opened);
        this.arrLeaveDetailsEmployee[
          openedIndex
        ].DisapprovePopOverVisible = false;
      }

      this.strDisapprovalReason = undefined;
      this.intDisapproveError = 0;
    },
    ClickOptions(ID, Position, Action, DisapprovalReason) {
      this.intDisapproveError = 0;

      if (Action === "Approve") {
        this.OptionApprove(ID, Position);
      } else if (Action === "Disapprove") {
        this.OptionDisapprove(ID, Position, DisapprovalReason);
      }
    },
    OptionApprove(ID, Position) {
      let UpdateQuery = "";
      if (Position === "TH") {
        UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                    SET RecommendingEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                        isRecommendingApproved = 1,
                        RecommendingAssessedDate = GETDATE(),
                        UpdatedDate = GETDATE(),
                        UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                  WHERE LeaveOfAbsenceID = ${ID}`;
      } else if (Position === "SH" || Position === "DH") {
        UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                    SET ApproverEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                        isApproverApproved = 1,
                        ApproverAssessedDate = GETDATE(),
                        UpdatedDate = GETDATE(),
                        UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                  WHERE LeaveOfAbsenceID = ${ID}`;
      }

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
        this.$socket.emit('RequestUsersLeaveTable')
        this.$socket.emit('RequestForApprovalCount')
        this.$socket.emit('RequestAdminListCount')
        this.$socket.emit('RequestAdminListTable')
        this.$socket.emit('RequestLeadersForApprovalTable')
        this.$socket.emit('RequestLeadersForApprovalEmployeeTable')

      });
    },
    
    OptionDisapprove(ID, Position, DisapprovalReason) {
      if (
        DisapprovalReason === undefined ||
        DisapprovalReason === null ||
        DisapprovalReason === ""
      ) {
        this.intDisapproveError = 1;
      } else {
        let UpdateQuery = "";

        if (
          this.strEmployeeCode === undefined ||
          this.strEmployeeCode === null ||
          this.strEmployeeCode === ""
        ) {
          let opened = this.arrLeaveDetailsALL.find((rec) => {
            return rec.LeaveOfAbsenceID === ID;
          });
          this.ClickCloseDisapprove(opened);
        } else {
          let opened = this.arrLeaveDetailsEmployee.find((rec) => {
            return rec.LeaveOfAbsenceID === ID;
          });
          this.ClickCloseDisapprove(opened);
        }

        if (Position === "TH") {
          UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                      SET RecommendingEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                          isRecommendingApproved = 2,
                          RecommendingAssessedDate = GETDATE(),
                          RecommendingDisApprovalReason = '${DisapprovalReason}',
                          UpdatedDate = GETDATE(),
                          UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                    WHERE LeaveOfAbsenceID = ${ID}`;
        } else if (Position === "SH" || Position === "DH") {
          UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                      SET ApproverEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                          isApproverApproved = 2,
                          ApproverAssessedDate = GETDATE(),
                          ApproverDisApprovalReason = '${DisapprovalReason}',
                          UpdatedDate = GETDATE(),
                          UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                    WHERE LeaveOfAbsenceID = ${ID}`;
        }
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
                Leave has been disapproved.{" "}
              </div>
            ),
            duration: 10,
          });

          this.$socket.emit('RequestUsersLeaveTable');
          this.$socket.emit('RequestForApprovalCount');
          this.$socket.emit('RequestAdminListCount');
          this.$socket.emit('RequestAdminListTable');
          this.$socket.emit('RequestLeadersForApprovalTable');
          this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
        });
      }
    },
    // ============================================== FILED LEAVE OPTIONS
    ClickFiledDisapprove() {
      this.strFiledDisapprovalReason = undefined;
      this.intFiledDisapproveError = 0;
    },
    ClickFiledOptions(ID, Position, Action, DisapprovalReason) {
      this.intFiledDisapproveError = 0;

      if (Action === "Approve") {
        this.OptionFiledApprove(ID, Position);
      } else if (Action === "Disapprove") {
        this.OptionFiledDisapprove(ID, Position, DisapprovalReason);
      }
    },
    OptionFiledApprove(ID, Position) {
      let UpdateQuery = "";

      if (Position === "TH") {
        UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                    SET RecommendingEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                        isRecommendingApproved = 1,
                        RecommendingAssessedDate = GETDATE(),
                        UpdatedDate = GETDATE(),
                        UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                  WHERE LeaveOfAbsenceID = ${ID}`;
      } else if (Position === "SH" || Position === "DH") {
        UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                    SET ApproverEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                        isApproverApproved = 1,
                        ApproverAssessedDate = GETDATE(),
                        UpdatedDate = GETDATE(),
                        UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                  WHERE LeaveOfAbsenceID = ${ID}`;
      }

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

        this.$socket.emit('RequestUsersLeaveTable');
        this.$socket.emit('RequestForApprovalCount');
        this.$socket.emit('RequestAdminListCount');
        this.$socket.emit('RequestAdminListTable');
        this.$socket.emit('RequestLeadersForApprovalTable');
        this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
        this.ClickFiledLeaveClose();
      });
    },
    OptionFiledDisapprove(ID, Position, DisapprovalReason) {
      if (
        DisapprovalReason === undefined ||
        DisapprovalReason === null ||
        DisapprovalReason === ""
      ) {
        this.intFiledDisapproveError = 1;
      } else {
        let UpdateQuery = "";

        if (Position === "TH") {
          UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                      SET RecommendingEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                          isRecommendingApproved = 2,
                          RecommendingAssessedDate = GETDATE(),
                          RecommendingDisApprovalReason = '${DisapprovalReason}',
                          UpdatedDate = GETDATE(),
                          UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                    WHERE LeaveOfAbsenceID = ${ID}`;
        } else if (Position === "SH" || Position === "DH") {
          UpdateQuery = `UPDATE dbo.LeaveOfAbsenceApprovals
                      SET ApproverEmployeeCode = '${this.objUserInformation.EmployeeCode}',
                          isApproverApproved = 2,
                          ApproverAssessedDate = GETDATE(),
                          ApproverDisApprovalReason = '${DisapprovalReason}',
                          UpdatedDate = GETDATE(),
                          UpdatedUserID = '${this.objUserInformation.EmployeeCode}'
                    WHERE LeaveOfAbsenceID = ${ID}`;
        }
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
                Leave has been disapproved.{" "}
              </div>
            ),
            duration: 10,
          });

          this.$socket.emit('RequestUsersLeaveTable');
          this.$socket.emit('RequestForApprovalCount');
          this.$socket.emit('RequestAdminListCount');
          this.$socket.emit('RequestAdminListTable');
          this.$socket.emit('RequestLeadersForApprovalTable');
          this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
          this.ClickFiledLeaveClose();
        });
      }
    },
    // ================================================ PRINT ========================================== //
    ClickPrintEmployeeSummaryToPDF() {
      this.arrEmployeeSummary = [];

      let LatestRenewDate = moment(
        new Date(this.objEmployeeInformation.FormattedDateRenew)
      );
      let HiredDate = moment(
        new Date(this.objEmployeeInformation.FormattedDateHired)
      );

      for (let GapCounter = 1; HiredDate <= LatestRenewDate; GapCounter++) {
        this.arrEmployeeSummary.push({
          DateRenew: moment(new Date(LatestRenewDate)).format("YYYY/MM/DD"),
        });
        LatestRenewDate = moment(new Date(LatestRenewDate.subtract(1, "y")));
      }

      let RenewDateCounter = 0;

      this.arrEmployeeSummary.forEach((RenewDate) => {
        let GetEmployeeLeaveSummaryURL = `${this.api}GetEmployeeLeaveSummary?EmployeeCode=${this.objEmployeeInformation.EmployeeCode}&DateRenewal=${RenewDate.DateRenew}`;
        axios.get(GetEmployeeLeaveSummaryURL).then((res) => {
          RenewDateCounter++;

          let LeaveWithPay = 0;
          let LeaveWithoutPay = 0;
          let Suspension = 0;
          let MaternityPaternity = 0;
          let Bereavement = 0;
          let Indefinite = 0;

          let EmployeeLeaveSummary = res.data;

          if (EmployeeLeaveSummary.length > 0) {
            RenewDate.LeaveDetails = [];

            EmployeeLeaveSummary.forEach((Leave) => {
              LeaveWithPay =
                Leave.WithPay === 1
                  ? LeaveWithPay + Leave.NoOfWorkingDays
                  : LeaveWithPay + 0;
              LeaveWithoutPay =
                Leave.WithPay === 0
                  ? LeaveWithoutPay + Leave.NoOfWorkingDays
                  : LeaveWithoutPay + 0;
              Suspension =
                Leave.LeaveTypeCode === "7"
                  ? Suspension + Leave.NoOfWorkingDays
                  : Suspension + 0;
              MaternityPaternity =
                Leave.LeaveTypeCode === "6" || Leave.LeaveTypeCode === "4"
                  ? MaternityPaternity + Leave.NoOfWorkingDays
                  : MaternityPaternity + 0;
              Bereavement =
                Leave.LeaveTypeCode === "5"
                  ? Bereavement + Leave.NoOfWorkingDays
                  : Bereavement + 0;
              Indefinite =
                Leave.LeaveTypeCode === "I"
                  ? Indefinite + Leave.NoOfWorkingDays
                  : Indefinite + 0;

              RenewDate.LeaveDetails.push({
                LeaveOfAbsenceID: Leave.LeaveOfAbsenceID,
                DateFiled: Leave.FiledDate,
                LeaveFrom: Leave.LeaveFrom,
                LeaveTo: Leave.LeaveTo,
                LeaveType: this.GetLeaveTypeName(Leave.LeaveTypeCode),
                WithPay: Leave.WithPay === 1 ? true : false,
                NoOfWorkingDays: Leave.NoOfWorkingDays,
                Reason: Leave.ReasonForLeave,
                Filed: Leave.isFiled === 1 ? true : false,
                AWOL: Leave.isAWOL === 1 ? true : false,
                isRecommendingApproved: Leave.isRecommendingApproved,
                RecommendingApproval: this.GetEmployeeName(
                  Leave.RecommendingEmployeeCode,
                  1,
                  0,
                  0
                ),
                isApproverApproved: Leave.isApproverApproved,
                Approver: this.GetEmployeeName(
                  Leave.ApproverEmployeeCode,
                  1,
                  0,
                  0
                ),
                isAdminApproved: Leave.isAdminApproved,
                Admin: this.GetAdminName(Leave.AdminEmployeeCode, 1, 0, 0),
              });
            });

            RenewDate.SickLeaveCredit = EmployeeLeaveSummary[0].TotalSickLeave;
            RenewDate.VacationLeaveCredit =
              EmployeeLeaveSummary[0].TotalVacLeave;
            RenewDate.LeaveWithPay = LeaveWithPay;
            RenewDate.LeaveWithoutPay = LeaveWithoutPay;
            RenewDate.Suspension = Suspension;
            RenewDate.MaternityPaternity = MaternityPaternity;
            RenewDate.Bereavement = Bereavement;
            RenewDate.Indefinite = Indefinite;
          }

          if (RenewDateCounter === this.arrEmployeeSummary.length) {
            let EmployeeName = this.GetEmployeeName(
              this.strEmployeeCode,
              1,
              0,
              0
            );
            reportEmployeeLeaveSummary(EmployeeName, this.arrEmployeeSummary);
          }
        });
      });
    },
    // ===================================== ADD ============================================= //
    ClickFileLeaveOfAbsence() {
      this.intEmployeeForFilingError = 0;
      this.intLeaveTypeError = 0;
      this.intLeaveFromError = 0;
      this.intLeaveToError = 0;
      this.intFiledDateError = 0;
      this.intNoOfWorkingDaysError = 0;
      this.intReasonError = 0;
      if (
        this.strEmployeeCode !== undefined &&
        this.strEmployeeCode !== null &&
        this.strEmployeeCode !== ""
      ) {
        this.objEmployeeForFiling = this.objEmployeeInformation;
      } else {
        this.objEmployeeForFiling = { Avatar: "Default Avatar.jpg" };
      }
      this.objFileLeave = {
        LeaveOfAbsenceID: undefined,
        LeaveTypeCode: undefined,
        LeaveFrom: undefined,
        LeaveTo: undefined,
        FiledDate: moment(new Date()),
        NoOfWorkingDays: undefined,
        isFiled: true,
        isWithPay: false,
        isAWOL: false,
        Reason: undefined,
      };
      this.arrAttachmentsFile = [];
      this.blnFileLeaveOfAbsenceDialog = true;
    },
    ClickFileLeaveOfAbsenceHalfDay() {
      let Value = 0;
      if (
        this.objFileLeave.NoOfWorkingDays !== undefined &&
        this.objFileLeave.NoOfWorkingDays !== null &&
        this.objFileLeave.NoOfWorkingDays !== ""
      ) {
        Value = this.objFileLeave.NoOfWorkingDays;
      }
      this.intNoOfWorkingDaysError = 0;
      this.objFileLeave.NoOfWorkingDays = parseFloat(Value) + 0.5;
    },
    ClickFileLeaveOfAbsenceAttachFile() {
      this.$refs.fileleaveofabsencefile.value = null;
      this.$refs.fileleaveofabsencefile.click();
    },
    FileLeaveOfAbsenceFileUpload() {
      let Attachments = this.$refs.fileleaveofabsencefile.files;

      Attachments.forEach((File) => {
        let isExist = false;

        this.arrAttachmentsFile.forEach((FileToUpload) => {
          if (File.name.toUpperCase() === FileToUpload.name.toUpperCase()) {
            isExist = true;
          }
        });

        if (isExist === false) {
          this.arrAttachmentsFile.push(File);
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
                A file with the name{" "}
                <div style="font-size:16px;"> {File.name} </div> is already in
                the list for uploading.{" "}
              </div>
            ),
            duration: 10,
          });
        }
      });
    },
    ClickFileLeaveOfAbsenceRemoveFile(file) {
      let index = this.arrAttachmentsFile.indexOf(file);
      this.arrAttachmentsFile.splice(index, 1);
    },
    ClickFileLeaveOfAbsenceSave() {
      this.FileLeaveOfAbsenceCheck();
      if (
        this.intEmployeeForFilingError === 0 &&
        this.intLeaveTypeError === 0 &&
        this.intLeaveFromError === 0 &&
        this.intLeaveToError === 0 &&
        this.intFiledDateError === 0 &&
        this.intNoOfWorkingDaysError === 0 &&
        this.intReasonError === 0
      ) {
        this.FileLeaveOfAbsenceGetEmployeePosition();
      }
    },
    FileLeaveOfAbsenceCheck() {
      this.intEmployeeForFilingError = 0;
      this.intLeaveTypeError = 0;
      this.intLeaveFromError = 0;
      this.intLeaveToError = 0;
      this.intFiledDateError = 0;
      this.intNoOfWorkingDaysError = 0;
      this.intReasonError = 0;

      // EMPLOYEE CHECKING              // 1 - Blank Employee Field
      if (
        this.objEmployeeForFiling.EmployeeCode === undefined ||
        this.objEmployeeForFiling.EmployeeCode === null ||
        this.objEmployeeForFiling.EmployeeCode.trim() === ""
      ) {
        this.intEmployeeForFilingError = 1;
      }

      // LEAVE TYPE CHECKING              // 1 - Blank Leave Type Field
      if (
        this.objFileLeave.LeaveTypeCode === undefined ||
        this.objFileLeave.LeaveTypeCode === null ||
        this.objFileLeave.LeaveTypeCode.trim() === ""
      ) {
        this.intLeaveTypeError = 1;
      }

      // LEAVE FROM CHECKING              // 1 - Blank Leave From Field
      if (
        this.objFileLeave.LeaveFrom === undefined ||
        this.objFileLeave.LeaveFrom === null ||
        this.objFileLeave.LeaveFrom === ""
      ) {
        this.intLeaveFromError = 1;
      } else if (
        this.objFileLeave.LeaveFrom !== undefined &&
        this.objFileLeave.LeaveFrom !== null &&
        this.objFileLeave.LeaveFrom !== "" &&
        this.objFileLeave.LeaveTo !== undefined &&
        this.objFileLeave.LeaveTo !== null &&
        this.objFileLeave.LeaveTo !== ""
      ) {
        if (
          moment(new Date(this.objFileLeave.LeaveFrom)).format("YYYY/MM/DD") >
          moment(new Date(this.objFileLeave.LeaveTo)).format("YYYY/MM/DD")
        ) {
          this.intLeaveFromError = 2;
        }
      }

      // LEAVE TO CHECKING                // 1 - Blank Leave To Field                 // 2 - Leave From Greater Than Leave To
      if (
        this.objFileLeave.LeaveTo === undefined ||
        this.objFileLeave.LeaveTo === null ||
        this.objFileLeave.LeaveTo === ""
      ) {
        this.intLeaveToError = 1;
      } else if (
        this.objFileLeave.LeaveFrom !== undefined &&
        this.objFileLeave.LeaveFrom !== null &&
        this.objFileLeave.LeaveFrom !== "" &&
        this.objFileLeave.LeaveTo !== undefined &&
        this.objFileLeave.LeaveTo !== null &&
        this.objFileLeave.LeaveTo !== ""
      ) {
        if (
          moment(new Date(this.objFileLeave.LeaveFrom)).format("YYYY/MM/DD") >
          moment(new Date(this.objFileLeave.LeaveTo)).format("YYYY/MM/DD")
        ) {
          this.intLeaveToError = 2;
        }
      }

      // FILED DATE CHECKING              // 1 - Blank Filed Date Field
      if (
        this.objFileLeave.FiledDate === undefined ||
        this.objFileLeave.FiledDate === null ||
        this.objFileLeave.FiledDate === ""
      ) {
        this.intFiledDateError = 1;
      }

      // NO OF WORKING DAYS CHECKING      // 1 - Blank No Of Working Days Field       // 2 - Invalid No Of Working Days Value
      if (
        this.objFileLeave.NoOfWorkingDays === undefined ||
        this.objFileLeave.NoOfWorkingDays === null ||
        this.objFileLeave.NoOfWorkingDays === ""
      ) {
        this.intNoOfWorkingDaysError = 1;
      } else if (this.objFileLeave.NoOfWorkingDays <= 0) {
        this.intNoOfWorkingDaysError = 2;
      }

      // REASON CHECKING                  // 1 - Blank Reason Field
      if (
        this.objFileLeave.Reason === undefined ||
        this.objFileLeave.Reason === null ||
        this.objFileLeave.Reason.trim() === ""
      ) {
        this.intReasonError = 1;
      }
    },
    FileLeaveOfAbsenceGetEmployeePosition() {
      let CheckPositionURL = `${this.api}CheckPosition?CompanyCode=${this.objEmployeeForFiling.CompanyCode}&PositionCode=${this.objEmployeeForFiling.PositionCode}`;
      axios.get(CheckPositionURL).then((Position) => {
        this.objEmployeeForFiling.Position = Position.data[0].Position;
        this.FileLeaveOfAbsenceSave();
      });
    },
    async FileLeaveOfAbsenceSave(){
        let GetNextLeaveOfAbsenceIDURL = `${this.api}GetNextLeaveOfAbsenceID`
        let holdID = await checkLeaveID(this.objFileLeave.LeaveTypeCode)
        axios.get(GetNextLeaveOfAbsenceIDURL).then(res => {
          let Data = res.data[0];

          var excess = 0;
          if (
            this.objEmployeeForFiling.RemainingVacationLeave +
              this.objEmployeeForFiling.RemainingSickLeave >
            this.objFileLeave.NoOfWorkingDays
          ) {
            excess = 0;
          } else {
            excess =
              this.objFileLeave.NoOfWorkingDays -
              (this.objEmployeeForFiling.RemainingVacationLeave +
                this.objEmployeeForFiling.RemainingSickLeave);
          }

          let FileQuery = `INSERT INTO dbo.LeaveOfAbsences
                            ( LeaveOfAbsenceID, CompanyCode, DepartmentCode, SectionCode, TeamCode, Position, EmployeeCode, DateRenewal, TotalVacLeave, TotalSickLeave, LeaveID, LeaveTypeCode, LeaveFrom,LeaveTo, FiledDate, NoOfWorkingDays, isFiled, WithPay, excess, isAWOL, ReasonForLeave, CreatedDate, UpdatedDate, UpdatedBy )
                            VALUES 
                            ( ${Data.NextLeaveOfAbsenceID},
                              '${this.objEmployeeForFiling.CompanyCode}',
                              '${this.objEmployeeForFiling.DepartmentCode}',
                              '${this.objEmployeeForFiling.SectionCode}',
                              '${this.objEmployeeForFiling.TeamCode}',
                              '${this.objEmployeeForFiling.Position}',
                              '${this.objEmployeeForFiling.EmployeeCode}',
                              '${moment(new Date(this.objEmployeeForFiling.FormattedDateRenew)).format("YYYY/MM/DD")}',
                              ${this.objEmployeeForFiling.TotalVacationLeave},
                              ${this.objEmployeeForFiling.TotalSickLeave},
                              ${holdID}, 
                              '${this.objFileLeave.LeaveTypeCode}',
                              '${moment(new Date(this.objFileLeave.LeaveFrom)).format("YYYY/MM/DD")}',
                              '${moment(new Date(this.objFileLeave.LeaveTo)).format("YYYY/MM/DD")}',
                              '${moment(new Date(this.objFileLeave.FiledDate)).format("YYYY/MM/DD")}',
                              ${this.objFileLeave.NoOfWorkingDays},
                              ${this.objFileLeave.isFiled === true ? 1 : 0},
                              ${this.objFileLeave.isWithPay === true ? 1 : 0},
                              ${excess},
                              ${this.objFileLeave.isAWOL === true ? 1 : 0},
                              '${this.objFileLeave.Reason}',
                              GETDATE(),
                              GETDATE(),
                              '${this.objUserInformation.EmployeeCode}' )`

          let FileData = {Query: FileQuery}
          let FileLeaveOfAbsenceURL = `${this.api}FileLeaveOfAbsence`
          axios.post(FileLeaveOfAbsenceURL, FileData).then(() => {
            let ApprovalQuery = `INSERT INTO dbo.LeaveOfAbsenceApprovals
                                  ( LeaveOfAbsenceID, CreatedDate, UpdatedDate, UpdatedUserID )
                                  VALUES 
                                  ( ${Data.NextLeaveOfAbsenceID},
                                    GETDATE(),
                                    GETDATE(),
                                    '${this.objUserInformation.EmployeeCode}' )`

            let ApprovalData = {Query: ApprovalQuery}
            let ApprovalLeaveOfAbsenceURL = `${this.api}FileLeaveOfAbsence`
            axios.post(ApprovalLeaveOfAbsenceURL, ApprovalData).then(() => {
              this.FileLeaveOfAbsenceSaveAttachments(Data.NextLeaveOfAbsenceID)
            })
          })
        })
      },
    FileLeaveOfAbsenceSaveAttachments(ID) {
      if (this.arrAttachmentsFile.length > 0) {
        this.blnFilingLoadingSave = true;
        let FileList = new FormData();
        for (
          let fileCounter = 0;
          fileCounter < this.arrAttachmentsFile.length;
          fileCounter++
        ) {
          let File = this.arrAttachmentsFile[fileCounter];
          FileList.append("files[]", File);
        }

        let UploadingURL = `${this.api}UploadAttachment`;
        axios
          .post(UploadingURL, FileList, {
            headers: {
              "Content-Type": "multipart/form-data",
              dataType: "json",
              directoryno: ID,
            },
          })
          .then(() => {
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
                  Leave has been submitted. Please wait for approval from
                  leader(s) and/or admin.{" "}
                </div>
              ),
            });
            this.intLeaveTypeError = 0;
            this.intLeaveFromError = 0;
            this.intLeaveToError = 0;
            this.intFiledDateError = 0;
            this.intNoOfWorkingDaysError = 0;
            this.intReasonError = 0;
            this.blnFilingLoadingSave = false;
            this.blnFileLeaveOfAbsenceDialog = false;
            this.objFileLeave = {
              LeaveTypeCode: null,
              LeaveFrom: null,
              LeaveTo: null,
              FiledDate: moment(new Date()),
              NoOfWorkingDays: null,
              isFiled: false,
              isWithPay: false,
              isAWOL: false,
              Reason: null,
            };

            this.$socket.emit('RequestUsersLeaveTable');
            this.$socket.emit('RequestForApprovalCount');
            this.$socket.emit('RequestAdminListCount');
            this.$socket.emit('RequestAdminListTable');
            this.$socket.emit('RequestLeadersForApprovalTable');
            this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
          });
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
              Leave has been submitted. Please wait for approval from leader(s)
              and/or admin.{" "}
            </div>
          ),
        });
        this.intLeaveTypeError = 0;
        this.intLeaveFromError = 0;
        this.intLeaveToError = 0;
        this.intFiledDateError = 0;
        this.intNoOfWorkingDaysError = 0;
        this.intReasonError = 0;
        this.blnFileLeaveOfAbsenceDialog = false;
        this.objFileLeave = {
          LeaveTypeCode: null,
          LeaveFrom: null,
          LeaveTo: null,
          FiledDate: moment(new Date()),
          NoOfWorkingDays: null,
          isFiled: false,
          isWithPay: false,
          isAWOL: false,
          Reason: null,
        };

        this.$socket.emit('RequestUsersLeaveTable');
        this.$socket.emit('RequestForApprovalCount');
        this.$socket.emit('RequestAdminListCount');
        this.$socket.emit('RequestAdminListTable');
        this.$socket.emit('RequestLeadersForApprovalTable');
        this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
      }
    },
    ClickFileLeaveOfAbsenceClose() {
      this.blnFileLeaveOfAbsenceDialog = false;
    },
    // ================================== VIEW ======================================================== //
    ClickFiledLeave(Data) {
      console.log('datas',Data)
      this.strSelectedLeaveID = JSON.parse(
        JSON.stringify(Data.LeaveOfAbsenceID)
      );
      this.strEmployeeName = this.GetEmployeeName(Data.EmployeeCode, 1, 0, 0);
      this.strEmployeeAvatar = `${this.avatar_API}${Data.EmployeeCode}.jpg`;
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
        LeaveTo: moment(
          new Date(this.objEditFiledLeaveDefault.LeaveTo),
          "YYYY/MM/DD"
        ),
        FiledDate: moment(
          new Date(this.objEditFiledLeaveDefault.FiledDate),
          "YYYY/MM/DD"
        ),
        NoOfWorkingDays: this.objEditFiledLeaveDefault.NoOfWorkingDays,
        isFiled: this.objEditFiledLeaveDefault.isFiled === 1 ? true : false,
        isWithPay: this.objEditFiledLeaveDefault.WithPay === 1 ? true : false,
        isAWOL: this.objEditFiledLeaveDefault.isAWOL === 1 ? true : false,
        Reason: this.objEditFiledLeaveDefault.ReasonForLeave,
        isCanceled:
          this.objEditFiledLeaveDefault.isCanceled === 1 ? true : false,
        CancelReason: this.objEditFiledLeaveDefault.CancelReason,
      };
      this.arrAttachmentsViewDefault = [];
      this.arrAttachmentsView = [];
      this.arrAttachmentsToDelete = [];
      this.arrAttachmentsToSave = [];
      this.GetAttachments(this.objEditFiledLeaveDefault.LeaveOfAbsenceID);

      this.blnViewFiledLeave = true;
    },
    ClickFiledLeaveEdit() {
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
        LeaveFrom: moment(
          new Date(this.objEditFiledLeaveDefault.LeaveFrom),
          "YYYY/MM/DD"
        ),
        LeaveTo: moment(
          new Date(this.objEditFiledLeaveDefault.LeaveTo),
          "YYYY/MM/DD"
        ),
        FiledDate: moment(
          new Date(this.objEditFiledLeaveDefault.FiledDate),
          "YYYY/MM/DD"
        ),
        NoOfWorkingDays: this.objEditFiledLeaveDefault.NoOfWorkingDays,
        isFiled: this.objEditFiledLeaveDefault.isFiled === 1 ? true : false,
        isWithPay: this.objEditFiledLeaveDefault.WithPay === 1 ? true : false,
        isAWOL: this.objEditFiledLeaveDefault.isAWOL === 1 ? true : false,
        Reason: this.objEditFiledLeaveDefault.ReasonForLeave,
        isCanceled:
          this.objEditFiledLeaveDefault.isCanceled === 1 ? true : false,
        CancelReason: this.objEditFiledLeaveDefault.CancelReason,
      };
      let DefaultData = this.arrAttachmentsViewDefault.map((Data) => {
        return Data;
      });
      this.arrAttachmentsView = DefaultData;
      this.arrAttachmentsToDelete = [];
      this.arrAttachmentsToSave = [];
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
    ClickFiledLeaveAttachFile() {
      this.$refs.filedleavefile.value = null;
      this.$refs.filedleavefile.click();
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
                A file with the name{" "}
                <div style="font-size:16px;"> {File.name} </div> is already in
                the list for uploading.{" "}
              </div>
            ),
            duration: 10,
          });
        }
      });
    },
    ClickFiledLeaveDownloadFile(ID, file) {
      // let path = `http://hv12-hrd41:3001/ftp/FileServer/LOAAttachments/LOA_${ID}/${file.fileName}`
      // let path = `http://hv12-hrd41:3001/ftp/FileServer/LOAAttachments/LOA_${ID}/${file.fileName}`
      // let path = `LOA_ATTACHMENTS/LOA_${ID}/${file.fileName}`
      //sir (GADS)
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
          moment(new Date(this.objEditFiledLeave.LeaveFrom)).format(
            "YYYY/MM/DD"
          ) >
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
          moment(new Date(this.objEditFiledLeave.LeaveFrom)).format(
            "YYYY/MM/DD"
          ) >
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
      let DefaultNoOfWorkingDays =
        this.objEditFiledLeaveDefault.NoOfWorkingDays;
      let DefaultReasonForLeave = this.objEditFiledLeaveDefault.ReasonForLeave;
      let DefaultIsCanceled =
        this.objEditFiledLeaveDefault.isCanceled === true ? 1 : 0;
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
      this.blnEditLoadingSave = true;
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
    // UPDATED
    async FiledLeaveUpdateData() {
      let objToSave = {
        LeaveTypeCode: this.objEditFiledLeave.LeaveTypeCode.trim(),
        LeaveFrom: moment(new Date(this.objEditFiledLeave.LeaveFrom)).format(
          "YYYY/MM/DD"
        ),
        LeaveTo: moment(new Date(this.objEditFiledLeave.LeaveTo)).format(
          "YYYY/MM/DD"
        ),
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
      let holdID = await checkLeaveID(objToSave.LeaveTypeCode.trim())
      let UpdateQuery = `UPDATE dbo.LeaveOfAbsences
                                  SET LeaveTypeCode = '${objToSave.LeaveTypeCode.trim()}',
                                  LeaveID = '${holdID}',
                                  LeaveFrom = '${objToSave.LeaveFrom}',
                                  LeaveTo = '${objToSave.LeaveTo}',
                                  FiledDate = '${objToSave.FiledDate}',
                                  NoOfWorkingDays = ${
                                    objToSave.NoOfWorkingDays
                                  },
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
                                  UpdatedBy = '${
                                    this.objUserInformation.EmployeeCode
                                  }'
                            WHERE LeaveOfAbsenceID = ${
                              this.objEditFiledLeave.LeaveOfAbsenceID
                            }`;

      let UpdateData = { Query: UpdateQuery };
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

        this.$socket.emit('RequestUsersLeaveTable');
        this.$socket.emit('RequestForApprovalCount');
        this.$socket.emit('RequestAdminListCount');
        this.$socket.emit('RequestAdminListTable');
        this.$socket.emit('RequestLeadersForApprovalTable');
        this.$socket.emit('RequestLeadersForApprovalEmployeeTable');
      });
    },
    ClickFiledLeaveClose() {
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
      this.blnViewFiledLeave = false;
      this.objEditFiledLeaveDefault = {};
      this.objEditFiledLeave = {};
    },
    // ============================================================= //
    // ======================= Other Events ======================== //
    // ============================================================= //
    // ====================================== TABLE
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
          (this.strPosition === "DH" &&
            this.objEmployeeInformation.Position === "SH"))
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
    // ====================================== OTHERS
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
    CheckEmployeeSelectDisable() {
      if (
        this.blnEmployeeSelectLoad === true ||
        this.blnFilingLoadingSave === true ||
        (this.strEmployeeCode !== undefined &&
          this.strEmployeeCode !== null &&
          this.strEmployeeCode !== "")
      ) {
        return true;
      } else {
        return false;
      }
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
    // console.log("asa", res.data[0].LeaveID);
    toReturn = res.data[0].LeaveID;
  });
  return toReturn;
}
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
.LeaveList1 {
  min-height: calc(100vh - 469px) !important;
  max-height: calc(100vh - 469px) !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

.LeaveList1 .ant-list-item:hover {
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
</style>