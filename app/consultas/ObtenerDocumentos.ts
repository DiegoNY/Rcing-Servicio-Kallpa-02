import { Request } from "mssql";
import { Documento } from "../types/serviceDoc";

export const ObtnerDocumentos = (sql: Request): Promise<Documento[]> => {

    const ObtnerDocumentosQuery = `
    SELECT TOP 4 D.IdDocumento as CodVenta,D.VentaId, D.NombreComercialReceptor as cliente, D.TipoDocumentoReceptor as TipoDocCliente, D.NroDocumentoReceptor as NroDocCliente,
    D.DireccionReceptor as DirCliente, D.TipoDocumento as TipoDoc,D.FechaEmision as FechaEmision,D.FECHA_VENC as FechaVencimiento,
    D.MonedaId as Moneda, D.FORMADEPAGO as FormaPago,D.Gravadas as Base,D.TotalIgv as Igv, D.TotalExcento as MontoExcento, D.Descuento ,
    D.TotalVenta as TotalDocumento,D.CalculoIgv as Porcentaje, 0 as NGuia, 0 as TipoCambio,D.FECHA_HORA_REF_NC as FechaReferencia,
    D.DOCTYPEID_REF_NC as TipoReferencia,D.NBRDOCUMENT_REF_NC as DocumentoReferencia,D.COD_MOTIVO_REF_NC as CodMotivo,D.DESCRIPCION_REF_NC as Motivo,
    D.FECHA_HORA_REF_NC as HoraReferencia ,null as otros, null as Detraccion, null as PorcDetraccion, null as MontoDetraccion, null as RegimenPercepcion,
    null as TasaPercepcion, null as MontoPercepcion, 1 as Estado
    FROM VENTA_RCI AS D WHERE D.EstatusNube is null ORDER BY D.VentaId ASC
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