const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = "./mocks/threeItems-valid.csv"
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Ederson Lucas",
        "id": "123",
        "profession": "Developer",
        "birthDay": new Date().getFullYear() - 24
      },
      {
        "name": "Jovem Gafanhoto",
        "id": "321",
        "profession": "Gafanhoto",
        "birthDay": new Date().getFullYear() - 25
      },
      {
        "name": "Joãozinho da Silva",
        "id": "245",
        "profession": "Radialista",
        "birthDay": new Date().getFullYear() - 45
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})();