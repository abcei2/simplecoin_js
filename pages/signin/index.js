import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

export default function Singin() {
  const router = useRouter()
  
  const [mainKey, setMainKey] = useState("")
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // storing input name
    
    if(localStorage.getItem("mainKey"))     
      router.push("/")
    
    setLoaded(true)
  }, []);

  const newAccount = (ev)=>{
    if(loaded)
      axios.post('http://localhost:3000/api/users/new',{}).then(response => {

        localStorage.setItem('mainKey', response.data.mainKey);     
        localStorage.setItem('userId', response.data.id);     
        router.push("/")
      });
    
  }
  return (
    <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form>
              <div className="form-group">
                <label htmlFor="inputKey">Llave de ingreso</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputKey"
                  aria-describedby="inputKeyHelp"
                  placeholder="Ingrese código"
                />
                <small id="inputKeyHelp" className="form-text text-muted">
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
          </div>
        </div>
      </div>
  );
}
