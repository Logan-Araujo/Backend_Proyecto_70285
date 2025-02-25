import mongoose from 'mongoose';
import User from "../src/dao/Users.dao.js";

import { expect } from 'chai';

const connection = mongoose.connect(`mongodb+srv://Logan:hola2024@cluster0.wjfki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

describe("Testing Dao Users", function() {
    before(function () {
        this.usersDao = new User();
    })

    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
    })

    it("El get de usuario debe retornar un array", async function() {
        const resultado = await this.usersDao.get();
        //assert.strictEqual(Array.isArray(resultado), true);

        expect(Array.isArray(resultado)).to.be.true;
    })

    it("El dao debe agregar correctamente un elemento a la base de datos", async function() {
        let usuario = {
            first_name: "Pepe",
            last_name: "Perez",
            email: "pepeperez@example.com",
            password: "1234",
        }

        const resultado = await this.usersDao.save(usuario);
        //assert.ok(resultado._id);
        expect(resultado).to.have.property("_id");
    })

    it("Al agregar un nuevo usuario, debe tener un array de mascotas vacio por defecto", async function() {
        let usuario = {
            first_name: "Gua",
            last_name: "Yando",
            email: "guayando@example.com",
            password: "1234",
        }
        const resultado = await this.usersDao.save(usuario);
        //assert.deepStrictEqual(resultado.pets, []);
        expect(resultado.pets).to.deep.equal([]);
    })

    it("El dao puede obtener un usuario por emails", async function() {
        let usuario = {
            first_name: "Fernan",
            last_name: "Floo",
            email: "Fernanfloo@example.com",
            password: "hola",
        }
        await this.usersDao.save(usuario);
        const userBuscado = await this.usersDao.getBy({email:usuario.email});
        //assert.strictEqual(typeof userBuscado, "object");
        expect(userBuscado).to.be.an("object");
    })

    after(async function () {
        await mongoose.disconnect();
    })
})