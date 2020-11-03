describe('EventsController', () => {
    let event = {
        date: '05/05/2018',
        name: 'III Jornada Teológica',
        time: '9h',
        description: 'Jornada'
    }

    describe('findAll', () => {
        it('should return all events', async () => {
            const result = [{
                id: 1,
                ...event
            }];

            expect(await eventsController.findAll()).toStrictEqual(result);
        });
    });
})