import supertest from "supertest";

import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Testing de EndPoints de adoptions.router", () => {
    it("Al obtener las adopciones con el metodo GET debe tener los campos de status y payload, ademas de que payload debe ser un array", async () => {
        const { statusCode, _body } = await requester.get("/api/adoptions");
        expect(statusCode).to.equal(200);
        expect(_body).to.have.property("payload").that.is.an("array");
    })

    it("Al consultar una adopcion por su ID con el metodo GET, debe entregar el id especifico de la adopcion", async () => {
        const adoptionId = "67bb4f3f55e0ea7542055343";
        const { statusCode, _body } = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(statusCode).to.equal(200);
        expect(_body.payload).to.have.property("_id").that.equals(adoptionId);

    })

    it('Debería retornar un error 400 cuando la mascota ya esté adoptada', async () => {
        const owner = "67bb5c8755e0ea7542055344"; 
        const pet = "67bb3d4bab5700344080f56c"; 

        const { statusCode, _body } = await requester.post(`/api/adoptions/${owner}/${pet}`).send({ owner, pet });
                          
        console.log(_body); 

        expect(statusCode).to.equal(400);
        expect(_body.error).to.equal("Pet is already adopted");
    });
})