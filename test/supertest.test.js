import supertest from "supertest";

import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Testing App Adoptme", () =>{
    describe("Testing de mascotas", () => {
        it("Endpoint /api/pets debe crear una mascota correctamente", async () => {
            const dogMock = {
                name: "Rex",
                specie: "Bull Terrier",
                birthDate: "2022-01-01"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(dogMock);

            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            
            expect(_body.payload).to.have.property("_id");

        })

        it("Al crear una mascota solo con los datos necesarios. Se debe corroborar que la mascota tenga la propiedad adopted: false", async () => {
            const nuevaMascota = {
                name: "Dante",
                specie: "Demon",
                birthDate: "2001-01-01"
            }

            const {statusCode, _body } = await requester.post("/api/pets").send(nuevaMascota);

            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property("adopted").that.equals(false);
        })

        it("Si se crea una mascota sin el campo nombre, el modulo debe responder con un status 400", async () => {
            const sinNombre = {
                specie: "Son of Sparda",
                birthDate: "2004-01-01"
            }

            const {statusCode} = await requester.post("/api/pets").send(sinNombre);

            expect(statusCode).to.equal(400);
        })

        it("Al obtener las mascotas con el metodo GET, la respuesta debe tener los campos status y payload. Ademas de que payload debe ser de tipo arreglo.", async () => {
            const { statusCode, _body } = await requester.get("/api/pets");
            expect(statusCode).to.equal(200);
            expect(_body).to.have.property("payload").that.is.an("array");
        })

        it("El metodo PUT debe actualizar correctamente una mascota", async () => {
            const idMascota = "679bfa7fa124da267bf90a2a"; 
            
            const datosActualizados = {
                name: "Stella",
                specie: "Perro",
            }

            const { statusCode } = await requester.put(`/api/pets/${idMascota}`).send(datosActualizados);

            expect(statusCode).to.equal(200);
        })

        it("El metodo DELETE debe borrar la ultima mascota agregada, esto se puede lograr aregando la mascota con un POST, tomando el id, borrando la mascota con un DELETE y luego verificar con un GET", async () => {
            const nuevaMascota = {
                name: "Luna",
                specie: "Perro",
                birthDate: "2005-01-01"
            }

            const { _body: {payload: {_id}} } = await requester.post("/api/pets").send(nuevaMascota);

            const { statusCode } = await requester.delete(`/api/pets/${_id}`);

            expect(statusCode).to.equal(200);
        })
    })
})