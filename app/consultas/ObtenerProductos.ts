import { Request } from "mssql";
import { Item } from "../types/serviceDoc";

export const ObtnerProductos = (sql: Request, numero_documento: string): Promise<Item[]> => {
    // console.log(numero_documento);
    const ObtnerProductosQuery = `
    SELECT D.CodigoItem, D.Descripcion , D.UnidadMedida as Unidad, D.Cantidad ,D.PrecioUnitario as Precio,
 
    CASE
        WHEN D.Impuesto != 0 THEN  D.TotalVenta - D.Impuesto
        WHEN D.Impuesto = 0 THEN 0
    END as Subtotal,

    0 as Descuento, D.TotalVenta as Total, null as Lote, null as FechaVcto, null as Labora, null as Pastilla, null as Palote 


    FROM VENTADETALLE_RCI AS D WHERE D.VentaId = '${numero_documento}' `;
    return new Promise((resolve, reject) => {

        sql.query(ObtnerProductosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta productos: ', err);
                reject(err);
            }

            const productos = result?.recordset;
            resolve(productos);
        });

    })

}