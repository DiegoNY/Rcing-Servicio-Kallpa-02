import { Request } from "mssql";
import { Documento } from "../types/serviceDoc";

export const ActualizarDocumento = (sql: Request, estatus: string | number, cod_venta: string, tipo_documento: string | number): Promise<Documento[]> => {

    const ActualizarDocumentoQuery = `
    UPDATE VENTA_RCI SET EstatusNube = '${estatus}' , FechaNube = CURRENT_TIMESTAMP WHERE IdDocumento ='${cod_venta}'
    AND TipoDocumento = '${tipo_documento}'
    `;

    return new Promise((resolve, reject) => {

        sql.query(ActualizarDocumentoQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al actualizar: ', err);
                reject(err);
                return
            }

            console.log(result);

            const documentos = result?.recordset;
            resolve(documentos);

        });
    })

}