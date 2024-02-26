"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

type TFunciones ={
    id?: number;
    name:string;
    duration:string;
    genere_movie:string;
    time_start:string;
    time_finish:string;
}

type TRes = {
    msg:string;
    data?: any
}

const headers = {
    headers: {
        "Content-Type": "application/json",
    }
}


export default function FuncionCrudPage() {
    useEffect(() => {
        getFunciones();
    }, []);

    const [funciones, setFunciones] = useState<TFunciones[]>([]);
    const [funcion, setFuncion] = useState<TFunciones>({
    name:"Movie",
    duration:"0 min",
    genere_movie:"Genero",
    time_start:"00:00",
    time_finish:"00:00"
    });

    const[isEditable, setIsEditable] = useState(false);

    const onChange = (e:any)=> {
        const data: any= funcion;
        data[e.target.name] = e.target.value;
        setFuncion(data);
        
    }
    

    const getFunciones =async () => {

        try {
            
            const response = await axios.get<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`); 
            if (response.data.data){
                setFunciones(response.data.data);
            }

        } catch (error) {
            alert(`Ocurrio un error durante la petición: ${error}`)
        }
    }

    const createFunciones = async () => {
        try {
           
            await axios.post<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/create`, funcion,headers); 
            getFunciones();
        } catch (error) {
            alert(`Ocurrio un error durante la petición: ${error}`)
        }
    }

    const updateFuncion = async (id:number) => {
        try {
            await axios.put<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/update/${id}`, funcion,headers); 
            getFunciones();
            setIsEditable(false);
        } catch (error) {
            alert(`Ocurrio un error durante la petición: ${error}`)
        }
    }

    const deleteFunciones = async (id:number) => {
        try {
            await axios.delete<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${id}`,); 
            getFunciones();
        } catch (error) {
            alert(`Ocurrio un error durante la petición: ${error}`)
        }
    }
    const preUpdate = (e:TFunciones)=>{
        setFuncion(e);
        setIsEditable(true);
    }

    return (
        <div>
            <h1>Funciones CRUD</h1>
            <div>
                <label htmlFor="name">Ingresa el nombre de la pelicula:</label><br />
                <input
                    type= "text"
                    onChange={(e)=>onChange(e)}
                    name= "name"
                    placeholder='Nombre'
                /><br />
                <label htmlFor="duration">Ingresa la duracion de la pelicula:</label><br />
                <input
                    type= "text"
                    onChange={(e)=>onChange(e)}
                    name= "duration"
                    placeholder='Duracion'
                /><br />
                <label htmlFor="genere_movie">Ingresa el genero de la pelicula:</label><br />
                <input
                    type= "text"
                    onChange={(e)=>onChange(e)}
                    name= "genere_movie"
                    placeholder='Genero'
                /><br />
                <label htmlFor="time_start">Ingresa la hora de inicio de la pelicula:</label><br />
                <input
                    type= "text"
                    onChange={(e)=>onChange(e)}
                    name= "time_start"
                    placeholder='Inicio'
                /><br />
                <label htmlFor="time_finish">Ingresa la hora de termino de la pelicula:</label><br />
                <input
                    type= "text"
                    onChange={(e)=>onChange(e)}
                    name= "time_finish"
                    placeholder='Fin'
                /><br />
            </div>
            <button onClick={createFunciones}>Agregar Funcion</button>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Duracion</th>
                    <th>Genero de la pelicula</th>
                    <th>Inicio</th>
                    <th>Final</th>
                    <th>Opciones</th>
                </tr>

                {funciones.map((funcion, index)=>(
                    <tr key={index}>
                        <td>{funcion.name}</td>
                        <td>{funcion.duration}</td>
                        <td>{funcion.genere_movie}</td>
                        <td>{funcion.time_start}</td>
                        <td>{funcion.time_finish}</td>
                        <td>
                            <button onClick={()=>deleteFunciones(funcion.id ?? 0)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={()=>preUpdate(funcion)}>Update</button>
                        </td>
                    </tr>
                ))};
            </table>

            {
                isEditable && (
                    <div>
                        <h2>Actualización</h2>
                    <label htmlFor="name">Ingresa el nombre de la pelicula:</label><br />
                    <input
                        type= "text"
                        onChange={(e)=>onChange(e)}
                        defaultValue= {funcion.name}
                        name= "name"
                    /><br />
                    <label htmlFor="duration">Ingresa la duracion de la pelicula:</label><br />
                    <input
                        type= "text"
                        onChange={(e)=>onChange(e)}
                        defaultValue= {funcion.duration}
                        name= "duration"
                    /><br />
                    <label htmlFor="genere_movie">Ingresa el genero de la pelicula:</label><br />
                    <input
                        type= "text"
                        onChange={(e)=>onChange(e)}
                        defaultValue= {funcion.genere_movie}
                        name= "genere_movie"
                    /><br />
                    <label htmlFor="time_start">Ingresa la hora de inicio de la pelicula:</label><br />
                    <input
                        type= "text"
                        onChange={(e)=>onChange(e)}
                        defaultValue= {funcion.time_start}
                        name= "time_start"
                    /><br />
                    <label htmlFor="time_finish">Ingresa la hora de termino de la pelicula:</label><br />
                    <input
                        type= "text"
                        onChange={(e)=>onChange(e)}
                        defaultValue= {funcion.time_finish}
                        name= "time_finish"
                    /><br />
                        <button onClick={()=>updateFuncion(funcion.id ?? 0)}>Guardar</button>
                    </div>
                )
            }
        </div>
        
    );
}
