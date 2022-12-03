//credit--------------------TheDuctTech---------------

const CALENDAR_ID = "CALENDAR_ID"
const TOKEN = "TOKEN"

const DATE_CONFIG = new Date().getDate() + 0
// [+1] คือ แจ้งเตือนล้วงหน้า 1 วัน 
// [-1] แจ้งเตือนย้อนหลัง 1 วัน
// ถ้าไม่ใส่ จะแจ้งเตือนวันปัจจุบันเท่านั้น หรือ ใส่ 0
var txt = ""
function myFunction() {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID)
  const events = cal.getEventsForDay(new Date(new Date().setDate(DATE_CONFIG)))
  events.forEach((row) => {
    txt += "\n\nเรื่อง : " + row.getTitle() + "\n" +
      "รายละเอียด  : " + row.getDescription() + "\n" +
      "กำหนดการ : " + convertDateTothai_(row.getStartTime()) + "\n" +
      "เวลา : " + convertTimeTothai_(row.getStartTime()) + " ถึง " + convertTimeTothai_(row.getEndTime()) + "\n\n"
  })


  if (events.length > 0) {
    // console.log(txt)
    sendLineNotify(txt, TOKEN)
  }

}

function sendLineNotify(txt, TOKEN) {
  const notify = new lib.lineNotify(TOKEN)
  notify.sendText(txt)
}


function convertDateTothai_(d) {
  return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
}

function convertTimeTothai_(d) {
  return d.toLocaleTimeString('th-TH', { timeZone: "Asia/Bangkok" })
}
