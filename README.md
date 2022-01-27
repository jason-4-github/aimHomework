# AIM API Application

---

## 1.1
  - #### 建立 schema 的 Create SQL(或 ORM 的 create Schema 指令)
  - #### 新增資料的 Insert SQL

    (Source code在 route/index.js 中)

  [ POST ] createMockData
  ```
  http://localhost:${env.PORT}/apis/v1/createMockData
  ```
 === Request variables ===

 - @url [String] ```env.PORT``` : 在env中設定的api port
 - @body [object] ```data``` : 匯入的資料，若為空或不帶則以src/data/mockData.json裡的資料當作插入的資料，註:只開放註冊過的model匯入資料，ex:
 ```
 header: { Content-Type: application/json }
  body: {
    data: {
      "nationalities": [
        {
          "name": "中國"
        }
      ],
    }
  }
 ```
=== Response ===
```
{
    "insertedData": [
      {
        "nationalityId": 5,
        "name": "中國"
      },
    ],
    "message": "Data Exist!"
}
```

---

## 1.2 1.3
 - #### build & install 相關說明
 1. 產生一份 ```.env``` 檔並複製 ```.env.example``` 中的內容，若已有空的db則將資訊替換，若沒有亦可選擇透過 ```docker-compose up -d``` 啟動一個mariadb的docker container。

 2. ```npm install``` 安裝套件至node_modules

 3. ```npm start``` 啟動api server

 - #### API 相關說明

 以下為簡略介紹api結構，細節請將api server執行起來後前往
 [http://localhost:\${env.PORT}/apis/doc](http://localhost:\${env.PORT}/apis/doc)

 1. [ GET ] getFee
 ```
 http://localhost:${env.PORT}/apis/v1/getFee?systemDate=${systemDate}&birthday=${birthday}
 ```
  ```
 header: { Content-Type: application/json }
 ```

=== Request variables ===

 - @url [String] ```env.PORT``` : 在env中設定的api port
 - @query [String] ```systemDate``` : 系統時間，標準時間格式年份至日期，ex: 2021-10-27
 - @query [String] ```birthday``` : 生日，7位數字的字串，中華民國年份(3)月份(2)日期(2)，ex: 0520102

 === Response ===
 ```
 { amount: 150 }
 ```
 ```amount``` : 回傳該年齡對應的費用

 2. [ POST ] getPatient
 ```
 http://localhost:${env.PORT}/apis/v1/getPatient
 ```
 ```
 header: { Content-Type: application/json }
 body: {
   "systemDate": ${systemDate},
   "patientId": ${patientId}
 }
 ```
 === Request variables ===

 - @url [String] ```env.PORT``` : 在env中設定的api port
 - @body [String] ```systemDate``` : 系統時間，標準時間格式年份至日期，ex: 2021-10-27
 - @body [Int] ```patientId``` : 病患編號，ex: 3

  === Response ===
 ```
{
    patient: {
      id: 3,
      name: "莊小云",
      birthday: "0771003",
      age: 33,
      gender: "女",
      nationality: "台灣"
    },
    amount: 150
}
 ```
 ```patient``` : 回傳該病患的個人資訊
 ```amount``` : 回傳該病患年齡對應的費用

 ---

## 1.4
 - #### 測試原始碼
 位於 ```src/test``` 資料夾內
 - #### 測試執行指令
 ```npm run test```