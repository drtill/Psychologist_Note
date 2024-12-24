const express = require("express");
const axios = require("axios");
const cors = require("cors");
const getprodtrak = require("./database/prodtrak.js");
const app = express();
const port = 6852;

app.use(express.json());
app.use(cors());
const crypto = require('crypto');
const { resourceUsage } = require("process");
const { RequestError, DateTime, DateTime2 } = require("mssql");


var mysql = require('mysql');
const { getEventListeners } = require("stream");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

var con = mysql.createConnection({
  host: "10.104.10.25",
  port: "3306",
  user: "root",
  password: "QuippeforU2017",
  database: "quippesvh"
});


// let encrypted_key = encrypt(plaintext);

app.get("/", (req, res) => {
  res.send("rehab ^____^");
});

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
var objdate = yyyy + '-' + mm + '-' + dd;
var h = today.getHours();
var m = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
var s = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
var tt = h + ":" + m + ":" + s;
let dateNow = objdate + ' ' + tt;

app.get("/api/observations", async (req, res) => {
  try {
    const en_id = req.query.en_id;

    let result = await getprodtrak.getobservations(en_id);

    let temp = [];

    if (result.length > 0) {
      for (let temps of result) {
        let ITM_Code = temps.ITM_Code;
        let ITM_Desc = temps.ITM_Desc;
        let OBS_Value = temps.OBS_Value;

        temp.push({ ITM_Code, ITM_Desc, OBS_Value });
      }

      return res.json(temp);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error('Error:', e.message);
    res.sendStatus(500);
  }
});

app.get("/api/patient", async (req, res) => {
  try {
    const en = req.query.en;
    let result = await getprodtrak.getheader(en);

    let temp = [];

    if (result.length > 0) {
      for (let temps of result) {
        let PAADM_RowID = temps.PAADM_RowID;
        let HN = temps.HN;
        let EN = temps.EN;
        let LOC_CODE_MAIN = temps.LOC_CODE_MAIN;
        let LOC_DESC_MAIN = temps.LOC_DESC_MAIN;
        let PAADM_DepCode_DR = temps.PAADM_DepCode_DR;
        let ADM_DATE_BASE = temps.ADM_DATE_BASE;
        let ADM_TIME = temps.ADM_TIME;
        let ADM_TYPE = temps.ADM_TYPE;
        let DISCHARGE_DOCTOR_CODE = temps.DISCHARGE_DOCTOR_CODE;
        let DISCHARGE_DOCTOR_DESC = temps.DISCHARGE_DOCTOR_DESC;
        let CTPCP_StName = temps.CTPCP_StName;
        let Formatted_DOB = temps.Formatted_DOB;
        let FullName = temps.FullName;
        let Age = temps.Age;
        
        temp.push({ PAADM_RowID,HN, EN, LOC_CODE_MAIN,LOC_DESC_MAIN,PAADM_DepCode_DR,ADM_DATE_BASE,ADM_TIME,ADM_TYPE
          ,DISCHARGE_DOCTOR_CODE,DISCHARGE_DOCTOR_DESC,CTPCP_StName,Formatted_DOB,FullName,Age });
      }

      return res.json(temp);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error('Error:', e.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


