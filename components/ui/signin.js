import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signin() {
  const recoverAccount = async event => {
    event.preventDefault()
    axios.post(process.env.HOST+'/api/users/get',  {      
      mainKey: event.target.mainKey.value
      
    }).then(response => {
      localStorage.setItem('accountNumber', response.data.accountNumber);     
      localStorage.setItem('mainKey', response.data.mainKey);     
      localStorage.setItem('userId', response.data.id);     
      location.reload();
    }).catch(function (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          document.getElementById("errorLabel").innerHTML=error.response.data.message
      }
    });
  }
  const newAccount = (ev)=>{
    axios.post(process.env.HOST+'/api/users/new').then(response => {

      localStorage.setItem('accountNumber', response.data.accountNumber);     
      localStorage.setItem('mainKey', response.data.mainKey);     
      localStorage.setItem('userId', response.data.id);     
      location.reload();
    });    
  }
  return (
    <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form onSubmit={recoverAccount}>
              <div className="form-group">
                <label htmlFor="mainKey">Llave de ingreso</label>
                <input
                  type="text"
                  className="form-control"
                  id="mainKey"
                  aria-describedby="mainKeyHelp"
                  placeholder="Ingrese código"
                />
                <small id="mainKeyHelp" className="form-text text-muted">
                  Ingresa con tú codigo de 12 palabras.
              </small>
              </div>             
              
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
              <button type="button" className="btn btn-primary"
                onClick={(ev)=>newAccount(ev)}
                style={{
                  marginLeft:"10px"
                }}
              >
                Nueva cuenta
              </button>
            </form>
            <label id="errorLabel"></label>
          </div>
        </div>
      </div>
  );
}
