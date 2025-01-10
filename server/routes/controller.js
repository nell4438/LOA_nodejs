const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const dotenv = require('dotenv')

const cors = require('cors')
const mssql = require('mssql')
const mysql = require('mysql')

const moment = require('moment')
const fs = require('fs')
const path = require('path');
const multer = require('multer')

// add ko
// const oracledb = require('oracledb');
// const app = express(0;)
// const config = require('./dbconfig.js');

dotenv.config()
router.use(cors())

// router.use(bodyParser.urlencoded({
//     limit: '10mb',
//     extended: false
// }))

// router.use(bodyParser.json({
//     limit: '10mb',
//     extended: true
// }))

router.use(express.json({
    limit: '200mb'
}))

router.use(express.urlencoded({
    limit: '200mb',
    extended: true
}))

// ================================================================================ //
// ================================== connection ================================== //
// ================================================================================ //

// ==================== MSSQL ==================== //
const EmployeesLeaveOfAbsence = {
    user: process.env.VUE_APP_ELOA_USERNAME,
    password: process.env.VUE_APP_ELOA_PASSWORD,
    server: process.env.VUE_APP_ELOA_SERVER,
    database: process.env.VUE_APP_ELOA_DATABASE,
    options: {
        abortTransactionOnError: true,
        enableArithAbort: true,
        encrypt: false,
    },
};

// ==================== ora ==================== //

const Ora_Connection = {
    user: 'HRIS',
    password: 'hrd03ht',
    server: 'HRIS',
    database: 'PAYROLL',

};
// ================================================================================ //
// ==================================== routes ==================================== //
// ================================================================================ //
router.get('/test', (req, res) => {
    res.send('Working Controller')
})

// ========================================== FILE ATTACHMENT ========================================== //
// =============================== GET =============================== //
router.get('/GetAttachments', (req, res) => {
    let ID = req.query.ID

    let fileList = []
    // let dir = __dirname + `\LOAAttachments\LOA_${ID}`    // ung akin gawa //
    let dir = `LOA_ATTACHMENTS/LOA_${ID}`
    // let dir = `\\HV12-HRD41\Deployment\LOAAttachments\LOA_${ID}` // gawa ni sir janren
    if (!fs.existsSync(dir)) {
        res.json([])
    } else {
        const files = fs.readdirSync(dir)
        for (const file of files) {
            fileList.push({ Status: 'View', fileName: file })
        }
        res.json(fileList)
    }
})
// =================================================================== //

// =============================== POST ============================== //

// =================== UPLOAD ======================= //
let storage = multer.diskStorage({
    destination: ((req, file, cb) => {

        // let dir = __dirname + ` ` + `\LOAAttachments\LOA_${req.headers.directoryno}`     // na sasave sa server at nag didisplay sa browser //
        // let dir = `\\HV12-HRD41\Deployment\LOAAttachments\LOA_${req.headers.directoryno}`        // nag didisplay pero hindi nakaka save sa server or folder //
        let dir = `LOA_ATTACHMENTS/LOA_${req.headers.directoryno}`
        console.log(dir)
        if (!fs.existsSync(dir)) {
            // fs.mkdirSync(dir);
            fs.mkdir(path.join(dir), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
        }

        cb(null, dir)
    }),
    filename: ((req, file, cb) => {
        cb(null, file.originalname)
    })
})

let upload = multer({ storage: storage });

router.post('/UploadAttachment', upload.array("files[]"), (req, res) => {
    res.send('ok')
})

// =================== DELETE ======================= //

router.post('/FileDelete', (req, res) => {

    let ID = req.query.ID
    let FileList = req.body

    // let fileCount = 0;
    FileList.forEach(File => {
        // let filePath = `\\HV12-HRD41\Deployment\LOAAttachments\LOA_${ID}/${File.fileName}`
        // let filePath = `LOA_ATACHMENTS/LOA_${ID}/${File.fileName}`
        let filePath = `C:\\Users\\ssd006\\Desktop\\Employee's Leave of Absence (WEB)\\(WEB) Employees Leave of Absence\\server\\LOA_ATTACHMENTS\\LOA_${ID}\\${File.fileName}` // dati to na dipa na deploy
        // let filePath = `C:\\Program Files\WebApps\Leave Of Absence\\SERVER\\LOA_ATTACHMENTS\\LOA_${ID}\\${File.fileName}`

        if (fs.existsSync(filePath)) {
            fs.rm(filePath, (err) => {
                console.log(err);
            });
        }
        else {
            console.log('File does not exist.')
        }
        console.log(filePath)
        // fs.unlink(filePath, (err) => {
        //     if(err){
        //         console.log(err)
        //     }
        //     else{            
        //         fileCount++;
        //         if(fileCount == FileList.length){
        //             console.log('File(s) deleted.')
        //         }
        //     }
        // }) 
    })
    res.send('File(s) deleted.')
})

router.get('/FileDeleteTest', (req, res) => {
    // let ID = req.query.ID;
    // let FileList = req.body
    console.log('Test');
    res.send('Testing lang');
})
// =================================================================== //

// ========================================== MSSQL ========================================== //

// =============================== GET =============================== //

router.post('/getLeaveID/:code', (req, res) => { // LeaveTypes to bagong ginawa
    let LeaveID = req.params.code
    console.log(LeaveID)
    let Query = `SELECT LeaveID from dbo.LeaveTypes where LeaveTypeCode = '${LeaveID}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetSystemUsers Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetSystemUsers Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
})

router.get('/GetSystemUsers', (req, res) => {
    let EmployeeCode = req.query.EmployeeCode
    let Query = `EXECUTE dbo.GetSystemUsers
                @EmployeeCode = '${EmployeeCode}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetSystemUsers Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetSystemUsers Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/CheckPosition', (req, res) => {
    let CompanyCode = req.query.CompanyCode
    let PositionCode = req.query.PositionCode

    let Query = `EXECUTE dbo.CheckPosition
                @CompanyCode = '${CompanyCode}',
                @PositionCode = '${PositionCode}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('CheckPosition Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('CheckPosition Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetForApprovalCountLeaders', (req, res) => {
    let CompanyCode = req.query.CompanyCode
    let DepartmentCode = req.query.DepartmentCode
    let SectionCode = req.query.SectionCode
    let TeamCode = req.query.TeamCode
    let Position = req.query.Position

    let Query = `EXECUTE dbo.GetForApprovalCountLeaders
                @CompanyCode = '${CompanyCode}',
                @DepartmentCode = '${DepartmentCode}',
                @SectionCode = '${SectionCode}',
                @TeamCode = '${TeamCode}',
                @Position = '${Position}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetForApprovalCountLeaders Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetForApprovalCountLeaders Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetForApprovalCountAdmin', (req, res) => {
    let CompanyCode = req.query.CompanyCode

    let Query = `EXECUTE dbo.GetForApprovalCountAdmin
                @CompanyCode = '${CompanyCode}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetForApprovalCountAdmin Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetForApprovalCountAdmin Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetLeaveTypesALL', (req, res) => {
    let Query = `EXECUTE dbo.GetLeaveTypesALL`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetLeaveTypesALL Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetLeaveTypesALL Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetLeaveTypesFILTERED', (req, res) => {
    let Query = `EXECUTE dbo.GetLeaveTypesFILTERED`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetLeaveTypesFILTERED Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetLeaveTypesFILTERED Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetTotalLeave', (req, res) => {
    let Query = `EXECUTE dbo.GetTotalLeave`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetTotalLeave Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetTotalLeave Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetSystemAdminAccounts', (req, res) => {
    let Query = `EXECUTE dbo.GetAdminAccounts`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetSystemAdminAccounts Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetSystemAdminAccounts Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetSystemEncoderAccounts', (req, res) => {
    let Query = `EXECUTE dbo.GetEncoderAccounts`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetSystemEncoderAccounts Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetSystemEncoderAccounts Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetAdminNames', (req, res) => { // parang ma access ung pag print ng admin sana lang un
    let Query = `EXECUTE dbo.GetAdminNames`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetAdminNames Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetAdminNames Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetUserLeaves', (req, res) => {
    let EmployeeCode = req.query.EmployeeCode

    let Query = `EXECUTE dbo.GetUserLeaves
                @EmployeeCode = '${EmployeeCode}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetUserLeaves Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetUserLeaves Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetNextLeaveOfAbsenceID', (req, res) => {
    let Query = `EXECUTE dbo.GetNextLeaveOfAbsenceID`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetNextLeaveOfAbsenceID Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetNextLeaveOfAbsenceID Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetForApprovalTable', (req, res) => {
    let CompanyCode = req.query.CompanyCode
    let DepartmentCode = req.query.DepartmentCode
    let SectionCode = req.query.SectionCode
    let TeamCode = req.query.TeamCode
    let Position = req.query.Position

    let Query = `EXECUTE dbo.GetForApprovalTable
                @CompanyCode = '${CompanyCode}',
                @DepartmentCode = '${DepartmentCode}',
                @SectionCode = '${SectionCode}',
                @TeamCode = '${TeamCode}',
                @Position = '${Position}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetForApprovalTable Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetForApprovalTable Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetForApprovalTableEmployee', (req, res) => {
    let EmployeeCode = req.query.EmployeeCode

    let Query = `EXECUTE dbo.GetForApprovalTableEmployee
                @EmployeeCode = '${EmployeeCode}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetForApprovalTableEmployee Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetForApprovalTableEmployee Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetEmployeeLeaveSummary', (req, res) => {
    let EmployeeCode = req.query.EmployeeCode
    let DateRenewal = moment(new Date(req.query.DateRenewal)).format("YYYY/MM/DD")

    let Query = `EXECUTE dbo.GetEmployeeLeaveSummary
                
                @EmployeeCode = '${EmployeeCode}',
                @DateRenewal = '${DateRenewal}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetEmployeeLeaveSummary Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetEmployeeLeaveSummary Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetLeaveSummary', (req, res) => { // add ko para sa admin pag print
    let EmployeeCode = req.query.EmployeeCode
    let DateRenewal = moment(new Date(req.query.DateRenewal)).format("YYYY/MM/DD")

    let Query = `EXECUTE dbo.GetLeaveSummary
                
                @EmployeeCode = '${EmployeeCode}',
                @DateRenewal = '${DateRenewal}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetLeaveSummary Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetLeaveSummary Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetAdminListCount', (req, res) => {
    let CompanyCode = req.query.CompanyCode
    let DepartmentCode = req.query.DepartmentCode
    let FiledDateFrom = moment(new Date(req.query.FiledDateFrom)).format("YYYY/MM/DD")
    let FiledDateTo = moment(new Date(req.query.FiledDateTo)).format("YYYY/MM/DD")

    let Query = `EXECUTE dbo.GetAdminListCount
                    @CompanyCode = '${CompanyCode}',
                    @DepartmentCode = '${DepartmentCode}',
                    @FiledDateFrom = '${FiledDateFrom}',
                    @FiledDateTo = '${FiledDateTo}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetAdminListCount Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetAdminListCount Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})

router.get('/GetAdminListTable', (req, res) => {
    let CompanyCode = req.query.CompanyCode
    let DepartmentCode = req.query.DepartmentCode
    let FiledDateFrom = moment(new Date(req.query.FiledDateFrom)).format("YYYY/MM/DD")
    let FiledDateTo = moment(new Date(req.query.FiledDateTo)).format("YYYY/MM/DD")

    let Query = `EXECUTE dbo.GetAdminListTable
                    @CompanyCode = '${CompanyCode}',
                    @DepartmentCode = '${DepartmentCode}',
                    @FiledDateFrom = '${FiledDateFrom}',
                    @FiledDateTo = '${FiledDateTo}'`

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('GetAdminListTable Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetAdminListTable Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
    // mssql.close()
})
// =================================================================== //

// =============================== POST ============================== //
router.post('/SaveNewPassword', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('SaveNewPassword Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('SaveNewPassword Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/AddLeaveType', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('AddLeaveType Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('AddLeaveType Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/EditLeaveType', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('EditLeaveType Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('EditLeaveType Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/DeleteLeaveType', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('DeleteLeaveType Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('DeleteLeaveType Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/AddAdminAccount', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('AddAdminAccount Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('AddAdminAccount Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/AddEncoderAccount', (req, res) => { // encoder backend
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('AddEncoderAccount Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('AddEncoderAccount Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})


router.post('/DeleteAdminAccount', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('DeleteAdminAccount Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('DeleteAdminAccount Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/DeleteEncoderAccount', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('DeleteEncoderAccount Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('DeleteEncoderAccount Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/FileLeaveOfAbsence', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('FileLeaveOfAbsence Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('FileLeaveOfAbsence Query Error', error)
            } else {

                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/UpdateLeaveOfAbsence', (req, res) => {
    let Data = req.body
    let Query = Data.Query

    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('UpdateLeaveOfAbsence Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('UpdateLeaveOfAbsence Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

router.post('/ApproveDisapproveLeaveOfAbsence', (req, res) => {
    console.log(res, req)
    let Data = req.body
    let Query = Data.Query
    console.log(Query)
    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('ApproveDisapproveLeaveOfAbsence Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('ApproveDisapproveLeaveOfAbsence Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})
// =================================================================== //
// added

router.post('/ApproveLeaveMinus', (req, res) => {
    console.log(res, req)
    let Data = req.body
    let Query = Data.Query
    console.log(Query)
    mssql.connect(EmployeesLeaveOfAbsence, (error) => {
        if (error) {
            console.log('ApproveLeaveMinus Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('ApproveLeaveMinus Query Error', error)
            } else {
                res.end()
            }
        })
    })
    // mssql.close()
})

//TEST CONNECTIONS ONLY
//PV
const ADODB = require('node-adodb');
const connStrPV = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\PV\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionPV = ADODB.open(connStrPV);

// Define a GET route that retrieves data from the Access database
router.get('/GetLeaveDataPV/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionPV.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataPV', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionPV.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionPV.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});

//SCAD
const connStrSCAD = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\SCAD\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionSCAD = ADODB.open(connStrSCAD);
router.get('/GetLeaveDataSCAD/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionSCAD.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataSCAD', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionSCAD.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionSCAD.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});

//HTI
const connStrHTI = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\HTI\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionHTI = ADODB.open(connStrHTI);
router.get('/GetLeaveDataHTI/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionHTI.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataHTI', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionHTI.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionHTI.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});

//HRD //, SickLeaveUsed="${req.body.DeductedSickLeaveUsed}"
const connStrHRD = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\HRD\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionHRD = ADODB.open(connStrHRD);
router.get('/GetLeaveDataHRD/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionHRD.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataHRD', async (req, res) => { 
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionHRD.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionHRD.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});
// router.post('/UpdateSickLeaveDataHRD', async (req, res) => {
//     try{
//         const data2 = await connectionHRD.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeaveUsed}"
//                            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
//         res.send(data2);
//     } catch (err){
//         if(err){
//             res.send(err)
//             res.status(500).send('Error retrieving data from database');
//         }
//     }
// });

//WKN
const connStrWKN = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\WKN\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionWKN = ADODB.open(connStrWKN);
router.get('/GetLeaveDataWKN/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionWKN.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataWKN', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionWKN.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionWKN.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});
//MGTC
const connStrMGTC = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\MGTC\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionMGTC = ADODB.open(connStrMGTC);
router.get('/GetLeaveDataMGTC/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionMGTC.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataMGTC', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionMGTC.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionMGTC.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});
//MEC
const connStrMEC = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\MEC\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionMEC = ADODB.open(connStrMEC);
router.get('/GetLeaveDataMEC/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionMEC.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});

router.post('/UpdateLeaveDataMEC', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionMEC.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionMEC.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});

//DBAT
const connStrDBAT = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=\\\\10.169.140.1\\hris\\DBA\\Data\\gPMaster.mdb;Persist Security Info=False;Jet OLEDB:Database Password=hrd03ht;`;
ADODB.debug = true;
const connectionDBAT = ADODB.open(connStrDBAT);
router.get('/GetLeaveDataDBAT/:EmployeeID', async (req, res) => {
    try {
        const data = await connectionDBAT.query(`SELECT EmplCode, VacBegin, VacUsed, SickLeaveBeg , SickLeaveUsed FROM Employee WHERE EmplCode='${req.params.EmployeeID}'`);
        res.send(data);
    } catch (err) {
        res.send(err)
    }
});
router.post('/UpdateLeaveDataDBAT', async (req, res) => {
    try {
        // res.send(typeof req.body.DeductedVacUsed)
        if (typeof req.body.DeductedVacUsed !== 'undefined' && req.body.DeductedVacUsed !== null) {
            const data2 = await connectionDBAT.execute(`UPDATE Employee SET VacUsed="${req.body.DeductedVacUsed}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        } else if (typeof req.body.DeductedSickLeave !== 'undefined' && req.body.DeductedSickLeave !== null) {
            const data2 = await connectionDBAT.execute(`UPDATE Employee SET SickLeaveUsed="${req.body.DeductedSickLeave}" 
            WHERE Employee.EmplCode="${req.body.EmployeeCode}"`);
            res.send(data2);
        }
    } catch (err) {
        if (err) {
            // console.log(err)
            res.status(500).send(err);
        }
    }
});
//===========================TESTING=============================================
router.post('/getPayroll', (req, res) => {

    let Query = `SELECT max(LASTPAYDATE) AS LPayday, max(STARTPAY) AS SPAY, max(ENDPAY) AS EPAY, TRANSFER FROM PAYROLL.HISTORYPAYFILE
        WHERE TRANSFER = 0
        GROUP BY LASTPAYDATE, STARTPAY, ENDPAY, TRANSFER`

    mssql.connect(Ora_Connection, (error) => {
        if (error) {
            console.log('GetSystemUsers Error', error);
        }
        var request = new mssql.Request();
        request.query(Query, (error, recordset) => {
            if (error) {
                console.log('GetSystemUsers Query Error', error)
            } else {
                res.send(recordset.recordsets[0])
            }
        })
    })
})


module.exports = router;
