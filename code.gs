//credit--------------------TheDuctTech---------------

const CALENDAR_ID = "CALENDAR_ID"

const DATEBACK = true // กำหนดประเภทการแจ้งเตือน 

//false
const DATE_CONFIG = new Date().getDate() + 1 
// [+1] คือ แจ้งเตือนล้วงหน้า 1 วัน 
// [-1] แจ้งเตือนย้อนหลัง 1 วัน
// ถ้าไม่ใส่ จะแจ้งเตือนวันปัจจุบันเท่านั้น
//
//
//true
const STARTDATE = "11-30-2012"; //รูปแบบวันที่ เดือน-วัน-ปี.ค.ศ
const ENDDATE = ""; //ถ้าเป็นค่าว่าง จะเป็นวันปัจจุบัน
//แจ้งเตือนตั้งแต่ STARTDATE ถึง ENDDATE 

var txt = ""
function myFunction() {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID)
  const events = DATEBACK ? cal.getEvents(STARTDATE ? new Date(STARTDATE) : new Date(), ENDDATE ? new Date(ENDDATE) : new Date()) : cal.getEventsForDay(new Date(new Date().setDate(DATE_CONFIG)))
  events.forEach((row) => {
    txt += "เรื่อง : " + row.getTitle() + "\n" +
      "รายละเอียด  : " + row.getDescription() + "\n" +
      "กำหนดการ : " + convertDateTothai_(row.getStartTime()) + "\n" +
      "เวลา : " + convertTimeTothai_(row.getStartTime()) + " ถึง " + convertTimeTothai_(row.getEndTime()) + "\n\n"
  })

  console.log(txt)
}


function convertDateTothai_(d) {
  return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
}

function convertTimeTothai_(d) {
  return d.toLocaleTimeString('th-TH', { timeZone: "Asia/Bangkok" })
}
