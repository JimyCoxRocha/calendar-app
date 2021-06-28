import React from 'react';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import './login.css';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: "",
        lPassword: ""
    });
    
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: "",
        rEmail: "",
        rPassword1: "",
        rPassword2: ""
    });
    
    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = ( e ) => {
        e.preventDefault();

        const esEmail = validator.isEmail( lEmail );
        if( !esEmail ){
            Swal.fire(
                'Email or Password Error',
                'Please, write a email o password',
                'error'
              )
              return;
        }
        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = ( e ) => {
        e.preventDefault();

        const esEmail = validator.isEmail( rEmail );
        if( !esEmail || rPassword1.trim().length <= 5 ){
            Swal.fire(
                'Error',
                'Please, write a email or valid password',
                'error'
              )
              return;
        }
        if( rPassword1 !== rPassword2 ){
            Swal.fire(
                'Error',
                'The passwords are not the same',
                'error'
              )
            return;
        }
        dispatch( startRegister( rEmail, rPassword1, rName ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value= { lEmail }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value= { lPassword }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = { handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "rName"
                                value = { rName }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "rEmail"
                                value = { rEmail }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = "rPassword1"
                                value = { rPassword1 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = "rPassword2"
                                value = { rPassword2 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}