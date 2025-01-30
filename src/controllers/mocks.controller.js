import MockingService from "../services/mocking.js"; 
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const getMockingPets = async (req, res) => {
    const mascotas = await MockingService.generateMockingPets(50);
    res.send({status: "success", payload: mascotas});
}

const getMockingUsers = async (req, res) => {
    const usuarios = await MockingService.generateMockingUsers(50); 
    res.send({status:"success", payload: usuarios}); 
}

const generateData = async (req, res) => {
    try {
        const generatedUsers = await MockingService.generateMockingUsers(1);
        const generatedPets = await MockingService.generateMockingPets(1);
        const savedPets = await petModel.insertMany(generatedPets);
        const savedUsers = [];
        for (let user of generatedUsers) {
            const userWithPets = new userModel({
                ...user,
                pets: savedPets.slice(0, user.pets.length).map(pet => pet._id)
            });
            savedUsers.push(await userWithPets.save());
        }

        res.send({
            status: "success",
            message: `Se generaron y guardaron ${savedUsers.length} usuarios y ${savedPets.length} mascotas en la base de datos.`,
            users: savedUsers,
            pets: savedPets
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({status: "error", message: "error al generar los datos"});
    }
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData,
}