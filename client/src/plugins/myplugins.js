import { mapState, mapMutations } from 'vuex'
import CryptoJS from 'crypto-js'
// import axios from "axios"
// import moment from "moment"

const myPlugins = {
    install(Vue){
        Vue.mixin({
// ******************************************************************************* //
// ===================================== Data ==================================== //
// ******************************************************************************* //
            data:() => ({
                api:                        process.env.VUE_APP_URL,
                avatar_API:                 process.env.VUE_APP_AVATAR_API,
                header_API:                 process.env.VUE_APP_HEADER_API,
                departments_API:            process.env.VUE_APP_DEPARTMENTS_API,
                sections_API:               process.env.VUE_APP_SECTIONS_API,
                teams_API:                  process.env.VUE_APP_TEAMS_API,
                basicInfo_API:              process.env.VUE_APP_BASIC_INFO_API,
                employees_API:              process.env.VUE_APP_EMPLOYEES_API,
                employeesLeaveCredits_API:  process.env.VUE_APP_EMPLOYEES_LEAVE_CREDITS_API,
                fileServer:                 process.env.VUE_APP_FILE_SERVER,
                restday_API:                process.env.VUE_APP_EMPLOYEES_RESTDAY_API,
                holiday_API:                process.env.VUE_APP_HOLIDAY_API,
                japaneseAllInfo_API:        process.env.VUE_APP_JA_INFO_API,
                // jaheader_API:               process.env.VUE_APP_JA_HEADER_API,
                ja_avatar_API:              process.env.VUE_APP_JA_AVATAR_API,
                ja_Info_API:                process.env.VUE_APP_ALL_JA_INFO_API,
                strVersion: "v1.0.0",
            }),
// *********************************************************************************** //
// ===================================== Computed ==================================== //
// *********************************************************************************** //
            computed:{
                ...mapState([
                    'loa_user',
                    'loa_log_in',
                    'loa_user_rights',
                    'ref',
                    // 'Releave',
                ]),
            },
// ********************************************************************************** //
// ===================================== Created ==================================== //
// ********************************************************************************** //
            created(){
                // this.$notification.config({ placement: "bottomRight", duration: 3 })
                // axios.get(`${this.restday_API}42158/`).then(res=>{
                //     console.log(res.data)
                // })

                // axios.get(`${this.holiday_API}`).then(res=>{
                //     console.log(res.data)
                // })
            },
// ******************************************************************************* //
// =================================== Methods =================================== //
// ******************************************************************************* //
            methods:{             
                ...mapMutations([
                    'CHANGE_LOA_USER',
                    'CHANGE_LOA_LOGIN',
                    'CHANGE_LOA_USERRIGHTS',
                ]),
// ======================================================================= //
// =========================== Global Functions ========================== //
// ======================================================================= //
                DecryptText(text){
                    var bytes  = CryptoJS.AES.decrypt(text, process.env.VUE_APP_SECRETKEY )
                    var originalText = bytes.toString(CryptoJS.enc.Utf8)
                    return originalText
                },
                AutoFontSize(name){
                  let data = name
                  if(data.length < 9){ return '10' }
                  else if(!data.includes(" ") && data.length >= 9){ return '8' }
                },
                FilterOption(input, option){
                  return(option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)
                },
                
            }
        })
    }
}

export default myPlugins