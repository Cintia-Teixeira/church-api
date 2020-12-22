import { isEmail } from "class-validator";

describe('MemberAreaController', () => {
    let member = {
        name: 'Cintia', 
        email: 'cin@email.com',
        telphone: 24999999999, 
        address: 'Rua do Ouvidor, 50'
    };

    describe('findAll', () => {
        it('should return a list of all members', async () => {
            const result = [{
                id: 1,
                ...member
            }]

            expect(await memberAreaController.findAll()).toStrictEqual(result);
        });
    });
})