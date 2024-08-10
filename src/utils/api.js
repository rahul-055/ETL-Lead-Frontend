const ROOTURL = 'http://localhost:4000/api/';
const API = {
    signup: ROOTURL + 'auth/signup',
    signin: ROOTURL + 'auth/signin',
    addLead: ROOTURL + 'v1/addLead',
    listLead: ROOTURL + 'v1/listLead',
    updateLead: ROOTURL + 'v1/updateLead',
    viewLead: ROOTURL + 'v1/viewLead',
    deleteLead: ROOTURL + 'v1/deleteLead',
}

const ImportedUrl = {
    API: API
}
export default ImportedUrl;