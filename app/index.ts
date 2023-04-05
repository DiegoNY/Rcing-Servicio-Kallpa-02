import express from 'express'
import { ObtnerDocumentos } from './consultas/ObtenerDocumentos';
import { ObtnerProductos } from './consultas/ObtenerProductos';
import { pool } from './libs/sql.libs';
import { Cuota, Documento, Item } from './types/serviceDoc';
import { Declarar } from './Declarar';
import { idSucursal, puerto, ruc, tiempo } from './config/config';
import { ObtenerCuotas } from './consultas/ObtenerCuotas';

const app = express();

let documentos: Documento[] = []
let items: Item[] = []
let cuotas: Cuota[] = []
const documentosError: Documento[] = []

pool.connect((err) => {
    if (err) {
        return console.error('Error de conexión: ', err);
    }
    console.log('Conectado a la base de datos!');
});

setInterval(async () => {

    try {
        const request = pool.request();

        //Obteniendo documentos y armando estructura 🔨👷‍♂️ 
        const documentosBD = await ObtnerDocumentos(request)

        documentosBD.map(async (documento: Documento) => {
            documento.ruc = ruc;
            documento.idSucursal = idSucursal;
            documento.TipoDoc = `0${documento.TipoDoc}`
            if (documento.MontoGratuito == null) documento.MontoGratuito = 0;
            if (documento.Descuento == null) documento.Descuento = 0;
            documento.FechaEmision = new Date(documento.FechaEmision).toISOString().substring(0, 10);
            documento.HoraEmision = "00:00:00";
            documento.FechaVencimiento = new Date(documento.FechaEmision).toISOString().substring(0, 10);
            documento.placa = null;
            documento.Porcentaje = Number(`${documento.Porcentaje}`.split('.')[1])
            documento.Serie = documento.CodVenta.split('-')[0]
            documento.Correlativo = documento.CodVenta.split('-')[1]
            //Campo desaparecera CORRELATIV
            documento.CORRELATIV = documento.CodVenta;

            const items = await ObtnerProductos(request, `${documento.VentaId}`);
            items.map(item => {
                if (item.Descuento == null) item.Descuento = 0;
            })

            const cuotas = await ObtenerCuotas(request, `${documento.VentaId}`);


            documento.items = items || [];
            documento.cuotas = cuotas;

            documentos = documentosBD;

        })

        if (documentos.length != 0) {
            Declarar(documentos)
                .then((rta: any) => {
                    const { data } = rta;
                    console.log(data);
                })
                .catch(error => {
                    console.log("Error al declarar", error)
                })
            documentos = []
        }

    } catch (error) {
        console.log(error)
    }

}, tiempo)

app.get('/', (req, res) => {
    res.send({ productos: true, docs: documentos, cuot: cuotas, items: items })
})

app.listen(puerto, () => {
    console.log("server iniciado")
})


