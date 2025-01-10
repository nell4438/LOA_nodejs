import moment from 'moment'
import _ from "lodash"
import jsPDF from 'jspdf'
import 'jspdf-autotable'

let reportEmployeeLeaveSummary = (EmployeeName, LeaveSummary) => {
  let pdf = new jsPDF('l', 'px','a4')

  let HeaderHeightPosition = 23
  let HeaderDetailsHeightPosition = 31
  let TableHeadersHeightPosition = 36
  let TableDetailsHeightPosition = 0

  LeaveSummary.forEach(Summary => {
    let{
      Bereavement,
      DateRenew,
      Indefinite,
      LeaveDetails,
      LeaveWithPay,
      LeaveWithoutPay,
      MaternityPaternity,
      SickLeaveCredit,
      Suspension,
      VacationLeaveCredit,
    } = Summary

    if(LeaveDetails !== undefined){
// =============================== REPORT HEADER =============================== //
      pdf.setFont('helvetica', 'bold').setFontSize(10)
      pdf.text(EmployeeName, 10, 15)
      pdf.text('LEAVE SUMMARY', 550, 15)

// ================================== SUMMARY ================================== //
      pdf.setDrawColor(0)
      pdf.rect(10, HeaderHeightPosition, 612, 13, 'S')

      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('Date of Renewal:', 23, HeaderDetailsHeightPosition) // Date of Renewal
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(DateRenew, 66, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('SL Credit:', 114, HeaderDetailsHeightPosition) // SL Credit
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${SickLeaveCredit === undefined || SickLeaveCredit === null ? 0 : SickLeaveCredit}`, 140, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('VL Credit:', 165, HeaderDetailsHeightPosition) // VL Credit
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${VacationLeaveCredit === undefined || VacationLeaveCredit === null ? 0 : VacationLeaveCredit}`, 192, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('Leave w/ Pay:', 217, HeaderDetailsHeightPosition) // Leave w/ Pay
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${LeaveWithPay === undefined || LeaveWithPay === null ? 0 : LeaveWithPay}`, 252, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('Leave w/o Pay:', 277, HeaderDetailsHeightPosition) // Leave w/o Pay
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${LeaveWithoutPay === undefined || LeaveWithoutPay === null ? 0 : LeaveWithoutPay}`, 315, HeaderDetailsHeightPosition)

      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('Suspension:', 340, HeaderDetailsHeightPosition) // Suspension
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${Suspension === undefined || Suspension === null ? 0 : Suspension}`, 371, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('ML/PL:', 396, HeaderDetailsHeightPosition) // Maternity and Paternity Leave
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${MaternityPaternity === undefined || MaternityPaternity === null ? 0 : MaternityPaternity}`, 415, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('BL:', 440, HeaderDetailsHeightPosition) // Balance Leave
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${Bereavement === undefined || Bereavement === null ? 0 : Bereavement}`, 450, HeaderDetailsHeightPosition)
      
      pdf.setFont('helvetica', 'normal').setFontSize(7)
      pdf.text('Indefinite:', 475, HeaderDetailsHeightPosition) // Indefinite
      pdf.setFont('helvetica', 'bold').setFontSize(7)
      pdf.text(`${Indefinite === undefined || Indefinite === null ? 0 : Indefinite}`, 500, HeaderDetailsHeightPosition)

// ================================= TABLE HEADER ================================ //
      pdf.autoTable({
        startY: TableHeadersHeightPosition,
        margin: { top: 10, left: 10, right: 9.5, },
        theme: 'plain',
        showHead: 'never',
        styles: { 
          lineWidth: 0.5, 
          lineColor: 'black', 
          textColor: 'black', 
          fillColor: '#a4a4a5',
          font: 'helvetica', 
          fontSize: 7,
          fontStyle: 'bold', 
          halign: 'center',
        },
        columnStyles: {
          DateFiled: { cellWidth: 50 },
          LeaveFrom: { cellWidth: 50 },
          LeaveTo: { cellWidth: 50 },
          LeaveType: { cellWidth: 50 },
          Filed: { cellWidth: 40 },
          WithPay: { cellWidth: 40 },
          NoOfWorkingDays: { cellWidth: 40 },
          Reason: { cellWidth: 101.9 },
          RecommendingApproval: { cellWidth: 63.3 },
          Approver: { cellWidth: 63.3 },
          Admin: { cellWidth: 63.3 },
        },
        columns: [
          { header: 'Date Filed', dataKey: 'DateFiled' },
          { header: 'Leave From', dataKey: 'LeaveFrom' },
          { header: 'Leave To', dataKey: 'LeaveTo' },
          { header: 'Leave Type', dataKey: 'LeaveType' },
          { header: 'Filed', dataKey: 'Filed' },
          { header: 'With Pay', dataKey: 'WithPay' },
          { header: 'Days', dataKey: 'NoOfWorkingDays' },
          { header: 'Reason', dataKey: 'Reason' },
          { header: 'Recommending Approval', dataKey: 'RecommendingApproval' },
          { header: 'Approver', dataKey: 'Approver' },
          { header: 'Admin', dataKey: 'Admin' },
        ],
        body: [
          {
            DateFiled: 'Date Filed',
            LeaveFrom: 'Leave From',
            LeaveTo: 'Leave To',
            LeaveType: 'Leave Type',
            Filed: 'Filed',
            WithPay: 'With Pay',
            NoOfWorkingDays: 'Days',
            Reason: 'Reason',
            RecommendingApproval: 'Recommending Approval',
            Approver: 'Approver',
            Admin: 'Admin',
          },
        ],
      })

// ================================= TABLE DETAILS =============================== //
      TableDetailsHeightPosition = 55.5
      let FormattedLeaveDetails = []
      LeaveDetails.forEach(Leave => {
        let{
          LeaveOfAbsenceID,
          DateFiled,
          LeaveFrom,
          LeaveTo,
          LeaveType,
          Filed,
          WithPay,
          AWOL,
          NoOfWorkingDays,
          Reason,
          isRecommendingApproved,
          RecommendingApproval,
          isApproverApproved,
          Approver,
          isAdminApproved,
          Admin,
        } = Leave

        FormattedLeaveDetails.push({
          "LeaveOfAbsenceID": LeaveOfAbsenceID,
          "DateFiled": DateFiled !== null && DateFiled !== undefined && DateFiled !== "" ? moment(new Date(DateFiled)).format("YYYY/MM/DD") : "",
          "LeaveFrom": LeaveFrom !== null && LeaveFrom !== undefined && LeaveFrom !== "" ? moment(new Date(LeaveFrom)).format("YYYY/MM/DD") : "",
          "LeaveTo": LeaveTo !== null && LeaveTo !== undefined && LeaveTo !== "" ? moment(new Date(LeaveTo)).format("YYYY/MM/DD") : "",
          "LeaveType": LeaveType !== null && LeaveType !== undefined && LeaveType !== "" ? LeaveType : "",
          "Filed": Filed !== null && Filed !== undefined && Filed !== "" && Filed !== false ? "YES" : "NO",
          "WithPay": WithPay !== null && WithPay !== undefined && WithPay !== "" && WithPay !== false ? "YES" : "NO",
          "NoOfWorkingDays": NoOfWorkingDays !== null && NoOfWorkingDays !== undefined && NoOfWorkingDays !== "" ? NoOfWorkingDays : "",
          "Reason": Reason !== null && Reason !== undefined && Reason !== "" ? 
                    AWOL === true ? Reason + "\n(AWOL)" : Reason :
                    "",
          "RecommendingApproval": RecommendingApproval !== null && RecommendingApproval !== undefined && RecommendingApproval !== "" && RecommendingApproval.toUpperCase() !== "NULL" ?
                                  isRecommendingApproved === 2 ? RecommendingApproval + "\n(Disapproved)" : RecommendingApproval :
                                  "",
          "Approver": Approver !== null && Approver !== undefined && Approver !== "" && Approver.toUpperCase() !== "NULL" ?
                      isApproverApproved === 2 ? Approver + "\n(Disapproved)" : Approver :
                      "",
          "Admin": Admin !== null && Admin !== undefined && Admin !== "" && Admin.toUpperCase() !== "NULL" ?
                      isAdminApproved === 2 ? Admin + "\n(Disapproved)" : Admin :
                      "",
        })
      })

      FormattedLeaveDetails = _.orderBy(FormattedLeaveDetails, ['DateFiled', 'LeaveOfAbsenceID'], ['desc', 'desc'])

      pdf.autoTable({
        startY: TableDetailsHeightPosition,
        margin: { top: 10, left: 10, right: 9.5, bottom: 20,},
        theme: 'plain',
        showHead: 'never',
        styles: { 
          lineWidth: 0.5, 
          lineColor: 'black', 
          textColor: 'black', 
          fillColor: 'white',
          font: 'helvetica', 
          fontSize: 7,
          fontStyle: 'normal', 
          halign: 'left',
        },
        columnStyles: {
          DateFiled: { cellWidth: 50, halign: 'center', },
          LeaveFrom: { cellWidth: 50, halign: 'center', },
          LeaveTo: { cellWidth: 50, halign: 'center', },
          LeaveType: { cellWidth: 50, halign: 'center',},
          Filed: { cellWidth: 40, halign: 'center', },
          WithPay: { cellWidth: 40, halign: 'center', },
          NoOfWorkingDays: { cellWidth: 40, halign: 'center', },
          Reason: { cellWidth: 101.9 },
          RecommendingApproval: { cellWidth: 63.3 },
          Approver: { cellWidth: 63.3 },
          Admin: { cellWidth: 63.3 },
        },
        columns: [
          { header: 'Date Filed', dataKey: 'DateFiled' },
          { header: 'Leave From', dataKey: 'LeaveFrom' },
          { header: 'Leave To', dataKey: 'LeaveTo' },
          { header: 'Leave Type', dataKey: 'LeaveType' },
          { header: 'Filed', dataKey: 'Filed' },
          { header: 'With Pay', dataKey: 'WithPay' },
          { header: 'Days', dataKey: 'NoOfWorkingDays' },
          { header: 'Reason', dataKey: 'Reason' },
          { header: 'Recommending Approval', dataKey: 'RecommendingApproval' },
          { header: 'Approver', dataKey: 'Approver' },
          { header: 'Admin', dataKey: 'Admin' },
        ],
        body: FormattedLeaveDetails
      })

      pdf.addPage()
    }
  })

// ================================= PAGE NUMBER ================================= //
  let totalPages = pdf.internal.getNumberOfPages();
  pdf.deletePage(totalPages)

  pdf.setFont('helvetica', 'normal').setFontSize(8)
  
  for(var i = 1; i <= totalPages - 1; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + String(i) + ' of ' + String(totalPages - 1), 585, 435);
  }

  window.open(pdf.output('bloburl'), '_blank')
}

export default reportEmployeeLeaveSummary