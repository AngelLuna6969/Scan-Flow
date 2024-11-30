import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fullcrudContext } from "../components/context/ContextProvider";
import Swal from "sweetalert2";



const Login = () => {
  const { setUsuario } = useContext(fullcrudContext);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleAccess = () => {
    if (user !== "" && pass !== "") {
      console.log("Usuario: ", user, "Contraseña: ", pass);

      // Simulamos la respuesta de autenticación del backend
      const mockResponse = {
        status: "ok",
        msg: "Inicio de sesión exitoso",
        data: {
          id_usuario: 1,
          usuario: user,
          contrasena: pass
        }
      };

      if (mockResponse.status === "ok") {
        console.log(mockResponse);

        // Actualiza el contexto con los datos del usuario simulado
        setUsuario(mockResponse.data);

        Swal.fire({
          icon: "success",
          title: mockResponse.msg,
        });

        // Navega a la ruta protegida
        navigate("/menu", {
          replace: true,
          state: {
            logged: true,
            id: mockResponse.data.id_usuario,
            usuario: mockResponse.data.usuario,
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: mockResponse.msg,
          text: "Datos incorrectos",
          footer: "Intentalo nuevamente",
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No hay datos",
        text: "Ingresa usuario y contraseña",
        footer: '<Link to="/nuevo">¿Deseas crear una cuenta?</Link>'
      });
    }
  }


  return (
    <div className="login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <b>Admin</b>LTE
          </div>
          <div className="card-body">
            <p className="login-box-msg">Agrega tus datos de acceso</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={() => handleAccess()} >Ingresar</button>
              </div>
            </div>
            <hr />
            <p className="mb-0 text-center">
              <Link to="/nuevo">Crear una cuenta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;