document.addEventListener('DOMContentLoaded', () => {
    fetchObservations();
    fetchPatient();
});


const urlParams = new URLSearchParams(window.location.search);
const en_id = urlParams.get('en_id');
const hn = urlParams.get('hn');
const en = urlParams.get('en');

//http://localhost:3000/Rehabilitation_assessment?en_id=29776228&hn=12-24-040626&en=O12-24-264047

async function fetchObservations() {
    try {
        const response = await fetch(`http://10.104.10.85:6852/api/observations?en_id=${en_id}&hn=${hn}&en=${en}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].ITM_Code, ':', data[i].OBS_Value.toLowerCase().trim());

                const inputField = document.querySelector(`input[name="${data[i].ITM_Code}"]`);
                const valueFields = document.querySelectorAll(`input[name="${data[i].ITM_Code}"]`);

                if (inputField) {
                    const obsValue = data[i].OBS_Value.toLowerCase().trim();

                    if (inputField.type === 'checkbox') {

                        valueFields.forEach(function (checkbox) {
                            if (checkbox.value.toLowerCase() === obsValue) {
                                checkbox.checked = true;  
                            } else {
                                checkbox.checked = false; 
                            }
                        });
                    }

                    if (inputField.type === 'text') {
                        inputField.value = obsValue;
                    }
                }
            }
        } else {
            console.log('Data is not in expected format or is empty.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchPatient() {
    try {
        const response = await fetch(`http://10.104.10.85:6852/api/patient?en_id=${en_id}&hn=${hn}&en=${en}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const datas = data[0];

            document.getElementById('hn').value = datas.HN;
            document.getElementById('dob').value = datas.Formatted_DOB;
            document.getElementById('age').value = datas.Age;
            document.getElementById('name').value = datas.FullName;
            document.getElementById('department').value = datas.LOC_CODE_MAIN;
            document.getElementById('date').value = datas.ADM_DATE_BASE;
            document.getElementById('time').value = datas.ADM_TIME.substring(0, 5);
            document.getElementById('physician').value = datas.CTPCP_StName;

        } else {
            console.error('No data found or data format is incorrect.');
            alert('ข้อมูลไม่ถูกต้องหรือไม่พบข้อมูล');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


