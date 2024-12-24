const { setEngine } = require("crypto");
const CACHESQL_iris2022 = require("./cachesql_iris2022");

// CACHESQL_iris2022.config({
//   url: "jdbc:IRIS://10.104.18.29:51773/BASE-TRAK",
//   username: "superuser",
//   password: "Iscbkk01",
// });

CACHESQL_iris2022.config({
    url: "jdbc:IRIS://10.104.18.69:51773/LIVE-TRAK",
    username: "trakcaresqluser",
    password: "trakcare",
 });


exports.getobservations = function (en_id) {
  return new Promise(async (resolve) => {
    let sql = `SELECT OBS_ParRef->MRADM_ADM_DR->PAADM_RowID, OBS_parref, OBS_Item_DR->ITM_SysUOM_DR->CTUOM_Desc, OBS_Value
    , OBS_Item_DR->ITM_Code, OBS_Item_DR->ITM_Desc, LU.LU_Desc
    FROM SQLUser.MR_Observations 
    LEFT JOIN SQLUser.MRC_ObservationItemLookUp LU on lu_parRef = OBS_Item_DR and lu_code = obs_value
    WHERE OBS_parref in (SELECT PAADM_MainMRADM_DR FROM PA_Adm  WHERE PAADM_RowID = '${en_id}')`;
    let list = await CACHESQL_iris2022.query(sql);
    resolve(list);
  });
}


exports.getheader = function (en) {
  return new Promise(async (resolve) => {
    let sql = `SELECT PAADM_RowID,PA_PatMas.PAPMI_No HN,(PA_PatMas.PAPMI_Name || ' ' || PA_PatMas.PAPMI_Name2) AS FullName,PAADM_ADMNo EN,PAADM_DepCode_DR->CTLOC_Code LOC_CODE_MAIN,
      PAADM_DepCode_DR->CTLOC_Desc LOC_DESC_MAIN,TO_CHAR(PA_PatMas.PAPMI_DOB, 'DD Month YYYY') AS Formatted_DOB,
      PAADM_DepCode_DR->CTLOC_Desc LOC_DESC_MAIN,TO_CHAR(PAADM_AdmDate, 'DD Month YYYY') AS ADM_DATE_BASE
      ,PAADM_AdmTime ADM_TIME,PAADM_Type ADM_TYPE,PAADM_MedDischDoc_DR->CTPCP_Code DISCHARGE_DOCTOR_CODE,
      PAADM_MedDischDoc_DR->CTPCP_Desc DISCHARGE_DOCTOR_DESC,PAADM_MedDischDoc_DR->CTPCP_StName,
      DATEDIFF(YEAR, PA_PatMas.PAPMI_DOB, GETDATE()) - CASE WHEN DATEADD(YEAR, DATEDIFF(YEAR, PA_PatMas.PAPMI_DOB, GETDATE())
                ,PA_PatMas.PAPMI_DOB) > GETDATE() THEN 1  ELSE 0 END AS Age
      FROM PA_Adm 
      LEFT JOIN PA_PatMas ON PA_PatMas.PAPMI_RowID = PA_Adm.PAADM_PAPMI_DR 
      WHERE PAADM_ADMNo = '${en}'`;
    let list = await CACHESQL_iris2022.query(sql);
    resolve(list);
  });
}


