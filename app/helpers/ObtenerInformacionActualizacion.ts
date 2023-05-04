export const ObtenerInforamcionACtualziacion = (documento: string) => {
    const documentoArr = documento.split('-');
    console.log(documentoArr);
    let documento_obte = `${documentoArr[0]}-${documentoArr[1]}`
    let tipo = documentoArr[2]

    if (documentoArr[0] == "RC") {
        documento_obte = `${documentoArr[0]}-${documentoArr[1]}-${documentoArr[2]}`;
        tipo = documentoArr[3]
    }
    if (documentoArr[0] == "RA") {
        documento_obte = `${documentoArr[0]}-${documentoArr[1]}-${documentoArr[2]}`;
        tipo = documentoArr[3]
    }

    console.log(documento_obte)

    return {
        documento_obte,
        tipo
    }
}