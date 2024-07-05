import { Request, Response } from 'express';
import { Person } from '../models/person';

let people: Person[] = [
	new Person(1, 'John', 'Michael', 'Doe', 'Smith', '1985-10-10', 'Male', 'Single', 'Passport', 'A12345678'),
	new Person(2, 'Jane', 'Mary', 'Doe', 'Johnson', '1990-05-15', 'Female', 'Married', 'Driver\'s License', 'D98765432'),
	new Person(3, 'Alex', 'Lee', 'Turner', 'Williams', '1982-12-22', 'Male', 'Divorced', 'ID Card', 'C45678901'),
	new Person(4, 'Emily', 'Rose', 'Clark', 'Brown', '1978-03-30', 'Female', 'Widowed', 'Passport', 'B23456789'),
	new Person(5, 'Daniel', 'James', 'Martinez', 'Garcia', '1995-07-25', 'Male', 'Single', 'ID Card', 'E12389012')
];
let currentId = 1;

export const getAllPeople = (req: Request, res: Response) => {
	res.json(people);
};

export const getPersonById = (req: Request, res: Response) => {
	const person = people.filter(p => p.identification.toLowerCase().includes(req.params.id.toLowerCase()));
	if (!person) return res.status(200).send({ data: null });
	res.json({ data: person });
};

export const createPerson = (req: Request, res: Response) => {
	const {
		firstName,
		secondName,
		fisrtLastName,
		secondLastName,
		birthDate,
		gender,
		maritalStatus,
		typeIdentification,
		identification
	} = req.body;
	const person = new Person(
		currentId++,
		firstName,
		secondName,
		fisrtLastName,
		secondLastName,
		birthDate,
		gender,
		maritalStatus,
		typeIdentification,
		identification);
	people.push(person);
	res.status(201).json(person);
};

export const updatePerson = (req: Request, res: Response) => {
	console.log({ body: req.body });
	const person = people.find(p => p.id === parseInt(req.params.id));
	if (!person) return res.status(404).send('Person not found');

	const { 
		firstName, 
		secondName, 
		fisrtLastName, 
		secondLastName, 
		birthDate, 
		gender, 
		maritalStatus,
		typeIdentification,
		identification } = req.body;
	person.firstName = firstName;
	person.secondName = secondName;
	person.fisrtLastName = fisrtLastName;
	person.secondLastName = secondLastName;
	person.birthDate = birthDate;
	person.gender = gender;
	person.maritalStatus = maritalStatus;
	person.typeIdentification = typeIdentification;
	person.identification = identification;

	res.json(person);
};

export const deletePerson = (req: Request, res: Response) => {
	console.log(req.params.id);
	const personIndex = people.findIndex(p => p.identification === req.params.id);
	if (personIndex === -1) return res.status(404).send('Person not found');

	people.splice(personIndex, 1);
	res.status(204).send();
};