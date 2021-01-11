describe('PrayersController', () => {
    let prayer = {
        label: 'Ore pela igreja',
        prayerRequest: 'God bless local churches'
    }

    describe('findAll', () => {
        it('should return a all the prayers requests', async () => {
            const result = [{
                id: 1,
                ...prayer
            }];

            expect(await prayersController.findAll()).toStrictEqual(result);
        });
    });
})