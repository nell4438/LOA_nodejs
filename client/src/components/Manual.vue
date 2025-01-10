<template>
  <div>
    <a-drawer title="HELP" placement="top" :visible="blnManual" :closable="false" height="95%">
      <div style="padding-right:10px;">
        <a-tabs v-model="strActiveTab" size="small">
<!-- ======================================= Manual Cover ======================================= -->
          <a-tab-pane key="1" tab="Manual">
            <div class="PaneBody" align="center" justify="center">
              <v-img max-width="100%" src="1. Manual Cover.png" alt="Manual Cover"></v-img>
            </div>
          </a-tab-pane>
<!-- ====================================== Change Password ===================================== -->
          <a-tab-pane key="2" tab="Change Password">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Click on <span style="font-weight:bold; color:blue;"> Menu </span> button. </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click    <span style="font-weight:bold; color:blue;"> Change Password </span> button. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Fill-up fields and then save. </p>
                  </div>
                </v-col>

                <v-col cols="9">
                  <v-img max-width="100%" src="ChangePassword.png" alt="Change Password"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================= Leave Types Form =========================================== -->
<a-tab-pane v-if="blnAdmin === true" key="3" tab="Leave Types Form">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold; color:green;"> A. Maintenance Table </span></p>
                    <p> <span style="font-weight:bold;"> 1. </span> Click on panel to show new type of leave registration. </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Enter     <span style="font-weight:bold; color:blue;"> Leave Type Code </span> and <span style="font-weight:bold; color:blue;"> Name</span>. Code should be unique. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click     <span style="font-weight:bold; color:blue;"> Save </span> button to register new type of leave. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Click on  <span style="font-weight:bold; color:blue;"> Delete </span> button to mark leave type as deleted. </p>
                    <p> <span style="font-weight:bold;"> 5. </span> Click on  <span style="font-weight:bold; color:blue;"> Edit </span> button to modify leave type. </p>
                    <p> <span style="font-weight:bold;"> 6. </span> Fill-up / Change  <span style="font-weight:bold; color:blue;"> Leave Type Name </span> of leave type. </p>
                    <p> <span style="font-weight:bold;"> 7. </span> Click     <span style="font-weight:bold; color:blue;"> Save </span> button to update leave type. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="3.LeaveTypes2.png" alt="Leave Types Form"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ======================================== Admin Accounts Form ========================================= -->
          <a-tab-pane v-if="blnAdmin === true" key="4" tab="Admin Accounts Form">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold; color:green;"> A. Maintenance Table </span></p>
                    <p> <span style="font-weight:bold;"> 1. </span> Click on panel to show new admin account registration. </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Enter     <span style="font-weight:bold; color:blue;"> Employee Code </span> of employee to be registered as admin account. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click     <span style="font-weight:bold; color:blue;"> Save </span> button to register new admin account. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Click on  <span style="font-weight:bold; color:blue;"> Delete </span> button to mark admin account as deleted. </p>
                    <p> <span style="font-weight:bold;"> 4.1 </span> Accounts in list with <span style="font-weight:bold; color:red  ;"> red highlight </span> are deleted accounts. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="4.Admin Accounts Form.png" alt="Admin Accounts Form"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================= Encoder Per Department =========================================== -->
          <a-tab-pane v-if="blnAdmin === true" key="5" tab="Encoder Per Department Form">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold; color:green;"> A. Maintenance Table </span></p>
                    <p> <span style="font-weight:bold;"> 2. </span> Enter     <span style="font-weight:bold; color:blue;"> Employee Code </span> of employee to be registered as encoder accounts per department. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click     <span style="font-weight:bold; color:blue;"> Save </span> button to register new encoder account. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Click on  <span style="font-weight:bold; color:blue;"> Delete </span> button to mark encoder account as deleted. </p>
                    <p> <span style="font-weight:bold;"> 4.1 </span> Accounts in list with <span style="font-weight:bold; color:red  ;"> red highlight </span> are deleted accounts. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="5.Encoder Accounts.png" alt="Encoder Per Department Form"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ================================ File Leave of Absence Form ================================ -->
          <a-tab-pane key="6" tab="File Leave of Absence Form" force-render>
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> A. </span> Click on <span style="font-weight:bold; color:blue;"> Personal Information </span> panel to show/hide Personal Information and change the size of leave table. </p>
                    <p> <span style="font-weight:bold;"> B. </span> Use the following fields to filter leave table. </p>
                    <p> <span style="font-weight:bold;"> C. </span> Click    <span style="font-weight:bold; color:blue;"> File Leave of Absence</span> button to open form for filing. </p>
                    <p> <span style="font-weight:bold;"> D. </span> Double click on table row to view leave details. </p>
                  </div>
                </v-col>

                <v-col cols="9">
                  <v-img max-width="100%" src="6.FileLeaveOfAbsences.png" alt="File Leave of Absence Form"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================== Filing ========================================== -->
          <a-tab-pane key="7" tab="Filing">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Fill-up fields for filing leave of absence. </p>
                    <p> <span style="font-weight:bold; color:green;"> * All fields with green marker are required fields * </span> </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click on <span style="font-weight:bold; color:blue;"> Half Day </span> button to add half day in No. of Working Days. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Check    <span style="font-weight:bold; color:blue;"> Filed </span> field if leave is filed. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Check    <span style="font-weight:bold; color:blue;"> With Pay </span> field if leave is with pay. </p>
                    <p> <span style="font-weight:bold;"> 5. </span> Click on <span style="font-weight:bold; color:blue;"> Upload File(s) </span> button to attach a file. </p>
                    <p> <span style="font-weight:bold;"> 6. </span> Click on <span style="font-weight:bold; color:blue;"> Remove Attachment </span> button to remove file from list. </p>
                    <p> <span style="font-weight:bold;"> 7. </span> Click    <span style="font-weight:bold; color:blue;"> Save </span> button to submit leave and wait for the approval. </p>
                  </div>
                </v-col>

                <v-col cols="9">
                  <v-img max-width="100%" src="7.File Leave Form.png" alt="Filing"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ===================================== View Filed Leave ===================================== -->
          <a-tab-pane key="8" tab="View Filed Leave">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Toggle  <span style="font-weight:bold; color:blue;"> Edit </span> switch to modify filed leave. </p>
                    <p> <span style="font-weight:bold;"> A. </span>         <span style="font-weight:bold;"> "Click to edit leave." </span> will show if leave is editable. </p>
                    <p> <span style="font-weight:bold;"> B. </span>         <span style="font-weight:bold;"> "Leave already checked." </span> will show if leave was already checked by leaders. Leave will not be editable. </p>
                    <p> <span style="font-weight:bold;"> C. </span>         <span style="font-weight:bold;"> "AWOL can't be edited." </span> will show if leave was filed as AWOL. Leave will not be editable. </p>
                    <p> <span style="font-weight:bold;"> D. </span>         <span style="font-weight:bold;"> "Cancel editing." </span> will show if you want to cancel editing of leave. </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Editable fields will be highlighted. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Check   <span style="font-weight:bold; color:blue;"> Cancel </span> if you want to cancel filed leave. Cancel Reason must be filled-up. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Click   <span style="font-weight:bold; color:blue;"> Save </span> button to update filed leave. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="8.View File Leave.png" alt="View Filed Leave"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ===================================== Leader's Confirmation Form ===================================== -->
          <a-tab-pane v-if="blnLeader === true" key="9" tab="Leader's Confirmation Form">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> A. </span> Leave table will show leaves for approval of your members by default. </p>
                    <p> <span style="font-weight:bold;"> B. </span> Click on  <span style="font-weight:bold; color:blue;"> Name </span> field and select name to view employee's leaves. </p>
                    <p> <span style="font-weight:bold;"> C. </span> Click on  <span style="font-weight:bold; color:blue;"> Approve / Disapprove button </span> to either approve or disapprove leave of employee. </p>
                    <p> <span style="font-weight:bold;"> D. </span> Click     <span style="font-weight:bold; color:blue;"> File Leave for Member </span> button to open form for filing. </p>
                    <p> <span style="font-weight:bold;"> E. </span> Double click on table row to view leave details. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="9.Leader's Confirmation Form.png" alt="Leader's Confirmation Form"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================= Filing for Member ========================================== -->
          <a-tab-pane v-if="blnLeader === true" key="10" tab="Filing for Member">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Fill-up fields for filing leave of absence for member. </p>
                    <p> <span style="font-weight:bold; color:green;"> * All fields with green marker are required fields * </span> </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click on  <span style="font-weight:bold; color:blue;"> Name </span> field and select employee to file leave for. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click on <span style="font-weight:bold; color:blue;"> Half Day </span> button to add half day in No. of Working Days. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Check    <span style="font-weight:bold; color:blue;"> Filed </span> field if leave is filed. </p>
                    <p> <span style="font-weight:bold;"> 5. </span> Check    <span style="font-weight:bold; color:blue;"> With Pay </span> field if leave is with pay. </p>
                    <p> <span style="font-weight:bold;"> 6. </span> Check    <span style="font-weight:bold; color:blue;"> AWOL </span> field if leave is AWOL (absent without leave). </p>
                    <p> <span style="font-weight:bold;"> 7. </span> Click on <span style="font-weight:bold; color:blue;"> Upload File(s) </span> button to attach a file. </p>
                    <p> <span style="font-weight:bold;"> 8. </span> Click on <span style="font-weight:bold; color:blue;"> Remove Attachment </span> button to remove file from list. </p>
                    <p> <span style="font-weight:bold;"> 9. </span> Click    <span style="font-weight:bold; color:blue;"> Save </span> button to submit leave of member. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="10.Filing For Members.png" alt="Filing for Member"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================= Filing for Member (Encoder Page) dagdag kulang to========================================== --> 
          <a-tab-pane v-if="blnEncoder === true" key="11" tab="Filing for Member">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> A. </span> Click     <span style="font-weight:bold; color:blue;"> File Leave for Member </span> button to open form for filing. </p>
                    <p> <span style="font-weight:bold;"> 1. </span> Fill-up fields for filing leave of absence for member. </p>
                    <p> <span style="font-weight:bold; color:green;"> * All fields with green marker are required fields * </span> </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click on  <span style="font-weight:bold; color:blue;"> Name </span> field and select employee to file leave for. </p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click on <span style="font-weight:bold; color:blue;"> Half Day </span> button to add half day in No. of Working Days. </p>
                    <p> <span style="font-weight:bold;"> 4. </span> Check    <span style="font-weight:bold; color:blue;"> Filed </span> field if leave is filed. </p>
                    <p> <span style="font-weight:bold;"> 5. </span> Check    <span style="font-weight:bold; color:blue;"> With Pay </span> field if leave is with pay. </p>
                    <p> <span style="font-weight:bold;"> 6. </span> Check    <span style="font-weight:bold; color:blue;"> AWOL </span> field if leave is AWOL (absent without leave). </p>
                    <p> <span style="font-weight:bold;"> 7. </span> Click on <span style="font-weight:bold; color:blue;"> Upload File(s) </span> button to attach a file. </p>
                    <p> <span style="font-weight:bold;"> 8. </span> Click on <span style="font-weight:bold; color:blue;"> Remove Attachment </span> button to remove file from list. </p>
                    <p> <span style="font-weight:bold;"> 9. </span> Click    <span style="font-weight:bold; color:blue;"> Save </span> button to submit leave of member. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="11. Encoder Filing for Members.png" alt="Filing for Member"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ========================================= Printing for Member= [ENCODER PAGE]========================================= --> 
          <a-tab-pane v-if="blnEncoder === true" key="12" tab="Printing for Member">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> A. </span> Click on  <span style="font-weight:bold; color:blue;"> Name </span> field and select name to view employee's leaves. </p>
                    <p> <span style="font-weight:bold;"> B. </span> Click <span style="font-weight:bold; color:blue;"> Print Employee's Leave Summary </span>  to print all of file leave of employees. </p>
                    <p> <span style="font-weight:bold;"> C. </span> Click the <span style="font-weight:bold; color:blue;"> Clear button </span> and search the name of employee's.  </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="Printing For Members.png" alt="Filing for Member"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- =========================================[Leader Page For Printing]========================================== --> 
          <a-tab-pane v-if="blnLeader === true" key="13" tab="Printing for Member">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> A. </span> Click on  <span style="font-weight:bold; color:blue;"> Name </span> field and select name to view employee's leaves. </p>
                    <p> <span style="font-weight:bold;"> B. </span> Click <span style="font-weight:bold; color:blue;"> Print Employee's Leave Summary </span>  to print all of file leave of member's. </p>
                    <p> <span style="font-weight:bold;"> C. </span> Click the <span style="font-weight:bold; color:blue;"> Clear button </span> and search the name of member's. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="Print for Leader Members.png" alt="Filing for Member"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ============================ Admin Confirmation Form (Department List) =============================== -->
          <a-tab-pane v-if="blnAdmin === true" key="14" tab="Admin Confirmation Form (Department List)">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              
              <!-- <a-result class="disable-select" status="404" title="404" sub-title="Sorry, this manual is not yet available."></a-result> -->
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Click on <span style="font-weight:bold; color:blue;"> Date Filed From </span> select date when the leave was filed. </p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click on <span style="font-weight:bold; color:blue;"> Department </span> and type department that you want to search. </p>
                    <p> <span style="font-weight:bold; color:green;">* The department has filed and approved/disapprove by TL or SH will appear automatically. *   </span> </p>
                    <p> <span style="font-weight:bold;"> 3.</span> Click this button to <span style="font-weight:bold; color:blue"> VIEW </span> the employee's records. </p>
                    <!-- <p> <span style="font-weight:bold;"> A. </span> </p> -->
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="Admin Confirmation.png" alt="Admin Confirmation Form (Department List)"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ============================= Admin Confirmation Form (Employee's List) ============================== -->
          <a-tab-pane v-if="blnAdmin === true" key="15" tab="Admin Confirmation Form (Employee's List)">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              
              <!-- <a-result class="disable-select" status="404" title="404" sub-title="Sorry, this manual is not yet available."></a-result> -->
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold;"> 1. </span> Click on <span style="font-weight:bold; color:blue;">Approve / Disapprove button </span>to either approve or disapprove leave of employee.</p>
                    <p> <span style="font-weight:bold;"> A. </span><span style="font-weight:bold; color:blue;"> Approve </span> color background is mainly green. </p>
                    <p> <span style="font-weight:bold;"> B. </span><span style="font-weight:bold; color:blue;"> Disapprove </span> color background is mainly red.</p>
                    <p> <span style="font-weight:bold;"> 2. </span> Click on <span style="font-weight:bold; color:blue;"> Status </span> and choose to approve/disapprove or all.</p>
                    <p> <span style="font-weight:bold;"> 3. </span> Click on <span style="font-weight:bold; color:blue;"> Section </span> to display all leave fileds of the section. </p>
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="Admin Confirmation Elist.png" alt="Admin Confirmation Form (Employee's List)"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ============================== Admin Confirmation Form (Leave Details) =============================== -->
          <a-tab-pane v-if="blnAdmin === true" key="16" tab="Admin Confirmation Form (Leave Details)">
            <div class="PaneBody" style="padding-left:10px; padding-right:10px;">
              
              <!-- <a-result class="disable-select" status="404" title="404" sub-title="Sorry, this manual is not yet available."></a-result> -->
              <v-row>
                <v-col cols="3">
                  <div style="padding-top:20px; padding-left:20px; color:black;">
                    <p> <span style="font-weight:bold; color:green;"> * Double click the table and see the details of Employee. </span> </p>
                    <p> <span style="font-weight:bold; color:green;">  </span> </p>
                    <!-- <p> <span style="font-weight:bold;"> 3. </span> </p>
                    <p> <span style="font-weight:bold;"> 4. </span> </p>
                    <p> <span style="font-weight:bold;"> A. </span> </p> -->
                  </div>
                </v-col>
                
                <v-col cols="9">
                  <v-img max-width="100%" src="12.AdminDetails.png" alt="Admin Confirmation Form (Leave Details)"></v-img>
                </v-col>
              </v-row>
            </div>
          </a-tab-pane>
<!-- ====================================================================================================== -->
        </a-tabs>
      </div>
<!-- ============================================ Footer ================================================== -->
      <div :style="{ position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right', zIndex: 1, }">
        <a-tooltip title="Close" placement="top">
          <a-button type="danger" icon="close" @click="ClickCloseManual()"></a-button>
        </a-tooltip>
      </div>
    </a-drawer>
  </div>
</template>
<!-- ************************************************************************************************* -->
<!-- ============================================= Script ============================================ -->
<!-- ************************************************************************************************* -->
<script>

  export default{
// ********************************************************************************** //
// ====================================== Props ===================================== //
// ********************************************************************************** //
      props:{
        blnManual:{
            type: Boolean,
            required: true,
        },
      },
// ********************************************************************************** //
// ====================================== Data ====================================== //
// ********************************************************************************** //
    data(){
      return{
        strActiveTab: "1",

        blnAdmin: false,
        blnLeader: false,
        blnEncoder:false,
      }
    },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
    created(){

    },
// ********************************************************************************** //
// ===================================== Computed =================================== //
// ********************************************************************************** //
    computed:{

    },
// ********************************************************************************** //
// ====================================== Watch ===================================== //
// ********************************************************************************** //
    watch:{
      blnManual(value){
        if(value === true) {
          this.CheckUserRights()
        }
      }
    },
// ********************************************************************************** //
// ===================================== Methods ==================================== //
// ********************************************************************************** //
    methods:{
// ============================================================= //
// ===================== Data Load Events ====================== //
// ============================================================= //
      CheckUserRights(){
        let Data = (JSON.parse(this.DecryptText(this.$store.state.loa_user_rights)))
        this.blnAdmin =  Data.isAdmin
        this.blnLeader =  Data.isLeader
        this.blnEncoder = Data.isEncoder // dagdag ko
      },
// ============================================================= //
// ===================== User Action Events ==================== //
// ============================================================= //
      ClickCloseManual(){
        this.$emit('ClickCloseManual', false)
        this.strActiveTab = "1"
      },
    },
  }
</script>
<!-- ************************************************************************************************* -->
<!-- ============================================= Style ============================================= -->
<!-- ************************************************************************************************* -->
<style scoped>
  .PaneBody{
    min-height: calc(100vh - 170px);
    max-height: calc(100vh - 170px);
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }
</style>