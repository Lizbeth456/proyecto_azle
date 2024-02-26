import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type TFunciones ={
    id: number;
    name:string;
    duration:string;
    genere_movie:string;
    time_start:string;
    time_finish:string;
}

let funciones:TFunciones[] = [
    {
        id:1,
        name:"Wonka",
        duration:"1h 56min",
        genere_movie:"Musical",
        time_start:"20:00",
        time_finish:"22:00"
    }
]

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });

    app.post('/create',(req, res)=>{
        const funcion = funciones.find((funcion)=>funcion.id == parseInt(req.body.id));
        if(funcion){
            res.status(400).json({msg:"Intenta con un id no registrado", data:funcion});
            return;
        }
        req.body.id = funciones[funciones.length - 1].id + 1;
        funciones.push(req.body);
        res.status(200).json({msg:"Función agregada con éxito"});

    });

    app.get('/get',(req,res)=>{
        res.status(200).json({msg:"Funciones registadas exitosamente", data:funciones});
    });

    app.put('/update/:id', (req, res)=>{
        const funcion = funciones.find((funcion)=>funcion.id == parseInt(req.params.id));
        if(!funcion){
            res.status(404).json({msg:"La funcion que desea actualizar no existe"});
            return;
        }

        const UFuncion = {funcion, ...req.body};
        funciones = funciones.map((f) => f.id === UFuncion.id ? UFuncion : f);

        res.status(200).json({msg:"La funcion se actualizo con éxito"});
    });

    app.delete('/delete/:id', (req, res)=>{
        funciones =funciones.filter((f) => f.id !== parseInt(req.params.id));
        res.status(200).json({msg:"Eliminacion exitosa del evento", data:funciones});
    });

    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
