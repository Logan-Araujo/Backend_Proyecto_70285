import assert from "assert";

function suma(a, b) {
    return a + b;
}

describe("Test suma", () => {
    it("Debe retornar 3 cuando se suman 1 y 2", () => {
        assert.strictEqual(suma(1, 2), 3);
    })

    
})

describe("Ejemplo de Hooks", () => {
    before(() => {
        console.log("Antes de todos los test");
    })

    after(() => {
        console.log("Despues de todos los test");
    })

    beforeEach(() => {
        console.log("Antes de cada test");
    })

    afterEach(() => {
        console.log("Despues de cada test");
    })

    it("Debe sumar correctamente", () => {
        assert.strictEqual(suma(10, 20), 30);
    })

    it("Debe retornar 0 cuando se suman -1 y 1", () => {
        assert.strictEqual(suma(-1, 1), 0);
    })
})