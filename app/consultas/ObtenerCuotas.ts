import { Request } from "mssql";
import { Cuota } from "../types/serviceDoc";

export const ObtenerCuotas = (sql: Request, numero_documento: string): Promise<Cuota[]> => {
    // console.log(numero_documento);
    const ObtnerProductosQuery = `SELECT VC.NumeroCuota as NroCuota, VC.FechaCuota, VC.MontoCuota
    FROM VENTACUOTAS_RCI as VC WHERE VC.VentaId = '${numero_documento}' `;
    return new Promise((resolve, reject) => {

        sql.query(ObtnerProductosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta productos: ', err);
                reject(err);
            }

            const cuotas = result?.recordset;
            /**Moficacion de cuotas */
            cuotas.map((cuota: any) => {
                cuota.FechaCuota = new Date(cuota.FechaCuota)
                    .toISOString()
                    .substring(0, 10);
            });

            resolve(cuotas);
        });

    })

}