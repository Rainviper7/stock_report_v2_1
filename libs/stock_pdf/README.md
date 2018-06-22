# Stock Report v2

### class object
| Name | Type | Desciption
|---|---|---
| startDate | String | เวลาเริ่มต้นของคำนวณสต็อก
| endDate | String | เวลาสุดท้ายของคำนวณสต็อก
| groups | [[group]](README.md#group) | กลุ่มข้อมูลสต็อก

### group
| Name | Type | Desciption
|---|---|---
| name | String | ชื่อกลุ่มสต็อก
| items | [[item]](README.md#items) | ข้อมูลรายการของที่สต็อก

### item
| Name | Type | Desciption
|---|---|---
| name | String | ชื่อรายการสต็อก
| balance | String | จำนวนล่าสุด
| unit | String | หน่วยนับสต็อก
| add | String | รับเพิ่ม
| used | String | ใช้ไปแล้ว
| withdraw | String | เบิกออก
| adjust | String | ปรับยอด
| begin | String | จำนวนเริ่มนับสต็อก