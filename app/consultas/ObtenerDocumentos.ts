import { Request } from "mssql";
import { Documento } from "../types/serviceDoc";

export const ObtnerDocumentos = (sql: Request): Promise<Documento[]> => {

    const ObtnerDocumentosQuery = `
    SELECT TOP 4 D.IdDocumento as CodVenta,D.VentaId, D.NombreComercialEmisor as Cliente, D.NroDocumentoReceptor as TipoDocCliente, D.NroDocumentoReceptor as NroDocCliente,
    D.DireccionReceptor as DirCliente, D.TipoDocumento as TipoDoc,D.FechaCreacion as FechaEmision,D.FECHA_VENC as FechaVencimiento,
    D.MonedaId as Moneda, D.FORMADEPAGO as FormaPago,D.Gravadas as Base,D.TotalIgv as Igv, D.TotalExcento as MontoExcento, D.Descuento ,
    D.TotalVenta as TotalDocumento,D.CalculoIgv as Porcentaje, 0 as Nguia, 0 as TipoCambio,D.FECHA_HORA_REF_NC as FechaReferencia,
    D.DOCTYPEID_REF_NC as TipoReferencia,D.NBRDOCUMENT_REF_NC as DocumentoReferencia,D.COD_MOTIVO_REF_NC as CodMotivo,D.DESCRIPCION_REF_NC as Motivo,
    null as Otros, null as Detraccion, null as PorcDetraccion, null as MontoDetraccion, null as RegimenPercepcion,
    null as TasaPercepcion, null as MontoPercepcion, 1 as Estado
    FROM VENTA_RCI AS D
    `;


    return new Promise((resolve, reject) => {

        sql.query(ObtnerDocumentosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta: ', err);
                reject(err);
                return
            }

            const documentos = result?.recordset;
            resolve(documentos);

        });
    })

}