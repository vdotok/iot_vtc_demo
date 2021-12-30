class fetchData {
  getUserData(data) {
    console.log("function called");
    let TblData = {};
    TblData.full_name = data.username;
    TblData.email = data.email;
    TblData.password = data.password;
    TblData.device_type = "web";
    TblData.device_model = "iPhone 8";
    TblData.project_id = "170JRJUI";
    TblData.device_os_ver = "13.3";
    TblData.app_version = "1.1.5 (269)";
    console.log("qqqqqq=====", TblData)

    return fetch('https://tenant-api.vdotok.dev/API/v0/SignUp', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())

      .then(data => {
        console.log('Success:', data);
        
        return data;


      })
  }
  LoginData(data) {
    console.log("Login function called");
    let TblData = {};
    TblData.email = data.email;
    TblData.password = data.password;
    TblData.project_id = "170JRJUI";
    console.log("qqqqqq=====", TblData)

    return fetch('https://tenant-api.vdotok.dev/API/v0/Login', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        return data;

      })
  }
  GetAllGroups(data){
    let TblData = {};
    TblData.auth_token          = data.auth_token;
    return fetch('https://tenant-api.vdotok.dev/API/v0/AllGroups', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
  }
  CreateGroup(data){
    let TblData = {}; 
    TblData.group_title     =       data.group_title;
    TblData.participants    =       data.participants;
    TblData.auto_created    =       data.participants.length > 1 ? 0 : 1;
    TblData.auth_token      =       data.auth_token;
    return fetch('https://tenant-api.vdotok.dev/API/v0/CreateGroup', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })

  }
  RenameGroupAPI(data){
    let TblData = {}; 
    TblData.group_title       =       data.group_title;
    TblData.group_id          =       data.group_id;
    TblData.auth_token        =       data.auth_token;
    return fetch('https://tenant-api.vdotok.dev/API/v0/RenameGroup', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })

  }
  GetAllUsers(data){
    let TblData = {};
    // TblData.search_field        = "";
    // TblData.search_value        = "";
    // TblData.condition           = "";
    // TblData.sorting             = "";
    // TblData.start_row           = 0;
    // TblData.row_count           = 1;
    TblData.auth_token          = data.auth_token;
    return fetch('https://tenant-api.vdotok.dev/API/v0/AllUsers', {
      method: 'POST',
      // mode: 'CORS',
      body: JSON.stringify(TblData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
  }
}
export default fetchData;